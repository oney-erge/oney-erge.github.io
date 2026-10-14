/*
 * Interactive figures for "Memory requirements of language model inference on a consumer GPU".
 * Shared by the oneyerge.com page and the standalone artifact. Exact byte counts live here;
 * the page text shows rounded values.
 */
const GB = 1e9;
const PARAMS_TOTAL = 14768307200; // Qwen3-14B weights
const EMBEDDING_BYTES = 777912320 * 2; // BF16
const LAYER_BYTES = 330311936 * 2; // BF16
const WEIGHT_BYTES = PARAMS_TOTAL * 2;
const LAYERS = 40;
const GPU_BYTES = 8 * 1024 ** 3; // an "8 GB" card holds 8 GiB
const SYSTEM_BYTES = 2111 * 1024 ** 2; // nvidia-smi on my laptop, 2,111 MiB
const KV_BYTES_PER_TOKEN = 2 * LAYERS * 8 * 128 * 2;
const CHART_MAX_TOKENS = 32768;
const SVG_NS = "http://www.w3.org/2000/svg";

const pct = (bytes, total) => `${(bytes / total) * 100}%`;

/* Readable sizes: 2 significant digits below 1 GB, 1 decimal place above. */
function gb(bytes) {
  const v = bytes / GB;
  if (v === 0) return "0 GB";
  if (v < 1) return `${Number(v.toPrecision(2))} GB`;
  return `${v.toFixed(1)} GB`;
}

function mb(bytes) {
  const v = bytes / 1e6;
  return v < 10 ? `${Number(v.toPrecision(2))} MB` : `${Math.round(v)} MB`;
}

function kTokens(n) {
  if (n === 0) return "0";
  return `${Math.round(n / 1024)}K`;
}

function svgEl(name, attrs) {
  const node = document.createElementNS(SVG_NS, name);
  for (const key of Object.keys(attrs)) node.setAttribute(key, String(attrs[key]));
  return node;
}

function on(cleanups, target, type, handler) {
  target.addEventListener(type, handler);
  cleanups.push(() => target.removeEventListener(type, handler));
}

function makeTip(parent) {
  const tip = document.createElement("span");
  tip.className = "tip";
  tip.hidden = true;
  tip.setAttribute("role", "status");
  parent.appendChild(tip);
  return tip;
}

