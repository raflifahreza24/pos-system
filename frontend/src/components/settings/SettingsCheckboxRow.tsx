interface SettingsCheckboxRowProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SettingsCheckboxRow({ label, description, checked, onChange }: SettingsCheckboxRowProps) {
  return (
    <label className="flex items-start gap-2.5 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <span>
        <span className="font-medium">{label}</span>
        {description ? <span className="block text-xs text-ink-muted">{description}</span> : null}
      </span>
    </label>
  )
}
