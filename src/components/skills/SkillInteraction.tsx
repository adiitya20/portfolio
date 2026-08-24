"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

type Props = {
  active: string | null;
};

export function SkillInteraction({ active }: Props) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const node = svg.current;
    if (!node) return;
    const parent = node.parentElement;
    if (!parent) return;

    const draw = () => {
      node.innerHTML = "";
      if (!active) return;
      const related = portfolioData.skillRelations[active] ?? [];
      const source = parent.querySelector<HTMLElement>(`[data-skill="${CSS.escape(active)}"]`);
      if (!source) return;
      const rootBox = parent.getBoundingClientRect();
      const from = source.getBoundingClientRect();
      related.forEach((name) => {
        const target = parent.querySelector<HTMLElement>(`[data-skill="${CSS.escape(name)}"]`);
        if (!target) return;
        const to = target.getBoundingClientRect();

        const x1 = from.left + from.width / 2 - rootBox.left;
        const y1 = from.top + from.height / 2 - rootBox.top;
        const x2 = to.left + to.width / 2 - rootBox.left;
        const y2 = to.top + to.height / 2 - rootBox.top;

        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2 - 30; // Curve arc control point

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
        path.setAttribute("stroke", "#b44a28");
        path.setAttribute("stroke-width", "1.5");
        path.setAttribute("stroke-opacity", "0.65");
        path.setAttribute("stroke-dasharray", "5,4");
        path.setAttribute("fill", "none");
        group.appendChild(path);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "3");
        circle.setAttribute("fill", "#b44a28");
        circle.setAttribute("cx", String(cx));
        circle.setAttribute("cy", String(cy));
        group.appendChild(circle);

        node.appendChild(group);
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [active]);

  return (
    <svg
      ref={svg}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden
    />
  );
}