/* Figure 1: weights to scale against the GPU. */
function initMap(root, cleanups) {
  const fig = root.querySelector("#fig-map");
  if (!fig) return;
  const bar = fig.querySelector('[data-role="bar"]');
  const wrap = fig.querySelector('[data-role="barwrap"]');
  const axis = fig.querySelector('[data-role="axis"]');
  bar.replaceChildren();
  axis.replaceChildren();

  const segments = [];
  let start = 0;
  const push = (kind, label, bytes) => {
    segments.push({ kind, label, start, bytes });
    start += bytes;
  };
  push("vocab", "Embedding table", EMBEDDING_BYTES);
  for (let i = 1; i <= LAYERS; i += 1) push("layer", `Decoder layer ${i}`, LAYER_BYTES);
  push("vocab", "Output head", EMBEDDING_BYTES);

  const clipId = "fits-clip-map";
  bar.setAttribute("viewBox", `0 0 ${WEIGHT_BYTES / 1e6} 100`);
  const defs = svgEl("defs", {});
  const clip = svgEl("clipPath", { id: clipId });
  clip.appendChild(svgEl("rect", { x: 0, y: 0, width: GPU_BYTES / 1e6, height: 100 }));
  defs.appendChild(clip);
  bar.appendChild(defs);
  const faded = svgEl("g", { class: "faded" });
  const solid = svgEl("g", { "clip-path": `url(#${clipId})` });
  const rects = segments.map((s) => {
    const attrs = { x: s.start / 1e6, y: 0, width: s.bytes / 1e6, height: 100, class: s.kind, "vector-effect": "non-scaling-stroke" };
    const a = svgEl("rect", attrs);
    const b = svgEl("rect", attrs);
    faded.appendChild(a);
    solid.appendChild(b);
    return [a, b];
  });
  bar.appendChild(faded);
  bar.appendChild(solid);

  fig.querySelector('[data-role="capline"]').style.left = pct(GPU_BYTES, WEIGHT_BYTES);
  fig.querySelector('[data-role="fit-label"]').style.width = pct(GPU_BYTES, WEIGHT_BYTES);

  [0, 5, 10, 15, 20].forEach((t) => {
    const span = document.createElement("span");
    span.textContent = t === 0 ? "0" : `${t} GB`;
    span.style.left = pct(t * GB, WEIGHT_BYTES);
    if (t === 0) span.className = "first";
    if (t === 5 || t === 15) span.className = "hide-sm";
    axis.appendChild(span);
  });
  const end = document.createElement("span");
  end.className = "end";
  end.textContent = "29.5 GB";
  axis.appendChild(end);

  const tip = makeTip(wrap);
  cleanups.push(() => tip.remove());
  let hot = -1;
  const setHot = (index) => {
    if (hot >= 0) rects[hot].forEach((r) => r.classList.remove("hot"));
    hot = index;
    if (index < 0) {
      tip.hidden = true;
      return;
    }
    rects[index].forEach((r) => r.classList.add("hot"));
    const s = segments[index];
    tip.innerHTML = `<b>${s.label}</b><span>${gb(s.bytes)}</span><span>${s.start + s.bytes <= GPU_BYTES ? "Fits on the GPU" : "Does not fit"}</span>`;
    const w = wrap.clientWidth;
    tip.style.left = `${Math.min(Math.max(((s.start + s.bytes / 2) / WEIGHT_BYTES) * w, 76), w - 76)}px`;
    tip.hidden = false;
  };
  const pick = (event) => {
    const rect = wrap.getBoundingClientRect();
    const bytes = ((event.clientX - rect.left) / rect.width) * WEIGHT_BYTES;
    setHot(segments.findIndex((s) => bytes >= s.start && bytes < s.start + s.bytes));
  };
  on(cleanups, wrap, "pointermove", pick);
  on(cleanups, wrap, "pointerdown", pick);
  on(cleanups, wrap, "pointerleave", () => setHot(-1));
}

