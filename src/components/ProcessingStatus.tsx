import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';

type StatusType = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface ProcessingStatusProps {
  status: StatusType;
  progress?: number;
  message?: string;
  className?: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  status,
  progress = 0,
  message,
  className
}) => {
  const statusIcon = () => {
    switch (status) {
      case 'idle':
        return null;
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-medical-success" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-medical-danger" />;
      default:
        return null;
    }
  };

  const statusText = () => {
    switch (status) {
      case 'idle':
        return 'Pronto para processar';
      case 'uploading':
        return 'Enviando...';
      case 'processing':
        return 'Processando...';
      case 'success':
        return 'Processamento concluído';
      case 'error':
        return 'Erro ao processar imagem';
      default:
        return '';
    }
  };

  if (status === 'idle') return null;

  return (
    <div className={cn(
      "w-full p-4 rounded-lg glass-effect animate-fade-in",
      className
    )}>
      <div className="flex items-center space-x-3 mb-2">
        {statusIcon()}
        <span className="font-medium text-sm">{statusText()}</span>
      </div>
      
      {(status === 'uploading' || status === 'processing') && (
        <Progress value={progress} className="h-1.5 mb-2" />
      )}
      
      {message && (
        <p className="text-xs text-muted-foreground">{message}</p>
      )}
    </div>
  );
}

export default ProcessingStatus;
