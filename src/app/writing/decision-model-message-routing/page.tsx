import { ArticlePage, articleMetadata } from "../_shared/article-page";

const SLUG = "decision-model-message-routing";

export const metadata = articleMetadata(SLUG, ["decision model", "LLM agent", "intent routing", "vLLM Semantic Router", "d3-lite", "llama.cpp", "CPU inference", "YBM", "LocalDeploy"]);

export default function DecisionModelRouting() {
  return <ArticlePage slug={SLUG} about={["decision models", "large language model agents"]} />;
}
