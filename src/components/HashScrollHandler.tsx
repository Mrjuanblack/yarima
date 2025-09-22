"use client";

import { useHashScroll } from "@/hooks/useNavigateWithScroll";

export default function HashScrollHandler({ offset = 96 }: { offset?: number }) {
  useHashScroll(offset);
  return null;
}


