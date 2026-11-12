import Image from "next/image";
import type { Project } from "@/data/projects";
import styles from "@/app/page.module.css";
import { LoopingVideo } from "@/components/looping-video";

export function ProjectVisual({ project }: { project: Project }) {
  const className = styles.projectVisual;

  if (project.visual === "ybm") {
    return (
      <div className={`${className} ${styles.ybmVisual}`}>
        <LoopingVideo
          src="/media/ybm-demo.mp4"
          poster="/media/ybm-demo-poster.webp"
          label="YBM: a request to organize a Downloads folder, an approval in the console and on a phone, then a receipt of every file it moved"
          className={`${styles.previewVideo} ${styles.coverImage}`}
        />
        <span className={styles.visualBadge}>Policy protected</span>
      </div>
    );
  }

  if (project.visual === "afterimage") {
    return (
      <div className={`${className} ${styles.afterimageVisual}`}>
        <Image
          src="/media/afterimage-streaming.webp"
          alt="Model layers streaming from storage through memory to a smaller GPU"
          fill
          className={styles.afterimageImage}
        />
        <div className={styles.afterimageMeasure}>
          <strong>29.5 GB model</strong>
          <span>on</span>
          <strong>8 GB GPU</strong>
        </div>
        <span className={styles.visualBadge}>Lossless weight streaming</span>
      </div>
    );
  }

  if (project.visual === "localdeploy") {
    return (
      <div className={`${className} ${styles.localdeployVisual}`}>
        <LoopingVideo
          src="/media/localdeploy-demo.mp4"
          poster="/media/localdeploy-poster.webp"
          label="LocalDeploy walkthrough showing hardware-aware recommendations, deployment, chat, benchmarks, and monitoring"
          className={`${styles.previewVideo} ${styles.containImage}`}
        />
        <span className={styles.visualBadge}>Choose · deploy · measure</span>
      </div>
    );
  }

  if (project.visual === "agentgymnasium") {
    return (
      <div className={`${className} ${styles.agentgymnasiumVisual}`}>
        <LoopingVideo
          src="/media/agentgymnasium-replay.mp4"
          poster="/media/agentgymnasium-replay-poster.webp"
          label="AgentGymnasium: Qwen3.5 9B, a local model on a laptop CPU, solves the bridge challenge: the crate rolls down the ramp and across the decks the model built over the ravine, which glow under its weight, to the flag"
          className={`${styles.previewVideo} ${styles.coverImage}`}
        />
        <span className={styles.visualCode}>BRIDGE / QWEN3.5 9B, LOCAL</span>
      </div>
    );
  }

  if (project.visual === "creature") {
    return (
      <div className={`${className} ${styles.creatureVisual}`}>
        <LoopingVideo
          src="/media/creature-lab-demo.mp4"
          poster="/media/creature-lab-poster.webp"
          label="Creature Lab: two policies of a Unitree G1 humanoid take the same 400 N shove, one falls and one keeps walking; then the G1 trips on stairs and steps into a gap between stepping stones"
          className={`${styles.previewVideo} ${styles.coverImage}`}
        />
        <span className={styles.visualCode}>TEST / EXPLAIN / FIX</span>
      </div>
    );
  }

  return (
    <div className={`${className} ${styles.segcraftVisual}`}>
      <LoopingVideo
        src="/media/segcraft-demo.mp4"
        poster="/media/segcraft-preview.webp"
        label="SegCraft dashcam video beside a semantic segmentation overlay"
        className={`${styles.previewVideo} ${styles.containImage}`}
      />
      <span className={styles.visualCode}>CONFIG / TRAIN / INFER</span>
    </div>
  );
}
