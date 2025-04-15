import { FormConfigType } from '@/app/playground/playground.types';

export const formConfigDefaultValues: FormConfigType = {
  mode: 'onSubmit',
  reValidateMode: 'onChange',
  delayError: 0,
  shouldFocusError: true,
  disabled: false,
  showState: true
};

export const loginFormDefaultValues = {
  email: '',
  password: '',
  remember: false
};
