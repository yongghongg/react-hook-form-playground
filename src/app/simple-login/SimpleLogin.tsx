'use client';

import styles from '@/app/simple-login/SimpleLogin.module.css';
import TextField from '@/components/TextField/TextField';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
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
  revalidateMode: ReValidateMode;
  delayError: number;
}

// const Button = tw.button`w-full rounded border bg-blue-600 p-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700`;

const SimpleLoginForm: React.FC<SimpleLoginFormProps> = ({ shouldFocusError, mode, delayError }) => {
  const [result, setResult] = useState<LoginFormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ shouldFocusError, mode: mode, delayError });

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
const configItems = ['validation-mode', 'should-focus-error', 'delayError'];

export default function SimpleLogin() {
  const [shouldFocusError, setShouldFocusError] = useState(true);
  const [selectedMode, setSelectedMode] = useState<ModeType>('onSubmit');
  const [delayError, setDelayError] = useState(0);
  const [expandedItems, setExpandedItems] = useState<string[]>(['item-1', 'item-3']);

  return (
    <div className={styles.container}>
      <div className="max-lg:hidden">
        <aside>
          <div>UseForm Configuration</div>
          <Accordion type="multiple" className="w-full" value={expandedItems} onValueChange={setExpandedItems}>
            <AccordionItem value="item-1">
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
            <AccordionItem value="item-2">
              <AccordionTrigger>shouldFocusError</AccordionTrigger>
              <AccordionContent>
                <Switch
                  id="shouldFocusError"
                  checked={shouldFocusError === true}
                  onCheckedChange={() => setShouldFocusError(!shouldFocusError)}
                />
                <Label htmlFor="shouldFocusError">shouldFocusError</Label>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>delayError</AccordionTrigger>
              <AccordionContent>
                <Label>delayError (milliseconds)</Label>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span>0</span>
                    <span>10000</span>
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
          </Accordion>
        </aside>
      </div>
      <main>
        {/* <nav>Header</nav> */}
        <div className={styles.mainContent}>
          <SimpleLoginForm
            key={selectedMode}
            shouldFocusError={shouldFocusError}
            mode={selectedMode}
            delayError={delayError}
          />
        </div>
      </main>
    </div>
  );
}
