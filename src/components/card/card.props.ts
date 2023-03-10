import { IssueState } from '../../data/enums'

export interface CardProps {
	title: string
	src: string
	name: string
	date?: string
	onClick?: () => void
	status?: IssueState
}
