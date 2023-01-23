import { useQuery } from '@apollo/client'
import { IssuesData, IQueryResult, IssuesVars } from '../data/types'
import { GET_ISSUES } from '../graphql/queries/issues'

export const getIssues = (variables: IssuesVars): IQueryResult<IssuesData, IssuesVars> => {
	return useQuery<IssuesData, IssuesVars>(GET_ISSUES, {
		variables,
	})
}
