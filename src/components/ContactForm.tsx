import { Loader2, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-lime/60 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-lime/30'

export function ContactForm({ endpoint, email }: { endpoint: string; email: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) {
        // Formspree responds with { errors: [{ field?, message }] } on validation failures
        const data = (await res.json().catch(() => null)) as { errors?: { message: string }[] } | null
        const message = data?.errors?.map((err) => err.message).join('. ') ?? ''
        setErrorMessage(message && `${message.charAt(0).toUpperCase()}${message.slice(1)}.`)
        setStatus('error')
        return
      }
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="cf-name">
          <input id="cf-name" name="name" required autoComplete="name" className={inputClass} placeholder="Jane Recruiter" />
        </Field>
        <Field label="Email" id="cf-email">
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="jane@company.com" />
        </Field>
      </div>
      <Field label="Message" id="cf-message">
        <textarea id="cf-message" name="message" required rows={5} className={`${inputClass} resize-y`} placeholder="Tell me about the role or project…" />
      </Field>
      {/* Honeypot: hidden from humans, catches bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-lime px-5 font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-dim disabled:translate-y-0 disabled:opacity-60"
        >
          {status === 'sending' ? (
            <Loader2 size={18} aria-hidden="true" className="animate-spin" />
          ) : (
            <Send size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          )}
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p aria-live="polite" className="text-sm">
          {status === 'success' && <span className="text-lime">Thanks! I’ll get back to you soon.</span>}
          {status === 'error' && (
            <span className="text-red-300">
              {errorMessage || 'Something went wrong.'}{' '}
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-ink">
                Email me directly
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  )
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}
