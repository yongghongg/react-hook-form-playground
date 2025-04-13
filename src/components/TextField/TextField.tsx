import styles from '@/components/TextField/TextField.module.css';
import { Badge } from '@/components/ui/badge';
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
  showState?: boolean;
  touched?: boolean;
  dirty?: boolean;
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
    showState = false,
    dirty,
    touched,
    ...props
  },
  ref
) => {
  return (
    <div className="mb-4">
      {label && (
        <div className="justify mb-2 flex items-center gap-2 leading-4">
          <Label className="font-bold" htmlFor={fieldName}>
            {label}
          </Label>
          {showState && <Badge variant={touched ? 'default' : 'outline'}>isTouched</Badge>}
          {showState && <Badge variant={dirty ? 'default' : 'outline'}>isDirty</Badge>}
          {showState && <Badge variant={showError ? 'destructive' : 'outline'}>error</Badge>}
        </div>
      )}
      <Input id={fieldName} ref={ref} type={type} placeholder={hidePlaceholder ? undefined : placeholder} {...props} />
      {showError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default forwardRef(TextField);
