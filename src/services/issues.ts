import { useQuery } from '@apollo/client'
import { IssueState } from '../data/enums'
import {
	IssuesData,
	SearchIssuesVars,
	FilterIssuesVars,
	SearchData,
	SearchListResults,
	GetListResults,
	IssueDetailVars,
	IssueDetail,
	IssueDetailResults,
} from '../data/types'
import { GET_ISSUES, ISSUE_DETAIL, SEARCH_ISSUES } from '../graphql/queries/issues'

export const getIssues = (variables: FilterIssuesVars): GetListResults => {
	const { loading, error, data, fetchMore } = useQuery<IssuesData, FilterIssuesVars>(GET_ISSUES, {
		variables,
	})

	const hasPreviousPage = data?.repository.issues.pageInfo.hasPreviousPage || false
	const startCursor = data?.repository.issues.pageInfo.startCursor || ''
	const issues = data?.repository.issues.nodes || []

	return { loading, error, fetchMore, hasPreviousPage, startCursor, issues }
}

export const searchIssues = (variables: SearchIssuesVars): SearchListResults => {
	const { loading, error, data, fetchMore } = useQuery<SearchData, SearchIssuesVars>(SEARCH_ISSUES, {
		variables,
	})
	const hasPreviousPage = data?.search.pageInfo.hasPreviousPage || false
	const startCursor = data?.search.pageInfo.startCursor || ''
	const issues = data?.search.nodes || []

	return { loading, error, fetchMore, hasPreviousPage, startCursor, issues }
}

export const getIssueDetail = (variables: IssueDetailVars): IssueDetailResults => {
	const { loading, error, data, fetchMore } = useQuery<IssueDetail, IssueDetailVars>(ISSUE_DETAIL, {
		variables,
	})

	const hasPreviousPage = data?.repository.issue.comments.pageInfo.hasPreviousPage || false
	const startCursor = data?.repository.issue.comments.pageInfo.startCursor || ''
	const comments = data?.repository.issue.comments.nodes || []
	const issue =  data?{ ...data?.repository.issue, comments } :null

	return { loading, error, fetchMore, hasPreviousPage, startCursor, issue }
}

export const statusColor = (status: IssueState) => (status === IssueState.OPEN ? 'green' : 'red')
