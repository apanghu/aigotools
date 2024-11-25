"use client";
import { useQuery } from "@tanstack/react-query";

import CategoryTag from "@/components/index/cateogry-tag";
import { getAllCategories } from "@/lib/actions";
import { useRouter } from "@/navigation";
import Loading from "@/components/common/loading";

export default function CategoriesList() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: async () => {
      return await getAllCategories();
    },
    initialData: [],
  });

  const router = useRouter();

  return (
    <div className="relative min-h-96 mt-8">
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {" "}
        {/* 更小的间距 */}
        {categories.map((category) => {
          return (
            <div key={category._id} className="mb-3">
              {" "}
              {/* 更小的底部间距 */}
              <h3 className="font-medium text-xl">
                <CategoryTag
                  onClick={() => {
                    const url = `/search?c=${encodeURIComponent(
                      category.name
                    )}`;

                    router.push(url);
                  }}
                >
                  {category.name}
                </CategoryTag>
              </h3>
            </div>
          );
        })}
      </div>
      <Loading isLoading={isLoading} />
    </div>
  );
}

//   return (
//     <div className="relative min-h-96 mt-8">
//       <div className="mt-6 flex flex-wrap justify-center gap-2">
//         {categories.map((item) => {
//           return (
//             <CategoryTag
//               key={item._id}
//               onClick={() => {
//                 const url = `/search?c=${encodeURIComponent(item.name)}`;

//                 router.push(url);
//               }}
//             >
//               {[item.name].filter(Boolean).join(" ")}
//             </CategoryTag>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
