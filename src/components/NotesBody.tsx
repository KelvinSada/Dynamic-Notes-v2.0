import React, { useContext, useEffect, useState } from "react"
import { useRef } from "react"
import { AppContext } from "./Context"
import NotesTopBar from "./NotesTopBar"
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa"

const NotesBody = () => {
    const {DeleteFunction:{setRemove},
    CurrentEditableNotes:{currentNotes,setCurrentNotes},
    DisplayNotesAndTotal:{displayNotes,setDisplayNotes}
  } = useContext(AppContext)

const [showCategory,setShowCategory] = useState<boolean>(false)

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
  
  const totalRef = useRef<number>(0)
  
  // Display Amount
  const displayAmount =`${displayNotes.total > 0?"₦ ":""}`+displayNotes.total.toLocaleString("en-US");

  
  // Making the Dynamic Notes Work

  const getContent =  (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const values = e.target.value

   
    if (currentNotes.status === "active"){
      setCurrentNotes((prev)=>{
        return {
          ...prev,
          time:CurrentTime,
          date:CurrentDate,
          body:values,
        }
      })

       setDisplayNotes((prev)=>{
        return{
          ...prev,
          note:values,
        }
      }) 
    } else {

         setCurrentNotes((prev)=>{
          return{
            ...prev,
            dynamicItems:prev.dynamicItems.map(item=>{
              if (item.status === "active"){
                item.categoryBody = values


              } else null
              return item
            })
          }
        })

        setDisplayNotes((prev)=>{
          return{
            ...prev,
            note:values,
          }
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

      if (currentNotes.status === "active"){
        setCurrentNotes(prev=>{
          return{
            ...prev,
            total : totalRef.current
          }
        })
        setDisplayNotes(prev=>{
          return{
            ...prev,
            total: totalRef.current,
          }
        })
      } else {
        setCurrentNotes((prev)=>{
          return{
            ...prev,
            dynamicItems:prev.dynamicItems.map(item=>{
              if (item.status === "active"){
                item.categoryTotal = totalRef.current
              } else null
              return item
            })
          }
        })

        setDisplayNotes((prev)=>{
          return{
            ...prev,
            total:totalRef.current,
          }
        })
      }
    
    } else{
      return null
    }
  }
  // adding up
  const getTotal = (total:number,num:number) =>{
    return total+num;
  }

  // Hnadle Notes and Total Display
 
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

  const categoryTogggle =()=>{
    setShowCategory(prev=>!prev)
  }

  useEffect(()=>{
    const data = localStorage.getItem("show-Category")
    if (data){
      setShowCategory(JSON.parse(data))
    }
  },[])
  // console.log(currentNotes)
  useEffect(()=>{
    localStorage.setItem("show-Category",JSON.stringify(showCategory))
  },[showCategory])

  return (
  <div className="flex flex-col w-full md:w-[70%] mx-auto px-4 pt-6 pb-15">
    <input 
      type="text" 
      value={currentNotes.title}
      onChange={handleTitle}
      className="pb-3 w-full text-2xl font-medium border-none outline-none placeholder-gray-400 bg-transparent" 
      placeholder="Title" 
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
  <div onClick={categoryTogggle} className="text-cyan-800 border-cyan-200 flex my-1 justify-between items-center bg-cyan-50  px-4 py-2 rounded-md border">
    <p>{!showCategory?"Add new Category":"Collapse categories"}</p>
    <button >
      {showCategory?<FaAngleUp />:<FaAngleDown />}
    </button>
  </div>
  {showCategory=== true?<NotesTopBar/>:null}

    <textarea 
      className="mt-4 px-4 pt-4 pb-10 text-lg text-gray-700 placeholder-gray-400 bg-gray-50 rounded-lg 
                outline-none w-full border border-gray-200 focus:border-blue-300 
                resize-none min-h-[60vh] leading-relaxed"
      value={displayNotes.note} 
      onChange={getContent} 
      name="body" 
      placeholder="Calculate as you type. No extra steps ⚡" 
      id="dynamic-note"
    ></textarea>
  </div>
  )
}

export default NotesBody
