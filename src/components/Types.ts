
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
  // editable:boolean,
}

// Pages Toggle
export type Pages= "home" | "saved" | "settings"

// Go to Stored Value
export type StoredPageToggle ={
  storedPage:Pages,
  setStoredPage:React.Dispatch<React.SetStateAction<Pages>>;
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