import type { Metadata, NextPage } from "next";
import About from "@/components/common/About";

// export const metadata = {
//   title: "About",
// };

interface ModelsProps {}

export default async function about() {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12">
        <About />
      </main>
    </div>
  );
}
