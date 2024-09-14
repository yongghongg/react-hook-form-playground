'use client';

import FormConfiguration from '@/components/FormConfiguration/FormConfiguration';
import { FormConfigType } from '@/components/FormConfiguration/FormConfiguration.type';
import TextField from '@/components/TextField/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
        <div className="mb-6 flex flex-col gap-6">
          <div className="text-xl font-bold">Email: {result.email}</div>
          <div className="text-xl font-bold">Password: {result.password}</div>
          <div className="text-xl font-bold">Remember me: {result.remember}</div>
        </div>
        <Button className="font-bold" size="lg" onClick={onBack}>
          Back
        </Button>
      </>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>A simple login form</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex items-center gap-2">
            <Checkbox id="remember" {...register('remember')} />
            <label className="text-sm" htmlFor="remember">
              Remember me
            </label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full font-bold" type="submit" size="lg">
          Login
        </Button>
      </CardFooter>
    </Card>
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
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="relative h-full pl-2 pr-8 pt-4 lg:pt-8">
            <div className="h-full w-full rounded-[inherit]">
              <FormConfiguration methods={methods} />
            </div>
          </div>
        </aside>
        <main className="relative py-4 lg:gap-10 lg:py-6">
          <div className="mx-auto my-12 max-w-sm">
            <SimpleLoginForm
              key={uniqueKey}
              mode={selectedMode}
              reValidateMode={selectedReValidationMode}
              control={control}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
