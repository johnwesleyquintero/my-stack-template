"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";

export default function TeamContent() {
  return (
    <>
      <Breadcrumbs items={[{ title: "Team", href: "/team" }]} />
      <div>Team Content</div>
    </>
  );
}
