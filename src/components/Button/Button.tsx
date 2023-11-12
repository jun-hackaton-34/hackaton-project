import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      {children ?? 'Click'}
    </button>
  );
}
