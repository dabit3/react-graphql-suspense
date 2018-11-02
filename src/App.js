import React, { Suspense } from 'react'
import './App.css';

import readData from './queryTodos'
import Data from './suspenseTodos'
import Data2 from './createFetcherTodos'

const App = () => {
  const [todos, loading, error] = readData()
  console.log('todos: ', todos)

  return (
    <div className="App">
      { !loading && todos.map((t, i) => <p key={i}>{t.name}</p>)}
      { loading && !error && <p>Loading...</p>}
      { error && <p>Error!</p>}
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Data />
        </Suspense>
        <Suspense fallback={<div>loading...</div>}>
          <Data2 />
        </Suspense>
      </div>
    </div>
  );
}

export default App
