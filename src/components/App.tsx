import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Menu from './Menu'
import NotesBody from './NotesBody'
import { NoteArrayType, Pages,NotesSelected, NotesType, NotesCategory } from './Types'
import { AppContext } from './Context'
import SavedItems from './SavedItems'
import Settings from './Settings'
import NewCategoryDialogBox from './NewCategory'


function App() {

  const [savedArray,setSavedArray] = useState<NoteArrayType[]>([])

  const [remove,setRemove] = useState(false)   // Delete a Notes from the Main current Notes Page
  const [save,setSave] = useState(false)      // Save the Current Notes and Clear the Page Empty
  const [storedPage,setStoredPage] = useState<Pages>("home")   // Go to the Storage Page

  const [currentNotes,setCurrentNotes] = useState<NotesType>({
    id:0,
    title:"",
    body:"",
    total:0,
    date:"",
    time:"",
    dynamicItems:[],
    currentNote:{
      categoryId: 0,
      categoryName: '',
      categoryBody: '',
      categoryTotal: 0
    }
  })

  const [categoryToggle,setCategoryToggle] = useState(false) // Add Category Toggle in Notes
  // const [categoryId,setCategoryId]
  const [notesCategorySelected, setNotesCategorySelected] = useState<NotesCategory>({
    categoryId: 0,
    categoryName: "",
    categoryBody: "",
    categoryTotal: 0,
  })

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
        AddCategoryToggle:{categoryToggle,setCategoryToggle},
        CurrentEditableNotes:{currentNotes,setCurrentNotes},
        SelectedNotesCategory:{notesCategorySelected,setNotesCategorySelected}}}>
          
        {/* Add Category Dialog Box */}
        {categoryToggle&&<NewCategoryDialogBox/>}
        
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