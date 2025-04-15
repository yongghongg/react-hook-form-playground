import { Button } from '@/components/ui/button';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipWrapper } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface TooltipProps {
  content: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <TooltipWrapper open={open}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onTouchStart={() => setOpen(!open)}
            onKeyDown={(e) => {
              e.preventDefault();
              e.key === 'Enter' && setOpen(!open);
            }}
          >
            <Info size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className={!content ? 'hidden' : ''}>{content}</TooltipContent>
      </TooltipWrapper>
    </TooltipProvider>
  );
};
