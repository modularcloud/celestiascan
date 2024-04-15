import * as React from "react";
import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="main-content"
      className="h-[100dvh] flex flex-col items-stretch"
      style={{
        "--color-primary": "212 100% 49%",
      }}
    >
      <HomeBg
        aria-hidden="true"
        className="fixed left-0 top-5 right-0 hidden tab:block z-[-1]"
      />
      <HomeBgMobile
        aria-hidden="true"
        className="fixed left-0 top-5 right-0 tab:hidden block z-[-1]"
      />
      {children}
    </main>
  );
}
