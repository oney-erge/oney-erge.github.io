import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "schedule-aware-exact-weight-placement";

export const metadata = articleMetadata(SLUG, ["weight placement", "H6.5", "schedule-aware", "offloading", "Llama-3.3-70B", "RTX 5090", "Afterimage"]);

export default function Part4() {
  return <ArticlePage slug={SLUG} about={["weight placement", "GPU memory", "large language model inference"]} />;
}
