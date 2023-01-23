import React, { useState } from 'react'
import styles from './filter-status.module.css'
import { Filter } from '../../../components/filter/filter'
import { IssueState } from '../../../data/enums'
import { statusColor } from '../../../services/issues'
import { STATUS } from '../../../utils/constants'

export const StatusFilter = ({ onChange }: { onChange: (value: IssueState | null) => void }) => {
	const [activeFilter, setActiveFilter] = useState<IssueState | null>(null)

	const handleFilter = (e: React.MouseEvent, status: IssueState | null) => {
		const el = e.target as HTMLElement
		el.textContent?.toLowerCase() !== activeFilter?.toString().toLowerCase()
			? setActiveFilter(status)
			: setActiveFilter(null)
		onChange(status)
	}

	return (
		<div className={styles.filters}>
			{STATUS.map((status, index) => {
				return (
					<Filter
						key={index}
						title={status.toString()}
						isActive={status === activeFilter}
						borderColor={statusColor(status)}
						onClick={e => handleFilter(e, status)}
					/>
				)
			})}
		</div>
	)
}
