"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";

export default function SearchPage() {
  return (
    <>
      <Breadcrumbs items={[{ title: "Search", href: "/search" }]} />
      <div>Search Page</div>
    </>
  );
}
