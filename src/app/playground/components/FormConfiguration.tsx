import { FormConfigType, ModeType, ReValidateMode } from '@/app/playground/playground.types';
import { Tooltip } from '@/components/Tooltip';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings2 } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';

interface FormConfigurationProps {
  methods: UseFormReturn<FormConfigType, any, undefined>;
}

interface SelectComponentProps {
  name: string;
  label: string;
  items: string[];
  field: ControllerRenderProps<FormConfigType, any>;
  tooltip?: ReactNode;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ name, label, items, field, tooltip }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        {tooltip && <Tooltip content={tooltip} />}
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
    <div className="mb-8 overflow-auto px-2 pt-4 lg:pt-8">
      <div className="flex-center flex justify-between">
        <h2 className="font-bold">useForm Configuration</h2>
        <Settings2 />
      </div>
      <Separator className="my-3" />
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="mode"
          render={({ field }) => (
            <SelectComponent
              field={field}
              name="mode"
              label="mode"
              items={validateModes}
              tooltip={
                <p>
                  Validation strategy <strong>before</strong> submitting behavior.
                </p>
              }
            />
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="reValidateMode"
          render={({ field }) => (
            <SelectComponent
              field={field}
              name="reValidateMode"
              label="reValidateMode"
              items={reValidateModes}
              tooltip={
                <p>
                  Validation strategy <strong>after</strong> submitting behavior.
                </p>
              }
            />
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="shouldFocusError"
          render={({ field }) => (
            <>
              <div className="flex items-center gap-2">
                <Label htmlFor="shouldFocusError">shouldFocusError</Label>
                <Tooltip content="Enable or disable built-in focus management." />
              </div>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label>delayError</Label>
                  <Tooltip content="Delay error from appearing instantly (in ms)." />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span>{field.value} ms</span>
                <Slider value={[field.value]} min={0} max={10000} step={1000} onValueChange={field.onChange} />
              </div>
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
              <div className="flex items-center gap-2">
                <Label htmlFor="disabled">disabled</Label>
                <Tooltip content="Disable the entire form with all associated inputs." />
              </div>
              <Switch id="disabled" checked={field.value === true} onCheckedChange={field.onChange} />
            </>
          )}
        />
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="showState"
          render={({ field }) => (
            <>
              <div className="flex items-center gap-2">
                <Label htmlFor="showState">Show State</Label>
                <Tooltip content="Show form and field state (not part of React Hook Form)." />
              </div>
              <Switch id="showState" checked={field.value === true} onCheckedChange={field.onChange} />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default FormConfiguration;
