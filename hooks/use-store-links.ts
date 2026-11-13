"use client";

import { useEffect, useState } from "react";
import {
  ANDROID_URL,
  IOS_URL,
  getAttribution,
  storeUrl,
  trackDownload,
  type Attribution,
} from "@/lib/attribution";

// Store links carrying the visitor's campaign attribution. The first render
// uses the plain URLs so server and client HTML match; the tagged ones swap in
// after mount.
export function useStoreLinks(page: string) {
  const [attribution, setAttribution] = useState<Attribution | null>(null);

  useEffect(() => {
    setAttribution(getAttribution());
  }, []);

  return {
    ios: attribution ? storeUrl("ios", attribution) : IOS_URL,
    android: attribution ? storeUrl("android", attribution) : ANDROID_URL,
    track: (platform: "ios" | "android") =>
      trackDownload(platform, page, attribution),
  };
}
