import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Menu from './Menu'
import NotesBody from './NotesBody'
import { NoteArrayType, Pages,NotesSelected, NotesType,DisplayItems } from './Types'
import { AppContext } from './Context'
import SavedItems from './SavedItems'
import Settings from './Settings'
import NewCategoryDialogBox from './NewCategory'
  // export getNotes=()=>{}

function App() {

  const [savedArray,setSavedArray] = useState<NoteArrayType[]>([])

  const [remove,setRemove] = useState(false)   // Delete a Notes from the Main current Notes Page
  // const [save,setSave] = useState(false)      // Save the Current Notes and Clear the Page Empty
  const [currentPage,setCurrentPage] = useState<Pages>("home")   // Go to the Storage Page

  const [currentNotes,setCurrentNotes] = useState<NotesType>({
    id:0,
    title:"",
    body:"",
    total:0,
    date:"",
    time:"",
    dynamicItems:[],
    status:"active",
  })

  const [tests,setTests] = useState<{
    name:string,
    class:string
  }>({
    name:"",
    class:""
  })

  const [categoryToggle,setCategoryToggle] = useState(false) // Add Category Toggle in Notes
  // const [categoryId,setCategoryId]

    const [displayNotes,setDisplayNotes] = useState<DisplayItems>({
    note:"",
    total:0,
  })

  const [viewNotes,setViewNotes] = useState<NotesSelected>({
    notesId:null,
    notePickedToggle:false,
  })   // Click a Notes from the saved Notes Menu to view in the Main Notes Page

  useEffect(()=>{
      setCurrentPage("home")
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

  // Save Display Notes to Local Storage
  useEffect(()=>{
    const data = localStorage.getItem("Displayed_Items")
    // console.log(data)
    if (data){
       const response = JSON.parse(data)
      setDisplayNotes(response)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Displayed_Items",JSON.stringify(displayNotes))
  },[displayNotes])

  //  Save Current Notes to Local Storage

  useEffect(()=>{
    const data = localStorage.getItem("Current-Notes-Saved")
    if (data){
      const resource = JSON.parse(data);
      setCurrentNotes(resource)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Current-Notes-Saved",JSON.stringify(currentNotes))
  },[currentNotes,currentNotes.dynamicItems])
  
  return (
    <AppContext.Provider value={{
        NoteArray:{savedArray,setSavedArray},
        DeleteFunction:{remove,setRemove},
        SelectCurrentPage:{currentPage,setCurrentPage},
        AccessSavedNotes:{viewNotes,setViewNotes},
        AddCategoryToggle:{categoryToggle,setCategoryToggle},
        CurrentEditableNotes:{currentNotes,setCurrentNotes},
        DisplayNotesAndTotal:{displayNotes,setDisplayNotes},
        Testing:{tests,setTests},
      }}>
        <main className='relative flex flex-col min-h-screen bg-[#f4f4f4]'>
          {categoryToggle&&<NewCategoryDialogBox/>}
          <Header/>
          {currentPage === "home"?<NotesBody/>:
          currentPage === "saved"?<SavedItems/>:
          <Settings/>}
          <Menu/>
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