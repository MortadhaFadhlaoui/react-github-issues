import React, { ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../../../components/card/card'
import { LoadMore } from '../../../components/load-more/load-more'
import { IQueryResult, IssuesData, IssuesVars } from '../../../data/types'
import { statusColor } from '../../../services/issues'
import { PAGE_NUMBER } from '../../../utils/constants'

export const IssuesList = ({ loading, error, data, fetchMore }: IQueryResult<IssuesData, IssuesVars>): ReactElement => {
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

	if (loading || !data) return <p>Loading...</p>
	if (error) return <p>`Error! ${error.message}`(</p>

	return (
		<motion.div>
			<AnimatePresence>
				{data.repository.issues.edges.map(issue => {
					return <Card key={issue.node.id} title={issue.node.title} borderColor={statusColor(issue.node.state)} />
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
