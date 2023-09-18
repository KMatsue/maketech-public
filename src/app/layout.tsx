import "@/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: { default: "Make Lab Blog", template: "%s | Make Lab Blog" },
};
const RootLayout = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
