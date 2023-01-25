import { gql } from 'graphql-tag'
import { IssueState } from '../../data/enums'

export const GET_ISSUES = gql`
	query getIssues($owner: String!, $name: String!, $last: Int, $before: String, $states: [IssueState!]) {
		repository(owner: $owner, name: $name) {
			issues(last: $last, before: $before, states: $states) {
				nodes {
					id
					title
					state
					number
					author{
						avatarUrl
						login
					}
					createdAt
				}
				pageInfo {
					hasPreviousPage
					startCursor
				}
			}
		}
	}
`

export const searchQuery = (owner: string, name: string, searchTerm: string, state: IssueState | null) => {
	if (state) return `repo:${owner}/${name} is:issue ${searchTerm} state:${state.toLowerCase()} in:title:body`
	return `repo:${owner}/${name} is:issue ${searchTerm} in:title:body`
}

export const SEARCH_ISSUES = gql`
	query searchIssues($searchQuery: String!, $last: Int, $before: String) {
		search(query: $searchQuery, type: ISSUE, last: $last, before: $before) {
			nodes {
				... on Issue {
					id
					title
					number
					state
					author{
						avatarUrl
						login
					}
					createdAt
				}
			}
			pageInfo {
				hasPreviousPage
				startCursor
			}
		}
	}
`

export const ISSUE_DETAIL = gql`
	query getIssueDetails($owner: String!, $name: String!, $last: Int, $before: String, $number: Int!) {
		repository(name: $name, owner: $owner) {
			issue(number: $number) {
				id
				title
				body
				state
				number
				author {
					avatarUrl
					login
				}
				createdAt
				comments(last: $last, before: $before) {
					nodes {
						author {
							avatarUrl
							login
						}
						body
						createdAt
						id
					}
					pageInfo {
						hasPreviousPage
						startCursor
					}
				}
			}
		}
	}
`
