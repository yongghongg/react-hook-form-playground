import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipWrapper } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  return (
    <TooltipProvider delayDuration={300}>
      <TooltipWrapper>
        <TooltipTrigger>
          <Info size={18} />
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipWrapper>
    </TooltipProvider>
  );
};
