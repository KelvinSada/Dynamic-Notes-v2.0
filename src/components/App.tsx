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

  const [remove,setRemove] = useState(false)   // Delete a Notes from the Main current Notes Page
  const [save,setSave] = useState(false)      // Save the Current Notes and Clear the Page Empty
  const [storedPage,setStoredPage] = useState(false)   // Go to the Storage Page

  const [viewNotes,setViewNotes] = useState<number|null>(null)   // Click n a Notes from the saved Notes Menu to view in the Main Notes Page

  console.log(viewNotes)
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
        StoredPage:{storedPage,setStoredPage},
        AccessSavedNotes:{viewNotes,setViewNotes}}}>
          
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


// Make the footer fixed to the bottom of the page

// .footer{
//   position:fixed;
//   width:100%;
//   padding:2em 0;
//   background-color: red;
//   /* top:95vh; */
//   bottom:.00001vh;
//   /* display: none; */
// }