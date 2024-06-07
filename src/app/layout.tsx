import "@/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";
import { inter } from "@/app/ui/fonts";

export const revalidate = 300;

export const metadata = {
  title: { default: "MaKe Tech", template: "%s | MaKe Tech Blog" },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} antialiased max-w-7xl mx-auto xl:w-full px-8`}
      >
        <Providers>
          <Navbar />
          <main className="relative z-10 mb-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
