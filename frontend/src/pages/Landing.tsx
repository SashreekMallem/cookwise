import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, UsersIcon, SparklesIcon, CheckBadgeIcon, ExclamationTriangleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const stats = [
  { label: '“Pinch”', value: '2–40 ml' },
  { label: '“Dollop”', value: '21–66 g' },
  { label: '“How much is a pinch?” searches', value: '+48%' },
  { label: 'Session time (with social)', value: '+45%' },
  { label: 'Churn rate (with social)', value: '−20%' },
];

const swaps = [
  { from: 'Egg', to: 'Aquafaba (¼ cup)', source: 'kingarthurbaking.com' },
  { from: 'Egg', to: 'Applesauce (¼ cup)', source: 'slowlivingkitchen.com' },
  { from: 'Egg', to: 'Flax/chia egg (1 tbsp + 3 tbsp water)', source: 'southernliving.com' },
  { from: 'Butter/Oil', to: 'Greek yogurt (1 cup, +17g protein)', source: 'bodi.com' },
  { from: 'Milk', to: 'Almond, soy, oat (1:1)', source: 'justataste.com' },
];

const heroGradient = 'bg-gradient-to-br from-primary-50 via-accent-50 to-white';

const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <section className={`max-w-5xl mx-auto px-4 sm:px-8 py-16 ${className}`}>{children}</section>
);

