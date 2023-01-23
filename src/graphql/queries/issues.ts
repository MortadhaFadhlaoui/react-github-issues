import { gql } from 'graphql-tag'

export const GET_ISSUES = gql`
  query getIssues($owner: String!, $name: String!, $first: Int, $after: String) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, after: $after) {
        edges {
          node {
            id
            title
            state
						title
						body
						closed
						createdAt
						author {
							login
						}
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`
