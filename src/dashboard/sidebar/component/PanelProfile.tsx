import { useQuery } from "@tanstack/react-query"
import { fetchDataBase } from "@setting/superbase"
import { useContextState } from "../../hooks/Context"
import CardProfile from "./CardProfile"
import Loader from "../loader/PanelLoader"

export default function PanelProfile() {
  const { state, setState } = useContextState()
  const isEmptyProfile = state.profiles.length == 0

  const { isLoading } = useQuery({
    enabled: isEmptyProfile,
    queryKey: ["view-profile"],
    queryFn: async () => fetchDataBase.from("profiles").select(),
    select: ({ data }) => {
      if (isEmptyProfile) {
        setState({ type: "set-profile", payload: data })
      }
    }
  })

  if (isLoading) return <Loader />

  return (
    <>
      <div className="scrollbar flex-1 pl-2 overflow-auto">
        <span className="block my-2">Registered instances</span>
        {state.profiles.map((props) => <CardProfile key={props.id} setState={setState} {...props} />)}
      </div>
    </>
  )
}

