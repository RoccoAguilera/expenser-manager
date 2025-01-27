import type {
  State,
  ActionState,
  Data,
  Setting,
  ActionSetting,
} from "./types/reducer";

/* Initial state when created */
export const initialState: State = { profiles: [], currentProfile: undefined }
export const initialSetting: Setting = { panel: { show: false, status: "add" } }

/* Global State Handler */
export const reducerState = (state: State, action: ActionState): State => {
  const { profiles } = state
  const { type, payload } = action

  if (type == "add-profile") {
    return { ...state, profiles: [...profiles, payload] }
  }

  if (type == "remove-profile") {
    const newProfiles = profiles.filter(({ id }) => id != payload)
    return { profiles: newProfiles }
  }

  if (type == "set-profile" && payload) {
    return { ...state, profiles: payload }
  }

  if (type == "set-current-id") {
    return { ...state, currentProfile: payload }
  }

  if (type == "edit-profile") {
    const newProfile = state.profiles.map<Data>(item => {
      if (item.id == payload.id) {
        return {
          ...item,
          name: payload.name,
          description: payload.description,
          budget: payload.budget
        }
      }
      return item
    })
    return { ...state, profiles: newProfile }
  }

  return state
}

/* Global setting handler */

export const reducerSetting = (state: Setting, action: ActionSetting): Setting => {
  const { panel } = state
  const { type, payload } = action

  if (type == "set-panel") {
    return { ...state, panel: { show: !panel.show, status: payload ?? "add" } }
  }

  return state
}