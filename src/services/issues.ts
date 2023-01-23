import { useQuery } from '@apollo/client'
import { IssueState } from '../data/enums'
import { IssuesData, IQueryResult, IssuesVars } from '../data/types'
import { GET_ISSUES } from '../graphql/queries/issues'

export const getIssues = (variables: IssuesVars): IQueryResult<IssuesData, IssuesVars> => {
	return useQuery<IssuesData, IssuesVars>(GET_ISSUES, {
		variables,
	})
}

export const statusColor = (status: IssueState) => (status === IssueState.OPEN ? 'green' : 'red')

