import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "speculative-decoding-streamed-inference";

export const metadata = articleMetadata(SLUG, ["speculative decoding", "draft model", "acceptance rate", "streamed inference", "Qwen3-14B", "Qwen3-0.6B", "Afterimage"]);

export default function SpeculativePart1() {
  return <ArticlePage slug={SLUG} about={["speculative decoding", "large language model inference", "GPU memory"]} />;
}
