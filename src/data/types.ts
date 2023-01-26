import { OperationVariables, ApolloError, FetchMoreQueryOptions, ApolloQueryResult } from '@apollo/client'
import { IssueState } from './enums'

export interface Issue {
	id: string
	title: string
	body: string
	state: IssueState
	createdAt: string
	comments: Comment[]
	author: Author
	number: number
}

export interface Author {
	avatarUrl: string
	login: string
}

export interface Comment {
	id: string
	body: string
	author: Author
	createdAt: string
}

export interface PaginationVars {
	last: number
	before: string | null
}

export interface IssuesVars extends PaginationVars {
	owner: string
	name: string
}

export interface FilterIssuesVars extends IssuesVars, PaginationVars {
	states: IssueState | null
}

export interface SearchIssuesVars extends PaginationVars {
	searchQuery: string
}

export interface IssueDetailVars extends IssuesVars {
	number: number
}
export interface Pagination<TData = unknown, TVariables = OperationVariables> {
	fetchMore<TFetchData = TData, TFetchVars = TVariables>(
		fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
			updateQuery?: (
				previousQueryResult: TData,
				options: {
					fetchMoreResult: TFetchData
					variables: TFetchVars
				},
			) => TData
		},
	): Promise<ApolloQueryResult<TFetchData>>
}
export interface SearchData {
	search: {
		nodes: Issue[]
		pageInfo: {
			startCursor: string
			hasPreviousPage: boolean
		}
	}
}

export interface IssuesData {
	repository: {
		issues: {
			nodes: Issue[]
			pageInfo: {
				startCursor: string
				hasPreviousPage: boolean
			}
		}
	}
}

export interface IssueDetail {
	repository: {
		issue: {
			id: string
			createdAt: string
			title: string
			body: string
			state: IssueState
			author: Author
			number: number
			comments: {
				nodes: Comment[]
				pageInfo: {
					startCursor: string
					hasPreviousPage: boolean
				}
			}
		}
	}
}

export interface Results {
	error?: ApolloError | undefined
	loading: boolean
	startCursor: string
	hasPreviousPage: boolean
}

export interface IIssues extends Results {
	issues: Issue[]
}

export interface GetListResults extends Pagination<IssuesData, FilterIssuesVars>, IIssues {}

export interface IssueDetailResults extends Pagination<IssueDetail, FilterIssuesVars>, Results {
	issue: Issue | null
}

export interface SearchListResults extends Pagination<SearchData, SearchIssuesVars>, IIssues {}
