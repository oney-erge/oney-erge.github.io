import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "ybm-assistant-9b-results";

export const metadata = articleMetadata(SLUG, ["personal assistant", "local LLM", "Qwen3.5 9B", "llama.cpp", "agent evaluation", "constrained decoding", "decision model", "YBM"]);

export default function YbmAssistantResults() {
  return <ArticlePage slug={SLUG} about={["LLM agents", "language model evaluation"]} />;
}
