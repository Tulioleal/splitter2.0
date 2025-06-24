import { JSX } from 'react'

type TextProps = React.HTMLProps<HTMLParagraphElement> & {
  tag?: 'span' | 'p'
}

const Text = ({ tag = 'p', children, className, ...props }: TextProps): JSX.Element => {
  if (tag === 'span') {
    return (
      <span
        className={`leading-7 [&:not(:first-child)]:mt-6 sm:text-base md:text-lg lg:text-xl ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 sm:text-base md:text-lg lg:text-xl ${className}`} {...props}>
      {' '}
      {children}
    </p>
  )
}

export default Text
