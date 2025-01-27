import { useMutation } from "@tanstack/react-query"
import { fetchDataBase } from "@setting/superbase"
import { useContextSetting, useContextState } from "../hooks/Context"
import { isEdit } from "../utils/tools"
import Input from "@ui-system/inputs/Text"
import TextArea from "@ui-system/inputs/Textarea"
import ButtonAction from "@ui-system/buttons/Action"
import ButtonBorder from "@ui-system/buttons/Border"
import IconDollar from "@assets/icons/Dollar.svg?react"
import type { InitialData, Data } from "../environment/types/reducer"

export default function FormCustom() {
  const {
    setting: { panel },
    setSetting
  } = useContextSetting()
  const {
    state: { currentProfile },
    setState
  } = useContextState()
  const status = isEdit(panel.status)

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: Data) => {
      if (status) {
        return fetchDataBase.from('profiles').update(value).eq('id', value.id)
      }
      return (await fetchDataBase.from('profiles').insert(value)).data
    },
    onSuccess(...response) {
      if (status) {
        setState({ type: 'edit-profile', payload: response[1] })
      } else {
        setState({ type: 'add-profile', payload: response[1] })
      }
      handlerToggle()
    },
  })

  const handlerSend = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target
    if (target instanceof HTMLFormElement) {
      const recoveredFormData = Object.fromEntries(new FormData(target)) as InitialData
      const finalData: Data = status && currentProfile ?
        {
          ...recoveredFormData,
          id: currentProfile?.id,
          date: currentProfile?.date
        } :
        {
          ...recoveredFormData,
          id: crypto.randomUUID(),
          date: new Date().toJSON(),
        }
      mutate(finalData)
    }
  }

  const handlerToggle = () => {
    if (currentProfile) {
      setState({ type: "set-current-id" })
    }
    setSetting({ type: "set-panel" })
  }

  if (!panel.show) { return }

  return (
    <div className="absolute z-50 flex size-full">
      <span className="block flex-1 bg-white/80" onClick={handlerToggle}></span>
      <div className="flex-1 flex flex-col max-w-md border-l border-gry-200 bg-white">
        <div className="mt-4 mb-2 px-4">
          <h1 className="flex items-center gap-2">
            {panel.status == "add" ? "Add instance" : "Edit instance"}
          </h1>
        </div>
        <form id="user-input" className="flex-1 px-4 space-y-2 overflow-auto" onSubmit={handlerSend}>
          <Input
            type="text"
            name="name"
            label="Instance name"
            placeholder="Debts payment"
            defaultValue={status ? currentProfile?.name : ""}
            maxLength={32}
            autoComplete="off"
            autoFocus
            disabled={isPending}
          />
          <TextArea
            name="description"
            label="Description"
            placeholder="Debts to pay"
            defaultValue={status ? currentProfile?.description : ""}
            maxLength={64}
            disabled={isPending}
          />
          <Input
            type="number"
            name="budget"
            label="Budget"
            placeholder="0"
            defaultValue={status ? currentProfile?.budget : ""}
            min={1}
            step={0.01}
            required
            disabled={isPending}
            iconConfig={{ icon: <IconDollar className="size-5" strokeWidth={1} /> }}
            hintConfig={{ show: false }}
          />
        </form>

        <div className="flex gap-xs px-4 py-2 border-t border-inherit">
          <ButtonBorder onClick={handlerToggle}>Cancel</ButtonBorder>
          <ButtonAction form="user-input" disabled={isPending}>
            {isPending ?
              <>
                <svg
                  className="animate-spin size-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {status ? "Editing" : "Adding"}
              </> :
              status ? "Edit" : "Add"
            }
          </ButtonAction>
        </div>
      </div>
    </div>
  )
}