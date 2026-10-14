import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "llm-memory-requirements-consumer-gpu";

export const metadata = articleMetadata(SLUG, [
  "LLM GPU memory", "BF16", "quantization", "embedding table", "output head", "Qwen3-14B", "Afterimage",
]);

export default function Part1() {
  return <ArticlePage slug={SLUG} about={["GPU memory", "number formats", "large language model weights"]} />;
}
