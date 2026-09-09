import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: "dark", suppressErrorRendering: true });

function FlowchartView({ mermaid: mermaidText }) {
  const chartRef = useRef(null);
  const [copyState, setCopyState] = useState("Copy Mermaid Code");

  useEffect(() => {
    const renderChart = async () => {
      if (!mermaidText || !chartRef.current) {
        return;
      }
      try {
        // AI models often wrap the mermaid code in markdown code blocks
        let cleanedText = mermaidText
          .replace(/^```(mermaid)?\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();

        // Ensure it starts with a valid graph declaration if it just returned nodes
        if (!cleanedText.startsWith("graph") && !cleanedText.startsWith("flowchart")) {
          cleanedText = "graph TD\n" + cleanedText;
        }

        const id = `study-chart-${Date.now()}`;
        
        // Attempt to parse first to catch syntax errors before rendering
        await mermaid.parse(cleanedText);
        
        const { svg } = await mermaid.render(id, cleanedText);
        chartRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid error:", error);
        // Mermaid sometimes still injects its own error text into the DOM or throws
        chartRef.current.innerHTML = "<p class='text-red-400 text-sm'>Unable to render flowchart (AI generated invalid syntax).</p>";
        
        // Find and remove any error overlays Mermaid might have injected into the body
        const errorOverlays = document.querySelectorAll(`[id^="dstudy-chart-"]`);
        errorOverlays.forEach(el => el.remove());
      }
    };

    renderChart();
  }, [mermaidText]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mermaidText || "");
    setCopyState("Copied!");
    setTimeout(() => setCopyState("Copy Mermaid Code"), 1000);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg border border-amber-300/30 px-3 py-2 text-sm text-amber-200 transition hover:bg-amber-300/10"
      >
        {copyState}
      </button>
      <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-4">
        <div ref={chartRef} className="min-w-[560px]" />
      </div>
    </div>
  );
}

export default FlowchartView;
