import { useState } from 'react'
import { PageHeader } from '../components/ui/PageHeader'
import { ChartCard } from '../components/ui/ChartCard'
import { BarChart } from '../components/ui/BarChart'
import { PanelList } from '../components/ui/PanelList'
import { ReportsToolbar, type ReportDateRange } from '../components/reports/ReportsToolbar'
import { ReportTable } from '../components/reports/ReportTable'
import { reportTypes, reportDefinitions } from '../data/reportsData'
import { branches } from '../data/transactionsData'

export function ReportsPage() {
  const [activeReportId, setActiveReportId] = useState(reportTypes[0].id)
  const [dateRange, setDateRange] = useState<ReportDateRange>('thisMonth')
  const [branch, setBranch] = useState('all')

  const report = reportDefinitions[activeReportId]

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <PageHeader title="Reports" subtitle="Generate insights across sales, stock, and staff performance." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <PanelList
          title="Report Type"
          items={reportTypes.map((type) => ({ id: type.id, label: type.label }))}
          activeId={activeReportId}
          onSelect={setActiveReportId}
        />

        <div className="flex flex-col gap-5">
          <ReportsToolbar
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            branch={branch}
            onBranchChange={setBranch}
            branches={branches}
          />

          <ChartCard title={report.chartTitle}>
            <BarChart data={report.chart} formatValue={report.formatChartValue} />
          </ChartCard>

          <ChartCard title={report.tableTitle}>
            <ReportTable columns={report.columns} rows={report.rows} />
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
