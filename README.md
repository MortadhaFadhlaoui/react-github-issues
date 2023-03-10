This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is an example how to display react repository issues, search issue with title, body and filter issue with status closed or open.

It uses an example Github GraphQL server from [https://api.github.com/graphql](https://docs.github.com/en/graphql) as the endpoint.

## Instructions

- `yarn`
- Add `.env` file and create you own access token so you can authenticate against github graphql API `REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=*****YOUR_TOKEN_GOES_HERE*******`

## Technologies Used

```sh
ECMAScript latest
Typescript 4.9 +
React.js
Webpack
GraphQL
Apollo client
```

## Available Scripts

- `yarn`: install dependencies
- `yarn start`: start the webserver
- `yarn build`: create build file via webpack using `ts-loader`
- `yarn test` : run testing based on jest framework
- `yarn compile` : generates types
- `yarn lint:fix` : format code using prettier and fix linting