const Landing = () => (
  <div className="overflow-x-hidden">
    {/* Hero */}
    <div className={`relative min-h-[80vh] flex flex-col items-center justify-center text-center ${heroGradient} pb-12`}>
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Cook with Confidence.<br />Every Time.
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-neutral-700 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        No more vague instructions, failed swaps, or guesswork. Cookwise brings clarity, precision, and real community wisdom to every recipe.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Link to="/recipes" className="btn-island !text-lg !px-8 !py-4 shadow-xl">
          Explore Recipes <ArrowRightIcon className="w-5 h-5 ml-2"/>
        </Link>
      </motion.div>
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-30" />
    </div>

    {/* The Problem */}
    <Section>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="w-8 h-8 text-accent-500" /> Why do so many home cooks get frustrated?
          </h2>
          <ul className="text-lg text-neutral-700 space-y-3 mb-6">
            <li>“A <b>pinch</b>” can mean <b>2–40 ml</b>. “A <b>dollop</b>” can be <b>21–66 g</b>.</li>
            <li>48% more people are searching <b>“how much is a pinch?”</b> than last year.</li>
            <li>Ambiguous steps like <b>“low heat”</b> or <b>“flip every few minutes”</b> cause panic and ruined meals.</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            {stats.map(s => (
              <div key={s.label} className="badge badge-accent text-base px-4 py-2">
                <span className="font-semibold">{s.label}:</span> {s.value}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="card bg-white/90 p-6 rounded-2xl shadow-xl w-full max-w-md border border-accent-100">
            <div className="text-left text-neutral-700 text-lg mb-2">
              <span className="font-bold">Bad Recipe Example:</span>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4 text-left text-neutral-500 text-base leading-relaxed">
              <span className="bg-accent-100 text-accent-700 px-2 py-0.5 rounded">Add a dollop of butter</span> and a <span className="bg-accent-100 text-accent-700 px-2 py-0.5 rounded">pinch of salt</span>.<br/>
              Cook on <span className="bg-accent-100 text-accent-700 px-2 py-0.5 rounded">low heat</span> until done.
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* The Solution */}
    <Section>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center">
          <div className="card bg-white/90 p-6 rounded-2xl shadow-xl w-full max-w-md border border-primary-100">
            <div className="text-left text-neutral-700 text-lg mb-2">
              <span className="font-bold">Cookwise Recipe Example:</span>
            </div>
            <div className="bg-primary-50 rounded-lg p-4 text-left text-primary-700 text-base leading-relaxed">
              <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded">Add 30g unsalted butter</span> and <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded">2g fine sea salt</span>.<br/>
              Cook at <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded">medium-low (120°C)</span> for 4 minutes.
            </div>
            <div className="flex items-center gap-2 mt-4">
              <CheckBadgeIcon className="w-6 h-6 text-primary-500" />
              <span className="text-primary-700 font-medium">Clarity Score: 98%</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <SparklesIcon className="w-8 h-8 text-primary-500" /> Cookwise: Clarity, Precision, Results
          </h2>
          <ul className="text-lg text-neutral-700 space-y-3 mb-6">
            <li>Every step is structured. Every ingredient is measured. Every swap is tested and tracked.</li>
            <li>No more panic—just results you can trust.</li>
            <li>Recipes evolve and improve with real community feedback.</li>
          </ul>
        </div>
      </div>
    </Section>

    {/* Real-World Swaps & AI Insights */}
    <Section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl shadow-glass-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <ArrowTrendingUpIcon className="w-8 h-8 text-accent-500" />
          Real-World Swaps, Backed by Data
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Cookwise tracks what works—so you don't have to risk a flop. Our AI models reach over 50% precision in predicting successful swaps, and every substitution is validated by real cooks.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/80 rounded-xl p-6 shadow-glass">
          <h3 className="font-semibold text-primary-700 mb-4">Popular & Effective Swaps</h3>
          <ul className="space-y-3 text-neutral-700">
            {swaps.map(s => (
              <li key={s.from + s.to} className="flex items-center gap-2">
                <span className="font-bold text-primary-600">{s.from}</span>
                <span className="mx-2">→</span>
                <span className="font-semibold text-accent-600">{s.to}</span>
                <span className="text-xs text-neutral-400 ml-2">({s.source})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow-glass flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-accent-500" />
            <span className="font-medium text-neutral-700">AI-powered swap suggestions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckBadgeIcon className="w-6 h-6 text-primary-500" />
            <span className="font-medium text-neutral-700">Swaps validated by real cooks</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-primary-400" />
            <span className="font-medium text-neutral-700">Community-driven improvements</span>
          </div>
        </div>
      </div>
    </Section>

    {/* Community & Engagement */}
    <Section>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <UsersIcon className="w-8 h-8 text-primary-500" />
            A Living, Growing Community
          </h2>
          <ul className="text-lg text-neutral-700 space-y-3 mb-6">
            <li>Recipes get better with every review, every swap, every success.</li>
            <li>Social features boost engagement: <b>+45% session time</b>, <b>−20% churn</b>.</li>
            <li>Clarity and structure mean fewer negative reviews and more cooking wins.</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="card bg-white/90 p-6 rounded-2xl shadow-xl w-full max-w-md border border-primary-100">
            <div className="text-left text-neutral-700 text-lg mb-2">
              <span className="font-bold">What Users Say:</span>
            </div>
            <div className="bg-primary-50 rounded-lg p-4 text-left text-primary-700 text-base leading-relaxed">
              "I finally know what a 'pinch' means. My bread actually turned out right!"<br/>
              "Swapping eggs for aquafaba worked perfectly—thanks to Cookwise!"<br/>
              "The confidence score made me trust the recipe. It worked!"
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* Call to Action */}
    <Section className="text-center pb-32">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Ready to cook smarter?
      </motion.h2>
      <p className="text-xl text-neutral-700 mb-8">Join Cookwise and experience clarity, confidence, and community in every recipe.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/recipes" className="btn-island !text-lg !px-8 !py-4 shadow-xl">
          Explore Recipes <ArrowRightIcon className="w-5 h-5 ml-2"/>
        </Link>
        <Link to="/create" className="btn-island bg-accent-500/90 hover:bg-accent-600/90 !text-lg !px-8 !py-4 shadow-xl">
          Share Your Recipe <SparklesIcon className="w-5 h-5 ml-2"/>
        </Link>
      </div>
    </Section>
  </div>
);

export default Landing; 