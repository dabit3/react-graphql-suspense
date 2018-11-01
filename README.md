# React Suspense with GraphQL Query

```js
import { unstable_createResource} from 'react-cache'
import { API, graphqlOperation } from 'aws-amplify'
import React from 'react'

const query = `
  query {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
`

const myResource = unstable_createResource(async() => {
  const data = await API.graphql(graphqlOperation(query))
  return data.data.listTodos.items
})

function Data() {
  const todos = myResource.read()
  return todos.map((t, i) => <p>Todo {i}</p>)
}
export default Data
```