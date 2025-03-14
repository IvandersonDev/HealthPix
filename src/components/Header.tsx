
import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full py-4 px-4 sm:px-6 lg:px-8 border-b glass-effect sticky top-0 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-medical-blue to-medical-highlight flex items-center justify-center shadow-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 15C9.10457 15 10 14.1046 10 13C10 11.8954 9.10457 11 8 11C6.89543 11 6 11.8954 6 13C6 14.1046 6.89543 15 8 15Z" 
                fill="white"/>
              <path d="M16.5 12C17.6046 12 18.5 11.1046 18.5 10C18.5 8.89543 17.6046 8 16.5 8C15.3954 8 14.5 8.89543 14.5 10C14.5 11.1046 15.3954 12 16.5 12Z" 
                fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" 
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" 
                fill="white"/>
            </svg>
          </div>
          <div>
          <h1 className="text-lg font-semibold leading-tight">HealthPix Visualizer</h1>
      <p className="text-xs text-muted-foreground">Processamento de Imagens Médicas</p>
      </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Início</a>
        <a href="#upload" className="text-sm font-medium hover:text-primary transition-colors">Enviar Imagem</a>
        <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Sobre</a>
        <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contato</a>
      </nav>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          Documentação
        </Button>
        <Button className="hidden sm:inline-flex">Começar</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Início</DropdownMenuItem>
            <DropdownMenuItem>Enviar Imagem</DropdownMenuItem>
            <DropdownMenuItem>Sobre</DropdownMenuItem>
            <DropdownMenuItem>Contato</DropdownMenuItem>
            <DropdownMenuItem>Documentação</DropdownMenuItem>
            <DropdownMenuItem>Começar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
      </header>
      );
      }

export default Header;
