import { AppContext } from "./Context"
import NoteItem from "./NoteItem"
import { useContext } from "react"

const SavedItems = () => {

  const {NoteArray:{savedArray}} = useContext(AppContext)


  return (
    <div className=" w-[92%] mx-auto">
      <h1>Saved Items</h1>

      <div className="grid grid-col-1 sm:grid-cols-2 gap-2 ">
        {savedArray.map((items)=>{
          return(
            <NoteItem key={items.id} values={items}/>
          )
        })}
      </div>
    </div>

   
  )
}

export default SavedItems
