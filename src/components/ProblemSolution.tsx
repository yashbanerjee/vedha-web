import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useInView } from '@/hooks/useInView';

const allProblems = [
  'Teams spend too much time on repetitive tasks.',
  'Leads slip away without consistent follow-up.',
  'Outdated workflows hurt customer experience.',
  'Scaling requires more people and higher costs.',
  'Manual data entry creates errors and slows progress.',
  'Inefficient communication leads to missed deadlines.',
  'Customer support queues are overwhelming the team.',
  'Marketing campaigns lack personalization and impact.',
  'Sales processes are inconsistent across teams.',
  'Inventory management is prone to human error.',
  'Client onboarding takes too long and loses interest.',
  'Reporting requires hours of manual work each week.',
  'Team collaboration tools are fragmented and confusing.',
  'Payment processing delays impact cash flow.',
  'Content creation is time-consuming and repetitive.',
  'Social media management lacks strategy and consistency.',
  'Email marketing campaigns have low engagement rates.',
  'Website performance issues drive away potential customers.',
  'SEO strategies are outdated and ineffective.',
  'Conversion rates are below industry standards.',
  'Customer feedback is collected but not acted upon.',
  'Project management lacks visibility and accountability.',
  'Budget tracking is manual and error-prone.',
  'Vendor relationships are difficult to manage at scale.',
  'Employee onboarding processes are inefficient.',
  'Document management systems are disorganized.',
  'Meeting schedules conflict and waste time.',
  'Client retention rates are declining.',
  'Lead qualification processes are inconsistent.',
  'Brand messaging lacks clarity across channels.',
  'Competitor analysis is done manually and infrequently.',
  'Customer service response times are too slow.',
  'Product launches lack coordination and impact.',
  'Data analytics are not integrated or actionable.',
  'Team productivity is hindered by outdated tools.',
  'Marketing ROI is difficult to measure accurately.',
  'Sales forecasts are inaccurate and unreliable.',
  'Customer journey mapping is incomplete.',
  'A/B testing strategies are not systematically implemented.',
  'Compliance requirements are not consistently met.',
  'Innovation is stifled by operational inefficiencies.',
];

// Split problems into 4 groups for 4 rows
const problemsRow1 = allProblems.slice(0, 10);
const problemsRow2 = allProblems.slice(10, 20);
const problemsRow3 = allProblems.slice(20, 30);
const problemsRow4 = allProblems.slice(30, 40);

interface HoverableProblemProps {
  problem: string;
  uniqueId: string;
  onHover: (id: string | null) => void;
  hoveredId: string | null;
}

const HoverableProblem = ({ problem, uniqueId, onHover, hoveredId }: HoverableProblemProps) => {
  const isHovered = hoveredId === uniqueId;
  const shouldBlur = hoveredId !== null && !isHovered;

  return (
    <motion.a
      href="#contact"
      onMouseEnter={() => onHover(uniqueId)}
      onMouseLeave={() => onHover(null)}
      className={`
        text-sm md:text-base lg:text-lg font-medium whitespace-nowrap cursor-pointer
        transition-all duration-500 ease-in-out
        ${isHovered ? 'text-primary' : 'text-muted-foreground/55'}
        ${shouldBlur ? 'blur-sm opacity-50' : 'blur-0 opacity-100'}
      `}
    >
      {problem}
    </motion.a>
  );
};

interface ScrollingRowProps {
  problems: string[];
  direction: 'forward' | 'reverse';
  rowId: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

const ScrollingRow = ({ problems, direction, rowId, hoveredId, onHover }: ScrollingRowProps) => {
  const animationClass = direction === 'forward' ? 'animate-marquee' : 'animate-marquee-reverse';
  const isPaused = hoveredId !== null;

  return (
    <div className="relative overflow-hidden">
      <div
        className={`
          flex whitespace-nowrap
          ${animationClass}
          ${isPaused ? '[animation-play-state:paused]' : ''}
        `}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {[...Array(5)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center gap-4 md:gap-6 lg:gap-8 px-6 shrink-0">
            {problems.map((problem, index) => {
              const uniqueId = `${rowId}-${setIndex}-${index}`;
              return (
                <HoverableProblem
                  key={uniqueId}
                  problem={problem}
                  uniqueId={uniqueId}
                  onHover={onHover}
                  hoveredId={hoveredId}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProblemSolution = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={ref} id="problem-solution" className="py-32 md:py-40 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {/* Scrolling Problem Text - Row 1 */}
      <div className="mb-20 md:mb-28 overflow-hidden">
        <ScrollingRow
          problems={problemsRow1}
          direction="forward"
          rowId="row1"
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </div>

      {/* Scrolling Problem Text - Row 2 */}
      <div className="mb-20 md:mb-28 overflow-hidden">
        <ScrollingRow
          problems={problemsRow2}
          direction="reverse"
          rowId="row2"
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </div>

      {/* Solution Section - Centered Heading */}
      <div className="container mx-auto px-6 mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="section-title mb-0">
            Eliminate the bottlenecks
            <br />
            <span className="gradient-text">that hold you back</span>
          </h2>
        </motion.div>
      </div>

      {/* Scrolling Problem Text - Row 3 */}
      <div className="mb-20 md:mb-28 overflow-hidden">
        <ScrollingRow
          problems={problemsRow3}
          direction="forward"
          rowId="row3"
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </div>

      {/* Scrolling Problem Text - Row 4 */}
      <div className="overflow-hidden">
        <ScrollingRow
          problems={problemsRow4}
          direction="reverse"
          rowId="row4"
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </div>
      </motion.div>
    </section>
  );
};

export default ProblemSolution;
