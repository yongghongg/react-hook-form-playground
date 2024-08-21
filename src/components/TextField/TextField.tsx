import { forwardRef, ReactElement, type ForwardRefRenderFunction } from "react";
import styles from "@/components/TextField/TextField.module.css";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface TextFieldProps {
  fieldName: string;
  type?: "text" | "password" | "email";
  label?: string;
  placeholder?: string;
  hidePlaceholder?: boolean;
  showError?: boolean;
  errorMessage?: string;
}

const TextField: ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  {
    fieldName,
    type = "text",
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
    <div className={styles.field}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        id={fieldName}
        ref={ref}
        type={type}
        className={clsx(styles.input, showError && styles.errorInput)}
        placeholder={hidePlaceholder ? undefined : placeholder}
        {...props}
      />
      {showError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default forwardRef(TextField);
