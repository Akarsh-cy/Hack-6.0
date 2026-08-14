"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

// TODO: swap in real Hack 6.0 copy
const faqs: FAQItem[] = [
  {
    question: "What exactly is Hack 6.0?",
    answer:
      "It's a 48-hour national-level onsite hackathon where teams build real projects, get mentored by industry experts, and compete for prizes.",
  },
  {
    question: "Who can participate?",
    answer:
      "Anyone with an idea and the drive to build it — students, beginners, and pros are all welcome.",
  },
  {
    question: "How do I register?",
    answer:
      "Hit the Register Now button, fill in your details, and you're in. Spots are limited, so don't wait too long.",
  },
  {
    question: "What if I don't have a team?",
    answer:
      "No problem — we run a team formation session before hacking begins so you can find teammates on the spot.",
  },
  {
    question: "Can I participate solo?",
    answer:
      "Teams need a minimum of 2 members (max 4). We'll help you find teammates if you're short.",
  },
  {
    question: "Is there a registration fee?",
    answer: "No, Hack 6.0 is completely free to participate in.",
  },
  {
  question: "Can I use my own problem statement?",
  answer:
    "Yes! We don't hand out fixed problem statements — you're free to bring your own idea and build it, as long as it fits within our tracks.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-400">Got questions? We've got answers!</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <span className="shrink-0 text-purple-400">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}