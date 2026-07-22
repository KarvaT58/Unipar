"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "motion/react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  loginFields,
  loginField,
  splitPanelLeft,
  splitPanelRight,
  brandBlob,
  brandPanelReveal,
  brandPanelItem,
  submitButtonVariants,
  submitSheenVariants,
} from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const reduced = useReducedMotion()
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("E-mail inválido")
      return
    }
    if (!password) {
      toast.error("Informe sua senha")
      return
    }
    setSubmitting(true)
    const promise = fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    })
    try {
      const response = await promise
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error ?? "Não foi possível entrar")
      toast.success("Conectado com sucesso")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível entrar")
      setSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <motion.form
            className="p-6 md:p-10"
            onSubmit={handleSubmit}
            variants={splitPanelLeft(reduced)}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={loginFields(reduced, 0.5)}
              initial="hidden"
              animate="show"
            >
              <FieldGroup className="gap-6">
                <motion.div
                  variants={loginField(reduced)}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                  <p className="text-balance text-muted-foreground">
                    Acesse sua conta Unipar-Cascavel
                  </p>
                </motion.div>
                <motion.div variants={loginField(reduced)}>
                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="voce@unipar.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="focus-visible:border-brand/60 focus-visible:ring-brand/30"
                    />
                  </Field>
                </motion.div>
                <motion.div variants={loginField(reduced)}>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                      <Link
                        href="/recuperar-conta"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-9 focus-visible:border-brand/60 focus-visible:ring-brand/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </button>
                    </div>
                  </Field>
                </motion.div>
                <motion.div variants={loginField(reduced)}>
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Lembrar-me
                    </Label>
                  </div>
                </motion.div>
                <motion.div variants={loginField(reduced)}>
                  <Field>
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={submitButtonVariants(reduced)}
                    >
                      <Button
                        type="submit"
                        className="relative w-full overflow-hidden"
                        disabled={submitting}
                      >
                        {submitting ? "Entrando..." : "Entrar"}
                        {!reduced && (
                          <motion.span
                            variants={submitSheenVariants(reduced)}
                            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          />
                        )}
                      </Button>
                    </motion.div>
                  </Field>
                </motion.div>
                <motion.div variants={loginField(reduced)}>
                  <FieldDescription className="text-center">
                    Não tem uma conta?{" "}
                    <Link href="/solicitacao-acesso">Solicitar acesso</Link>
                  </FieldDescription>
                </motion.div>
              </FieldGroup>
            </motion.div>
          </motion.form>
          <motion.div
            variants={splitPanelRight(reduced)}
            initial="hidden"
            animate="show"
            className="relative hidden overflow-hidden bg-muted md:flex md:flex-col md:items-center md:justify-center md:gap-6"
          >
            <motion.div
              variants={brandBlob(reduced, 0, 0.5)}
              initial="hidden"
              animate="show"
              className="absolute -top-10 -left-10 size-48 rounded-full bg-brand/30 blur-3xl"
            />
            <motion.div
              variants={brandBlob(reduced, 1, 0.5)}
              initial="hidden"
              animate="show"
              className="absolute -right-12 -bottom-16 size-64 rounded-full bg-brand/20 blur-3xl"
            />
            <motion.div
              variants={brandBlob(reduced, 2, 0.5)}
              initial="hidden"
              animate="show"
              className="absolute top-1/3 right-0 size-32 rounded-full bg-brand/20 blur-2xl"
            />
            <motion.div
              variants={brandPanelReveal(reduced, 0.65)}
              initial="hidden"
              animate="show"
              className="relative z-10 flex flex-col items-center gap-4 px-8 text-center"
            >
              <motion.div variants={brandPanelItem(reduced)}>
                <Image
                  src="/logo.png"
                  alt="Unipar"
                  width={160}
                  height={160}
                  priority
                  className="size-32 object-contain opacity-90 dark:brightness-[0.9]"
                />
              </motion.div>
              <motion.p
                variants={brandPanelItem(reduced)}
                className="text-balance text-sm text-muted-foreground"
              >
                Gestão centralizada para sua operação.
              </motion.p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao continuar, você concorda com nossos{" "}
        <a href="#">Termos de Uso</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  )
}
