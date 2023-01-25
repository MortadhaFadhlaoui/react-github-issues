import React, { ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IssuesListProps } from './issues-list.pops'
import { Card } from '../../../components/card/card'
import { LoadMore } from '../../../components/load-more/load-more'

export const IssuesList = ({
	loading,
	error,
	issues,
	loadMore,
	hasPreviousPage,
	startCursor,
	onClick,
}: IssuesListProps): ReactElement => {
	const handleLoadMore = () => {
		if (loadMore) loadMore(startCursor)
	}

	const handleOnClick = (number: number) => {
		onClick(number)
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>`Error! ${error.message}`(</p>

	return (
		<motion.div>
			<AnimatePresence>
				{issues.map(issue => {
					return (
						<Card
							onClick={() => handleOnClick(issue.number)}
							key={issue.id}
							title={issue.title}
							src={issue.author.avatarUrl}
							name={issue.author.login}
							date={issue.createdAt}
							status={issue.state}
						/>
					)
				})}
				<LoadMore onClick={handleLoadMore} disabled={!hasPreviousPage} title={'More Issues'} />
			</AnimatePresence>
		</motion.div>
	)
}
