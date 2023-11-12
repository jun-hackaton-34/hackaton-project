import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

import './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" className="btn" onClick={onClick}>
      {children ?? 'Click'}
    </button>
  );
}
