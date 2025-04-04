// import React from "react";
import AdminDashboard from "@/app/components/AdminDashboard/page";
import ExecutiveDashboard from "@/app/components/ExecutiveDashboard/page";

// const Page = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="space-y-8">
//         {/* Admin Dashboard */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h1 className="text-2xl font-semibold text-gray-700 border-b pb-3">Admin Header</h1>
//           <div className="mt-4">
//             <AdminDashboard />
//           </div>
//         </div>

//         {/* Executive Dashboard */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h1 className="text-2xl font-semibold text-gray-700 border-b pb-3">Executive Header</h1>
//           <div className="mt-4">
//             <ExecutiveDashboard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;


import React from 'react'

const page = () => {
  return (
    <div>
      <AdminDashboard />
      <ExecutiveDashboard />
    </div>
  )
}

export default page
