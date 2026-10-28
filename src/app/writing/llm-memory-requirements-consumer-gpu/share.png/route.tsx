import { renderShareCard } from "../../_shared/share-card";

export const dynamic = "force-static";

export function GET() {
  return renderShareCard("llm-memory-requirements-consumer-gpu");
}
