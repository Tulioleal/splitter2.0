import { JSX } from "react";

type TextProps = React.HTMLProps<HTMLParagraphElement>

const Text = ({children, ...props}:TextProps):JSX.Element => {
  return (
    <p
      className="text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl"
      {...props}
    > {children}
    </p>
  );
}

export default Text;