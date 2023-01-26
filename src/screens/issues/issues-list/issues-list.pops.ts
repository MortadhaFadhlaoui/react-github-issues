import { IIssues } from '../../../data/types'

export interface IssuesListProps extends IIssues {
	loadMore: (startCursor: string) => void
	onClick: (number: number) => void
}
