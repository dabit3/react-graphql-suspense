import { API, graphqlOperation } from 'aws-amplify'
import React from 'react'

import createFetcher from './createFetcher'

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

const myResource = createFetcher(async() => {
  const data = await API.graphql(graphqlOperation(query))
  console.log('data: ', data)
  return data.data.listTodos.items
})

function Data() {
  const todos = myResource.read()
  return todos.map((t, i) => <p key={i}>Todo {i}</p>)
}
export default Data

