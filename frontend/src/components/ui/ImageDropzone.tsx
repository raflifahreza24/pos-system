import { useEffect, useRef, useState, type DragEvent, type MouseEvent, type ReactNode } from 'react'
import { IconImage, IconClose } from './icons'
import { cn } from '../../utils/formatters'

const MAX_FILE_SIZE = 2 * 1024 * 1024

interface ImageDropzoneProps {
  value: File | null
  onChange: (file: File | null) => void
  previewAlt?: string
  /** Idle-state icon. Defaults to the generic image glyph; pass a
   * differently-shaped one (e.g. a circled user icon) for fields like a
   * profile photo. */
  icon?: ReactNode
  /** The noun in "Click to upload {label}" — e.g. "image", "photo", "logo". */
  label?: string
  /** File-type/size hint shown at the bottom. */
  hint?: string
  /** Shows the "or drag and drop" middle line. Off by default for the
   * smaller `compact` fields, where the box is too short for three lines. */
  showDragHint?: boolean
  /** Smaller box for a secondary field (a profile photo, a logo) instead
   * of the full-size "Product Image" style box. */
  compact?: boolean
  /** Renders the preview thumbnail as a circle (for an avatar-style field). */
  roundedPreview?: boolean
}

/**
 * Click-or-drag image upload with a live preview, a remove button, and a
 * 2MB size check — shared by every create form that needs an image field
 * (Product/Category Image, a profile photo, a branch logo, ...). The idle
 * state's icon/copy and the box's size are all props rather than a fixed
 * set of variants, so a new field can reuse this without adding a new
 * hardcoded case here.
 */
export function ImageDropzone({
  value,
  onChange,
  previewAlt = 'Preview',
  icon,
  label = 'image',
  hint = 'JPG, PNG (Max 2MB)',
  showDragHint = true,
  compact = false,
  roundedPreview = false,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setError('File is larger than 2MB. Please choose a smaller image.')
      return
    }

    setError(null)
    onChange(file)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  function handleRemove(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    setError(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed text-center transition-colors duration-200',
          compact ? 'min-h-[170px] px-4 py-6' : 'min-h-[220px] px-6 py-10',
          isDragging ? 'border-primary bg-primary-light/50' : 'border-line hover:border-primary/40',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />

        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt={previewAlt}
              className={cn('rounded-lg object-contain', compact ? 'max-h-20' : 'max-h-40', roundedPreview && 'rounded-full')}
            />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-ink text-white shadow-sm hover:bg-ink/80"
            >
              <IconClose size={12} />
            </button>
          </div>
        ) : (
          <>
            {icon ?? <IconImage size={40} className="text-ink-muted" />}
            <p className="text-sm font-semibold text-ink">Click to upload {label}</p>
            {showDragHint ? <p className="text-xs text-ink-muted">or drag and drop</p> : null}
            <p className="text-xs text-ink-muted">{hint}</p>
          </>
        )}
      </label>

      {error ? <p className="text-sm text-danger-strong">{error}</p> : null}
    </div>
  )
}
