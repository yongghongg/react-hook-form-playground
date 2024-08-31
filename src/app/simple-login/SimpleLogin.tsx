'use client';

import styles from '@/app/simple-login/SimpleLogin.module.css';
import FormConfiguration from '@/components/FormConfiguration/FormConfiguration';
import { FormConfigType } from '@/components/FormConfiguration/FormConfiguration.type';
import TextField from '@/components/TextField/TextField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { isNil } from 'lodash-es';
import { useState } from 'react';
import { Control, SubmitHandler, ValidationMode, useForm, useWatch } from 'react-hook-form';

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

type ModeType = keyof ValidationMode;
type ReValidateMode = Exclude<ModeType, 'onTouched' | 'all'>;

interface SimpleLoginFormProps {
  mode: ModeType;
  reValidateMode: ReValidateMode;
  control: Control<FormConfigType, any>;
}

const SimpleLoginForm: React.FC<SimpleLoginFormProps> = ({ mode, reValidateMode, control }) => {
  const [result, setResult] = useState<LoginFormValues | null>(null);
  const shouldFocusError = useWatch<FormConfigType, 'shouldFocusError'>({ control, name: 'shouldFocusError' });
  const delayError = useWatch<FormConfigType, 'delayError'>({ control, name: 'delayError' });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ shouldFocusError, mode, reValidateMode, delayError });

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
        label="Email"
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
        type="password"
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
        <Checkbox id="remember" {...register('remember')} />
        <label htmlFor="remember">Remember me</label>
      </div>
      <Button className="w-full font-bold" type="submit" size="lg">
        Login
      </Button>
    </form>
  );
};

export default function SimpleLogin() {
  const methods = useForm<FormConfigType>({
    defaultValues: {
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      delayError: 0,
      shouldFocusError: true
    }
  });
  const { control } = methods;
  const selectedMode = useWatch<FormConfigType, 'mode'>({ control, name: 'mode' });
  const selectedReValidationMode = useWatch<FormConfigType, 'reValidateMode'>({ control, name: 'reValidateMode' });
  const uniqueKey = `${selectedMode}-${selectedReValidationMode}`;

  return (
    <div className="flex justify-between">
      <div className="w-1/4 min-h-screen p-4 shadow-md max-lg:hidden">
        <aside className="sticky top-4">
          <FormConfiguration methods={methods} />
        </aside>
      </div>
      <main className="w-3/4 max-lg:w-full">
        {/* <nav>Header</nav> */}
        <div className="my-12">
          <SimpleLoginForm
            key={uniqueKey}
            mode={selectedMode}
            reValidateMode={selectedReValidationMode}
            control={control}
          />
        </div>
      </main>
    </div>
  );
}
