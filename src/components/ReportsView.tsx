/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, LineChart, PieChart, Landmark, TrendingUp, 
  ArrowUpDown, Calendar, HelpCircle, ArrowUpRight, ArrowDownRight, Users, Sparkles 
} from 'lucide-react';

export default function ReportsView() {
  const [activeCycle, setActiveCycle] = useState<'Q3-Actuals' | 'Q4-Forecasts'>('Q3-Actuals');
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);
  const [hoveredLineNode, setHoveredLineNode] = useState<number | null>(null);

  // Utilization Stats (SARAH JENKINS, MARCUS CHEN, ELENA RODRIQUEZ, DAVID SMITH, SOPHIA LEE, JOHN DOE)
  const utilizationActuals = [
    { name: 'Sarah', role: 'DevOps Architect', rate: 98, hours: 156 },
    { name: 'Marcus', role: 'Full Stack Lead', rate: 85, hours: 136 },
    { name: 'Elena', role: 'Data Scientist', rate: 92, hours: 147 },
    { name: 'David', role: 'SecOps Eng', rate: 45, hours: 72 },
    { name: 'Sophia', role: 'Mobile Dev', rate: 80, hours: 128 },
    { name: 'John', role: 'Cloud Architect', rate: 90, hours: 144 }
  ];

  const utilizationForecasts = [
    { name: 'Sarah', role: 'DevOps Architect', rate: 100, hours: 160 },
    { name: 'Marcus', role: 'Full Stack Lead', rate: 95, hours: 152 },
    { name: 'Elena', role: 'Data Scientist', rate: 95, hours: 152 },
    { name: 'David', role: 'SecOps Eng', rate: 80, hours: 128 },
    { name: 'Sophia', role: 'Mobile Dev', rate: 90, hours: 144 },
    { name: 'John', role: 'Cloud Architect', rate: 95, hours: 152 }
  ];

  const activeUtilization = activeCycle === 'Q3-Actuals' ? utilizationActuals : utilizationForecasts;

  // Velocity points index coordinates for line chart
  const velocityActuals = [
    { week: 'Wk 1', tickets: 35, qualityCoefficient: '0.98' },
    { week: 'Wk 2', tickets: 42, qualityCoefficient: '0.96' },
    { week: 'Wk 3', tickets: 38, qualityCoefficient: '0.99' },
    { week: 'Wk 4', tickets: 55, qualityCoefficient: '0.95' },
    { week: 'Wk 5', tickets: 62, qualityCoefficient: '0.97' }
  ];

  const velocityForecasts = [
    { week: 'Wk 1', tickets: 45, qualityCoefficient: '0.99' },
    { week: 'Wk 2', tickets: 48, qualityCoefficient: '0.98' },
    { week: 'Wk 3', tickets: 52, qualityCoefficient: '0.99' },
    { week: 'Wk 4', tickets: 60, qualityCoefficient: '0.97' },
    { week: 'Wk 5', tickets: 70, qualityCoefficient: '0.98' }
  ];

  const activeVelocity = activeCycle === 'Q3-Actuals' ? velocityActuals : velocityForecasts;

  // Compute SVG line path points mapped into viewBox coordinates
  // Width: 460, Height: 180
  const getLineCoordinates = () => {
    const marginX = 40;
    const marginY = 30;
    const width = 380;
    const height = 120;
    
    const maxVal = activeCycle === 'Q3-Actuals' ? 70 : 80;
    
    return activeVelocity.map((item, idx) => {
      const x = marginX + (idx / (activeVelocity.length - 1)) * width;
      const progressRatio = item.tickets / maxVal;
      const y = marginY + height - progressRatio * height;
      return { x, y, value: item.tickets, week: item.week, coeff: item.qualityCoefficient };
    });
  };

  const lineCoords = getLineCoordinates();

  // Create path svg string from coordinates
  const pathString = lineCoords.reduce((accum, coord, idx) => {
    return accum + (idx === 0 ? `M ${coord.x} ${coord.y}` : ` L ${coord.x} ${coord.y}`);
  }, '');

  // Grid background vertical lines coordinates
  const gridLinesX = lineCoords.map(c => c.x);

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Header section with toggle inputs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Analytical Engineering Reports</h2>
          <p className="text-sm font-medium text-on-surface-variant">Real-time resource utilization spreads and sprint velocity vectors.</p>
        </div>

        {/* Forecast/Actual Toggle */}
        <div className="flex bg-surface-container border border-outline-variant p-1 rounded-lg shadow-sm font-headline">
          <button
            onClick={() => setActiveCycle('Q3-Actuals')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded cursor-pointer transition-all ${
              activeCycle === 'Q3-Actuals' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-outline hover:text-primary'
            }`}
          >
            Q3 Performance Actuals
          </button>
          
          <button
            onClick={() => setActiveCycle('Q4-Forecasts')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded cursor-pointer transition-all ${
              activeCycle === 'Q4-Forecasts' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-outline hover:text-primary'
            }`}
          >
            Q4 Forecast Models
          </button>
        </div>
      </div>

      {/* Numerical KPI Performance stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* KPI 1 - Average Load */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-outline uppercase font-extrabold tracking-wider">Average Utilization</span>
            <span className="text-xs font-bold text-secondary flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
              <span>+4.2%</span>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-headline text-primary">
              {activeCycle === 'Q3-Actuals' ? '82.0%' : '93.3%'}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium mt-1">Average capacity load across core engineers.</p>
          </div>
        </div>

        {/* KPI 2 - Spraging velocity */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-outline uppercase font-extrabold tracking-wider">Average Sprint Velocity</span>
            <span className="text-xs font-bold text-secondary flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
              <span>+12.4%</span>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-headline text-primary">
              {activeCycle === 'Q3-Actuals' ? '46.4' : '55.0'}{' '}
              <span className="text-xs font-semibold text-on-surface-variant font-sans">tickets / sprint</span>
            </h3>
            <p className="text-xs text-on-surface-variant font-medium mt-1">SApps deployment velocity benchmark threshold.</p>
          </div>
        </div>

        {/* KPI 3 - SApps Deliveries Met */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-outline uppercase font-extrabold tracking-wider">On-Time Deliveries Rate</span>
            <span className="text-xs font-bold text-secondary flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
              <span>Perfect</span>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black font-headline text-secondary">
              96.8%
            </h3>
            <p className="text-xs text-on-surface-variant font-medium mt-1">System milestones completed within SLAs parameters.</p>
          </div>
        </div>

      </div>

      {/* Main Split Grid featuring hand-drawn interactive SVGs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Metric A: Utilization Rate Bar Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-base font-bold text-primary mb-1">Resource Utilization Rates</h3>
            <p className="text-xs text-on-surface-variant font-medium mb-6">Percentage of operational cycles allocated on billable projects.</p>

            {/* Hand Drawn Bar Chart (SVG) */}
            <div className="w-full relative flex items-center justify-center py-2 h-56 select-none bg-surface-container-high/20 rounded border">
              <svg className="w-full h-full p-4" viewBox="0 0 440 180" style={{ overflow: 'visible' }}>
                {/* Horizontal guide grids lines */}
                <line x1="40" y1="20" x2="420" y2="20" stroke="#outline-variant" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="65" x2="420" y2="65" stroke="#outline-variant" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="110" x2="420" y2="110" stroke="#outline-variant" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                <line x1="40" y1="150" x2="420" y2="150" stroke="#c4c6cf" strokeWidth="1" />

                {/* Y-Axis Labels */}
                <text x="30" y="24" textAnchor="end" fontSize="9" fill="#74777f" fontWeight="600" className="font-mono">100%</text>
                <text x="30" y="69" textAnchor="end" fontSize="9" fill="#74777f" fontWeight="600" className="font-mono">60%</text>
                <text x="30" y="114" textAnchor="end" fontSize="9" fill="#74777f" fontWeight="600" className="font-mono">30%</text>
                <text x="30" y="154" textAnchor="end" fontSize="9" fill="#c4c6cf" fontWeight="600" className="font-mono">0%</text>

                {/* Render bars dynamically */}
                {activeUtilization.map((eng, idx) => {
                  const barWidth = 32;
                  const gap = 30;
                  const x = 54 + idx * (barWidth + gap);
                  
                  // Compute proportional height
                  const height = (eng.rate / 100) * 130;
                  const y = 150 - height;
                  const isHovered = hoveredBarIdx === idx;

                  return (
                    <g key={eng.name} className="cursor-pointer">
                      {/* Interactive Trigger block behind */}
                      <rect
                        x={x - 10}
                        y="10"
                        width={barWidth + 20}
                        height="145"
                        fill="transparent"
                        onMouseEnter={() => setHoveredBarIdx(idx)}
                        onMouseLeave={() => setHoveredBarIdx(null)}
                      />

                      {/* Main Bar rectangle */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={height}
                        rx="4"
                        fill={isHovered ? '#1e40af' : idx % 2 === 0 ? '#2563eb' : '#60a5fa'}
                        className="transition-all duration-200"
                      />

                      {/* Bar rating values text */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 8}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill={isHovered ? '#1e40af' : '#0f172a'}
                        className="font-mono transition-opacity"
                        style={{ opacity: isHovered ? 1 : 0.7 }}
                      >
                        {eng.rate}%
                      </text>

                      {/* X-Axis Labels */}
                      <text
                        x={x + barWidth / 2}
                        y="168"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="bold"
                        fill="#0b1c30"
                      >
                        {eng.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Float pop-ups detailing precise numbers */}
              <AnimatePresence>
                {hoveredBarIdx !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-16 bg-slate-900 text-white text-[11px] p-2.5 rounded shadow-lg border border-slate-800 z-10 w-44"
                  >
                    <div className="font-bold text-blue-400">{activeUtilization[hoveredBarIdx].name}</div>
                    <div className="font-semibold text-white/80 mt-0.5">{activeUtilization[hoveredBarIdx].role}</div>
                    <div className="flex justify-between border-t border-slate-800 mt-1.5 pt-1 font-mono text-white/90">
                      <span>Assigned Load:</span>
                      <span className="font-bold text-blue-400">{activeUtilization[hoveredBarIdx].hours} hrs</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-outline-variant bg-surface-container-low/40 p-3 rounded text-left">
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider block">Utilization Assessment Goal</span>
            <p className="text-xs font-semibold text-primary mt-1">Our target of 80% minimum billable utilization across core architects is satisfied.</p>
          </div>
        </div>

        {/* Metric B: Sprints Velocity Splined Line Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-base font-bold text-primary mb-1">Weekly Backlog Sprint Velocity</h3>
            <p className="text-xs text-on-surface-variant font-medium mb-6">Aggregate tickets successfully committed and closed per sprint week.</p>

            {/* Splined Line Chart (SVG) */}
            <div className="w-full relative flex items-center justify-center py-2 h-56 select-none bg-surface-container-high/20 rounded border">
              <svg className="w-full h-full p-4" viewBox="0 0 440 180" style={{ overflow: 'visible' }}>
                {/* Background Grid columns lines */}
                {gridLinesX.map((lineX, idx) => (
                  <line key={idx} x1={lineX} y1="30" x2={lineX} y2="150" stroke="#outline-variant" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                ))}
                
                {/* Horizontal indicators grids */}
                <line x1="40" y1="30" x2="420" y2="30" stroke="#outline-variant" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                <line x1="40" y1="90" x2="420" y2="90" stroke="#outline-variant" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                <line x1="40" y1="150" x2="420" y2="150" stroke="#c4c6cf" strokeWidth="1" />

                {/* Y-Axis scale details */}
                <text x="30" y="34" textAnchor="end" fontSize="9" fill="#74777f" fontWeight="600" className="font-mono">80t</text>
                <text x="30" y="94" textAnchor="end" fontSize="9" fill="#74777f" fontWeight="600" className="font-mono">40t</text>
                <text x="30" y="154" textAnchor="end" fontSize="9" fill="#c4c6cf" fontWeight="600" className="font-mono">0t</text>

                {/* Drawn path connector */}
                <motion.path
                  d={pathString}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Render nodes dynamically */}
                {lineCoords.map((coord, idx) => (
                  <g key={idx}>
                    {/* Hover hotspot radius */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="14"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredLineNode(idx)}
                      onMouseLeave={() => setHoveredLineNode(null)}
                    />

                    {/* Styled dot */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={hoveredLineNode === idx ? "7" : "4.5"}
                      fill={hoveredLineNode === idx ? "#1d4ed8" : "#2563eb"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="transition-all duration-150 pointer-events-none"
                    />

                    {/* Nodes ratings text values overlay */}
                    <text
                      x={coord.x}
                      y={coord.y - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#0a0f1d"
                      className="font-mono transition-opacity"
                      style={{ opacity: hoveredLineNode === idx ? 1 : 0.6 }}
                    >
                      {coord.value}
                    </text>

                    {/* Weekly X-Axis label */}
                    <text
                      x={coord.x}
                      y="168"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="bold"
                      fill="#0b1c30"
                    >
                      {coord.week}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Exact Coordinate tooltips details overlay */}
              <AnimatePresence>
                {hoveredLineNode !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-16 bg-slate-900 text-white text-[11px] p-2.5 rounded shadow-lg border border-slate-800 z-10 w-44"
                  >
                    <div className="font-bold text-blue-400">{lineCoords[hoveredLineNode].week} Performance</div>
                    <div className="flex justify-between mt-1 pt-1 font-mono text-white/90">
                      <span>Closed tickets:</span>
                      <span className="font-bold text-blue-400">{lineCoords[hoveredLineNode].value} units</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 mt-1 pt-1 font-mono text-white/70">
                      <span>Code Quality:</span>
                      <span className="font-bold text-white">{lineCoords[hoveredLineNode].coeff} score</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-outline-variant bg-surface-container-low/40 p-3 rounded text-left">
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider block">Operational Sprint Analytics</span>
            <p className="text-xs font-semibold text-primary mt-1">Sprint velocity represents steady trajectory with exceptional code stability coefficients.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
