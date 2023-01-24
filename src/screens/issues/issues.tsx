import React, { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import { IssuesList } from './issues-list/issues-list'
import { IssuesSearch } from './issues-search/issues-search'
import { IssueState } from '../../data/enums'
import { IssuesData } from '../../data/types'
import { getIssues } from '../../services/issues'
import { REPO_OWNER, PAGE_NUMBER, REPO_NAME } from '../../utils/constants'

export const Issues = (): ReactElement => {
	const [state, setState] = useState<IssueState | null>(null)
	const [isSearching, setIsSearching] = useState(false)
	const { loading, error, issues, endCursor, hasNextPage, fetchMore } = getIssues({
		owner: REPO_OWNER,
		name: REPO_NAME,
		first: PAGE_NUMBER,
		after: null,
		states: state,
	})

	const handleSearch = (isSearching: boolean, state: IssueState | null) => {
		setIsSearching(isSearching)
		setState(state)
	}

	const handleLoadMoreIssues = (endCursor: string) => {
		fetchMore({
			variables: {
				first: PAGE_NUMBER,
				after: endCursor || null,
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

	return (
		<motion.div>
			<IssuesSearch state={state} onChange={handleSearch} />
			{!isSearching && (
				<IssuesList
					issues={issues}
					loading={loading}
					error={error}
					endCursor={endCursor}
					hasNextPage={hasNextPage}
					loadMore={handleLoadMoreIssues}
				/>
			)}
		</motion.div>
	)
}
