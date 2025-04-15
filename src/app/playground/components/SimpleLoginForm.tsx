'use client';
import { loginFormDefaultValues } from '@/app/playground/playground.constants';
import { FormConfigType, LoginFormValues, SimpleLoginFormProps } from '@/app/playground/playground.types';
import TextField from '@/components/TextField/TextField';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { isEmpty, isNil } from 'lodash-es';
import { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';

export const SimpleLoginForm: React.FC<SimpleLoginFormProps> = ({ control: formConfigControl }) => {
  const [result, setResult] = useState<LoginFormValues | null>(null);
  const { mode, reValidateMode, showState, shouldFocusError, delayError, disabled } = useWatch<FormConfigType>({
    control: formConfigControl
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitted, submitCount }
  } = useForm<LoginFormValues>({
    shouldFocusError,
    mode,
    reValidateMode,
    delayError,
    disabled,
    defaultValues: loginFormDefaultValues
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const { email, password, remember } = data;
    setResult({ email, password, remember });
  };

  const onBack = useCallback(() => {
    setResult(null);
  }, []);

  if (result) {
    return (
      <>
        <div className="mb-6 flex flex-col gap-6">
          <div className="text-xl font-bold">Email: {result.email}</div>
          <div className="text-xl font-bold">Password: {result.password}</div>
          <div className="text-xl font-bold">Remember me: {result.remember.toString()}</div>
        </div>
        <Button className="font-bold" size="lg" onClick={onBack}>
          Back
        </Button>
      </>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>A simple login form</CardDescription>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {showState && <Badge variant={isDirty ? 'default' : 'outline'}>isDirty</Badge>}
            {showState && <Badge variant={isValid ? 'success' : 'outline'}>isValid</Badge>}
            {showState && <Badge variant={!isEmpty(errors) ? 'destructive' : 'outline'}>errors</Badge>}
            {showState && <Badge variant={isSubmitted ? 'default' : 'outline'}>isSubmitted</Badge>}
            {showState && <Badge variant={isSubmitted ? 'default' : 'outline'}>submitCount: {submitCount}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <TextField
            fieldName="email"
            label="Email"
            showState={showState}
            dirty={dirtyFields.email}
            touched={touchedFields.email}
            showError={!isNil(errors.email)}
            errorMessage={errors.email?.message}
            {...register('email', {
              required: 'Email is required.',
              pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' }
            })}
          />
          <TextField
            fieldName="password"
            type="password"
            label="Password"
            showState={showState}
            dirty={dirtyFields.password}
            touched={touchedFields.password}
            showError={!isNil(errors.password)}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <Controller
            control={control}
            name="remember"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={field.disabled}
                />
                <label className="text-sm" htmlFor="remember">
                  Remember me
                </label>
              </div>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full font-bold" type="submit" size="lg">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
