import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ShieldAlert, BookOpen, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface InsightData {
  domain: string;
  completed: number;
}

const INSIGHTS_DATA: InsightData[] = [
  { domain: 'Endpoint Security', completed: 4 },
  { domain: 'Data Analytics', completed: 5 },
  { domain: 'Cryptography', completed: 2 },
  { domain: 'Compliance Audits', completed: 3 },
  { domain: 'Network Defense', completed: 6 }
];

export default function ProjectInsights() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 320 });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 280),
          height: 320
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 20, bottom: 50, left: 40 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const x = d3.scaleBand()
      .range([0, width])
      .domain(INSIGHTS_DATA.map(d => d.domain))
      .padding(0.42);

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'font-mono text-[10px] fill-white/40')
      .style('text-anchor', 'middle')
      .attr('dy', '15px');

    svg.select('.domain').attr('stroke', 'rgba(255,255,255,0.06)');
    svg.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.06)');

    // Y Scale (up to max completed + 1 for perfect headroom)
    const yValMax = d3.max(INSIGHTS_DATA, d => d.completed) || 6;
    const y = d3.scaleLinear()
      .domain([0, yValMax + 1])
      .range([height, 0]);

    // Y Axis (ticks step of 1)
    svg.append('g')
      .call(d3.axisLeft(y).ticks(yValMax + 1).tickFormat(d3.format('d')))
      .selectAll('text')
      .attr('class', 'font-mono text-[10px] fill-white/40');

    svg.select('.domain').attr('stroke', 'rgba(255,255,255,0.06)');
    svg.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.06)');

    // Horizontal Guidelines
    svg.append('g')
      .attr('class', 'grid-lines')
      .style('stroke', 'rgba(255,255,255,0.04)')
      .style('stroke-dasharray', '2,2')
      .call(d3.axisLeft(y)
        .ticks(yValMax + 1)
        .tickSize(-width)
        .tickFormat(() => '')
      )
      .select('.domain').remove();

    // Definitions for Glowing linear gradients
    const defs = svg.append('defs');
    
    const gradient = defs.append('linearGradient')
      .attr('id', 'd3-teal-glow')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#004730');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#00d285');

    // Grid Column groups for bars
    const bars = svg.selectAll('.bar-group')
      .data(INSIGHTS_DATA)
      .enter()
      .append('g')
      .attr('class', 'bar-group');

    // Adding backing rectangles to create hover background highlight slots
    bars.append('rect')
      .attr('x', d => (x(d.domain) || 0) - 6)
      .attr('width', x.bandwidth() + 12)
      .attr('y', 0)
      .attr('height', height)
      .attr('fill', 'rgba(255, 255, 255, 0.01)')
      .attr('rx', 8)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'rgba(0, 163, 108, 0.03)');
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('fill', 'rgba(255, 255, 255, 0.01)');
      });

    // Render Neon Colored Bars with animation
    bars.append('rect')
      .attr('x', d => x(d.domain) || 0)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', 'url(#d3-teal-glow)')
      .style('cursor', 'pointer')
      .style('transition', 'fill 0.3s ease')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('fill', '#00ffc4')
          .style('filter', 'drop-shadow(0px 0px 8px rgba(0,255,196,0.5))');
          
        // Display animated details on hover
        svg.append('text')
          .attr('id', `tooltip-val-${d.domain.replace(/\s+/g, '')}`)
          .attr('x', (x(d.domain) || 0) + x.bandwidth() / 2)
          .attr('y', y(d.completed) - 14)
          .attr('text-anchor', 'middle')
          .attr('class', 'font-mono text-[10px] font-bold fill-[#00ffc4]')
          .text(`${d.completed} Works`);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('fill', 'url(#d3-teal-glow)')
          .style('filter', 'none');
          
        svg.select(`#tooltip-val-${d.domain.replace(/\s+/g, '')}`).remove();
      })
      .transition()
      .duration(850)
      .delay((d, i) => i * 80)
      .attr('y', d => y(d.completed))
      .attr('height', d => height - y(d.completed));

    // Value Labels on standard charts
    bars.append('text')
      .attr('class', 'font-mono text-[11px] fill-white/80 pointer-events-none text-center font-semibold')
      .attr('x', d => (x(d.domain) || 0) + x.bandwidth() / 2)
      .attr('y', height)
      .attr('text-anchor', 'middle')
      .transition()
      .duration(850)
      .delay((d, i) => i * 80)
      .attr('y', d => y(d.completed) - 8)
      .text(d => d.completed);

  }, [dimensions]);

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      {/* Background radial soft light blur */}
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-teal-500/5 blur-3xl rounded-full select-none pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00a36c] uppercase font-bold">Secure Telemetry Analytics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
          </div>
          <h3 className="text-xl font-serif text-white tracking-tight">Project Insights</h3>
          <p className="text-xs text-white/40 leading-relaxed font-light">
            Real-time D3 visualization displaying verified production security architecture assets across telemetry fields.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-2xl font-mono text-xs text-white/50 w-fit shrink-0">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span>Total completed: 20 domains config</span>
        </div>
      </div>

      <div ref={containerRef} className="w-full relative bg-black/40 rounded-2xl border border-white/5 py-3 overflow-x-auto no-scrollbar">
        <svg ref={svgRef} className="mx-auto block"></svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
          <div className="space-y-0.5">
            <div className="text-white font-medium">95.4% Success</div>
            <div className="text-[10px] text-white/30">Incident drill closures</div>
          </div>
        </div>
        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00a36c]"></div>
          <div className="space-y-0.5">
            <div className="text-white font-medium">NCA Level-3</div>
            <div className="text-[10px] text-white/30">Compliance standard model</div>
          </div>
        </div>
        <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-600"></div>
          <div className="space-y-0.5">
            <div className="text-white font-medium">Zero Leak</div>
            <div className="text-[10px] text-white/30">Secure clinical transfers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
