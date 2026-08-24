import Image from "next/image";
import type { Project } from "@/data/projects";
import styles from "@/app/page.module.css";

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
        <Image
          src="/media/ybm-demo.gif"
          alt="YBM local agent console showing policy-protected chat and task controls"
          fill
          unoptimized
          sizes={large ? "(max-width: 900px) 100vw, 82vw" : "(max-width: 800px) 100vw, 58vw"}
          className={styles.coverImage}
        />
        <span className={styles.visualBadge}>Policy protected</span>
      </div>
    );
  }

  if (project.visual === "afterimage") {
    return (
      <div className={`${className} ${styles.afterimageVisual}`}>
        <Image
          src="/media/afterimage-logo.webp"
          alt=""
          width={156}
          height={156}
          className={styles.afterimageLogo}
        />
        <div className={styles.afterimageMeasure}>
          <span>BF16 MODEL</span>
          <strong>29.5 GB</strong>
          <i aria-hidden="true">↓</i>
          <strong>8 GB GPU</strong>
          <small>LOSSLESS · NO QUANTIZATION</small>
        </div>
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
        <Image
          src="/media/creature-lab-demo.gif"
          alt="Creature Lab quadruped simulation"
          fill
          unoptimized
          sizes={large ? "(max-width: 900px) 100vw, 82vw" : "(max-width: 800px) 100vw, 33vw"}
          className={styles.coverImage}
        />
        <span className={styles.visualCode}>RUN / OBSERVE / DIAGNOSE</span>
      </div>
    );
  }

  return (
    <div className={`${className} ${styles.segcraftVisual}`}>
      <Image
        src="/media/segcraft-preview.webp"
        alt="SegCraft dashcam video beside a semantic segmentation overlay"
        fill
        sizes={large ? "(max-width: 900px) 100vw, 82vw" : "(max-width: 800px) 100vw, 33vw"}
        className={styles.containImage}
      />
      <span className={styles.visualCode}>CONFIG / TRAIN / INFER</span>
    </div>
  );
}
