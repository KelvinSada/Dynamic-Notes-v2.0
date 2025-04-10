
// Current Notes in NotesBody.tsx
export type NotesType = {
  id:number,
  title:string,
  body:string,
  total:number,
  date:string,
  time:string,
  editable:boolean,
}

// Delete Context used in Context.ts
export type DeleteType = {
  remove:boolean,
  setRemove:React.Dispatch<React.SetStateAction<boolean>>;
}