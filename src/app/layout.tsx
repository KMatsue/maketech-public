import "@/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: { default: "MaKe Tech", template: "%s | Make Lab Blog" },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className="bg-neutral-50 dark:bg-neutral-950 max-w-7xl mx-auto xl:w-full px-2">
        <Providers>
          <Navbar />
          <main className="relative z-10 mb-16 bg-neutral-50 dark:bg-neutral-950">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
