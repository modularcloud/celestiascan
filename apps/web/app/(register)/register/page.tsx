import * as React from "react";
import type { Metadata } from "next";

import { RegisterForm } from "~/ui/register-form";

export const metadata: Metadata = {
  title: "Register your chain",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
