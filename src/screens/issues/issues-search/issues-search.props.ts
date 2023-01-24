import { IssueState } from '../../../data/enums'

export interface IssuesSearchProps {
	state: IssueState | null
	onChange: (isSearching: boolean, states: IssueState | null) => void
}
