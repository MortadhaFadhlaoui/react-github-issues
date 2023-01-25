import React, { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IssuesList } from './issues-list/issues-list'
import { IssuesSearch } from './issues-search/issues-search'
import { IssueState } from '../../data/enums'
import { IssuesData } from '../../data/types'
import { getIssues } from '../../services/issues'
import { REPO_OWNER, PAGE_NUMBER, REPO_NAME } from '../../utils/constants'

export const IssuesScreen = (): ReactElement => {
	const navigate = useNavigate()
	const [state, setState] = useState<IssueState | null>(null)
	const [isSearching, setIsSearching] = useState(false)
	const { loading, error, issues, startCursor, hasPreviousPage, fetchMore } = getIssues({
		owner: REPO_OWNER,
		name: REPO_NAME,
		last: PAGE_NUMBER,
		before: null,
		states: state,
	})

	const handleSearch = (isSearching: boolean, state: IssueState | null) => {
		setIsSearching(isSearching)
		setState(state)
	}

	const handleLoadMoreIssues = (startCursor: string) => {
		fetchMore({
			variables: {
				last: PAGE_NUMBER,
				before: startCursor || null,
			},
			updateQuery: (prev: IssuesData, { fetchMoreResult }: { fetchMoreResult?: IssuesData }) => {
				if (!fetchMoreResult) return prev
				return Object.assign({}, prev, {
					repository: {
						...prev.repository,
						issues: {
							...prev.repository.issues,
							nodes: [...prev.repository.issues.nodes, ...fetchMoreResult.repository.issues.nodes],
							pageInfo: fetchMoreResult.repository.issues.pageInfo,
						},
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
			<IssuesSearch state={state} onChange={handleSearch} />
			{!isSearching && (
				<IssuesList
					onClick={handleOnClick}
					issues={issues}
					loading={loading}
					error={error}
					startCursor={startCursor}
					hasPreviousPage={hasPreviousPage}
					loadMore={handleLoadMoreIssues}
				/>
			)}
		</motion.div>
	)
}
