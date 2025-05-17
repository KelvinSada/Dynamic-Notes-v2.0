import React, { useContext, useEffect } from "react"
import { useState,useRef } from "react"
import { AppContext } from "./Context"
import { NoteArrayType, NotesCategory } from "./Types"
import NotesTopBar from "./NotesTopBar"


const NotesBody = () => {
    const {DeleteFunction:{remove,setRemove},
    SavedFunction:{save,setSave},
    NoteArray:{savedArray,setSavedArray},
    AccessSavedNotes:{viewNotes,setViewNotes},
    CurrentEditableNotes:{currentNotes,setCurrentNotes},
    SelectedNotesCategory:{notesCategorySelected}} = useContext(AppContext)


// Handling the Date and Time
const Month = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const getDay = new Date().getDate()
const getMonth = new Date().getMonth()
// const getFullYear = new Date().getFullYear()

const getMinute = new Date().getMinutes()
let minute:number|string
if (getMinute < 10){
  minute = `0${getMinute}`
} else{
  minute = getMinute
}

const getHour = new Date().getHours()

let hours:number|string
let zone:string

if (getHour < 12){
  if (getHour < 10){
    hours = `0${getHour}`
  } else{
    hours = getHour
  }
  zone = "AM"
} else if (getHour === 12){
  hours = getHour
  zone = "PM"
} else if (getHour === 24){
  hours = `00`
  zone = "AM"
} else{
  hours = (getHour - 12)
  zone = "PM"
}

const CurrentDate = `${getDay} ${Month[getMonth]}`
const CurrentTime = `${hours}:${minute} ${zone}`
  

  // Saving and Clearing Data with the NewToggle
  
    const notesIdRef = useRef<number>(0) 
  
    useEffect(()=>{
    
    notesIdRef.current = savedArray.length+1

    if (currentNotes.body.length > 0 && currentNotes.id === 0){
      
      const currentNotesDuplicate = {...currentNotes}

      currentNotesDuplicate.id = notesIdRef.current
      
      setTimeout(()=>{
        setSavedArray((prev)=>{
          return[currentNotesDuplicate,...prev]
        }) 
        setSave(false)
        
         setCurrentNotes({
          id:0,
          title:"",
          body:"",
          total:0,
          date:"",
          time:"",
          dynamicItems:[],
          currentNote:{
            categoryId: 0,
            categoryName: "",
            categoryBody: "",
            categoryTotal: 0
          }
      })
    },100)
    
  } else if ( currentNotes.body.length > 0 && currentNotes.id > 0) {

    const savedArrayDuplicate = [...savedArray]
    
    // Removing Array with asimilar ID as the current Array
    const filteredArray = savedArrayDuplicate.filter(item=>{
      return item.id !== currentNotes.id
    })
    
    
    setSavedArray(()=>{
      return [currentNotes,...filteredArray]
    })
     
    setSave(false)
      
       setCurrentNotes({
        id:0,
        title:"",
        body:"",
        total:0,
        date:"",
        time:"",
        dynamicItems:[],
        currentNote:{
          categoryId: 0,
          categoryName: "",
          categoryBody: "",
          categoryTotal: 0
        }
    })
    
} 
},[save])


  // Acessing NotesData from a stored Notes Page into the Current Notes
  
  const [access,setAccess] = useState(false)
  useEffect(()=>{
    // console.log(`${viewNotes} just rendered`)
    
    if (viewNotes && viewNotes.notePickedToggle === true){
      savedArray.forEach(getItem)
    }
  },[viewNotes.notePickedToggle,access])
  
  const getItem =(item:NoteArrayType)=>{
    const arrayId = item.id

    if (arrayId === viewNotes.notesId){
      console.log(item)
      setAccess(true)                // To make this rerender and update
      const {body,title,total,id} = item

      setCurrentNotes({
        id:id,
        title:title,
        body:body,
        total:total,
        date:CurrentDate,
        time:CurrentTime,
        dynamicItems:[],
        currentNote:{
          categoryId: 0,
          categoryName: "",
          categoryBody: "",
          categoryTotal: 0
        }
      })

      setTimeout(()=>{
        setViewNotes(prev=>{
          return{
            ...prev,
            notePickedToggle:false,
          }
        })
      },100)
    }
  }

  // Clearing Data with the Delete Menu Toggle
  
  useEffect(()=>{
      setCurrentNotes({
        id:0,
        title:"",
        body:"",
        total:0,
        date:"",
        time:"",
        dynamicItems:[],
        currentNote:{
          categoryId: 0,
          categoryName: "",
          categoryBody: "",
          categoryTotal: 0
        }
      })
    } 
  ,[remove])
  
  const totalRef = useRef<number>(0)
  
  // Display Amount
  const displayAmount =`${currentNotes.total > 0?"₦ ":""}`+currentNotes.total.toLocaleString("en-US");

  
  // Making the Dynamic Notes Work

    const NotesCategoryRef = useRef<NotesCategory>({
      categoryId: 0,
      categoryName: "",
      categoryBody: "",
      categoryTotal: 0,
    })

  const getContent =  (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const values = e.target.value
    // setCurrentNotes(NotesRef.current)
   
      setCurrentNotes((prev)=>{
        return {
          ...prev,
          time:CurrentTime,
          date:CurrentDate,
          body:values,
        }
      })

      NotesCategoryRef.current = {
          categoryId: notesCategorySelected.categoryId,
          categoryName: notesCategorySelected.categoryName,
          categoryBody: values,
          categoryTotal: 0,
        }

      if (notesCategorySelected.categoryId === 0){
        setCurrentNotes(prev=>{
          return{
            ...prev,
            currentNote:{
              categoryId:prev.currentNote.categoryId,
              categoryName:prev.currentNote.categoryName,
              categoryBody:values,
              categoryTotal:prev.currentNote.categoryTotal,
            }
          }
        })
       
      } else if (notesCategorySelected.categoryId > 0.1){
         setCurrentNotes((prev)=>{
          currentNotes.dynamicItems.forEach((item)=>{
            if (item.categoryId === notesCategorySelected.categoryId){
                item.categoryBody = NotesCategoryRef.current.categoryBody,
                item.categoryTotal = NotesCategoryRef.current.categoryTotal
          }
        })
        return prev
      })
      }
    getNumbers(values)
    setRemove(false)
  }


  
  const getNumbers = (texts:string)=>{
    
    const fetchNumbers = texts.replace(/(\d+)[,]?(\d+)[,]?(\d+)/g,"$1$2$3");  //Remove comma
    const stringedNumbers = fetchNumbers.match(/\d+/g)   //Match the numbers into Arrays
    
    if (stringedNumbers){
      let numbersArray = stringedNumbers.map(x => parseInt(x));
      let numbersAbove50 = numbersArray.filter(x => x >= 50);
      const totalNumber = numbersAbove50.reduce(getTotal,0)
      totalRef.current = totalNumber;
      setCurrentNotes(prev=>{
        return{
          ...prev,
          total : totalRef.current
        }
      })

      if (notesCategorySelected.categoryId === 0){
        setCurrentNotes(prev=>{
          return{
            ...prev,
            currentNote:{
              categoryId:prev.currentNote.categoryId,
              categoryName:prev.currentNote.categoryName,
              categoryBody:prev.currentNote.categoryBody,
              categoryTotal:totalRef.current,
            }
          }
        })
      } else if (notesCategorySelected.categoryId > 0.1){
        setCurrentNotes((prev)=>{
          currentNotes.dynamicItems.forEach((item)=>{
              if (item.categoryId === notesCategorySelected.categoryId){
                  item.categoryBody = NotesCategoryRef.current.categoryBody,
                  item.categoryTotal = totalRef.current
           }
        })
        return prev
      })
      }
    } else{
      return null
    }
  }
  const getTotal = (total:number,num:number) =>{
    return total+num;
  }


  // Get Title
  const handleTitle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const title = e.target.value;

    setCurrentNotes(prev=>{
      return{
        ...prev,
        title:title,
      }
    })
  }


  // Save Current Notes to Local Storage

  useEffect(()=>{
    const data = localStorage.getItem("Current-Notes-Saved")
    if (data){
      const resource = JSON.parse(data);
      setCurrentNotes(resource)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Current-Notes-Saved",JSON.stringify(currentNotes))
  },[currentNotes])

 

  return (
  <div className="flex flex-col w-full md:w-[70%] mx-auto px-4 py-6">
    <input 
      type="text" 
      value={currentNotes.title}
      onChange={handleTitle}
      className="pb-3 w-full text-2xl font-medium border-none outline-none placeholder-gray-400 bg-transparent" 
      placeholder="Note Title" 
      name="title"
   />

    <div className="flex justify-between items-center text-sm text-gray-500">
      <div className="flex items-center gap-3">
        <p className="font-medium">{CurrentDate}</p>
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        <p>{CurrentTime}</p>
      </div>

      <div className="px-3 py-1 bg-blue-50 rounded-full">
        <p className="font-medium text-blue-600 text-[16px]" id="total">
          Total: {displayAmount}
        </p>
      </div>
    </div>
  
  <NotesTopBar/>

    <textarea 
      className="mt-4 p-4 text-lg text-gray-700 placeholder-gray-400 bg-gray-50 rounded-lg 
                outline-none w-full border border-gray-200 focus:border-blue-300 
                resize-none min-h-[60vh] leading-relaxed"
      value={currentNotes.body} 
      onChange={getContent} 
      name="body" 
      placeholder="Start writing.." 
      id="dynamic-note"
    ></textarea>
  </div>
  )
}

export default NotesBody
