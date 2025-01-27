import { useContextSetting } from '../hooks/Context'
import ButtonAction from '@ui-system/buttons/Action'
import PanelProfile from './component/PanelProfile'

export default function Sidebar() {
  const { setSetting } = useContextSetting()

  return (
    <div className='flex flex-col w-full max-w-80 border-r border-gry-200'>
      <div className='px-4 py-2 border-b border-gry-200'>
        <ButtonAction onClick={() => setSetting({ type: "set-panel" })}>Add instance</ButtonAction>
      </div>
      <PanelProfile />
    </div>
  )
}