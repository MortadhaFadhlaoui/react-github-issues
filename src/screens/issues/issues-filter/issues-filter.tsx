import React, { useState } from 'react'
import styles from './issues-filter.module.css'
import { Filter } from '../../../components/filter/filter'
import { IssueState } from '../../../data/enums'
import { statusColor } from '../../../services/issues'
import { STATUS } from '../../../utils/constants'

export const IssuesFilter = ({ onChange }: { onChange: (value: IssueState | null) => void }) => {
	const [activeFilter, setActiveFilter] = useState<IssueState | null>(null)

	const handleFilter = (e: React.MouseEvent, status: IssueState | null) => {
		const el = e.target as HTMLElement
		const isActiveFilter = el.textContent?.toLowerCase() !== activeFilter?.toString().toLowerCase()
		if (isActiveFilter) {
			setActiveFilter(status)
			onChange(status)
		} else {
			setActiveFilter(null)
			onChange(null)
		}
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
