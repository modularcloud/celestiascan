import * as React from "react";
import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m6.5 3.681.644-.644a4.113 4.113 0 1 1 5.817 5.817l-.645.646m-8.63-3.004-.648.647a4.113 4.113 0 1 0 5.817 5.818l.643-.643M6.333 9.666l3.333-3.334"
    />
  </svg>
);
export default SvgLink;
