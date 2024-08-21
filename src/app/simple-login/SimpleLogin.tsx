'use client';

import styles from '@/app/simple-login/styles.module.css';
import TextField from '@/components/TextField/TextField';
import { isNil } from 'lodash-es';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import tw from 'twin.macro';

interface User {
  email: string;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

type modeType = 'onBlur' | 'onChange' | 'onSubmit';
interface SimpleLoginFormProps {
  shouldFocusError: boolean;
  mode: modeType;
}

const Button = tw.button`w-full rounded border bg-blue-600 p-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700`;

const SimpleLoginForm: React.FC<SimpleLoginFormProps> = ({ shouldFocusError, mode }) => {
  const [result, setResult] = useState<LoginFormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ shouldFocusError, mode: mode });

  const onSubmit: SubmitHandler<LoginFormValues> = ({ email, password, remember }) => {
    setResult({ email, password, remember });
  };

  const onBack = () => {
    setResult(null);
  };

  if (result) {
    return (
      <>
        <div className={styles.greeting}>Email: {result.email}</div>
        <div className={styles.greeting}>Password: {result.password}</div>
        <div className={styles.greeting}>Remember me: {result.remember}</div>
        <button onClick={onBack}>Back</button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.header}>Login</h2>
      <TextField
        fieldName="email"
        showError={!isNil(errors.email)}
        errorMessage={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address'
          }
        })}
      />
      <TextField
        fieldName="password"
        label="Password"
        showError={!isNil(errors.password)}
        errorMessage={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
      />
      <div className={styles.rememberMe}>
        <input id="remember" type="checkbox" {...register('remember')} />
        <label htmlFor="remember">Remember me</label>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};

export default function SimpleLogin() {
  const [shouldFocusError, setShouldFocusError] = useState(true);
  const [mode, setMode] = useState<modeType>('onSubmit');

  return (
    <div className={styles.container}>
      {/* <button
        className={styles.submitButton}
        onClick={() => setShouldFocusError(!shouldFocusError)}
        type="button"
      >{`Set shouldFocusError to ${
        shouldFocusError ? "true" : "false"
      }`}</button>
      <button
        className={styles.submitButton}
        onClick={() => setMode("onSubmit")}
      >
        Set mode to onSubmit
      </button>
      <button
        className={styles.submitButton}
        onClick={() => setMode("onChange")}
      >
        Set mode to onChange
      </button> */}
      <SimpleLoginForm shouldFocusError={shouldFocusError} mode={mode} key={mode} />
    </div>
  );
}
