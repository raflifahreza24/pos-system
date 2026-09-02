import { PageHeader } from '../components/ui/PageHeader'
import { IconSettings } from '../components/ui/icons'

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title={title} subtitle="This page hasn't been built yet." />
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-surface py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <IconSettings size={22} />
        </span>
        <p className="max-w-sm text-sm text-ink-muted">
          The {title} page is next in line — it will follow the same layout system as Dashboard and Point of
          Sale once it's built.
        </p>
      </div>
    </div>
  )
}
