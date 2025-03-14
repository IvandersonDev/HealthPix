import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  className?: string;
  acceptedTypes?: string;
  maxSizeInMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  className,
  acceptedTypes = 'image/*',
  maxSizeInMB = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setError(null);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = useCallback((file: File): boolean => {
    // Verificar o tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError(`Tipo de arquivo inválido. Por favor, envie um arquivo de imagem.`);
      toast.error('Tipo de arquivo inválido. Por favor, envie um arquivo de imagem.');
      return false;
    }
    
    // Verificar o tamanho do arquivo
    if (file.size > maxSizeInBytes) {
      setError(`O tamanho do arquivo excede o limite de ${maxSizeInMB}MB.`);
      toast.error(`O tamanho do arquivo excede o limite de ${maxSizeInMB}MB.`);
      return false;
    }
    
    return true;
  }, [maxSizeInBytes, maxSizeInMB]);

  const processFile = useCallback((file: File) => {
    if (!validateFile(file)) return;
    
    // Criar a pré-visualização
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Enviar para o componente pai
    onImageSelected(file);
    setError(null);
    toast.success('Imagem enviada com sucesso');
  }, [validateFile, onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, [processFile]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Imagem removida');
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={acceptedTypes}
        onChange={handleFileChange}
      />
      
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={cn(
            "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all",
            "bg-muted/50 hover:bg-muted/80",
            isDragging && "border-primary bg-primary/5 drag-active",
            error && "border-destructive",
            "animate-fade-in"
          )}
        >
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-4",
            "bg-medical-light-blue text-medical-blue"
          )}>
            <Upload className="w-8 h-8" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">Solte sua imagem aqui</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Suporte para formatos PNG, JPEG, DICOM e outras imagens médicas
          </p>
          
          <p className="text-xs text-muted-foreground mb-6">
            Tamanho máximo do arquivo: {maxSizeInMB}MB
          </p>
          
          <Button variant="outline" type="button">
            <ImageIcon className="mr-2 h-4 w-4" />
            Selecionar Imagem
          </Button>
          
          {error && (
            <div className="mt-4 flex items-center space-x-2 text-destructive text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border animate-fade-in">
          <img 
            src={preview} 
            alt="Pré-visualização" 
            className="w-full h-auto max-h-[400px] object-contain bg-muted/30" 
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remover Imagem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
