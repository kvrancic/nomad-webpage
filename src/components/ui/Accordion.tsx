'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { accordionContent } from '@/lib/animations'

interface AccordionItem {
  id: string
  title: string
  content: string | React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('divide-y divide-neutral-200', className)}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  )
}

interface AccordionItemComponentProps {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
}: AccordionItemComponentProps) {
  return (
    <div className="py-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-anthracite-500 group-hover:text-mint-500 transition-colors">
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-neutral-400 group-hover:text-mint-500 transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionContent}
            className="overflow-hidden"
          >
            <div className="pt-4 text-neutral-600">
              {typeof item.content === 'string' ? (
                <p>{item.content}</p>
              ) : (
                item.content
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
