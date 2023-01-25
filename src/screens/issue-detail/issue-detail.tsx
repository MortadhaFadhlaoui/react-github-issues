import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import styles from './issue-detail.module.css'
import { AvatarUser } from '../../components/avatar/avatar'
import { Card } from '../../components/card/card'
import { LoadMore } from '../../components/load-more/load-more'
import { IssueDetail } from '../../data/types'
import { getIssueDetail } from '../../services/issues'
import { PAGE_NUMBER, REPO_NAME, REPO_OWNER } from '../../utils/constants'

export const IssueDetailScreen = (): ReactElement => {
	const { number } = useParams<string>()

	if (!number) return <p>Something went wrong</p>

	const { loading, error, startCursor, hasPreviousPage, fetchMore, issue } = getIssueDetail({
		owner: REPO_OWNER,
		name: REPO_NAME,
		last: PAGE_NUMBER,
		before: null,
		number: parseInt(number),
	})

	if (loading || !issue) return <p>Loading...</p>
	if (error) return <p>`Error! ${error.message}`(</p>

	const handleLoadMoreComments = () => {
		fetchMore({
			variables: {
				last: PAGE_NUMBER,
				before: startCursor || null,
			},
			updateQuery: (prev: IssueDetail, { fetchMoreResult }: { fetchMoreResult?: IssueDetail }) => {
				if (!fetchMoreResult) return prev
				return Object.assign({}, prev, {
					repository: {
						...prev.repository,
						issue: {
							...prev.repository.issue,
							comments: {
								...prev.repository.issue.comments,
								nodes: [...prev.repository.issue.comments.nodes, ...fetchMoreResult.repository.issue.comments.nodes],
								pageInfo: fetchMoreResult.repository.issue.comments.pageInfo,
							},
						},
					},
				})
			},
		})
	}

	return (
		<div>
			<h1>{issue.title}</h1>
			<AvatarUser src={issue.author.avatarUrl} name={issue.author.login} date={issue.createdAt} status={issue.state} />
			<p className={styles.body}>{issue.body}</p>
			<div className={styles.card}>
				<h2 className={styles.commentTitle}>Comments({issue.comments.length})</h2>
				{issue.comments.map(comment => {
					return (
						<Card
							key={comment.id}
							title={comment.body}
							src={comment.author.avatarUrl}
							name={comment.author.login}
							date={comment.createdAt}
						/>
					)
				})}
			</div>
			<LoadMore onClick={handleLoadMoreComments} disabled={!hasPreviousPage} title={'More Comments'} />
		</div>
	)
}
