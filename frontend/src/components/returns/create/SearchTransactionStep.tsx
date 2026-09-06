import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { StepCard } from '../../ui/StepCard'
import { IconSearch } from '../../ui/icons'

interface SearchTransactionStepProps {
  query: string
  onQueryChange: (value: string) => void
  onSearch: () => void
  notFound: boolean
}

export function SearchTransactionStep({ query, onQueryChange, onSearch, notFound }: SearchTransactionStepProps) {
  return (
    <StepCard step={1} title="Search Transaction" subtitle="Find the original transaction to create a return.">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSearch()
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <Input
          icon={<IconSearch size={17} className="text-ink-muted" />}
          placeholder="Enter Invoice Number..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          wrapperClassName="sm:max-w-sm sm:flex-1"
        />
        <Button type="submit" icon={<IconSearch size={16} />} fullWidthOnMobile>
          Search
        </Button>
      </form>

      {notFound ? (
        <p className="text-sm text-danger-strong">No transaction found for that invoice number. Try INV-0001.</p>
      ) : null}
    </StepCard>
  )
}
