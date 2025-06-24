import { JSX } from 'react'

type HeadingProps = React.HTMLProps<HTMLHeadingElement>

const Heading = ({ children, className, ...props }: HeadingProps): JSX.Element => {
  return (
    <h1
      {...props}
      className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-gray-800 ${className}`}
    >
      {' '}
      {children}
    </h1>
  )
}

export default Heading
