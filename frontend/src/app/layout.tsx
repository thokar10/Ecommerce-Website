export const metadata = {
  title: "Sporty",
};
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <body>{children}</body>
    </html>
  );
}
