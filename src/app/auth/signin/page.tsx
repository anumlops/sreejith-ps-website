import { auth, signIn } from "@lib/auth"
import { redirect } from "next/navigation"
import { AuthForm } from "./auth-form"

export default async function SignIn() {
  const session = await auth()
  if (session?.user) redirect("/admin")
  return <AuthForm />
}
