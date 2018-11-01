## React Suspense with GraphQL Query

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

Usage with Suspense:

```js
import Data from './suspenseTodos'

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <Data />
      </Suspense>
    </div>
  );
}
```

## GraphQL query using a custom useReducer hook to manage loading / error state

```js
import { API, graphqlOperation } from 'aws-amplify'
import { useEffect, useReducer } from 'react'

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

function reducer(state, action) {
  switch (action.type) {
    case 'initialized':
      return {
        ...state, todos: action.payload.todos, loading: false
      }
    case 'error':
      return {
        ...state, loading: false, error: action.payload.error
      }
  }
}

const initialState = {
  todos: [],
  loading: true,
  error: false
}

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(async () => {
    try {
      const { data: { listTodos: { items }}} = await API.graphql(graphqlOperation(query))
      dispatch({type: 'initialized', payload: { todos: items }})
    } catch (err) {
      dispatch({type: 'error', payload: { error: err }})
    }
  }, [])

  return [state.todos, state.loading, state.error]
}
```