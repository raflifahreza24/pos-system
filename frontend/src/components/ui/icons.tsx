import type { SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number
}

function Svg({ size = 20, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

export function IconDashboard(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.75" />
      <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.75" />
      <rect x="13" y="10.5" width="7.5" height="10" rx="1.75" />
      <rect x="3.5" y="13.5" width="7.5" height="7" rx="1.75" />
    </Svg>
  )
}

export function IconPos(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 8h17l-1.4 9.2a2 2 0 0 1-2 1.8H6.9a2 2 0 0 1-2-1.8L3.5 8Z" />
      <path d="M7.5 8V6.5a4.5 4.5 0 0 1 9 0V8" />
      <path d="M8.5 12h7" />
    </Svg>
  )
}

export function IconTransactions(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3.5h9l3 3v14h-12z" />
      <path d="M9 8.5h6M9 12h6M9 15.5h4" />
    </Svg>
  )
}

export function IconCustomers(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.8 14.3c2.4.3 4.2 2.2 4.2 5.2" />
    </Svg>
  )
}

export function IconProducts(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M4 8l8 4.5L20 8M12 12.5V21" />
    </Svg>
  )
}

export function IconInventory(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4" width="17" height="4.5" rx="1.4" />
      <path d="M4.5 8.5v9a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9" />
      <path d="M10 13h4" />
    </Svg>
  )
}

export function IconPurchasing(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6" y="3.5" width="12" height="17" rx="1.75" />
      <path d="M9 3.5h6v2.4H9z" />
      <path d="M9 11.5h6M9 15h6" />
    </Svg>
  )
}

export function IconEmployees(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.3" />
      <path d="M5 20c0-3.6 3-6.2 7-6.2s7 2.6 7 6.2" />
      <path d="m9.7 17.6 1.6 1.6 2.8-2.8" />
    </Svg>
  )
}

export function IconReports(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V10M9.5 20V6M15 20v-7M20 20V4" />
      <path d="M2.5 20h19" />
    </Svg>
  )
}

export function IconSettings(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M17.7 6.3l-1.55 1.55M7.85 16.15 6.3 17.7M17.7 17.7l-1.55-1.55M7.85 7.85 6.3 6.3" />
    </Svg>
  )
}

export function IconSearch(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m20 20-4.4-4.4" />
    </Svg>
  )
}

export function IconBell(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </Svg>
  )
}

export function IconSun(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.55 1.55M6.85 17.15 5.3 18.7M18.7 18.7l-1.55-1.55M6.85 6.85 5.3 5.3" />
    </Svg>
  )
}

export function IconMoon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
    </Svg>
  )
}

export function IconMenu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </Svg>
  )
}

export function IconClose(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </Svg>
  )
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 5 8 12l6.5 7" />
    </Svg>
  )
}

export function IconChevronRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 5 16 12l-6.5 7" />
    </Svg>
  )
}

export function IconChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 8.5 12 15l7-6.5" />
    </Svg>
  )
}

export function IconUser(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M5 20c0-3.7 3.1-6.4 7-6.4s7 2.7 7 6.4" />
    </Svg>
  )
}

export function IconLogOut(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3.5" />
      <path d="M14.5 15.5 19 12l-4.5-3.5M19 12H9.5" />
    </Svg>
  )
}

export function IconArrowUp(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  )
}

export function IconArrowDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M18 13l-6 6-6-6" />
    </Svg>
  )
}

export function IconMore(props: IconProps) {
  return (
    <Svg {...props} strokeWidth={2.4}>
      <path d="M5 12h.01M12 12h.01M19 12h.01" />
    </Svg>
  )
}

export function IconAlertTriangle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4 21 19.5H3L12 4Z" />
      <path d="M12 10v4.2" />
      <path d="M12 17.3h.01" />
    </Svg>
  )
}

export function IconWallet(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h11a2 2 0 0 1 2 2V8" />
      <rect x="3.5" y="8" width="17" height="12" rx="2" />
      <path d="M15.5 14h2.2" />
    </Svg>
  )
}

export function IconEye(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  )
}

export function IconImage(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5 17 4.5-4.5a2 2 0 0 1 2.8 0L15 15.2M14 14l1.3-1.3a2 2 0 0 1 2.8 0L20.5 15" />
    </Svg>
  )
}

export function IconMinus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  )
}

export function IconTrash(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 7h15M9.5 7V5.2a1.2 1.2 0 0 1 1.2-1.2h2.6a1.2 1.2 0 0 1 1.2 1.2V7" />
      <path d="M6.5 7 7.3 19a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.5 7" />
      <path d="M10.3 11v6M13.7 11v6" />
    </Svg>
  )
}

export function IconFilter(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z" />
    </Svg>
  )
}

export function IconDownload(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v11.5M7.5 11l4.5 4.5L16.5 11" />
      <path d="M4.5 17.5v1.8a1.7 1.7 0 0 0 1.7 1.7h11.6a1.7 1.7 0 0 0 1.7-1.7v-1.8" />
    </Svg>
  )
}

export function IconEdit(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.5 5.5 18 10l-8.5 8.5H5v-4.5L13.5 5.5Z" />
      <path d="m11.7 7.3 4.5 4.5" />
    </Svg>
  )
}

export function IconReturn(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12a7.5 7.5 0 1 1 2.5 5.6" />
      <path d="M4.5 17.5v-4h4" />
    </Svg>
  )
}
