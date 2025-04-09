import React from "react"
import { useState,useRef } from "react"

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
  
  const [currentNotes,setCurrentNotes] = useState<NotesType>({
    id:0,
    title:"",
    body:"",
    total:0,
    date:"",
    time:"",
    editable:false,
  })

  const totalRef = useRef<number>(0)
  
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


  return (
    <div className="container w-[92%] m-auto">
      <input type="text" className="w-full border-none outline-none" placeholder="Title" name="title"></input>
      <textarea className="text-lg bg-[#f4f4f4] outline-hidden w-full items-center text-[rgb(77,76,76)] 
      leading-[200%] border-transparent resize-none h-[70vh] my-3 " value={currentNotes.body} onChange={getContent} name="body" placeholder="Start typing" id="dynamic-note"></textarea>
      <div className="text-area">
        <p className="total" id="total">{currentNotes.total}</p>
      </div>
  </div>
  )
}

export default NotesBody
