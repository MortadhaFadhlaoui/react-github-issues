import { useQuery } from '@apollo/client'
import { IssueState } from '../data/enums'
import { IssuesData, SearchIssuesVars, FilterIssuesVars, SearchData, SearchList, GetList } from '../data/types'
import { GET_ISSUES, SEARCH_ISSUES } from '../graphql/queries/issues'

export const getIssues = (variables: FilterIssuesVars): GetList => {
	const { loading, error, data, fetchMore } = useQuery<IssuesData, FilterIssuesVars>(GET_ISSUES, {
		variables,
	})

	const hasNextPage = data?.repository.issues.pageInfo.hasNextPage || false
	const endCursor = data?.repository.issues.pageInfo.endCursor || ''
	const issues = data?.repository.issues.nodes || []

	return { loading, error, fetchMore, hasNextPage, endCursor, issues }
}

export const searchIssues = (variables: SearchIssuesVars): SearchList => {
	const { loading, error, data, fetchMore } = useQuery<SearchData, SearchIssuesVars>(SEARCH_ISSUES, {
		variables,
	})
	const hasNextPage = data?.search.pageInfo.hasNextPage || false
	const endCursor = data?.search.pageInfo.endCursor || ''
	const issues = data?.search.nodes.filter(issue => issue.__typename === 'Issue') || []

	return { loading, error, fetchMore, hasNextPage, endCursor, issues }
}

export const statusColor = (status: IssueState) => (status === IssueState.OPEN ? 'green' : 'red')
