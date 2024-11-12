import Faq from "@/components/common/faq";

// export const metadata = {
//   title: "About",
// };

export default async function faq() {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 ">
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12">
        <Faq />
      </main>
    </div>
  );
}
