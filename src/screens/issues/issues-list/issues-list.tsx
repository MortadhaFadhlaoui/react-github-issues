import React, { ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IssuesListProps } from './issues-list.pops'
import { Card } from '../../../components/card/card'
import { LoadMore } from '../../../components/load-more/load-more'
import { statusColor } from '../../../services/issues'

export const IssuesList = ({
	loading,
	error,
	issues,
	loadMore,
	hasNextPage,
	endCursor,
}: IssuesListProps): ReactElement => {
	const handleLoadMore = () => {
		if (loadMore) loadMore(endCursor)
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>`Error! ${error.message}`(</p>

	return (
		<motion.div>
			<AnimatePresence>
				{issues.map(issue => {
					return <Card key={issue.id} title={issue.title} borderColor={statusColor(issue.state)} />
				})}
				{loadMore && <LoadMore onClick={handleLoadMore} disabled={!hasNextPage} title={'Load More'} />}
			</AnimatePresence>
		</motion.div>
	)
}
