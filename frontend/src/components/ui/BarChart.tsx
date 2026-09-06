import { useMemo, useState } from 'react'

export interface BarChartDatum {
  label: string
  value: number
}

interface BarChartProps {
  data: BarChartDatum[]
  formatValue?: (value: number) => string
  height?: number
}

const WIDTH = 640
const PAD_TOP = 16
const PAD_BOTTOM = 28
const BAR_MAX_WIDTH = 32

function shortLabel(label: string): string {
  return label.length > 12 ? `${label.slice(0, 11)}…` : label
}

/**
 * Generic single-series bar chart — the same crosshair-per-bar hover
 * pattern as the Dashboard's `SalesByBranchChart`, generalized so any page
 * can plot `{ label, value }[]` without a bespoke SVG component.
 */
export function BarChart({ data, formatValue = (value) => String(value), height = 220 }: BarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const bars = useMemo(() => {
    const max = Math.max(...data.map((datum) => datum.value), 0) * 1.15 || 1
    const innerHeight = height - PAD_TOP - PAD_BOTTOM
    const slot = WIDTH / Math.max(data.length, 1)
    const barWidth = Math.min(BAR_MAX_WIDTH, slot * 0.5)

    return data.map((datum, index) => {
      const barHeight = (datum.value / max) * innerHeight
      return {
        ...datum,
        x: slot * index + slot / 2 - barWidth / 2,
        y: height - PAD_BOTTOM - barHeight,
        height: barHeight,
        width: barWidth,
        centerX: slot * index + slot / 2,
      }
    })
  }, [data, height])

  if (data.length === 0) {
    return (
      <div className="flex min-h-[160px] items-center justify-center text-sm text-ink-muted" style={{ height }}>
        No data to display.
      </div>
    )
  }

  const active = activeIndex !== null ? bars[activeIndex] : null

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <line
            key={fraction}
            x1={0}
            x2={WIDTH}
            y1={PAD_TOP + (height - PAD_TOP - PAD_BOTTOM) * fraction}
            y2={PAD_TOP + (height - PAD_TOP - PAD_BOTTOM) * fraction}
            className="stroke-line"
            strokeWidth={1}
          />
        ))}

        {bars.map((bar, index) => (
          <g
            key={bar.label}
            onPointerEnter={() => setActiveIndex(index)}
            onPointerLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            tabIndex={0}
            className="cursor-pointer outline-none"
          >
            <rect x={bar.x} y={0} width={bar.width} height={height - PAD_BOTTOM} fill="transparent" />
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={Math.max(bar.height, 2)}
              rx={4}
              fill="var(--c-primary)"
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.45}
              className="transition-opacity duration-150"
            />
            <text x={bar.centerX} y={height - 8} textAnchor="middle" className="fill-ink-muted" fontSize={11}>
              {shortLabel(bar.label)}
            </text>
          </g>
        ))}
      </svg>

      {active ? (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: `${(active.centerX / WIDTH) * 100}%` }}
        >
          <p className="font-semibold text-ink">{formatValue(active.value)}</p>
          <p className="text-ink-muted">{active.label}</p>
        </div>
      ) : null}
    </div>
  )
}
