import { useContext } from "react"
import { IoClose } from "react-icons/io5"
import { AppContext } from "./Context"

const NewCategoryDialogBox = () => {
  const {AddCategoryToggle:{setCategoryToggle}} = useContext(AppContext)

  const HangleCategoryToggle=()=>{
    setCategoryToggle(false)
  }

  return (
    <div className="z-10 p-3 shadow-md rounded-[10px] bg-white flex flex-col gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button onClick={HangleCategoryToggle} className='self-end'><IoClose /></button>
      <input placeholder='Category name' type="text" className='p-1 border border-black'/>
      <button className='w-full rounded-md bg-fuchsia-400 hover:bg-fuchsia-500'>Add Category</button>
    </div>
  )
}

export default NewCategoryDialogBox
