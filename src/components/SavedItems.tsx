import { AppContext } from "./Context"
import NoteItem from "./NoteItem"
import { useContext, useState } from "react"

const SavedItems = () => {

  const {NoteArray:{savedArray}} = useContext(AppContext)
  const [pickedNote,setPickedNote] = useState<number|null>(null)

  return (
    <div className=" w-[92%] mx-auto">
      <h1 className="text-3xl px-3 py-3 text-gray-700 ">Saved Items</h1>

      {savedArray.length > 0? 
      <div className="pb-40 grid grid-col-1 sm:grid-cols-2 gap-2 ">
        {savedArray.map((items)=>{
          // console.log(savedArray)
          return(
            <NoteItem pickedNote={pickedNote} setpickedNote={setPickedNote} key={items.id} values={items}/>
          )
        })}
      </div>:
      <div className="w-full pt-15  flex justify-center">
        <img className="w-[50%]" src="out-of-stock.png" alt="work in progress"/>
      </div>}
    </div>

   
  )
}

export default SavedItems
