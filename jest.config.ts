/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	preset: 'ts-jest',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: {
					jsx: 'react',
				},
			},
		],
	},
	testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
	collectCoverageFrom: [
		'**/*.{ts,tsx}',
		'!**/coverage/**',
		'!**/node_modules/**',
		'!**/babel.config.js',
		'!**/jest.setup.js',
	],
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js'
	},
	coverageReporters: ['json-summary', 'text', 'lcov'],
	testEnvironment: 'jsdom'
}
