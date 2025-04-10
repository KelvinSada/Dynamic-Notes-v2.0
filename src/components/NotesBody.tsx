import React, { useContext, useEffect } from "react"
import { useState,useRef } from "react"
import { DeleteContext } from "./Context"

type NotesType = {
  id:number,
  title:string,
  body:string,
  total:number,
  date:string,
  time:string,
  editable:boolean,
}

const NotesBody = () => {
    const {remove,setRemove} = useContext(DeleteContext)

  const [currentNotes,setCurrentNotes] = useState<NotesType>({
    id:0,
    title:"",
    body:"",
    total:0,
    date:"",
    time:"",
    editable:false,
  })

  useEffect(()=>{
    if (remove === true){
      setCurrentNotes({
        id:0,
        title:"",
        body:"",
        total:0,
        date:"",
        time:"",
        editable:false,
      })
    } else{
       null
    }
  },[remove])
  

  const totalRef = useRef<number>(0)
  
  // Display Amount
  const displayAmount =`${currentNotes.total > 0?"₦ ":""}`+currentNotes.total.toLocaleString("en-US");


  // Making the Dynamic Notes Work

  const getContent =  (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const values = e.target.value
    setCurrentNotes((prev)=>{
      return {
        ...prev,
        editable:true,
        body:values,
      }
    })
    
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
    console.log(title)

    setCurrentNotes(prev=>{
      return{
        ...prev,
        title:title,
      }
    })
  }

  // Handling the Date snd Time
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
  // setCurrentNotes(prev=>{
  //   return{
  //     ...prev,
  //     date:CurrentDate,
  //     time:CurrentTime,
  //   }
  // })
  
  // Save Current Notes to Local Storage

  useEffect(()=>{
    const data = localStorage.getItem("Current-Notes-Saved")
    console.log
    if (data){
      const resource = JSON.parse(data);
      console.log(resource)
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
      className="py-3 w-full text-2xl font-medium border-none outline-none placeholder-gray-400 bg-transparent" 
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
        <p className="font-medium text-blue-600" id="total">
          Total: {displayAmount}
        </p>
      </div>
    </div>
  
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
