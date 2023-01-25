import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IssuesSearchProps } from './issues-search.props'
import { Search } from '../../../components/search/search'
import { IssueState } from '../../../data/enums'
import { SearchData } from '../../../data/types'
import { searchQuery } from '../../../graphql/queries/issues'
import { searchIssues } from '../../../services/issues'
import { PAGE_NUMBER, REPO_NAME, REPO_OWNER } from '../../../utils/constants'
import { IssuesFilter } from '../issues-filter/issues-filter'
import { IssuesList } from '../issues-list/issues-list'

export const IssuesSearch = ({ onChange }: IssuesSearchProps) => {
	const navigate = useNavigate()
	const [state, setState] = useState<IssueState | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { loading, error, issues, startCursor, hasPreviousPage, fetchMore } = searchIssues({
		searchQuery: searchQuery(REPO_OWNER, REPO_NAME, searchTerm, state),
		last: PAGE_NUMBER,
		before: null,
	})

	const handleSearch = (value: string) => {
		onChange(value !== '', state)
		setSearchTerm(value)
	}

	const handleFilter = (value: IssueState | null) => {
		onChange(searchTerm !== '', value)
		setState(value)
	}

	const handleLoadMoreIssues = (startCursor: string) => {
		fetchMore({
			variables: {
				last: PAGE_NUMBER,
				before: startCursor || null,
			},
			updateQuery: (prev: SearchData, { fetchMoreResult }: { fetchMoreResult?: SearchData }) => {
				if (!fetchMoreResult) return prev
				return Object.assign({}, prev, {
					search: {
						...prev.search,
						nodes: [...prev.search.nodes, ...fetchMoreResult.search.nodes],
						pageInfo: fetchMoreResult.search.pageInfo,
					},
				})
			},
		})
	}

	const handleOnClick = (number: number) => {
		navigate(`/${number}`)
	}

	return (
		<motion.div>
			<Search onChange={handleSearch} placeholder={'Search by title, body ...'} />
			<IssuesFilter onChange={handleFilter} />
			{searchTerm !== '' && (
				<IssuesList
					issues={issues}
					loading={loading}
					error={error}
					startCursor={startCursor}
					hasPreviousPage={hasPreviousPage}
					loadMore={handleLoadMoreIssues}
					onClick={handleOnClick}
				/>
			)}
		</motion.div>
	)
}
