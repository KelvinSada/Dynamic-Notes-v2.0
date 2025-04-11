import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Menu from './Menu'
import NotesBody from './NotesBody'
import { NoteArrayType } from './Types'
import { AppContext } from './Context'
import SavedItems from './SavedItems'


function App() {

  const [savedArray,setSavedArray] = useState<NoteArrayType[]>([])

  const [remove,setRemove] = useState(false)
  const [save,setSave] = useState(false)
  const [storedPage,setStoredPage] = useState(false)

  // Save the Array to Local Storage

  useEffect(()=>{
    const data = localStorage.getItem("Notes_Array")
    if (data){
      setSavedArray(JSON.parse(data))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Notes_Array",JSON.stringify(savedArray))
  },[savedArray])
  

  return (
    <AppContext.Provider value={{
        NoteArray:{savedArray,setSavedArray},
        DeleteFunction:{remove,setRemove},
        SavedFunction:{save,setSave},
        StoredPage:{storedPage,setStoredPage}}}>
          
      <main className='relative min-h-screen bg-[#f4f4f4]'>
        <Header/>
        {storedPage === true?<SavedItems/>:<NotesBody/>}
        <div className='absolute bottom-25 sm:bottom-10 w-full'>
          <Menu/>
        </div>
      </main>
    </AppContext.Provider>
  )
}

export default App
