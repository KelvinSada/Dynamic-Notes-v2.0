import NoteItem from "./NoteItem"


const SavedItems = () => {
  return (
    <div className=" w-[92%] mx-auto">
      <h1>Saved Items</h1>

      <div className="grid grid-col-1 sm:grid-cols-2 gap-2 ">
        <NoteItem/>
        <NoteItem/>
        <NoteItem/>
      </div>
    </div>

   
  )
}

export default SavedItems
