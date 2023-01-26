import React from 'react'
import { render } from '@testing-library/react'
import { LoadMore } from './load-more'

describe('Load More', () => {
	it('renders the correct title Text', () => {
		const { getByText } = render(
			<LoadMore
				title="Load more data"
				onClick={() => {
					console.log('Load Mo')
				}}
				disabled={false}
			/>,
		)
		expect(getByText('Load more data')).toBeDefined()
	})
})
