// import { useMemo, useState } from "react";
// import {
//   Search,
//   Eye,
//   ShoppingBag,
//   IndianRupee,
//   PackageCheck,
//   Clock3,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";

// const orders = [
//   {
//     id: "#ORD-1001",
//     customer: "Rahul Sharma",
//     items: 2,
//     total: 6999,
//     status: "Delivered",
//     payment: "Paid",
//     date: "20 Jul 2026",
//   },
//   {
//     id: "#ORD-1002",
//     customer: "Aman Singh",
//     items: 1,
//     total: 3499,
//     status: "Processing",
//     payment: "Paid",
//     date: "20 Jul 2026",
//   },
//   {
//     id: "#ORD-1003",
//     customer: "Priya Verma",
//     items: 3,
//     total: 9499,
//     status: "Shipped",
//     payment: "Paid",
//     date: "19 Jul 2026",
//   },
//   {
//     id: "#ORD-1004",
//     customer: "Neha Kapoor",
//     items: 2,
//     total: 4299,
//     status: "Pending",
//     payment: "Pending",
//     date: "18 Jul 2026",
//   },
//   {
//     id: "#ORD-1005",
//     customer: "Rohit Kumar",
//     items: 4,
//     total: 12499,
//     status: "Delivered",
//     payment: "Paid",
//     date: "18 Jul 2026",
//   },
// ];

// export default function Orders() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");

//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const matchesSearch =
//         order.id.toLowerCase().includes(search.toLowerCase()) ||
//         order.customer
//           .toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesStatus =
//         status === "All" || order.status === status;

//       return matchesSearch && matchesStatus;
//     });
//   }, [search, status]);

//   const totalOrders = orders.length;

//   const delivered = orders.filter(
//     (o) => o.status === "Delivered"
//   ).length;

//   const processing = orders.filter(
//     (o) => o.status === "Processing"
//   ).length;

//   const revenue = orders.reduce(
//     (sum, order) => sum + order.total,
//     0
//   );

//   return (
//     <div className="space-y-8">
//       {/* Header */}

//       <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">
//             Orders
//           </h1>

//           <p className="mt-2 text-slate-500">
//             Manage and track customer orders.
//           </p>
//         </div>
//       </div>

//       {/* Stats */}

//       <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
//         <StatCard
//           title="Total Orders"
//           value={totalOrders}
//           icon={<ShoppingBag className="h-5 w-5" />}
//           color="bg-blue-100 text-blue-600"
//         />

//         <StatCard
//           title="Delivered"
//           value={delivered}
//           icon={<PackageCheck className="h-5 w-5" />}
//           color="bg-emerald-100 text-emerald-600"
//         />

//         <StatCard
//           title="Processing"
//           value={processing}
//           icon={<Clock3 className="h-5 w-5" />}
//           color="bg-orange-100 text-orange-600"
//         />

//         <StatCard
//           title="Revenue"
//           value={`₹${revenue.toLocaleString("en-IN")}`}
//           icon={<IndianRupee className="h-5 w-5" />}
//           color="bg-violet-100 text-violet-600"
//         />
//       </div>

//       {/* Filters */}

//       <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div className="relative w-full lg:max-w-md">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//             <Input
//               placeholder="Search order or customer..."
//               className="pl-10"
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//             />
//           </div>

//           <select
//             value={status}
//             onChange={(e) =>
//               setStatus(e.target.value)
//             }
//             className="h-10 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-emerald-500"
//           >
//             <option>All</option>
//             <option>Pending</option>
//             <option>Processing</option>
//             <option>Shipped</option>
//             <option>Delivered</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}

//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50">
//               <tr className="text-left">
//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Order
//                 </th>

//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Customer
//                 </th>

//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Items
//                 </th>

//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Total
//                 </th>

//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Payment
//                 </th>

//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-sm font-semibold text-slate-600">
//                   Date
//                 </th>

//                 <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="border-t border-slate-200 transition hover:bg-slate-50"
//                 >
//                   <td className="px-6 py-4 font-semibold text-slate-900">
//                     {order.id}
//                   </td>

//                   <td className="px-6 py-4">
//                     {order.customer}
//                   </td>

//                   <td className="px-6 py-4">
//                     {order.items}
//                   </td>

//                   <td className="px-6 py-4 font-semibold">
//                     ₹{order.total.toLocaleString("en-IN")}
//                   </td>

//                   <td className="px-6 py-4">
//                     <Badge
//                       className={
//                         order.payment === "Paid"
//                           ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
//                           : "bg-orange-100 text-orange-700 hover:bg-orange-100"
//                       }
//                     >
//                       {order.payment}
//                     </Badge>
//                   </td>

//                   <td className="px-6 py-4">
//                     <StatusBadge
//                       status={order.status}
//                     />
//                   </td>

//                   <td className="px-6 py-4 text-slate-500">
//                     {order.date}
//                   </td>

//                   <td className="px-6 py-4 text-right">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                     >
//                       <Eye className="mr-2 h-4 w-4" />
//                       View
//                     </Button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredOrders.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={8}
//                     className="py-16 text-center text-slate-500"
//                   >
//                     No orders found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({
//   title,
//   value,
//   icon,
//   color,
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-slate-500">
//             {title}
//           </p>

//           <h2 className="mt-2 text-2xl font-bold text-slate-900">
//             {value}
//           </h2>
//         </div>

//         <div
//           className={`rounded-xl p-3 ${color}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const styles = {
//     Pending:
//       "bg-orange-100 text-orange-700 hover:bg-orange-100",
//     Processing:
//       "bg-blue-100 text-blue-700 hover:bg-blue-100",
//     Shipped:
//       "bg-violet-100 text-violet-700 hover:bg-violet-100",
//     Delivered:
//       "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
//   };

//   return (
//     <Badge className={styles[status]}>
//       {status}
//     </Badge>
//   );
// }

import { ShoppingCart } from "lucide-react";
import ComingSoon from "./ComingSoon";

export default function Orders() {
  return (
    <ComingSoon
      icon={ShoppingCart}
      title="Orders Module"
      description="Manage orders, track deliveries, update payment status, print invoices, and monitor order history from one place."
    />
  );
}