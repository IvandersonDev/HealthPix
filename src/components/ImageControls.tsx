import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  Maximize2, 
  ArrowLeft, 
  ArrowRight,
  ScanLine
} from 'lucide-react';

interface ImageControlsProps {
  zoom: number;
  onZoomChange: (value: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
  onFullscreen?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasSegmentation?: boolean;
  onToggleSegmentation?: () => void;
  isSegmentationVisible?: boolean;
  className?: string;
}

const ImageControls: React.FC<ImageControlsProps> = ({
  zoom,
  onZoomChange,
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  onReset,
  onFullscreen,
  onNext,
  onPrevious,
  hasSegmentation = false,
  onToggleSegmentation,
  isSegmentationVisible = true,
  className
}) => {
  return (
    <div className={cn(
      "p-2 glass-effect rounded-lg flex items-center justify-between gap-2",
      "shadow-subtle animate-fade-in",
      className
    )}>
      <div className="flex items-center space-x-1">
        {onPrevious && (
          <Button variant="ghost" size="icon" onClick={onPrevious} title="Imagem Anterior">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
        )}
        
        <Button variant="ghost" size="icon" onClick={onZoomOut} title="Diminuir Zoom">
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Diminuir Zoom</span>
        </Button>
        
        <div className="w-24 px-2">
          <Slider 
            value={[zoom]} 
            min={10} 
            max={400} 
            step={10} 
            onValueChange={(values) => onZoomChange(values[0])} 
          />
        </div>
        
        <Button variant="ghost" size="icon" onClick={onZoomIn} title="Aumentar Zoom">
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Aumentar Zoom</span>
        </Button>
        
        <div className="text-xs font-medium w-14 text-center">
          {zoom}%
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" onClick={onRotateLeft} title="Rotacionar Esquerda">
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Rotacionar Esquerda</span>
        </Button>
        
        <Button variant="ghost" size="icon" onClick={onRotateRight} title="Rotacionar Direita">
          <RotateCw className="h-4 w-4" />
          <span className="sr-only">Rotacionar Direita</span>
        </Button>
        
        {hasSegmentation && onToggleSegmentation && (
          <Button 
            variant={isSegmentationVisible ? "default" : "ghost"} 
            size="icon" 
            onClick={onToggleSegmentation}
            title="Alternar Segmentação"
          >
            <ScanLine className="h-4 w-4" />
            <span className="sr-only">Alternar Segmentação</span>
          </Button>
        )}
        
        <Button variant="ghost" size="icon" onClick={onReset} title="Redefinir Visualização">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2V8H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.05 13C3.27151 15.8566 4.51919 18.5206 6.58021 20.4578C8.64123 22.395 11.3711 23.4593 14.2341 23.4946C17.097 23.5299 19.853 22.5344 21.9646 20.6495C24.0761 18.7647 25.399 16.1362 25.7 13.287C26.001 10.4378 25.2692 7.61135 23.6353 5.28965C22.0015 2.96794 19.5819 1.30151 16.8035 0.575736C14.0251 -0.150037 11.121 0.106604 8.51083 1.30205C5.90068 2.4975 3.7599 4.5582 2.44 7.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sr-only">Redefinir</span>
        </Button>
        
        {onFullscreen && (
          <Button variant="ghost" size="icon" onClick={onFullscreen} title="Tela Cheia">
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">Tela Cheia</span>
          </Button>
        )}
        
        {onNext && (
          <Button variant="ghost" size="icon" onClick={onNext} title="Próxima Imagem">
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Próxima</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ImageControls;
