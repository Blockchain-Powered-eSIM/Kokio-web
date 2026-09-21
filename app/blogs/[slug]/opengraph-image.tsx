import { getPost } from "@/lib/blog";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = "Kokio blog post";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    eyebrow: post?.tag ?? "Kokio Blog",
    title: post?.title ?? "Kokio Blog",
  });
}
