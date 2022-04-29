import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-[1024px]">{children}</div>
      </main>
      <Footer />
    </>
  );
}
