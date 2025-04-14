import { createContext } from "react";
import { AppSavedType, DeleteType, SavedType,StoredPageToggle, ViewSavedNotes } from "./Types";

type AppContextType = {
  NoteArray:AppSavedType,
  DeleteFunction:DeleteType,
  SavedFunction:SavedType,
  StoredPage:StoredPageToggle,
  AccessSavedNotes:ViewSavedNotes,
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
    storedPage:false,
    setStoredPage:()=>{},
  },
  AccessSavedNotes:{
    viewNotes: null,
    setViewNotes: ()=>{},
  }
})
