
export interface NavButtonProps {
  handleOnClick: () => void
  label: string
  isCurrentPathname?: boolean
}

export default function NavButton({handleOnClick, label, isCurrentPathname}: NavButtonProps) {
 
  return (
    <button onClick={handleOnClick} className={`h-20 rounded-lg border-2 w-full text-center shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,0.8)] font-semibold font-[family-name:var(--font-vt323)] ${isCurrentPathname ? 'text-4xl' : 'text-xl'}`}>
      {label}
    </button>
  )
}
