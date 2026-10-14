import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "moving-weights-storage-to-gpu";

export const metadata = articleMetadata(SLUG, ["SSD to GPU", "PCIe", "page cache", "lossless compression", "prefetching", "Qwen3-14B", "Afterimage"]);

export default function Part3() {
  return <ArticlePage slug={SLUG} about={["memory hierarchy", "weight transfer", "lossless compression"]} />;
}
