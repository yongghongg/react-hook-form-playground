'use client';

import styles from '@/app/simple-login/SimpleLogin.module.css';
import FormConfiguration from '@/components/FormConfiguration/FormConfiguration';
import { FormConfigType } from '@/components/FormConfiguration/FormConfiguration.type';
import TextField from '@/components/TextField/TextField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { isNil } from 'lodash-es';
import { useState } from 'react';
import { SubmitHandler, ValidationMode, useForm } from 'react-hook-form';

interface User {
  email: string;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

type ModeType = keyof ValidationMode;
type ReValidateMode = Exclude<ModeType, 'onTouched' | 'all'>;

interface SimpleLoginFormProps {
  shouldFocusError: boolean;
  mode: ModeType;
  reValidateMode: ReValidateMode;
  delayError: number;
}

// const Button = tw.button`w-full rounded border bg-blue-600 p-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700`;

const SimpleLoginForm: React.FC<SimpleLoginFormProps> = ({ shouldFocusError, mode, reValidateMode, delayError }) => {
  const [result, setResult] = useState<LoginFormValues | null>(null);
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

const validateModes: ModeType[] = ['onBlur', 'onChange', 'onSubmit', 'onTouched', 'all'];
const reValidateModes: ReValidateMode[] = ['onBlur', 'onChange', 'onSubmit'];
const configItems = ['validation-mode', 'revalidation-mode', 'should-focus-error', 'delayError'];

export default function SimpleLogin() {
  const [shouldFocusError, setShouldFocusError] = useState(true);
  const [selectedMode, setSelectedMode] = useState<ModeType>('onSubmit');
  const [selectedReValidationMode, setSelectedReValidationMode] = useState<ReValidateMode>('onSubmit');
  const [delayError, setDelayError] = useState(0);
  const [expandedItems, setExpandedItems] = useState<string[]>(configItems);
  const { control, register, setValue, watch } = useForm<FormConfigType>({
    defaultValues: {
      mode: 'onSubmit', reValidateMode: 'onSubmit', delayError: 0, shouldFocusError: true
    }
  });

  console.log(watch('mode'));

  const uniqueKey = `${selectedMode}-${selectedReValidationMode}`;

  return (
    <div className={styles.container}>
      <div className="min-h-screen p-4 shadow-md max-lg:hidden">
        <aside>
          <FormConfiguration register={register} control={control} />
          {/* <Accordion type="multiple" className="w-full" value={expandedItems} onValueChange={setExpandedItems}>
            <AccordionItem value="validation-mode">
              <AccordionTrigger>Validation Mode</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="onSubmit" onValueChange={(e) => setSelectedMode(e as ModeType)}>
                  {validateModes.map((mode, index) => {
                    const id = `mode-${index}`;
                    const displayMode = mode === 'onSubmit' ? `${mode} (default)` : mode;
                    return (
                      <div key={id} className="flex items-center space-x-2">
                        <RadioGroupItem value={mode} id={id} checked={selectedMode === mode} />
                        <Label htmlFor={id}>{displayMode}</Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="revalidation-mode">
              <AccordionTrigger>Re-validation Mode</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue="onSubmit"
                  onValueChange={(e) => setSelectedReValidationMode(e as ReValidateMode)}
                >
                  {reValidateModes.map((mode, index) => {
                    const id = `revalidate-mode-${index}`;
                    const displayMode = mode === 'onChange' ? `${mode} (default)` : mode;
                    return (
                      <div key={id} className="flex items-center space-x-2">
                        <RadioGroupItem value={mode} id={id} checked={selectedReValidationMode === mode} />
                        <Label htmlFor={id}>{displayMode}</Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="should-focus-error">
              <AccordionTrigger>shouldFocusError</AccordionTrigger>
              <AccordionContent className="flex items-center gap-2">
                <Label htmlFor="shouldFocusError">shouldFocusError</Label>
                <Switch
                  id="shouldFocusError"
                  checked={shouldFocusError === true}
                  onCheckedChange={() => setShouldFocusError(!shouldFocusError)}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delayError">
              <AccordionTrigger>delayError</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="mb-3 flex items-center justify-center">
                    <span>{delayError} milliseconds</span>
                  </div>
                  <Slider
                    defaultValue={[delayError]}
                    max={10000}
                    step={1000}
                    onValueChange={(val) => setDelayError(val[0])}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </aside>
      </div>
      <main>
        {/* <nav>Header</nav> */}
        <div className={styles.mainContent}>
          <SimpleLoginForm
            key={uniqueKey}
            shouldFocusError={shouldFocusError}
            mode={selectedMode}
            reValidateMode={selectedReValidationMode}
            delayError={delayError}
          />
        </div>
      </main>
    </div>
  );
}
