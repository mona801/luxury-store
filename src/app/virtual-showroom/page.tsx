"use client";

import dynamic from "next/dynamic";

const ShowroomScene = dynamic(() => import("@/components/showroom/ShowroomScene"), { ssr: false });

export default function VirtualShowroomPage() {
  return <ShowroomScene />;
}
