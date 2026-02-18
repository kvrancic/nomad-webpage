# Izvještaj o implementaciji povratnih informacija

Pozdrav! Ovo je pregled svih promjena koje su napravljene na temelju vaših komentara i povratnih informacija. Za svaku stavku je objašnjeno što je napravljeno ili, ako nešto nije bilo moguće, zašto i koja je alternativa.

---

## 1. Hero sekcija (početni ekran s videom)

**Što ste tražili:** Dodati 4. gumb "Lokacije", promijeniti redoslijed gumba, dodati linkove za društvene mreže, zamijeniti fontove naslova.

**Što je napravljeno:**
- Redoslijed gumba je sada: **Rezerviraj → Usluge → Lokacije → Poklon Kartica**
- Dodan gumb **Lokacije** s ikonom mape koji vodi na stranicu /locations
- Ispod gumba dodani linkovi za **Instagram** i **Facebook** (koriste URL-ove iz Sanity Studija ili fallback vrijednosti)
- **"Više od frizure."** sada ima manji font (podnaslov)
- **"TVORNICA DOBROG RASPOLOŽENJA"** sada ima veliki font (glavni naslov) — vaš positioning statement
- Ista zamjena fontova replicirana je i na **CTA sekciji na dnu stranice** (nakon bloga)

---

## 2. Alatna traka (navigacija)

**Što ste tražili:** Novi redoslijed navigacije, izbaciti odvojenu stranicu "Doživljaj".

**Što je napravljeno:**
- Navigacija sada ide: **Usluge → Lokacije → Galerija → O nama → Tim → Blog → FAQ → Poklon kartice**
- **"Doživljaj" je maknut** iz navigacije (desktop, mobitel i footer)
- Sekcija Whiskey/Pivo/Kava i dalje postoji na homepage-u, ali bez "Saznaj više" linka

---

## 3. "Što te očekuje" sekcija

**Što ste tražili:** Kako editirati tu sekciju (fotke, tekst)?

**Što je napravljeno:**
- Sekcija je sada **potpuno editabilna iz Sanity Studija**
- Možete mijenjati: badge tekst, naslov, podnaslov, opis (HR i EN)
- Možete uploadati **do 4 slike** za grid na lijevoj strani

**Kako editirati:**
1. Otvorite **Sanity Studio** → **What to Expect Section**
2. Izmijenite tekstove i/ili uploadajte slike
3. Kliknite **Publish**

---

## 4. Usluge

**Što ste tražili:** Maknuti pod-sekcije (Kosa/Brada/Paketi), sve na jednom ekranu. Upaljivi "Popularno" badge. Popraviti redoslijed.

**Što je napravljeno:**
- **Tabovi su maknuti** — sve usluge se sada prikazuju u jednom ravnom gridu (flat list)
- **"Popularno" badge** je sada upadljiv: narančasti obrub s emoji vatrice 🔥
- **Redoslijed je popravljen** — sada poštuje redoslijed koji postavite u Sanity Studiju (polje "Display Order")
- Stranica /services sada povlači podatke iz **Sanity CMS-a** (cijene, trajanje, opisi)

---

## 5. Whiskey, Pivo & Kava sekcija

**Što ste tražili:** Kako updateati tu sekciju? Dovoljno je ovo na homepage-u.

**Što je napravljeno:**
- Link "Saznaj više" je maknut
- Sekcija je sada **potpuno editabilna iz Sanity Studija**
- Možete mijenjati: badge, naslov, podnaslov, opis (HR i EN)
- Možete mijenjati **4 feature kartice** (Whiskey, Pivo, Kava, Atmosfera) — svaka ima naslov i opis
- Možete uploadati **glavnu sliku** i **sekundarnu sliku**

**Kako editirati:**
1. Otvorite **Sanity Studio** → **Experience Section**
2. Izmijenite tekstove, feature kartice i/ili slike
3. Kliknite **Publish**

---

## 6. Lokacije — Google Maps link

**Što ste tražili:** Kad se klikne na adresu, da se vidi barbershop, ne kontejner na ulici.

**Što je napravljeno:**
- Link sada pretražuje **"Nomad Barbershop [ime lokacije], Zagreb"** umjesto samo adrese
- To znači da Google Maps sada prikazuje vaš poslovni profil umjesto samo ulice

---

## 7. Galerija

**Što ste tražili:** Slike se odrezuju na mobitelu. Pojednostaviti prikaz (samo slika + barber).

**Što je napravljeno:**
- Na mobitelu se slike sada prikazuju **jedna ispod druge** (stacked) umjesto jedna pored druge
- Koristi se `object-contain` da se slike **ne odrezuju**
- Maknuti su **service**, **category** i **description** — ostaje samo **"by [barber]"** tekst
- Modal je pojednostavljen

**Napomena o brzini uploada:** Sporost uploada slika je vezana za Sanity CDN i nije kontrolabilna iz koda. **Savjet:** Komprimirajte slike na <1MB prije uploada i koristite JPEG format.

---

## 8. Tim

**Što ste tražili:** Dodati direktan link za booking kod svakog barbera. Maknuti specijalnosti i ostale nepotrebne informacije. Prikazati Sanity slike.

