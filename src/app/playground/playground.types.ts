import { Control, ValidationMode } from 'react-hook-form';

export type ModeType = keyof ValidationMode;
export type ReValidateMode = Exclude<ModeType, 'onTouched' | 'all'>;

export interface FormConfigType {
  shouldFocusError: boolean;
  mode: ModeType;
  reValidateMode: ReValidateMode;
  delayError: number;
  disabled: boolean;
  showState: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface SimpleLoginFormProps {
  control: Control<FormConfigType>;
}
