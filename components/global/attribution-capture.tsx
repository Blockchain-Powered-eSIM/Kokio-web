"use client";

import { useEffect } from "react";
import { getAttribution } from "@/lib/attribution";

// Saves UTM params from the landing URL, whichever page that is, so a later
// store click on another page is still attributed.
export function AttributionCapture() {
  useEffect(() => {
    getAttribution();
  }, []);
  return null;
}
