import { Button } from '../../ui/Button'
import { IconMapPin } from '../../ui/icons'

/**
 * Static map placeholder — a real map (tiles, geocoding) needs a mapping
 * provider this app doesn't integrate with yet, so this renders a plain
 * placeholder with a centered pin instead of pretending to be one.
 */
export function LocationPanel() {
  // TODO: wire up to a real map/geocoding provider once one is integrated.
  function handleSetLocation() {}

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-canvas p-5">
      <div className="flex items-center gap-2.5">
        <IconMapPin size={18} className="text-ink" />
        <h3 className="text-base font-semibold text-ink">Location (Optional)</h3>
      </div>
      <p className="text-sm text-ink-muted">Set the branch location on map.</p>

      <div
        className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-line"
        style={{
          backgroundColor: 'var(--color-surface)',
          backgroundImage:
            'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <IconMapPin size={34} className="text-ink-muted" />
      </div>

      <Button variant="secondary" icon={<IconMapPin size={15} />} onClick={handleSetLocation} fullWidthOnMobile>
        Set Location on Map
      </Button>
    </div>
  )
}
