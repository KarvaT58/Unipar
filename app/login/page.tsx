"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

import { LoginForm } from "@/components/login-form"
import { loginLogo, loginStageIn, pageGlowDrift } from "@/lib/motion"

export default function LoginPage() {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-muted p-6 md:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          variants={pageGlowDrift(reduced, 0)}
          initial="hidden"
          animate="show"
          className="absolute top-[10%] left-[8%] size-[26rem] rounded-full bg-brand/15 blur-3xl dark:bg-brand/20"
        />
        <motion.div
          variants={pageGlowDrift(reduced, 1)}
          initial="hidden"
          animate="show"
          className="absolute right-[8%] bottom-[10%] size-[30rem] rounded-full bg-brand/10 blur-3xl dark:bg-brand/15"
        />
      </div>
      <motion.div
        variants={loginLogo(reduced)}
        initial="hidden"
        animate="show"
        className="absolute top-6 left-6 flex size-8 items-center justify-center md:top-10 md:left-10"
      >
        <Image
          src="/logo.png"
          alt="Unipar"
          width={32}
          height={32}
          className="size-full object-contain"
          priority
        />
      </motion.div>
      <motion.div
        variants={loginStageIn(reduced)}
        initial="hidden"
        animate="show"
        className="w-full max-w-sm md:max-w-4xl"
        style={{ perspective: 1400 }}
      >
        <LoginForm />
      </motion.div>
    </div>
  )
}
