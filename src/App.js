import React, { Suspense } from 'react'
import './App.css';

import readData from './queryTodos'
import Data from './suspenseTodos'

const App = () => {
  const [todos, loading, error] = readData()
  console.log('todos: ', todos)
  // console.log(data() ? data() : 'null')
  return (
    <div className="App">
      { !loading && todos.map((t, i) => <p key={i}>{t.name}</p>)}
      { loading && !error && <p>Loading...</p>}
      { error && <p>Error!</p>}
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Data />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
