export const metadata = {
  title: 'Nomad Barbershop - Studio',
  description: 'Content Management',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
