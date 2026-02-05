'use client'

import { submitContactForm } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { useRef } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-action text-white px-8 py-3 font-medium hover:bg-action/90 transition-colors disabled:opacity-50"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  )
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <main className="min-h-screen bg-canvas pt-12 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-thought mb-12">Contact</h1>
        <div className="bg-white p-8 border border-warmth/20">
          <p className="text-thought/80 text-lg mb-8">
            Reach out to begin a conversation about fit, timing, and how we might work together.
          </p>
          
          <form 
            ref={formRef}
            action={async (formData) => {
              await submitContactForm(formData)
              formRef.current?.reset()
              alert("Thank you. Your message has been sent.")
            }} 
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-thought font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  className="w-full p-3 border border-warmth/30 focus:border-thought outline-none" 
                />
              </div>
              <div>
                <label className="block text-thought font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  className="w-full p-3 border border-warmth/30 focus:border-thought outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-thought font-medium mb-2">Subject</label>
              <select 
                name="subject" 
                className="w-full p-3 border border-warmth/30 focus:border-thought outline-none bg-white"
              >
                <option>General Enquiry</option>
                <option>Engage with Us</option>
                <option>Knowledge Assets</option>
                <option>Ongoing Research</option>
                <option>Resources</option>
              </select>
            </div>
            <div>
              <label className="block text-thought font-medium mb-2">Message</label>
              <textarea 
                name="message" 
                rows={6} 
                required
                className="w-full p-3 border border-warmth/30 focus:border-thought outline-none"
              ></textarea>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  )
}
