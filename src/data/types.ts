import {
	OperationVariables,
	ApolloError,
	FetchMoreQueryOptions,
	ApolloQueryResult,
} from '@apollo/client'
import { IssueState } from './enums'

// Data Types Section
export interface Issue {
	id: number
	author: IAuthor
	title: string
	body: string
	state: IssueState
	__typename: string
}

export interface IAuthor {
	login: string
}

export interface IComment {
	body: string
}

export interface PaginationVars {
	first: number
	after: string | null
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

// API Type Section
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
			endCursor: string
			hasNextPage: boolean
		}
	}
}

export interface IssuesData {
	repository: {
		issues: {
			nodes: Issue[]
			pageInfo: {
				endCursor: string
				hasNextPage: boolean
			}
		}
	}
}

export interface IIssues {
	error?: ApolloError | undefined
	loading: boolean
	issues: Issue[]
	endCursor: string
	hasNextPage: boolean
}

export interface GetList extends Pagination<IssuesData, FilterIssuesVars>, IIssues {}

export interface SearchList extends Pagination<SearchData, SearchIssuesVars>, IIssues {}