/* Figure 2: KV cache grid that grows one token at a time. */
function initKvGrid(root, cleanups) {
  const fig = root.querySelector("#fig-kvgrid");
  if (!fig) return;
  const grid = fig.querySelector('[data-role="grid"]');
  const count = fig.querySelector('[data-role="count"]');
  const button = fig.querySelector('[data-role="step"]');
  const prompt = ["the", "dog", "ran"];
  const answer = ["in", "the", "yard", "."];
  const rows = ["Layer 1", "Layer 2", "⋮", "Layer 40"];
  let generated = 1;

  const render = () => {
    const tokens = [...prompt, ...answer.slice(0, generated)];
    const newest = tokens.length - 1;
    const table = document.createElement("div");
    table.className = "kvtable";

    const head = document.createElement("div");
    head.className = "kvrow";
    head.appendChild(Object.assign(document.createElement("span"), { className: "rowlabel", textContent: "" }));
    tokens.forEach((t) => head.appendChild(Object.assign(document.createElement("span"), { className: "kvhead", textContent: t })));
    table.appendChild(head);

    rows.forEach((label) => {
      const row = document.createElement("div");
      row.className = label === "⋮" ? "kvrow gap" : "kvrow";
      row.appendChild(Object.assign(document.createElement("span"), { className: "rowlabel", textContent: label }));
      tokens.forEach((_, i) => {
        if (label === "⋮") {
          row.appendChild(Object.assign(document.createElement("span"), { className: "kvhead", textContent: "⋮" }));
          return;
        }
        const cell = document.createElement("span");
        cell.className = `kvcell ${i === newest ? "newest" : i < prompt.length ? "prompt" : "answer"}`;
        cell.innerHTML = "<i>K</i><i>V</i>";
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    grid.replaceChildren(table);
    const n = tokens.length;
    count.textContent = `Stored: ${n} tokens × 40 layers × 8 sets of keys and values = ${mb(n * KV_BYTES_PER_TOKEN)}`;
    button.textContent = generated < answer.length ? "Generate next token" : "Start again";
  };

  on(cleanups, button, "click", () => {
    generated = generated < answer.length ? generated + 1 : 1;
    render();
  });
  render();
}

/* Figure 3: KV cache versus tokens. */
function initKvChart(root, cleanups) {
  const wrap = root.querySelector("#fig-kvchart");
  if (!wrap) return;
  const kvGB = (t) => (KV_BYTES_PER_TOKEN * t) / GB;
  const capGB = GPU_BYTES / GB;

  const draw = () => {
    const width = Math.max(280, wrap.clientWidth - 8);
    const height = 300;
    const m = { top: 26, right: 20, bottom: 46, left: 44 };
    const w = width - m.left - m.right;
    const h = height - m.top - m.bottom;
    const x = (t) => m.left + (t / CHART_MAX_TOKENS) * w;
    const y = (g) => m.top + h - (g / 9) * h;
    const svg = svgEl("svg", {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": "KV cache grows in a straight line from 0 GB with no tokens to 5.4 GB at 32K tokens, below the 8.6 GB GPU line.",
    });
    const text = (tx, ty, str, cls, anchor = "start") => {
      const node = svgEl("text", { x: tx, y: ty, class: cls, "text-anchor": anchor });
      node.textContent = str;
      svg.appendChild(node);
    };
    [0, 2, 4, 6, 8].forEach((g) => {
      svg.appendChild(svgEl("line", { x1: m.left, x2: m.left + w, y1: y(g), y2: y(g), class: "c-grid" }));
      text(m.left - 10, y(g) + 4, String(g), "c-text", "end");
    });
    [0, 8192, 16384, 24576, 32768].forEach((t) => text(x(t), m.top + h + 20, kTokens(t), "c-text", t === 0 ? "start" : "middle"));
    text(m.left + w, m.top + h + 40, "Total tokens (input prompt + answer)", "c-text", "end");
    text(m.left + w, m.top - 12, "GPU memory (GB)", "c-text", "end");
    svg.appendChild(svgEl("line", { x1: m.left, x2: m.left + w, y1: y(capGB), y2: y(capGB), class: "c-cap" }));
    text(m.left + 8, y(capGB) - 8, "8.6 GB GPU", "c-label");
    const endGB = kvGB(CHART_MAX_TOKENS);
    svg.appendChild(svgEl("path", { d: `M${x(0)},${y(0)} L${x(CHART_MAX_TOKENS)},${y(endGB)} L${x(CHART_MAX_TOKENS)},${y(0)} Z`, class: "c-area" }));
    svg.appendChild(svgEl("line", { x1: x(0), y1: y(0), x2: x(CHART_MAX_TOKENS), y2: y(endGB), class: "c-line" }));
    svg.appendChild(svgEl("circle", { cx: x(8192), cy: y(kvGB(8192)), r: 4.5, class: "c-mark" }));
    svg.appendChild(svgEl("circle", { cx: x(CHART_MAX_TOKENS), cy: y(endGB), r: 4.5, class: "c-mark" }));
    /* Labels sit on the empty side of the line: below-right early, above-left at the end. */
    text(x(8192) + 10, y(kvGB(8192)) + 20, "1.3 GB at 8K tokens", "c-label");
    text(x(CHART_MAX_TOKENS) - 10, y(endGB) - 14, "5.4 GB at 32K tokens", "c-label", "end");
    const cross = svgEl("line", { y1: m.top, y2: m.top + h, class: "c-cross", visibility: "hidden" });
    const dot = svgEl("circle", { r: 5, class: "c-mark", visibility: "hidden" });
    svg.appendChild(cross);
    svg.appendChild(dot);
    wrap.replaceChildren(svg);
    const tip = makeTip(wrap);

    const move = (event) => {
      const r = svg.getBoundingClientRect();
      const t = Math.round((Math.min(Math.max((event.clientX - r.left - m.left) / w, 0), 1) * CHART_MAX_TOKENS) / 512) * 512;
      const px = x(t);
      const py = y(kvGB(t));
      cross.setAttribute("x1", px);
      cross.setAttribute("x2", px);
      cross.setAttribute("visibility", "visible");
      dot.setAttribute("cx", px);
      dot.setAttribute("cy", py);
      dot.setAttribute("visibility", "visible");
      tip.innerHTML = `<b>${t.toLocaleString("en-US")} tokens</b><span>${gb(KV_BYTES_PER_TOKEN * t)} of KV cache</span>`;
      tip.style.left = `${Math.min(Math.max(px, 84), width - 84)}px`;
      tip.style.top = `${Math.max(py - 62, 4)}px`;
      tip.hidden = false;
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerdown", move);
    svg.addEventListener("pointerleave", () => {
      tip.hidden = true;
      cross.setAttribute("visibility", "hidden");
      dot.setAttribute("visibility", "hidden");
    });
  };

  draw();
  if ("ResizeObserver" in window) {
    let last = wrap.clientWidth;
    const observer = new ResizeObserver(() => {
      if (Math.abs(wrap.clientWidth - last) > 4) {
        last = wrap.clientWidth;
        draw();
      }
    });
    observer.observe(wrap);
    cleanups.push(() => observer.disconnect());
  }
}

/* Memory check calculator for Eq. (1). */
function initCalc(root, cleanups) {
  const calc = root.querySelector("#calc");
  if (!calc) return;
  const $ = (role) => calc.querySelector(`[data-role="${role}"]`);
  const promptInput = calc.querySelector("#calc-prompt");
  const answerInput = calc.querySelector("#calc-answer");
  const sysInput = calc.querySelector("#calc-sys");

  const update = () => {
    const b = Number(calc.querySelector('input[name="calc-format"]:checked').value);
    const tokens = Number(promptInput.value) + Number(answerInput.value);
    const sys = sysInput.checked ? SYSTEM_BYTES : 0;
    const weights = PARAMS_TOTAL * b;
    const kv = KV_BYTES_PER_TOKEN * tokens;
    const total = sys + weights + kv;
    const scale = Math.max(total, GPU_BYTES) * 1.04;
    $("prompt-out").textContent = kTokens(Number(promptInput.value));
    $("answer-out").textContent = kTokens(Number(answerInput.value));
    $("st-sys").style.width = pct(sys, scale);
    $("st-w").style.width = pct(weights, scale);
    $("st-k").style.width = pct(kv, scale);
    $("st-cap").style.left = pct(GPU_BYTES, scale);
    $("r-sys").textContent = gb(sys);
    $("r-w").textContent = gb(weights);
    $("r-k").textContent = gb(kv);
    $("r-t").textContent = gb(total);
    const margin = GPU_BYTES - total;
    const verdict = $("verdict");
    verdict.className = `verdict ${margin < 0 ? "over" : "under"}`;
    verdict.textContent =
      margin < 0
        ? `Over the GPU memory by ${gb(-margin)}.`
        : `Leaves ${gb(margin)} for GPU software and activations, which must be measured.`;
  };

  calc.querySelectorAll("input").forEach((input) => on(cleanups, input, "input", update));
  update();
}

export function initFigures(root) {
  const cleanups = [];
  initMap(root, cleanups);
  initKvGrid(root, cleanups);
  initKvChart(root, cleanups);
  initCalc(root, cleanups);
  return () => cleanups.forEach((fn) => fn());
}
