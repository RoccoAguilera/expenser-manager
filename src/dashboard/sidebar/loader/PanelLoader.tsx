export default function PanelLoader() {
  return (
    <div className='scrollbar flex-1 pl-2 overflow-auto'>
      <span className='block h-6 max-w-3/4 my-2 rounded-xl bg-gray-100 animate-pulse' />
      <div className='*:block *:h-[58px] *:mb-px *:rounded-lg *:bg-gray-100 *:animate-pulse'>
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}