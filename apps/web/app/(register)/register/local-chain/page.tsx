/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { redirect } from "next/navigation";
import { env } from "~/env";
import { RegisterLocalChainForm } from "./register-local-chain-form";

import type { Metadata } from "next";

export interface PageProps {}

export const metadata: Metadata = {
  title: "Register a rollup",
};

export default function Page(props: PageProps) {
  if (env.NEXT_PUBLIC_TARGET !== "electron") {
    redirect("/");
  }

  return (
    <>
      <div className="flex-1 flex flex-col gap-8 pt-32 py-20 justify-stretch w-full px-10 mx-auto tab:max-w-[30rem] relative">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/mc-logo.svg"
            alt="Modular Cloud logo"
            className="h-8 w-8 mb-3"
          />
          <h1 className="font-medium text-2xl">Register a Rollup</h1>
        </div>

        <RegisterLocalChainForm />
      </div>
    </>
  );
}
