import type { Metadata } from "next";
import "@/app/globals.css";
import { LenisProvider } from "./context/lenisContext";
import Menu from "./ui/menu/Menu";
import Footer from "./ui/footer/Footer";
import TopbarResolver from "./ui/topbar/Topbar";

export const metadata: Metadata = {
  title: "Coke Navarro",
  description: "Freelance Visual Artist",
  keywords: ["Illustration", "Animation"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <LenisProvider>
          <TopbarResolver />
          <Menu />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}