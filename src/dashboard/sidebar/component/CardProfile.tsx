import { Link } from "react-router"
import { memo } from "react"
import { toCurrency } from "../../utils/tools"
import type { Data, ActionState } from "../../environment/types/reducer"

function CardProfile(props: Data & { setState: React.Dispatch<ActionState> }) {
  const { id, name, budget, date } = props

  return (
    <Link
      className="flex items-center py-3 px-4 border border-transparent rounded-lg text-xs text-gry-600 cursor-pointer even:border-gry-100 hover:text-black hover:bg-gry-50 active:bg-gry-100"
      to={`profile/${id}`}
    >
      <div className="flex-1 *:block *:max-w-45 *:truncate overflow-hidden">
        <span>{name ? name : "Anonymous"}</span>
        <span>{toCurrency(budget)}</span>
      </div>
      <div>
        <span className="block text-end">{new Date(date).toLocaleDateString("en-US")}</span>
        <span>{new Date(date).toLocaleTimeString("en-US")}</span>
      </div>
    </Link>
  )
}

export default memo(CardProfile)