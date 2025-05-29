import { createContext } from "react";
import { AddCategoryToggle, AppSavedType, DeleteType,CurrentPageType, ViewSavedNotes, GlobalCurrentNotes, ShowDisplayedItemsType } from "./Types";

type AppContextType = {
  NoteArray:AppSavedType,
  DeleteFunction:DeleteType,
  SelectCurrentPage:CurrentPageType,
  AccessSavedNotes:ViewSavedNotes,
  AddCategoryToggle:AddCategoryToggle,
  CurrentEditableNotes:GlobalCurrentNotes,
  DisplayNotesAndTotal:ShowDisplayedItemsType,
  Testing:{
    tests:{
      name:string,
      class:string,
    },
    setTests: React.Dispatch<React.SetStateAction<{
    name: string;
    class: string;
}>>
  }
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
  SelectCurrentPage:{
    currentPage:"home",
    setCurrentPage:()=>{},
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
      dynamicItems:[],
      status:"not active",
    },
    setCurrentNotes:()=>{}},
  DisplayNotesAndTotal:{
    displayNotes:{
      note:"",
      total:0,
    },
    setDisplayNotes:()=>{},
  },
  Testing:{
    tests:{
      name:"",
      class:""
    },
    setTests:()=>{}
  }
})
