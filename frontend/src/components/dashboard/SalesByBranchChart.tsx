import { useMemo, useState } from 'react'
import type { salesByBranch as SalesByBranchType } from '../../data/dashboardData'
import { formatNumber } from '../../utils/formatters'

const WIDTH = 320
const HEIGHT = 220
const PAD_TOP = 16
const PAD_BOTTOM = 28
const BAR_MAX_WIDTH = 22

export function SalesByBranchChart({ data }: { data: typeof SalesByBranchType }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const bars = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value)) * 1.15 || 1
    const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM
    const slot = WIDTH / data.length
    const barWidth = Math.min(BAR_MAX_WIDTH, slot * 0.55)

    return data.map((d, i) => {
      const barHeight = (d.value / max) * innerH
      return {
        ...d,
        x: slot * i + slot / 2 - barWidth / 2,
        y: HEIGHT - PAD_BOTTOM - barHeight,
        height: barHeight,
        width: barWidth,
        centerX: slot * i + slot / 2,
      }
    })
  }, [data])

  const active = activeIndex !== null ? bars[activeIndex] : null

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-56 w-full" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={0}
            x2={WIDTH}
            y1={PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f}
            y2={PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f}
            className="stroke-line"
            strokeWidth={1}
          />
        ))}

        {bars.map((bar, i) => (
          <g
            key={bar.branch}
            onPointerEnter={() => setActiveIndex(i)}
            onPointerLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
            tabIndex={0}
            className="cursor-pointer outline-none"
          >
            <rect x={bar.x} y={0} width={bar.width} height={HEIGHT - PAD_BOTTOM} fill="transparent" />
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={Math.max(bar.height, 2)}
              rx={4}
              fill="var(--c-primary)"
              opacity={activeIndex === null || activeIndex === i ? 1 : 0.45}
              className="transition-opacity duration-150"
            />
            <text x={bar.centerX} y={HEIGHT - 8} textAnchor="middle" className="fill-ink-muted" fontSize={10}>
              {bar.branch.replace('Branch ', '')}
            </text>
          </g>
        ))}
      </svg>

      {active ? (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: `${(active.centerX / WIDTH) * 100}%` }}
        >
          <p className="font-semibold text-ink">Rp {formatNumber(active.value * 1_000_000)}</p>
          <p className="text-ink-muted">{active.branch}</p>
        </div>
      ) : null}
    </div>
  )
}
