import { useReducer } from 'react'
import { ContextState, ContextSetting } from "./context"
import {
  reducerState,
  initialState,
  reducerSetting,
  initialSetting
} from "./reducer"

type Props = { children: React.ReactNode }

export function ContextStateProvider(props: Props) {
  const [state, setState] = useReducer(reducerState, initialState)
  return (
    <ContextState.Provider value={{ state, setState }}>
      {props.children}
    </ContextState.Provider>
  )
}

export function ContextSettingProvider(props: Props) {
  const [setting, setSetting] = useReducer(reducerSetting, initialSetting)
  return (
    <ContextSetting.Provider value={{ setting, setSetting }} >
      {props.children}
    </ContextSetting.Provider>
  )
}