import { createContext } from "react";
import { DeleteType } from "./Types";


export const DeleteContext = createContext<DeleteType>({
  remove:false,
  setRemove:()=>{},
})