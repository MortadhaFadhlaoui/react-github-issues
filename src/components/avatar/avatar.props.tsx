import { IssueState } from '../../data/enums'

export interface AvatarProps {
	name: string
	src: string
	date?: string
	status?: IssueState
}
