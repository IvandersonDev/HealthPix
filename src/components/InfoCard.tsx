
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  index?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  index = 0
}) => {
  return (
    <div 
      className={cn(
        "group p-6 rounded-xl glass-card hover:shadow-elevation transition-all duration-300",
        "animate-fade-in [animation-delay:var(--animation-delay)]",
        className
      )}
      style={{ '--animation-delay': `${index * 100}ms` } as React.CSSProperties}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        "bg-medical-light-blue text-medical-blue group-hover:bg-medical-blue group-hover:text-white",
        "transition-colors duration-300 ease-in-out",
        iconClassName
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default InfoCard;
