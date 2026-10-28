import { renderShareCard } from "../../_shared/share-card";

export const dynamic = "force-static";

export function GET() {
  return renderShareCard("moving-weights-storage-to-gpu");
}
