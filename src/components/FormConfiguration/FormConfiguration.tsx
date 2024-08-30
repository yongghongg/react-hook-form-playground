import { FormConfigType, ModeType, ReValidateMode } from '@/components/FormConfiguration/FormConfiguration.type';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Settings2 } from 'lucide-react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';

interface FormConfigurationProps {
  register: UseFormRegister<FormConfigType>;
  control: Control<FormConfigType, any>;
}

const validateModes: ModeType[] = ['onBlur', 'onChange', 'onSubmit', 'onTouched', 'all'];
const reValidateModes: ReValidateMode[] = ['onBlur', 'onChange', 'onSubmit'];

const FormConfiguration: React.FC<FormConfigurationProps> = ({ register, control }) => {
  return (
    <>
      <div className="flex-center flex justify-between">
        <Settings2 />
        <h2>UseForm Configuration</h2>
      </div>
      <Separator />
      <div>
        <Controller
          control={control}
          name="mode"
          render={({ field }) => {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Validation Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup {...register('mode')}>
                    {validateModes.map((mode, index) => {
                      const id = `mode-${index}`;
                      const displayMode = mode === 'onSubmit' ? `${mode} (default)` : mode;
                      return (
                        <SelectItem key={id} value={mode}>
                          {displayMode}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
      </div>
    </>
  );
};

export default FormConfiguration;
