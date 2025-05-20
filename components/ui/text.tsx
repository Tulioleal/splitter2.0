import { JSX } from 'react'

type TextProps = React.HTMLProps<HTMLParagraphElement>

const Text = ({ children, className, ...props }: TextProps): JSX.Element => {
  return (
    <p className={`text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl ${className}`} {...props}>
      {' '}
      {children}
    </p>
  )
}

export default Text
