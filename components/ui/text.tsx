import { JSX } from "react";

type TextProps = React.HTMLProps<HTMLParagraphElement>

const Text = ({children, ...props}:TextProps):JSX.Element => {
  return (
    <p
      className="text-4xl font-bold text-gray-800"
      {...props}
    > {children}
    </p>
  );
}

export default Text;