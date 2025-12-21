// import { useState } from "react";
// import techTypesFilters from "../data/techTypesFilters.json";

// export default function Tech() {
//   const [filter, setFilter] = useState<string>("all");

//   return (
//     <section className="mx-5 my-64">
//       <div className="my-28 text-center">
//         <h2 className="text-3xl font-bold text-accent md:text-4xl lg:text-6xl">
//           Technologies that I have worked with
//         </h2>
//       </div>
//       <div className="tabs justify-center gap-1">
//         {techTypesFilters.map((t: string, i: number) => (
//           <button
//             key={`${t}.${i}`}
//             className={`tab btn btn-xs px-5 py-0 md:btn-sm ${filter === t ? "btn-secondary" : "btn-ghost"}`}
//             onClick={() => setFilter(t)}
//           >
//             {t}
//             {i !== 0 && "s"}
//           </button>
//         ))}
//       </div>
//       <div className="divider mx-auto w-2/3 md:w-1/2" />
//       <ul className="mx-auto mt-10 flex flex-wrap justify-center gap-10 md:w-2/3">
//         {technologies.map((t) => (
//           <li
//             key={t.id}
//             data-tip={t.description}
//             className={
//               filter === "all" || filter === t.type
//                 ? "block  md:tooltip md:tooltip-primary"
//                 : "hidden"
//             }
//           >
//             <Link
//               href={t.url}
//               target="_blank"
//               className="flex items-center space-x-2"
//             >
//               <Image
//                 src={pbImagePath(t, t.icon)}
//                 loader={imageLoader}
//                 width={40}
//                 height={40}
//                 className="h-7 w-7 md:h-10 md:w-10"
//                 alt=""
//               />
//               <p className="text-center text-lg font-semibold md:text-xl">
//                 {t.name}
//               </p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
