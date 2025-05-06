import { createContext } from "react";
import { AddCategoryToggle, AppSavedType, DeleteType, SavedType,StoredPageToggle, ViewSavedNotes, GlobalCurrentNotes } from "./Types";

type AppContextType = {
  NoteArray:AppSavedType,
  DeleteFunction:DeleteType,
  SavedFunction:SavedType,
  StoredPage:StoredPageToggle,
  AccessSavedNotes:ViewSavedNotes,
  AddCategoryToggle:AddCategoryToggle,
  CurrentEditableNotes:GlobalCurrentNotes,
}

export const AppContext = createContext<AppContextType>({
  NoteArray:{
    savedArray: [],
    setSavedArray:()=>{}
  },
  DeleteFunction:{
    remove:false,
  setRemove:()=>{},
  },
  SavedFunction:{
    save:false,
    setSave:()=>{}
  },
  StoredPage:{
    storedPage:"home",
    setStoredPage:()=>{},
  },
  AccessSavedNotes:{
    viewNotes:{
      notesId:null,
      notePickedToggle:false,
    },
    setViewNotes: ()=>{},
  },
  AddCategoryToggle:{
    categoryToggle:false,
    setCategoryToggle:()=>{},
  },
  CurrentEditableNotes:{
      currentNotes:{
        id:0,
        title:"",
        body:"",
        total:0,
        date:"",
        time:"",
        dynamicItems:[]
      },
      setCurrentNotes:()=>{}}
})
