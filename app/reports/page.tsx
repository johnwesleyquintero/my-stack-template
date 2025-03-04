"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";

export default function ReportsPage() {
  return (
    <>
      <Breadcrumbs items={[{ title: "Reports", href: "/reports" }]} />
      <div>Reports Page</div>
    </>
  );
}
