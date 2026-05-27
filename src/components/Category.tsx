import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import NotesTopBar from "./NotesTopBar";
// import { motion } from "motion/react"

const Category = () => {
const [showCategory,setShowCategory] = useState<boolean>(false)
const categoryTogggle =()=>{
    setShowCategory(prev=>!prev)
  }

  // Saving the show crtegory to local storage
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
    <>
    <div onClick={categoryTogggle} className="text-cyan-800 border-cyan-200 flex my-1 justify-between items-center bg-cyan-50  px-4 py-2 rounded-md border">
      <p>{!showCategory?"Add new Category":"Collapse categories"}</p>
      <button >
        {showCategory?<FaAngleUp />:<FaAngleDown />}
      </button>
    </div>
    {showCategory=== true?<NotesTopBar toggleCategory={showCategory}/>:null}
  </>
  )
}

export default Category
