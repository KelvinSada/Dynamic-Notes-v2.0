import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Menu from './Menu'
import NotesBody from './NotesBody'
import { NoteArrayType, Pages,NotesSelected } from './Types'
import { AppContext } from './Context'
import SavedItems from './SavedItems'
import Settings from './Settings'
import NewCategoryDialogBox from './NewCategory'


function App() {

  const [savedArray,setSavedArray] = useState<NoteArrayType[]>([])

  const [remove,setRemove] = useState(false)   // Delete a Notes from the Main current Notes Page
  const [save,setSave] = useState(false)      // Save the Current Notes and Clear the Page Empty
  const [storedPage,setStoredPage] = useState<Pages>("home")   // Go to the Storage Page

  const [categoryToggle,setCategoryToggle] = useState(false) // Add Category Toggle in Notes

  const [viewNotes,setViewNotes] = useState<NotesSelected>({
    notesId:null,
    notePickedToggle:false,
  })   // Click a Notes from the saved Notes Menu to view in the Main Notes Page

  useEffect(()=>{
      setStoredPage("home")
    
  },[viewNotes.notePickedToggle])

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
        AccessSavedNotes:{viewNotes,setViewNotes},
        AddCategoryToggle:{categoryToggle,setCategoryToggle}}}>
          
        {/* Add Category */}
        {categoryToggle&&<NewCategoryDialogBox/>}


        
        {/* <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-80">
  <input 
    type="text" 
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    placeholder="Category name"
  />
  <p className="text-gray-600 mb-4">Hello</p>
  <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
    Add Category
  </button>
</div> */}

      <main className='relative min-h-screen bg-[#f4f4f4]'>
        <Header/>
        {storedPage === "home"?<NotesBody/>:
        storedPage === "saved"?<SavedItems/>:
        <Settings/>}
        <div className='fixed bottom-25 sm:bottom-10 w-full'>
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