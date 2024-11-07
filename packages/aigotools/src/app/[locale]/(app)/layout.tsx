import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import FAQ from "@/components/common/faq";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <FAQ />
      <Footer />
    </>
  );
}
