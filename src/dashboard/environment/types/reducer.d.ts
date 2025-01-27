import type { Database } from "@setting/types/supabase"

// type for global state
type Data = Database["public"]["Tables"]["profiles"]["Row"]
export type InitialData = { name: string; description: string; budget: string }

export type State = {
  profiles: Data[],
  currentProfile?: Data
}

export type ActionState =
  { type: "add-profile", payload: Data } |
  { type: "remove-profile", payload: Data["id"] } |
  { type: "set-profile", payload: Data[] | null } |
  { type: "set-current-id", payload?: Data } |
  { type: "edit-profile", payload: Data }

export type ReturnState = { state: State, setState: React.Dispatch<ActionState> }

// type for global setting

export type InitialSetting = { show: boolean; status: "add" | "edit" }

export type Setting = { panel: InitialSetting }

export type ActionSetting = { type: "set-panel", payload?: InitialSetting["status"] }

export type ReturnSetting = { setting: Setting, setSetting: React.Dispatch<ActionSetting> }