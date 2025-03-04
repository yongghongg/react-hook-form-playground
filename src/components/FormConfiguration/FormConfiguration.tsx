import { FormConfigType, ModeType, ReValidateMode } from '@/components/FormConfiguration/FormConfiguration.type';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Settings2 } from 'lucide-react';
import React from 'react';
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';

interface FormConfigurationProps {
  methods: UseFormReturn<FormConfigType, any, undefined>;
}

interface SelectComponentProps {
  name: string;
  label: string;
  items: string[];
  field: ControllerRenderProps<FormConfigType, any>;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ name, label, items, field }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={18} />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Validation strategy <strong>before</strong> submitting behavior.{' '}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item, index) => {
              const id = `${name}-${index}`;
              return (
                <SelectItem key={id} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

const validateModes: ModeType[] = ['onBlur', 'onChange', 'onSubmit', 'onTouched', 'all'];
const reValidateModes: ReValidateMode[] = ['onBlur', 'onChange', 'onSubmit'];

const FormConfiguration: React.FC<FormConfigurationProps> = ({ methods }) => {
  const { control } = methods;
  return (
    <div>
      <div className="flex-center flex justify-between">
        <h2>useForm Configuration</h2>
        <Settings2 />
      </div>
      <Separator className="my-3" />
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="mode"
          render={({ field }) => (
            <SelectComponent field={field} name="mode" label="Validation mode" items={validateModes} />
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="reValidateMode"
          render={({ field }) => (
            <SelectComponent field={field} name="reValidateMode" label="Re-validation mode" items={reValidateModes} />
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="shouldFocusError"
          render={({ field }) => (
            <>
              <Label htmlFor="shouldFocusError">shouldFocusError</Label>
              <Switch id="shouldFocusError" checked={field.value === true} onCheckedChange={field.onChange} />
            </>
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="delayError"
          render={({ field }) => (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Label>delayError</Label>
                <span>
                  {field.value} {field.value == 0 ? 'millisecond' : 'milliseconds'}
                </span>
              </div>
              <Slider value={[field.value]} min={0} max={10000} step={1000} onValueChange={field.onChange} />
            </div>
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="disabled"
          render={({ field }) => (
            <>
              <Label htmlFor="disabled">disabled</Label>
              <Switch id="disabled" checked={field.value === true} onCheckedChange={field.onChange} />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default FormConfiguration;
