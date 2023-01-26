import { capitalize } from './functions'

describe('functions file', () => {
	test('Capitalize string - Basic test', () => {
		expect(capitalize('test')).toBe('Test')
	})

  test('Capitalize string - Empty String', () => {
		expect(capitalize('')).toBe('')
	})
})
