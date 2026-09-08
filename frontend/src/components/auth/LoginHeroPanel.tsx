import backgroundImage from '../../assets/images/login-pos-background.png'
import { IconBox, IconReports, IconShoppingCart, IconStorefront } from '../ui/icons'

const FEATURES = [
  { icon: IconShoppingCart, title: 'Faster Transactions', description: 'Serve customers quickly and easily.' },
  { icon: IconBox, title: 'Inventory Control', description: 'Keep track of your stock in real-time.' },
  { icon: IconReports, title: 'Insightful Reports', description: 'Make better decisions with accurate data.' },
] as const

// Staggered entrance timing, top to bottom — see
// public/assets/css/login-animations.css (loaded via index.html) for
// what `auth-fade-up` itself does.
const DELAY = {
  topBar: '0ms',
  heading: '90ms',
  subtitle: '170ms',
  feature: (index: number) => `${250 + index * 80}ms`,
  quote: `${250 + FEATURES.length * 80 + 80}ms`,
  trustCard: `${250 + FEATURES.length * 80 + 160}ms`,
}

/**
 * The Login screen's left visual panel — a real photo (see
 * src/assets/images/login-pos-background.png) with a dark teal overlay
 * for text legibility, not a CSS-generated substitute. Hidden below the
 * `md` breakpoint per the Login layout spec (mobile shows the form only).
 *
 * `h-full overflow-y-auto`: this panel is a flex sibling of the form
 * column inside LoginPage's `h-dvh` row, so it's pinned to viewport
 * height — if its own content is ever taller than that (a very short
 * window), it scrolls internally instead of growing the whole page.
 */
export function LoginHeroPanel() {
  return (
    <div
      className="relative hidden h-full shrink-0 overflow-y-auto md:flex md:w-[40%] lg:w-[45%]"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 41, 45, 0.88), rgba(20, 41, 45, 0.88)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex min-h-full w-full flex-col justify-between gap-8 p-6 lg:p-10">
        <div className="auth-fade-up flex items-center justify-between gap-4" style={{ animationDelay: DELAY.topBar }}>
          <div className="flex items-baseline gap-2 text-white">
            <span className="text-xl font-bold tracking-tight">POS</span>
            <span className="hidden text-sm text-white/70 lg:inline">| Point of Sale System</span>
          </div>
          <div className="hidden items-center gap-2 text-sm text-white/80 lg:flex">
            <span>Simple</span>
            <span className="text-white/40">•</span>
            <span>Fast</span>
            <span className="text-white/40">•</span>
            <span>Reliable</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1
              className="auth-fade-up text-3xl font-bold leading-[1.15] text-white lg:text-4xl xl:text-[2.75rem]"
              style={{ animationDelay: DELAY.heading }}
            >
              Manage Your
              <br />
              Business, <span className="text-teal-300">Better</span>
            </h1>
            <p className="auth-fade-up mt-4 max-w-md text-base text-white/80" style={{ animationDelay: DELAY.subtitle }}>
              All-in-one POS solution to help you manage sales, inventory, and grow your business.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="auth-fade-up flex items-start gap-3.5"
                style={{ animationDelay: DELAY.feature(index) }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <feature.icon size={19} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p
            className="auth-fade-up border-l-2 border-teal-300 pl-3 text-sm italic leading-snug text-white/80"
            style={{ animationDelay: DELAY.quote }}
          >
            "Good tools make
            <br />
            great businesses."
          </p>

          <div className="auth-fade-up flex items-center gap-3 rounded-xl bg-white/10 p-3.5" style={{ animationDelay: DELAY.trustCard }}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
              <IconStorefront size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Trusted by growing businesses</p>
              <p className="text-xs text-white/70">From small shops to multi-branch stores.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
