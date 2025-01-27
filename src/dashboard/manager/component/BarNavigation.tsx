import { useNavigate } from "react-router"
// import { useMutation } from "@tanstack/react-query"
// import { fetchDataBase } from "@setting/superbase"
// import { useContextSetting } from "../../hooks/Context"
import ButtonBorder from "@ui-system/buttons/Border"
import ArrowLeft from "@assets/icons/Arrow-left.svg?react"
import type { Data, ReturnState } from "../../environment/types/reducer"

type Props = { currentProfile: Data; setState: ReturnState['setState'] }

export default function BarNavigation(props: Props) {
  const navigate = useNavigate()
  // const { setSetting } = useContextSetting()
  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (id: string) => fetchDataBase.from("profiles").delete().eq("id", id),
  //   onSuccess(...response) {
  //     setState({ type: "remove-profile", payload: response[1] })
  //     handlerBack()
  //   },
  // })

  const handlerBack = () => {
    navigate("/")
  }
  // const handlerDelete = () => {
  //   mutate(currentProfile.id)
  // }
  // const handlerEdit = () => {
  //   setSetting({ type: "set-panel", payload: "edit" })
  //   setState({ type: "set-current-id", payload: currentProfile })
  // }

  return (
    <div className="flex gap-xs mb-2">
      <ButtonBorder behavior="onlyIcon" onClick={handlerBack}>
        <ArrowLeft />
      </ButtonBorder>
      {/* <div className="flex gap-xs">
        <ButtonBorder onClick={handlerEdit}>Edit</ButtonBorder>
        <ButtonBorder disabled={isPending} onClick={handlerDelete}>
          {isPending ?
            <> <SvgLoading /> Deleting </> :
            "Delete"
          }
        </ButtonBorder>
      </div> */}
    </div>
  )
}

// function SvgLoading() {
//   return (
//     <svg
//       className="animate-spin size-4 text-black"
//       fill="none"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//       <path
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//       />
//     </svg>
//   )
// }