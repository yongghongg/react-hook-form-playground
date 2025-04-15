'use client';

import FormConfiguration from '@/app/playground/components/FormConfiguration';
import { SimpleLoginForm } from '@/app/playground/components/SimpleLoginForm';
import { formConfigDefaultValues } from '@/app/playground/playground.constants';
import { FormConfigType } from '@/app/playground/playground.types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Settings2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Playground() {
  const methods = useForm<FormConfigType>({ defaultValues: formConfigDefaultValues });
  const { control, watch } = methods;
  const selectedMode = watch('mode');
  const selectedReValidationMode = watch('reValidateMode');
  const uniqueKey = `${selectedMode}-${selectedReValidationMode}`;

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
      <aside className="-ml-2 hidden md:sticky md:block">
        <FormConfiguration methods={methods} />
      </aside>
      <Sheet>
        <SheetTrigger asChild className="fixed left-6 top-16 z-10 md:hidden">
          <Button variant="ghost" size="icon" className="[&_svg]:size-6">
            <Settings2 />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-8">
          <FormConfiguration methods={methods} />
        </SheetContent>
      </Sheet>
      <main className="relative py-4 lg:gap-10 lg:py-6">
        <div className="mx-auto my-12 max-w-md">
          <SimpleLoginForm key={uniqueKey} control={control} />
        </div>
      </main>
    </div>
  );
}
