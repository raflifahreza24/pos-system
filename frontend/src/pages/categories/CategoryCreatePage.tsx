import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { FormField } from '../../components/ui/FormField'
import { ImageDropzone } from '../../components/ui/ImageDropzone'
import { IconChevronLeft } from '../../components/ui/icons'
import { activeInactiveStatuses, type Status } from '../../components/ui/StatusBadge'
import { categoryNames } from '../../data/categoriesData'

export function CategoryCreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [displayOrder, setDisplayOrder] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('Active')

  function handleCancel() {
    window.location.hash = '#/categories'
  }

  // TODO: submit the new category to the backend once that endpoint exists.
  function handleSubmit() {
    window.location.hash = '#/categories'
  }

  const canSubmit = name.trim() !== ''

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex justify-end">
        <Button variant="secondary" icon={<IconChevronLeft size={16} />} onClick={handleCancel}>
          Kembali
        </Button>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <FormField label="Category Name" required helperText="Example: Beverages, Snacks, Electronics">
              <Input placeholder="Enter category name" value={name} onChange={(event) => setName(event.target.value)} />
            </FormField>

            <FormField label="Description">
              <Textarea
                placeholder="Enter category description (optional)"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormField>

            <FormField
              label="Parent Category"
              helperText="Select parent category if this is a subcategory"
            >
              <Select value={parentCategory} onChange={(event) => setParentCategory(event.target.value)}>
                <option value="">None (Main Category)</option>
                {categoryNames.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Display Order" helperText="Lower number will be shown first">
              <Input
                type="number"
                min={0}
                value={displayOrder}
                onChange={(event) => setDisplayOrder(Number(event.target.value))}
              />
            </FormField>
          </div>

          <div className="flex flex-col gap-5">
            <FormField label="Category Image">
              <ImageDropzone value={image} onChange={setImage} previewAlt="Category preview" />
            </FormField>

            <FormField label="Status" helperText="Inactive categories will not be shown in product selection">
              <Select value={status} onChange={(event) => setStatus(event.target.value as Status)}>
                {activeInactiveStatuses.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
        </div>

        <hr className="border-line" />

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
            Save Category
          </Button>
        </div>
      </div>
    </div>
  )
}
