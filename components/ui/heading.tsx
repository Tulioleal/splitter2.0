import { JSX } from "react";

type HeadingProps = React.HTMLProps<HTMLHeadingElement>

const Heading = ({children, ...props}:HeadingProps):JSX.Element => {
  return (
    <h1
      className="text-4xl font-bold text-gray-800"
      {...props}
    > {children}
    </h1>
  );
}

export default Heading;