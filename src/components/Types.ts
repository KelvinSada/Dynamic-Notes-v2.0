
// Notes Type that is stored in an Array
export type NoteArrayType = NotesType & {
  id :number
}

// Current Notes in NotesBody.tsx
export type NotesType = {
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
export type ViewSavedNotes = {
  viewNotes: null|number,
  setViewNotes: React.Dispatch<React.SetStateAction<number | null>>
}