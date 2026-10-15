import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "speculative-decoding-variants";

export const metadata = articleMetadata(SLUG, ["speculative decoding", "self-speculative decoding", "Medusa", "EAGLE", "token tree", "adaptive draft length", "Afterimage"]);

export default function SpeculativePart2() {
  return <ArticlePage slug={SLUG} about={["speculative decoding", "large language model inference"]} />;
}
