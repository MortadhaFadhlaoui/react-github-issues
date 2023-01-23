import {
	OperationVariables,
	ApolloError,
	NetworkStatus,
	ApolloClient,
	FetchMoreQueryOptions,
	ApolloQueryResult,
} from '@apollo/client'

// Data Types Section
export interface Issue {
	id: number
	author: IAuthor
	title: string
	body: string
	closed: boolean
	url: string
	createdAt: string
}

export interface IAuthor {
	login: string
}

export interface IComment {
	body: string
}

export interface IssuesVars {
	owner: string
	name: string
	first: number
	after: string | null
}

// API Type Section

export interface IQueryResult<TData = unknown, TVariables = OperationVariables> {
	data?: TData | undefined
	error?: ApolloError | undefined
	loading: boolean
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
	networkStatus: NetworkStatus
	client: ApolloClient<object>
}

interface Issues {
	edges: {
		node: Issue
		cursor: string
	}[]
	pageInfo: {
		hasNextPage: boolean
		endCursor: string
	}
}

export interface IssuesData {
	repository: {
		issues: Issues
	}
}
