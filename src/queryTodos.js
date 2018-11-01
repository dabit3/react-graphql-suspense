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
