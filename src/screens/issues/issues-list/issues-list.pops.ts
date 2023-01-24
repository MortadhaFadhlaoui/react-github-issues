import { IIssues } from '../../../data/types'

export interface IssuesListProps extends IIssues {
	loadMore?: (endCursor: string) => void
}
