'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Mail, MessageCircle, Send, CheckCircle2, AlertCircle, ChevronDown, Rocket, ArrowRight } from 'lucide-react'
import { submitContactForm } from '@/app/contact/actions'
import { initialContactFormState } from '@/app/contact/types'
import { DURATION, EASING } from '@/lib/animation-config'

const CONTACT_EMAIL = 'vishal@pixelforge.in'
const WHATSAPP_LINK = 'https://wa.me/917011551755'
const SERVICE_OPTIONS = [
  'Shopify Storefront',
  'Next.js Web App',
  'WordPress Build',
  'UI/UX Design',
  'Performance Optimization',
  'Ongoing Support',
  'Other'
]

function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          className="mt-2 text-xs font-medium tracking-wider text-red-400"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function CustomSelect({ 
  name, 
  options, 
  error, 
  placeholder 
}: { 
  name: string; 
  options: string[]; 
  error?: string;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between border-b bg-transparent pb-4 text-left text-base outline-none transition-all duration-500 ${
          isOpen || selected ? 'border-vs-accent text-white' : 'border-white/18 text-white/45'
        }`}
      >
        <span className={selected ? 'text-white' : 'text-white/28'}>
          {selected || placeholder}
        </span>
        <ChevronDown 
          size={18} 
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-vs-accent' : 'text-white/28'}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASING.expoOut }}
            data-lenis-prevent
            className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-2 shadow-2xl backdrop-blur-xl"
          >
            {options.map((option, index) => (
              <motion.button
                key={option}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, ease: EASING.expoOut }}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                }}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 capitalize ${
                  selected === option 
                    ? 'bg-vs-accent text-black font-bold' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <FieldError message={error} />
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[500px] flex-col items-center justify-center text-center p-8"
    >
      <motion.div
        animate={{ 
          y: [-20, 0, -20],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="mb-12 text-vs-accent"
      >
        <motion.div
          initial={{ x: -100, y: 100, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASING.expoOut }}
        >
          <Rocket size={80} strokeWidth={1.2} />
        </motion.div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-headline text-4xl font-black uppercase tracking-tight md:text-5xl"
      >
        Message sent!
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 max-w-[420px] text-lg leading-relaxed text-white/60"
      >
        Your inquiry has taken flight. I&apos;ll review the details and shared vision, and get back to you within 24 hours.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onReset}
        className="group mt-12 flex items-center gap-3 font-label text-xs uppercase tracking-[0.3em] text-vs-accent hover:text-white transition-colors duration-300"
      >
        Send another message
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  )
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState
  )
  const [showSuccess, setShowSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Mouse hover light effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mouseX.set(clientX)
      mouseY.set(clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (state.status === 'success') {
      setShowSuccess(true)
      formRef.current?.reset()
    }
  }, [state.status, state.submittedAt])

  const handleReset = () => {
    setShowSuccess(false)
    state.status = 'idle'
  }

  // Magnetic button logic
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 })
  
  const handleButtonMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.35
    const y = (clientY - (top + height / 2)) * 0.35
    setBtnPos({ x, y })
  }

  const handleButtonMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 })
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-36 text-white md:px-12 lg:px-20">
      <Noise />
      {/* Dynamic Background Light */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 blur-[130px]"
        style={{
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(0, 217, 255, 0.15), transparent 80%)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.03]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-16 lg:gap-24">
        <div className="max-w-[880px]">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING.expoOut }}
            className="mb-6 block font-label text-[11px] uppercase tracking-[0.35em] text-vs-accent"
          >
            Contact
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: DURATION.entrance, ease: EASING.expoOut }}
              className="font-headline text-[clamp(3.8rem,11vw,9.75rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]"
            >
              Let&apos;s talk
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.slow,
              ease: EASING.expoOut,
              delay: 0.08,
            }}
            className="mt-6 max-w-[620px] text-base leading-8 text-white/68 md:text-lg"
          >
            Ready to bring your next storefront, product, or brand experience to
            life? Share the vision and I&apos;ll get back to you with a clear path
            forward.
          </motion.p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.88fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: DURATION.slow,
              ease: EASING.expoOut,
              delay: 0.12,
            }}
            className="space-y-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-[540px] space-y-5"
            >
              <p className="font-label text-[11px] uppercase tracking-[0.32em] text-vs-accent">
                Available for work
              </p>
              <p className="text-lg leading-8 text-white/82">
                Whether you need a conversion-focused Shopify build, a polished
                Next.js experience, or design support with stronger motion and
                structure, we can shape something that feels premium and performs
                hard.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                href={`mailto:${CONTACT_EMAIL}`}
                className="group relative rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-vs-accent/60 hover:bg-vs-accent/[0.04] overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 translate-y-1 bg-vs-accent/40 blur-md transition-transform duration-500 group-hover:translate-y-0" />
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-vs-accent transition-transform duration-500 group-hover:scale-110">
                  <Mail size={20} />
                </span>
                <p className="font-label text-[10px] uppercase tracking-[0.28em] text-white/45 group-hover:tracking-[0.35em] transition-all duration-500">
                  Email
                </p>
                <p className="mt-3 break-all text-lg font-semibold text-white transition-colors duration-300 group-hover:text-vs-accent">
                  {CONTACT_EMAIL}
                </p>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-vs-accent/60 hover:bg-vs-accent/[0.04] overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 translate-y-1 bg-vs-accent/40 blur-md transition-transform duration-500 group-hover:translate-y-0" />
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-vs-accent transition-transform duration-500 group-hover:scale-110">
                  <MessageCircle size={20} />
                </span>
                <p className="font-label text-[10px] uppercase tracking-[0.28em] text-white/45 group-hover:tracking-[0.35em] transition-all duration-500">
                  WhatsApp
                </p>
                <p className="mt-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-vs-accent">
                  Start a chat
                </p>
              </motion.a>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-white/45">
                    Location
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-base text-white/80">
                    <span className="h-2 w-2 rounded-full bg-vs-accent animate-pulse" />
                    India (GMT+5:30)
                  </p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-white/45">
                    Response policy
                  </p>
                  <p className="mt-3 text-base text-white/80">
                    Usually within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: DURATION.slow,
              ease: EASING.expoOut,
              delay: 0.16,
            }}
            className="relative flex min-h-[500px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vs-accent/60 to-transparent" />

            <AnimatePresence mode="wait">
              {showSuccess ? (
                <SuccessState onReset={handleReset} />
              ) : (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="p-6 md:p-8"
                >
                  <form ref={formRef} action={formAction} className="space-y-10">
                    {/* Honeypot */}
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="group relative">
                        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45 group-focus-within:text-vs-accent group-focus-within:tracking-[0.4em] transition-all duration-500">
                          Your name
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          suppressHydrationWarning
                          className="mt-2 w-full border-b border-white/18 bg-transparent pb-4 text-white outline-none transition-all duration-500 placeholder:text-white/10 focus:border-vs-accent group-hover:border-white/40"
                        />
                        <FieldError message={state.errors?.name} />
                      </div>

                      <div className="group relative">
                        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45 group-focus-within:text-vs-accent group-focus-within:tracking-[0.4em] transition-all duration-500">
                          Your email
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          suppressHydrationWarning
                          className="mt-2 w-full border-b border-white/18 bg-transparent pb-4 text-white outline-none transition-all duration-500 placeholder:text-white/10 focus:border-vs-accent group-hover:border-white/40"
                        />
                        <FieldError message={state.errors?.email} />
                      </div>
                    </div>

                    <div className="group relative">
                      <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45 group-focus-within:text-vs-accent group-focus-within:tracking-[0.4em] transition-all duration-500">
                        Project type
                      </span>
                      <div className="mt-2 group-hover:border-white/40 transition-colors duration-500">
                        <CustomSelect 
                          name="projectType" 
                          options={SERVICE_OPTIONS} 
                          placeholder="What can I help with?"
                          error={state.errors?.projectType} 
                        />
                      </div>
                    </div>

                    <div className="group relative">
                      <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45 group-focus-within:text-vs-accent group-focus-within:tracking-[0.4em] transition-all duration-500">
                        Your vision
                      </span>
                      <textarea
                        name="message"
                        required
                        minLength={20}
                        rows={5}
                        data-lenis-prevent
                        placeholder="Tell me about your goals, scope, and timeline."
                        className="mt-2 w-full resize-none border-b border-white/18 bg-transparent pb-4 text-white outline-none transition-all duration-500 placeholder:text-white/10 focus:border-vs-accent group-hover:border-white/40"
                      />
                      <FieldError message={state.errors?.message} />
                    </div>

                    <div className="space-y-6 pt-4">
                      {state.status === 'error' && state.message && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-200"
                        >
                          <AlertCircle size={16} />
                          <p>{state.message}</p>
                        </motion.div>
                      )}

                      <motion.button
                        ref={buttonRef}
                        type="submit"
                        disabled={pending}
                        onMouseMove={handleButtonMouseMove}
                        onMouseLeave={handleButtonMouseLeave}
                        animate={{ x: btnPos.x, y: btnPos.y }}
                        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.1 }}
                        className="group relative h-14 w-full overflow-hidden rounded-full bg-vs-accent font-headline text-xs font-black uppercase tracking-[0.3em] text-black transition-colors duration-500 hover:bg-white disabled:opacity-50"
                      >
                        <div className="absolute inset-0 z-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                        <AnimatePresence mode="wait">
                          {pending ? (
                            <motion.div
                              key="sending"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              className="flex items-center justify-center gap-3"
                            >
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                              Launching...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="ready"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              className="flex items-center justify-center gap-3"
                            >
                              Send message
                              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
