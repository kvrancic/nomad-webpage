# Nomad Barbershop — Cloudflare hosting & cutover runbook

The site runs on **Cloudflare Workers** (Workers Paid, $5/month) via `@opennextjs/cloudflare`.

| Piece | Where |
|---|---|
| Worker | `nomad-webpage` → test URL `https://nomad-webpage.nomad-barbershop.workers.dev` |
| Page cache | KV `NEXT_INC_CACHE_KV` (`817abbd2…`), tag cache KV `NEXT_TAG_CACHE_KV` (`cdb01aad…`) |
| Hero video | R2 bucket `nomad-media`, key `videos/hero.mp4`, served by `worker.ts` with byte-range (206) support |
| Image resizing | Cloudflare Images binding `IMAGES` (`next/image`) |
| Secret | `SANITY_REVALIDATE_SECRET` (Worker secret, same value as on Vercel) |
| Deploy | `npm run deploy` (build + upload; needs `.env.local` with `NEXT_PUBLIC_SANITY_*`) |

To replace the hero video: `npx wrangler r2 object put nomad-media/videos/hero.mp4 --file <file> --content-type video/mp4 --remote`.

---

## Cutover

Two phases, each reversible on its own:

1. **Move DNS to Cloudflare.** The website keeps pointing at Vercel, so visitors see no change. Email is the
   only thing at risk, which is why every record is copied first.
2. **Point the domain at the Worker.** This is an instant switch with a one-step rollback.

### Phase 1 — DNS to Cloudflare

**1a. Add the zone** (dashboard → *Add a domain* → `nomadbarbershop.hr` → **Free** plan → *Quick scan*).

**1b. Make the zone contain exactly these records.** Delete anything the scan added that is not listed.
Every record is **DNS only (grey cloud)**. The proxy is never enabled for these records.

| Type | Name | Content | Purpose |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Website (Vercel until Phase 2) |
| CNAME | `www` | `nomadbarbershop.hr` | Website |
| MX | `@` | `SMTP.GOOGLE.COM` priority `1` | **Email (Google Workspace)** |
| TXT | `@` | `v=spf1 ip4:185.58.73.241 +a +mx +ip4:57.128.187.146 ~all` | **Email SPF** |
| TXT | `@` | `Google-site-verification=_xhYPRU4aaofh64i65CU8gPDCnoHUUU_i6wze8BkdVw` | Google verification |
| TXT | `@` | `google-site-verification=8cV313PMnKaq0sYymtL18ovzs1b0q6lrmSMDAuTytc8` | Google verification |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | **Email DMARC** |
| TXT | `default._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2n0whbvztiokvK1qSZEhBE0vhiyENPOzRxwa+PRDpqWjtFXgvqGKM4ue4VK10HDdW27sB+iqClVHHt9jkg2TGt8E7fxyeYCpNIqmfSpHlSVOohIPHIT+Yj1OlM1m/3ttqxs8m2j68oz/I3NbB6NcTMPKaX3zqTx/RMdbL7Md7SlbA/HJ3Gh9IAxjm9oRDrku68Wz3Hu7jjvCtj88UOW1DMv7Iszzgyperpy7aFeSWoFCR77dcFqrqUFXgbPq+o2CcbGJOEfbJXPdKNfCWXTICocsPKMzT+VKaowl3FEMKd8erBXGSfwceu3aLQHgKH+XxWIdVYsYwabui3/3oasFqwIDAQAB;` | Email DKIM (cPanel) |
| TXT | `_acme-challenge` | `jgmVgtNVy-0lmu5F4sM0DPHeYct6x01D4mvBFpkjZR0` | Old certificate check (harmless) |
| A | `mail` | `185.58.73.241` | Old hosting server |
| A | `webmail` | `185.58.73.241` | Old hosting server |
| A | `cpanel` | `185.58.73.241` | cPanel access |
| A | `whm` | `185.58.73.241` | cPanel access |
| A | `webdisk` | `185.58.73.241` | cPanel access |
| A | `cpcalendars` | `185.58.73.241` | cPanel access |
| A | `cpcontacts` | `185.58.73.241` | cPanel access |
| CNAME | `ftp` | `nomadbarbershop.hr` | Old hosting FTP |

This list comes from public DNS. Before switching, compare it against cPanel → **Zone Editor** for
`nomadbarbershop.hr` and add any record that appears there and not here.

**1c. Zone settings:** SSL/TLS → **Full (strict)**; SSL/TLS → Edge Certificates → **Always Use HTTPS: On**.

**1d. Change nameservers at the registrar (cyber_Folks).** Replace `dns1.cdn.hr` / `dns2.cdn.hr` with the two
nameservers Cloudflare shows for the zone. DNSSEC is off for this domain, so nothing else needs to change.

**1e. Verify.** Cloudflare emails when the zone is *Active*, usually within an hour. Then:
- `https://dns.google/resolve?name=nomadbarbershop.hr&type=NS` shows the Cloudflare nameservers.
- MX, SPF, DMARC and DKIM resolve to the values above.
- An email sent to an `@nomadbarbershop.hr` inbox from an outside account arrives.
- The website still loads (it is still served by Vercel).

**Rollback for Phase 1:** set the nameservers at cyber_Folks back to `dns1.cdn.hr`, `dns2.cdn.hr`. The cPanel
zone stays intact, so this restores the exact previous state.

### Phase 2 — Website to the Worker

**2a.** Delete the `A @` and `CNAME www` records in the Cloudflare zone. The custom domains in the next step
replace them. Do 2a and 2b back to back.

**2b.** Add the routes to `wrangler.jsonc` and deploy:

```jsonc
"routes": [
  { "pattern": "nomadbarbershop.hr", "custom_domain": true },
  { "pattern": "www.nomadbarbershop.hr", "custom_domain": true }
],
```

```bash
npm run deploy
```

**2c.** Run the checks in [Verification](#verification) against `https://nomadbarbershop.hr`.

**Rollback for Phase 2:** remove the `routes` block and run `npm run deploy`. Then, in the Cloudflare
dashboard, delete the two custom domains on the Worker and re-add `A @ 76.76.21.21` and
`CNAME www nomadbarbershop.hr` (DNS only). Vercel serves the site again.

### After the cutover

- **Deploys from GitHub:** dashboard → Workers & Pages → `nomad-webpage` → Settings → Build → connect
  `kvrancic/nomad-webpage`, branch `master`. Build command `npx opennextjs-cloudflare build`, deploy command
  `npx opennextjs-cloudflare deploy`, build variables `NEXT_PUBLIC_SANITY_PROJECT_ID=142o1xmd` and
  `NEXT_PUBLIC_SANITY_DATASET=production`. Until this is set up, deploy with `npm run deploy`.
- **Sanity webhook:** sanity.io/manage → project `142o1xmd` → API → Webhooks. A webhook to
  `https://nomadbarbershop.hr/api/revalidate?secret=…` (POST, dataset `production`, create/update/delete)
  works unchanged on Cloudflare.
- **Vercel:** keep the project for a week as a fallback for the Phase 2 rollback, then disconnect the Git
  integration so `master` pushes stop building there.

---

## Verification

- `/` redirects to `/hr`; `http://` redirects to `https://`; `www` serves the site.
- Every page in `hr` and `en` returns 200, blog posts included; unknown paths return 404.
- Booking (Lime) and gift card (GiftUp) links match the CMS.
- Images load; `/videos/hero.mp4` returns 206 for a `Range` request; the hero video plays on an iPhone.
- `/studio` loads and logging in works.
- Publishing a change in Sanity shows up on the site within a minute.
- Email to an `@nomadbarbershop.hr` address arrives.
