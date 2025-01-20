import { useContext } from "react"
import { ContextState, ContextSetting } from "../environment"
import type { ReturnState, ReturnSetting } from "../environment/types/reducer"
 
export const useContextState = () => useContext<ReturnState>(ContextState)
export const useContextSetting = () => useContext<ReturnSetting>(ContextSetting)