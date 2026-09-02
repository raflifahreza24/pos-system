import { useMemo, useRef, useState } from 'react'
import { periodFilterLabels, type PeriodFilter } from '../../data/dashboardData'
import { cn, formatNumber } from '../../utils/formatters'

const PERIODS: PeriodFilter[] = ['7d', '30d', '3m', '1y']
const WIDTH = 640
const HEIGHT = 220
const PAD_X = 8
const PAD_TOP = 16
const PAD_BOTTOM = 28

interface SalesOverviewChartProps {
  period: PeriodFilter
  onPeriodChange: (period: PeriodFilter) => void
  data: { label: string; value: number }[]
}

export function SalesOverviewChart({ period, onPeriodChange, data }: SalesOverviewChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { linePath, areaPath, points, maxValue } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value)) * 1.15 || 1
    const innerW = WIDTH - PAD_X * 2
    const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM
    const step = data.length > 1 ? innerW / (data.length - 1) : 0

    const pts = data.map((d, i) => ({
      x: PAD_X + step * i,
      y: PAD_TOP + innerH - (d.value / max) * innerH,
      ...d,
    }))

    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
    const area = `${line} L ${pts[pts.length - 1]?.x ?? 0} ${HEIGHT - PAD_BOTTOM} L ${pts[0]?.x ?? 0} ${HEIGHT - PAD_BOTTOM} Z`

    return { linePath: line, areaPath: area, points: pts, maxValue: max }
  }, [data])

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()
    const relX = ((event.clientX - rect.left) / rect.width) * WIDTH
    let nearest = 0
    let nearestDist = Infinity
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX)
      if (dist < nearestDist) {
        nearestDist = dist
        nearest = i
      }
    })
    setActiveIndex(nearest)
  }

  const active = activeIndex !== null ? points[activeIndex] : null

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-canvas p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPeriodChange(p)}
              className={cn(
                'rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-150',
                period === p ? 'bg-surface text-primary shadow-xs' : 'text-ink-muted hover:text-ink',
              )}
            >
              {periodFilterLabels[p]}
            </button>
          ))}
        </div>
      </div>

      <div ref={wrapRef} className="relative mt-4">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-56 w-full touch-none"
          preserveAspectRatio="none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setActiveIndex(null)}
        >
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1={PAD_X}
              x2={WIDTH - PAD_X}
              y1={PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f}
              y2={PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f}
              className="stroke-line"
              strokeWidth={1}
            />
          ))}

          <defs>
            <linearGradient id="salesArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--c-primary)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--c-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#salesArea)" stroke="none" />
          <path d={linePath} fill="none" stroke="var(--c-primary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

          {active ? (
            <line
              x1={active.x}
              x2={active.x}
              y1={PAD_TOP}
              y2={HEIGHT - PAD_BOTTOM}
              className="stroke-line"
              strokeWidth={1}
            />
          ) : null}

          {points.map((p, i) => {
            const isEnd = i === points.length - 1
            const isActive = activeIndex === i
            if (!isEnd && !isActive) return null
            return (
              <circle
                key={p.label + i}
                cx={p.x}
                cy={p.y}
                r={isActive ? 5 : 4}
                fill="var(--c-primary)"
                stroke="var(--c-surface)"
                strokeWidth={2}
              />
            )
          })}

          {points.map((p, i) => (
            <text
              key={p.label}
              x={p.x}
              y={HEIGHT - 8}
              textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
              className="fill-ink-muted"
              fontSize={11}
            >
              {p.label}
            </text>
          ))}
        </svg>

        {active ? (
          <div
            className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-md"
            style={{ left: `${(active.x / WIDTH) * 100}%` }}
          >
            <p className="font-semibold text-ink">Rp {formatNumber(Math.round(active.value * 1_000_000))}</p>
            <p className="text-ink-muted">{active.label}</p>
          </div>
        ) : null}
      </div>
      <p className="sr-only">Maximum value on chart scale: {maxValue.toFixed(1)}</p>
    </div>
  )
}