**Što je napravljeno:**
- Dodano **novo polje "Booking URL"** u Sanity shemi za barbere
- Kartice su pojednostavljene: **samo slika, ime, uloga/lokacija i gumb za booking**
- Maknute su specijalnosti, bio tekst i ostali detalji
- Stranica /team sada povlači **Sanity podatke** (slike, imena, uloge)
- Booking gumb koristi individualni link barbera ako je postavljen, inače globalni Fresha URL

**Kako postaviti booking link za barbera:**
1. Otvorite **Sanity Studio** → **Barbers**
2. Kliknite na barbera
3. Ispunite polje **"Booking URL"** s njegovim direktnim Fresha linkom
4. Kliknite **Publish**

---

## 9. Testimonials (recenzije)

**Što ste tražili:** Ručno postaviti avg score i broj recenzija. Prekopirati par dobrih recenzija s Googlea.

**Što je napravljeno:**
- Dodana **dva nova polja** u Site Settings:
  - **Review Average Score** — npr. 4.9
  - **Review Total Count** — npr. 800
- Komponenta koristi te ručne vrijednosti ako su postavljene

**Kako postaviti:**
1. Otvorite **Sanity Studio** → **Site Settings**
2. Ispunite **"Review Average Score"** (npr. 4.9) i **"Review Total Count"** (npr. 800)
3. Kliknite **Publish**
4. Pojedinačne recenzije dodajete u sekciji **Testimonials** u Sanity Studiju

**Napomena o Google recenzijama:** Automatska integracija Google Reviews API-a zahtijeva API ključ, verifikaciju poslovanja, server-side dohvaćanje i rate limiting — to je veći projekt. Alternativa koju smo implementirali (ručni score + odabrane recenzije) pokriva vašu potrebu.

---

## 10. FAQ

**Što ste tražili:** Prikazati 5 pitanja na homepage-u, dodati pitanje o djeci.

**Što je napravljeno:**
- Homepage sada prikazuje **sva pitanja** koja imaju `showOnHomepage: true` u Sanity Studiju (bez limita na 4)
- Fallback uključuje 5 pitanja uključujući pitanje o djeci

**Kako dodati pitanje o djeci na homepage:**
1. Otvorite **Sanity Studio** → **FAQs**
2. Pronađite pitanje o djeci (ili ga kreirajte)
3. Uključite **"Show on Homepage"** prekidač
4. Kliknite **Publish**

---

## 11. Footer (crni strip na dnu)

**Što ste tražili:** Podaci ne reflektiraju promjene iz Sanity Studija (lokacije, mail adresa).

**Što je napravljeno:**
- Footer sada **povlači podatke iz Sanity CMS-a**: lokacije, email, telefon, Instagram, Facebook
- Ako Sanity podaci nisu dostupni, koriste se fallback vrijednosti
- Promjene koje unesete u Sanity Studio → Site Settings sada se automatski reflektiraju u footeru

---

## 12. O nama

**Što ste tražili:** Ubaciti novi tekst za "O nama" stranicu.

**Što je napravljeno:**
- Tekst je zamijenjen s vašim tekstom (3 paragrafa: osnivanje, koncept Nomada, trenutno stanje)

---

## 13. OG Image (slika za dijeljenje na društvenim mrežama)

**Što ste tražili:** Dodati OG image.

**Što je napravljeno:**
- Metadata stranice sada koristi **OG sliku iz Sanity Studija** ako je postavljena

**Kako postaviti:**
1. Otvorite **Sanity Studio** → **Site Settings**
2. Uploadajte sliku u polje **"Default OG Image"** (preporučena veličina: 1200x630 px)
3. Kliknite **Publish**

---

## 14. Slike zaposlenika u timu

**Što ste tražili:** Ne prikazuju se slike zaposlenika koje ste dodali.

**Što je napravljeno:**
- Stranica /team sada koristi **Sanity podatke** umjesto hardkodiranih konstanti
- Slike koje uploadate u Sanity Studio → Barbers → Photo sada se prikazuju

---

## Stavke izvan opsega

### Editiranje fontova iz CMS-a
Omogućavanje kontrole fontova iz CMS-a je izuzetno kompleksno (zahtijeva custom CSS injection, font selection UI). **Alternativa:** Javite developeru za bilo kakve promjene teksta ili fontova.

### Automatske Google recenzije
Automatska integracija zahtijeva: Google My Business API, API ključ, server-side fetching, rate limiting. **Alternativa:** Koristite nova polja za ručni unos avg score-a i broja recenzija, a odabrane recenzije dodajte ručno u Testimonials sekciju.

### "Što te očekuje" i Whiskey/Pivo/Kava CMS editiranje
~~Ove sekcije su bazirane na prijevodima/hardkodirane.~~ **UPDATE:** Obje sekcije su sada dostupne u Sanity Studiju!

- **Sanity Studio** → **What to Expect Section**: možete mijenjati badge, naslov, podnaslov, opis (HR/EN), te uploadati do 4 slike
- **Sanity Studio** → **Experience Section**: možete mijenjati sve tekstove i 4 feature kartice (whiskey, pivo, kava, atmosfera), te uploadati glavnu i sekundarnu sliku

Postojeći tekst je automatski importiran — samo pokrenite `npm run seed` ako podaci još nisu u Sanity Studiju.

---

Ako imate pitanja ili trebate dodatne promjene, slobodno se javite!
