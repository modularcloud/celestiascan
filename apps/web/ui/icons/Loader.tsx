import * as React from "react";
import type { SVGProps } from "react";
const SvgLoader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2.75v3.5m0 11.5v3.5M2.75 12h3.5m11.5 0h3.5M5.46 5.46l2.474 2.474m8.132 8.132 2.475 2.475m-13.081 0 2.475-2.475m8.131-8.131 2.475-2.475"
    />
  </svg>
);
export default SvgLoader;
