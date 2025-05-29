
// Notes Type that is stored in an Array
export type NoteArrayType = NotesType & {
  id :number
}

// Current Notes in NotesBody.tsx
export type NotesType = {
  id:number,
  title:string|undefined,
  body:string,
  total:number,
  date:string,
  time:string,
  dynamicItems:NotesCategoryMain[]
  status:"active"|"not active"
}

// Current Notes Category with Active
export type NotesCategoryMain = {
  categoryId:number
  categoryName:string,
  categoryBody:string,
  categoryTotal:number,
  status:"active" | "not active"
}

export type DisplayItems = {
  note:string,
  total:number,
}

export type ShowDisplayedItemsType={
  displayNotes:DisplayItems,
  setDisplayNotes:React.Dispatch<React.SetStateAction<DisplayItems>>,
}
// Notes Category Seperate
export type NotesCategory ={
  categoryId:number
  categoryName:string,
  categoryBody:string,
  categoryTotal:number,
}

// Selected Notes Category Toggle
export type SelectedNotesCategory ={
  notesCategorySelected:{
    categoryId:number
    categoryName:string,
    categoryBody:string,
    categoryTotal:number,
  },
  setNotesCategorySelected:React.Dispatch<React.SetStateAction<NotesCategory>>,

}

// Current Notes global state
export type GlobalCurrentNotes = {
  currentNotes: NotesType,
  setCurrentNotes: React.Dispatch<React.SetStateAction<NotesType>>
}

// Pages Toggle
export type Pages= "home" | "saved" | "settings"

// Go to Stored Value
export type CurrentPageType ={
  currentPage:Pages,
  setCurrentPage:React.Dispatch<React.SetStateAction<Pages>>;
}

// Delete Context used in Context.ts
export type DeleteType = {
  remove:boolean,
  setRemove:React.Dispatch<React.SetStateAction<boolean>>;
}
// Saved Menu Toggle
export type SavedType = {
  save:boolean,
  setSave:React.Dispatch<React.SetStateAction<boolean>>;
}

// Saved Array
export type AppSavedType = {
  savedArray: NoteArrayType[],
  setSavedArray:React.Dispatch<React.SetStateAction<NoteArrayType[]>>
}

//View saved Notes
export type NotesSelected = {
    notesId:null|number,
    notePickedToggle:boolean,
}
export type ViewSavedNotes = {
  viewNotes:NotesSelected,
  setViewNotes: React.Dispatch<React.SetStateAction<NotesSelected>>
}

// Add Notes Category Toggle

export type AddCategoryToggle={
  categoryToggle:boolean,
  setCategoryToggle:React.Dispatch<React.SetStateAction<boolean>>,
}