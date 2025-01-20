import { useIsFetching } from "@tanstack/react-query"
import { useContextState } from "../hooks/Context"
import { toCurrency } from "../utils/tools"
import Header from "./component/Hearder"
import type { Route } from "@react-router-type/dashboard/manager/+types/index";

export default function Manager({ params }: Route.ComponentProps) {
  const { state, setState } = useContextState()
  const currentProfile = state.profiles.find(item => item.id == params.id)

  if (useIsFetching({ queryKey: ["view-profile"] })) {
    return "Loading"
  }

  if (currentProfile == undefined) {
    return "This profile does not exist"
  }

  return (
    <div>
      <Header currentProfile={currentProfile} setState={setState} />
      <span className="block mb-2 text-xs font-light text-gry-400">
        {new Date(currentProfile.date).toString()}
      </span>
      <div className="flex flex-wrap gap-4 p-4 rounded-lg border border-gry-200">
        <div className="flex-1">
          <PreviewCard
            hint="Current instance"
            value={currentProfile.name.length > 0 ? currentProfile.name : "Anonymous"}
          />
          <p className="text-sm">
            {currentProfile.description.length > 0 ? currentProfile.description : "You do not have description"}
          </p>
        </div>
        <PreviewCard
          hint="Your budget"
          value={toCurrency(currentProfile.budget)}
        />
      </div>
    </div>
  )
}

function PreviewCard(props: { className?: string; hint?: string; value?: string | number }) {
  const { className, value, hint = "Undefined" } = props
  return (
    <div className={className}>
      <span className="block w-fit mb-xs px-2 border border-gry-200 rounded-full text-sm text-nowrap select-none">
        {hint}
      </span>
      <h1 className="mb-xs text-lg/5 font-medium tracking-tight">
        {value}
      </h1>
    </div>
  )
}