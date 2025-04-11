
// Notes Type that is stored in an Array
export type NoteArrayType = NotesType & {
  id :number
}

// Current Notes in NotesBody.tsx
export type NotesType = {
  title:string,
  body:string,
  total:number,
  date:string,
  time:string,
  // editable:boolean,
}

// Go to Stored Value
export type StoredPageToggle ={
  storedPage:boolean,
  setStoredPage:React.Dispatch<React.SetStateAction<boolean>>;
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