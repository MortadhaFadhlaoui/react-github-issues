import React, { ReactElement, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './issues.module.css'
import { Card } from '../components/card/card'
import { Filter } from '../components/filter/filter'
import { LoadMore } from '../components/load-more/load-more'
import { Search } from '../components/search/search'
import { IssueState } from '../data/enums'
import { IssuesData } from '../data/types'
import { getIssues } from '../services/issues'
import { FACEBOOK, PAGE_NUMBER, REACT, STATUS } from '../utils/constants'

export const Issues = (): ReactElement => {
	const [activeFilter, setActiveFilter] = useState<IssueState | null>(null)
	const [inputValue, setInputValue] = useState('')

	const { loading, error, data, fetchMore } = getIssues({
		owner: FACEBOOK,
		name: REACT,
		first: PAGE_NUMBER,
		after: null,
	})

	const handleLoadMore = () => {
		fetchMore({
			variables: {
				first: PAGE_NUMBER,
				after: data?.repository.issues.pageInfo.endCursor || null,
			},
			updateQuery: (prev: IssuesData, { fetchMoreResult }: { fetchMoreResult?: IssuesData }) => {
				if (!fetchMoreResult) return prev
				return Object.assign({}, prev, {
					repository: {
						...prev.repository,
						issues: {
							...prev.repository.issues,
							edges: [...prev.repository.issues.edges, ...fetchMoreResult.repository.issues.edges],
							pageInfo: fetchMoreResult.repository.issues.pageInfo,
						},
					},
				})
			},
		})
	}

	const handleFilter = (e: React.MouseEvent, status: IssueState | null) => {
		const el = e.target as HTMLElement
		el.textContent?.toLowerCase() !== activeFilter?.toString().toLowerCase()
			? setActiveFilter(status)
			: setActiveFilter(null)
	}

	if (loading || !data) return <p>Loading...</p>
	if (error) return <p>`Error! ${error.message}`(</p>

	return (
		<motion.div>
			<Search
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setInputValue(e.target.value)
				}}
			/>
			<div className={styles.filters}>
				{STATUS.map((status, index) => {
					return (
						<Filter
							key={index}
							title={status.toString()}
							isActive={status === activeFilter}
							onClick={e => handleFilter(e, status)}
						/>
					)
				})}
			</div>
			<AnimatePresence>
				{data.repository.issues.edges
					.filter(issue => issue.node.title.toLowerCase().includes(inputValue.toLowerCase()))
					.filter(issue => {
						if (!activeFilter) return issue
						return issue.node.closed === (activeFilter === IssueState.CLOSED)
					})
					.map(issue => {
						return <Card key={issue.node.id} title={issue.node.title} status={issue.node.title} />
					})}
				<LoadMore
					onClick={handleLoadMore}
					disabled={!data?.repository.issues.pageInfo.hasNextPage}
					title={'Load More'}
				/>
			</AnimatePresence>
		</motion.div>
	)
}
