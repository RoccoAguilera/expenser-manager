export default function WidgetsData(props: { className?: string; hint?: string; value?: string | number }) {
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