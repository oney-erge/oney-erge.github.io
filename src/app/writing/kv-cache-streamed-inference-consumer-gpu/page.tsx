import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "kv-cache-streamed-inference-consumer-gpu";

export const metadata = articleMetadata(SLUG, ["KV cache", "grouped-query attention", "streamed inference", "AirLLM", "Qwen3-14B", "Afterimage"]);

export default function Part2() {
  return <ArticlePage slug={SLUG} about={["KV cache", "streamed inference", "large language model inference"]} />;
}
