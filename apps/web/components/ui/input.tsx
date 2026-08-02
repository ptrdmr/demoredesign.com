import React from 'react'

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...props
}) => {
  return (
    <input
      className={[
        'w-full rounded-sm border border-rule bg-surface px-3 py-2.5 text-ink',
        'placeholder:text-ink-soft',
        'transition-colors duration-150',
        'focus:border-accent focus:outline-none focus:ring-2 focus:ring-focus/30',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
