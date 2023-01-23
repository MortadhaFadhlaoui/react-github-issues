import React, { ReactElement } from 'react'
import { IssuesData } from '../data/types'
import { getIssues } from '../services/issues'
import { FACEBOOK, REACT } from '../utils/constants'

const Issues = (): ReactElement => {
	const { loading, error, data, fetchMore } = getIssues({ owner: FACEBOOK, name: REACT, first: 10, after: null })

	const handleLoadMore = () => {
		fetchMore({
			variables: {
				first: 10,
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

	if (loading) return <p>Loading...</p>
	if (error) return <p>`Error! ${error.message}`(</p>

	return (
		<div>
			<ul>
				{data?.repository.issues.edges.map(issue => (
					<li key={issue.node.id}>{issue.node.title}</li>
				))}
			</ul>
			<button onClick={handleLoadMore} disabled={!data?.repository.issues.pageInfo.hasNextPage}>
				Load More
			</button>
		</div>
	)
}

export default Issues
