import React, { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { IssuesList } from './issues-list/issues-list'
import { StatusFilter } from './status-filter/filter-status'
import { Search } from '../../components/search/search'
import { IssueState } from '../../data/enums'
import { getIssues } from '../../services/issues'
import { FACEBOOK, PAGE_NUMBER, REACT } from '../../utils/constants'

export const Issues = (): ReactElement => {
	const { loading, error, data, fetchMore } = getIssues({
		owner: FACEBOOK,
		name: REACT,
		first: PAGE_NUMBER,
		after: null,
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
	}

	const handleFilter = (value: IssueState | null) => {
		console.log(value)
	}

	return (
		<motion.div>
			<Search onChange={handleSearch} />
			<StatusFilter onChange={handleFilter} />
			<IssuesList loading={loading} error={error} data={data} fetchMore={fetchMore} />
		</motion.div>
	)
}
