import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'default'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white border border-accent hover:bg-accent-deep hover:border-accent-deep',
  secondary:
    'bg-transparent text-ink border border-ink hover:bg-paper-alt',
  ghost:
    'bg-transparent text-accent border border-transparent underline-offset-4 hover:underline hover:text-accent-deep',
  default:
    'bg-accent text-white border border-accent hover:bg-accent-deep hover:border-accent-deep',
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-base',
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded font-body font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
