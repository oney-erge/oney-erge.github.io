import Image from "next/image";
import type { Project } from "@/data/projects";
import styles from "@/app/page.module.css";
import { LoopingVideo } from "@/components/looping-video";

export function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const className = `${styles.projectVisual} ${large ? styles.detailVisual : ""} ${
    large && project.visual === "segcraft" ? styles.wideDetailVisual : ""
  }`;

  if (project.visual === "ybm") {
    return (
      <div className={`${className} ${styles.ybmVisual}`}>
        <LoopingVideo
          src="/media/ybm-demo.mp4"
          poster="/media/ybm-demo-poster.webp"
          label="YBM local agent console showing policy-protected chat and task controls"
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
          sizes={large ? "(max-width: 900px) 100vw, 82vw" : "(max-width: 800px) 100vw, 58vw"}
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
        <Image
          src="/media/localdeploy-catalog.png"
          alt="LocalDeploy model catalog with hardware fit indicators"
          fill
          sizes={large ? "(max-width: 900px) 100vw, 82vw" : "(max-width: 800px) 100vw, 58vw"}
          className={styles.localdeployImage}
        />
        <span className={styles.visualBadge}>Model fit before download</span>
      </div>
    );
  }

  if (project.visual === "agentarium") {
    return (
      <div className={`${className} ${styles.agentariumVisual}`}>
        <Image
          src="/media/agentarium-city.png"
          alt="Agentarium tiny city simulation preview"
          fill
          sizes={large ? "(max-width: 900px) 100vw, 82vw" : "(max-width: 800px) 100vw, 33vw"}
          className={styles.containImage}
        />
        <span className={styles.visualCode}>CITY_PULSE / SCORE 100%</span>
      </div>
    );
  }

  if (project.visual === "creature") {
    return (
      <div className={`${className} ${styles.creatureVisual}`}>
        <LoopingVideo
          src="/media/creature-lab-demo.mp4"
          poster="/media/creature-lab-poster.webp"
          label="Creature Lab quadruped simulation"
          className={`${styles.previewVideo} ${styles.coverImage}`}
        />
        <span className={styles.visualCode}>RUN / OBSERVE / DIAGNOSE</span>
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
