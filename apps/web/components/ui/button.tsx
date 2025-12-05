import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  ...props
}) => {
  return (
    <button
      className={`button ${variant} ${size}`}
      {...props}
    >
      {children}
    </button>
  )
}