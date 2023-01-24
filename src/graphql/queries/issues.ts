import { gql } from 'graphql-tag'
import { IssueState } from '../../data/enums'

export const GET_ISSUES = gql`
	query getIssues($owner: String!, $name: String!, $first: Int, $after: String, $states: [IssueState!]) {
		repository(owner: $owner, name: $name) {
			issues(first: $first, after: $after, states: $states) {
				nodes {
					id
					title
					state
					body
					author {
						login
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
	}
`

export const searchQuery = (owner: string, name: string, searchTerm: string, state: IssueState | null) => {
	if (state) return `repo:${owner}/${name} ${searchTerm} state:${state.toLowerCase()} in:title:body`
	return `repo:${owner}/${name} ${searchTerm} in:title:body`
}

export const SEARCH_ISSUES = gql`
	query searchIssues($searchQuery: String!, $first: Int, $after: String) {
		search(query: $searchQuery, type: ISSUE, first: $first, after: $after) {
			nodes {
				... on Issue {
					id
					title
					state
					body
					author {
						login
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`
