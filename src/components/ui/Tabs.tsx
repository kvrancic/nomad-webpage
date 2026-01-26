'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'underline' | 'pill'
  className?: string
  onChange?: (tabId: string) => void
}

export function Tabs({
  tabs,
  defaultTab,
  variant = 'underline',
  className,
  onChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  return (
    <div className={className}>
      <TabList
        tabs={tabs}
        activeTab={activeTab}
        variant={variant}
        onTabChange={handleTabChange}
      />
      <TabPanels tabs={tabs} activeTab={activeTab} />
    </div>
  )
}

interface TabListProps {
  tabs: Tab[]
  activeTab: string
  variant: 'underline' | 'pill'
  onTabChange: (tabId: string) => void
}

function TabList({ tabs, activeTab, variant, onTabChange }: TabListProps) {
  return (
    <div
      className={cn(
        'flex',
        variant === 'underline'
          ? 'border-b border-neutral-200 gap-8'
          : 'bg-neutral-100 p-1 rounded-lg gap-1'
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          variant={variant}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  )
}

interface TabButtonProps {
  tab: Tab
  isActive: boolean
  variant: 'underline' | 'pill'
  onClick: () => void
}

function TabButton({ tab, isActive, variant, onClick }: TabButtonProps) {
  if (variant === 'underline') {
    return (
      <button
        role="tab"
        aria-selected={isActive}
        onClick={onClick}
        className={cn(
          'relative pb-4 font-medium transition-colors',
          isActive
            ? 'text-mint-500'
            : 'text-neutral-500 hover:text-anthracite-500'
        )}
      >
        {tab.label}
        {isActive && (
          <motion.div
            layoutId="activeTabUnderline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint-500"
            initial={false}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    )
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        'relative px-4 py-2 rounded-md font-medium transition-colors',
        isActive
          ? 'text-white'
          : 'text-neutral-600 hover:text-anthracite-500'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabPill"
          className="absolute inset-0 bg-mint-500 rounded-md"
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{tab.label}</span>
    </button>
  )
}

interface TabPanelsProps {
  tabs: Tab[]
  activeTab: string
}

function TabPanels({ tabs, activeTab }: TabPanelsProps) {
  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="tabpanel"
      className="pt-6"
    >
      {activeTabData?.content}
    </motion.div>
  )
}
