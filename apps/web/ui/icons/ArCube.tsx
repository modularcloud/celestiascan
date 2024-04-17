import * as React from "react";
import type { SVGProps } from "react";
const SvgArCube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 12v9.281m0-9.28 8.25-4.641M12 12 3.75 7.36m7.76-4.365L4.26 7.073a1 1 0 0 0-.51.871v8.112a1 1 0 0 0 .51.871l7.25 4.079a1 1 0 0 0 .98 0l7.25-4.079a1 1 0 0 0 .51-.871V7.944a1 1 0 0 0-.51-.871l-7.25-4.078a1 1 0 0 0-.98 0Z"
    />
  </svg>
);
export default SvgArCube;
