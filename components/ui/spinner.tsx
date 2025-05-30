interface SpinnerInterface {
  size: keyof typeof Size
}

const Spinner = ({ size = 'md' }: SpinnerInterface) => {
  return (
    <div className="flex items-center justify-center">
      <svg className={Size[size]} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Big static circle */}
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" className="text-gray-200" />
        {/* Spinning arc covering the full circle */}
        <g className="animate-spin origin-center">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-grey-500"
            fill="none"
            strokeDasharray="176"
            strokeDashoffset="44"
          />
        </g>
      </svg>
    </div>
  )
}

enum Size {
  'sm' = 'h-10 w-10',
  'md' = 'h-15 w-15',
  'lg' = 'h-20 w-20'
}

export default Spinner
