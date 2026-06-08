import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';
import { cn } from '@/lib/utils';
import {
  ChartBar,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface ProjectInsightsProps {
  isSaudiGreenMode?: boolean;
}

const INSIGHTS_DATA = [
  { domain: 'Endpoint Security', completed: 4, target: 7 },
  { domain: 'Data Analytics', completed: 5, target: 8 },
  { domain: 'Cryptography', completed: 2, target: 6 },
  { domain: 'Compliance Audits', completed: 3, target: 6 },
  { domain: 'Network Defense', completed: 6, target: 9 }
];

const chartSlides = [
  { id: "bar", label: "Bar chart visualization" },
  { id: "line", label: "Line trend visualization" },
] as const;

export default function ProjectInsights({ isSaudiGreenMode = false }: ProjectInsightsProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const activeSlide = chartSlides[slideIndex];

  const goToSlide = (nextIndex: number) => {
    setSlideIndex((nextIndex + chartSlides.length) % chartSlides.length);
  };

  const isCream = !isSaudiGreenMode;

  const chartConfig = useMemo(() => ({
    completed: {
      label: "Completed Projects",
      color: isSaudiGreenMode ? "#00d285" : "#0d5c56",
    },
    target: {
      label: "Target Scope",
      color: isSaudiGreenMode ? "rgba(255, 255, 255, 0.15)" : "rgba(13, 92, 86, 0.22)",
    },
  }) satisfies ChartConfig, [isSaudiGreenMode]);

  return (
    <div className={cn(
      "border rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-colors duration-300",
      isCream 
        ? "bg-transparent border-[#0d5c56]/15 text-[#0d5c56]" 
        : "bg-white/[0.02] border-white/10 text-white"
    )}>
      {/* Background radial soft light blur */}
      <div className={cn(
        "absolute -bottom-16 -right-16 w-56 h-56 blur-3xl rounded-full select-none pointer-events-none transition-all",
        isSaudiGreenMode ? "bg-teal-500/5" : "bg-teal-600/5"
      )}></div>
      
      <div className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5",
        isSaudiGreenMode ? "border-white/5" : "border-[#0d5c56]/10"
      )}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-mono tracking-widest uppercase font-bold",
              isSaudiGreenMode ? "text-[#00a36c]" : "text-[#0d5c56]"
            )}>
              Secure Telemetry Analytics
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
          </div>
          <h3 className={cn(
            "text-xl font-serif tracking-tight",
            isSaudiGreenMode ? "text-white" : "text-[#0d5c56]"
          )}>
            Project Insights
          </h3>
          <p className={cn(
            "text-xs leading-relaxed font-light",
            isSaudiGreenMode ? "text-white/40" : "text-[#0d5c56]/60"
          )}>
            Dynamic visualization displaying verified production security architecture assets across telemetry fields.
          </p>
        </div>

        <div className={cn(
          "flex items-center gap-3 border px-4 py-2.5 rounded-2xl font-mono text-xs w-fit shrink-0 transition-all",
          isSaudiGreenMode 
            ? "bg-white/[0.02] border-white/5 text-white/50" 
            : "bg-[#0d5c56]/5 border-[#0d5c56]/10 text-[#0d5c56]"
        )}>
          <Layers className={cn("w-3.5 h-3.5", isSaudiGreenMode ? "text-teal-400" : "text-[#0d5c56]")} />
          <span>Total completed: 20 domains config</span>
        </div>
      </div>

      {/* Responsive Slide Canvas Container */}
      <div className={cn(
        "w-full relative rounded-2xl border py-5 px-2 overflow-hidden",
        isSaudiGreenMode ? "bg-black/40 border-white/5" : "bg-white/40 border-[#0d5c56]/10"
      )}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 0.99, y: 3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -3 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center items-center"
          >
            {activeSlide.id === "bar" ? (
              <ChartContainer className="w-full min-h-[16rem] max-h-[18rem]" config={chartConfig}>
                <BarChart accessibilityLayer data={INSIGHTS_DATA}>
                  <CartesianGrid 
                    vertical={false} 
                    stroke={isSaudiGreenMode ? "rgba(255,255,255,0.06)" : "rgba(13,92,86,0.08)"}
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="domain"
                    tickFormatter={(value) => value.split(' ')[0]}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fill: isSaudiGreenMode ? "rgba(255,255,255,0.4)" : "rgba(13,92,86,0.6)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    domain={[0, 10]}
                    tick={{ fill: isSaudiGreenMode ? "rgba(255,255,255,0.4)" : "rgba(13,92,86,0.6)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="dashed" />}
                    cursor={false}
                  />
                  <ChartBar dataKey="completed" fill="var(--color-completed)" radius={4} seriesIndex={0} />
                  <ChartBar dataKey="target" fill="var(--color-target)" radius={4} seriesIndex={1} />
                </BarChart>
              </ChartContainer>
            ) : (
              <ChartContainer className="w-full min-h-[16rem] max-h-[18rem]" config={chartConfig}>
                <LineChart accessibilityLayer data={INSIGHTS_DATA}>
                  <CartesianGrid 
                    vertical={false} 
                    stroke={isSaudiGreenMode ? "rgba(255,255,255,0.06)" : "rgba(13,92,86,0.08)"}
                  />
                  <XAxis
                    axisLine={false}
                    dataKey="domain"
                    tickFormatter={(value) => value.split(' ')[0]}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fill: isSaudiGreenMode ? "rgba(255,255,255,0.4)" : "rgba(13,92,86,0.6)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    domain={[0, 10]}
                    tick={{ fill: isSaudiGreenMode ? "rgba(255,255,255,0.4)" : "rgba(13,92,86,0.6)", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="dot" />}
                    cursor={false}
                  />
                  <Line 
                    dataKey="completed" 
                    type="monotone" 
                    stroke="var(--color-completed)" 
                    strokeWidth={3} 
                    dot={{ fill: "var(--color-completed)", r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    dataKey="target" 
                    type="monotone" 
                    stroke="var(--color-target)" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    dot={{ fill: "var(--color-target)", r: 3 }} 
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Navigation & Pagination Switcher */}
      <div className={cn(
        "flex w-full items-center justify-between gap-3 pt-4 border-t",
        isSaudiGreenMode ? "border-white/5" : "border-[#0d5c56]/10"
      )}>
        <button
          type="button"
          aria-label="Previous chart"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-xl border transition-all cursor-pointer",
            isSaudiGreenMode 
              ? "border-white/10 text-white hover:bg-white/5" 
              : "border-[#0d5c56]/20 text-[#0d5c56] hover:bg-[#0d5c56]/5"
          )}
          onClick={() => goToSlide(slideIndex - 1)}
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Project telemetry layouts">
          {chartSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-label={slide.label}
              aria-selected={index === slideIndex}
              className={cn(
                "rounded-full transition-all duration-300 cursor-pointer h-2.5",
                index === slideIndex 
                  ? `w-7 ${isSaudiGreenMode ? "bg-teal-400" : "bg-[#0d5c56]"}` 
                  : `w-2.5 ${isSaudiGreenMode ? "bg-white/20 hover:bg-white/35" : "bg-[#0d5c56]/20 hover:bg-[#0d5c56]/35"}`
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next chart"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-xl border transition-all cursor-pointer",
            isSaudiGreenMode 
              ? "border-white/10 text-white hover:bg-white/5" 
              : "border-[#0d5c56]/20 text-[#0d5c56] hover:bg-[#0d5c56]/5"
          )}
          onClick={() => goToSlide(slideIndex + 1)}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Static Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className={cn(
          "border p-4 rounded-xl flex items-center gap-3 transition-all",
          isSaudiGreenMode ? "bg-white/[0.01] border-white/5" : "bg-[#0d5c56]/5 border-[#0d5c56]/10"
        )}>
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
          <div className="space-y-0.5">
            <div className={cn("font-medium", isSaudiGreenMode ? "text-white" : "text-[#0d5c56]")}>95.4% Success</div>
            <div className={isSaudiGreenMode ? "text-white/30" : "text-[#0d5c56]/60"}>Incident drill closures</div>
          </div>
        </div>
        <div className={cn(
          "border p-4 rounded-xl flex items-center gap-3 transition-all",
          isSaudiGreenMode ? "bg-white/[0.01] border-white/5" : "bg-[#0d5c56]/5 border-[#0d5c56]/10"
        )}>
          <div className="w-2 h-2 rounded-full bg-[#00a36c]"></div>
          <div className="space-y-0.5">
            <div className={cn("font-medium", isSaudiGreenMode ? "text-white" : "text-[#0d5c56]")}>NCA Level-3</div>
            <div className={isSaudiGreenMode ? "text-white/30" : "text-[#0d5c56]/60"}>Compliance standard model</div>
          </div>
        </div>
        <div className={cn(
          "border p-4 rounded-xl flex items-center gap-3 transition-all",
          isSaudiGreenMode ? "bg-white/[0.01] border-white/5" : "bg-[#0d5c56]/5 border-[#0d5c56]/10"
        )}>
          <div className="w-2 h-2 rounded-full bg-teal-600"></div>
          <div className="space-y-0.5">
            <div className={cn("font-medium", isSaudiGreenMode ? "text-white" : "text-[#0d5c56]")}>Zero Leak</div>
            <div className={isSaudiGreenMode ? "text-white/30" : "text-[#0d5c56]/60"}>Secure clinical transfers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
