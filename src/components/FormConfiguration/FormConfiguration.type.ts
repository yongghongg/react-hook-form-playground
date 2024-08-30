import { ValidationMode } from 'react-hook-form';

export type ModeType = keyof ValidationMode;
export type ReValidateMode = Exclude<ModeType, 'onTouched' | 'all'>;

export interface FormConfigType {
  shouldFocusError: boolean;
  mode: ModeType;
  reValidateMode: ReValidateMode;
  delayError: number;
}
