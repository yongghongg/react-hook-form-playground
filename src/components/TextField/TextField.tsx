import styles from '@/components/TextField/TextField.module.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forwardRef, type ForwardRefRenderFunction } from 'react';

interface TextFieldProps {
  fieldName: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
  placeholder?: string;
  hidePlaceholder?: boolean;
  showError?: boolean;
  errorMessage?: string;
}

const TextField: ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  {
    fieldName,
    type = 'text',
    label,
    placeholder = `Enter your ${fieldName}`,
    hidePlaceholder = false,
    showError,
    errorMessage,
    ...props
  },
  ref
) => {
  return (
    <div className='mb-4'>
      {label && <Label className='font-bold' htmlFor={fieldName}>{label}</Label>}
      <Input
        id={fieldName}
        ref={ref}
        type={type}
        // className={clsx(styles.input, showError && styles.errorInput)}
        placeholder={hidePlaceholder ? undefined : placeholder}
        {...props}
      />
      {showError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default forwardRef(TextField);
