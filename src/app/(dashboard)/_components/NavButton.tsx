export interface NavButtonProps {
  handleOnClick: () => void
  label: string
}

export default function NavButton({handleOnClick, label}: NavButtonProps) {
  return (
    <button onClick={handleOnClick} className="px-6 py-4 rounded-lg border-2 w-full text-center shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,0.8)]">
      {label}
    </button>
  )
}
