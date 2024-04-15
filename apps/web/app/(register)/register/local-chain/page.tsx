/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { redirect } from "next/navigation";
import { env } from "~/env";
import { RegisterLocalChainForm } from "./register-local-chain-form";

import type { Metadata } from "next";

export interface PageProps {}

export const metadata: Metadata = {
  title: "Register a Local Chain",
};

export default function Page(props: PageProps) {
  if (env.NEXT_PUBLIC_TARGET !== "electron") {
    redirect("/");
  }

  return (
    <>
      <div className="inline-flex flex-col gap-8 my-auto justify-stretch w-full px-10 mx-auto tab:max-w-[30rem] relative">
        <RegisterLocalChainForm />
      </div>
    </>
  );
}
