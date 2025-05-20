import { JSX } from 'react'

type HeadingProps = React.HTMLProps<HTMLHeadingElement>

const Heading = ({ children, className, ...props }: HeadingProps): JSX.Element => {
  return (
    <h1 {...props} className={`${className} text-4xl font-bold text-gray-800"`}>
      {' '}
      {children}
    </h1>
  )
}

export default Heading
