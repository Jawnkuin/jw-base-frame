[GraphQL](http://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

**Notice**

This example is based on a react-redux front-end and an express server

Make sure you got __MongoDB__ installed, and service __mongod__ started

**Install packages**
```shell
npm install
```

**Create sample db**
```shell
npm run seed
```

**Start server**
```
npm start
```

**A graphql request**

open local browser at localhost:3000

or

use command to make a simple request
```shell
curl --data "query={user(id:2){id,name,roles{id,name}}}" localhost:3000/graphql
```
