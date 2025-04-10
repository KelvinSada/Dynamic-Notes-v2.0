import { useState } from 'react'
import './App.css'
import Header from './Header'
import Menu from './Menu'
import NotesBody from './NotesBody'

import { DeleteContext } from './Context'


function App() {

  const [remove,setRemove] = useState(false)

  

  return (
    <DeleteContext.Provider value={{remove,setRemove}}>
      <main className='relative min-h-screen bg-[#f4f4f4]'>
        <Header/>
        <NotesBody/>
        <div className='absolute bottom-25 sm:bottom-10 w-full'>
          <Menu/>
        </div>
      </main>
    </DeleteContext.Provider>
  )
}

export default App
