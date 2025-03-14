
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, Mail, Github } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "w-full py-6 px-4 sm:px-6 lg:px-8 mt-8 border-t",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-medical-blue to-medical-highlight flex items-center justify-center shadow-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15C9.10457 15 10 14.1046 10 13C10 11.8954 9.10457 11 8 11C6.89543 11 6 11.8954 6 13C6 14.1046 6.89543 15 8 15Z" 
                    fill="white"/>
                  <path d="M16.5 12C17.6046 12 18.5 11.1046 18.5 10C18.5 8.89543 17.6046 8 16.5 8C15.3954 8 14.5 8.89543 14.5 10C14.5 11.1046 15.3954 12 16.5 12Z" 
                    fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" 
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" 
                    fill="white"/>
                </svg>
              </div>
              <h3 className="text-base font-semibold">HealthPix Visualizer</h3>
</div>
<p className="text-sm text-muted-foreground mb-4 max-w-md">
  Ferramenta avançada de processamento de imagens médicas para profissionais da saúde. 
  Analise e visualize imagens médicas com precisão e clareza.
</p>
<div className="flex space-x-4">
  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
    <Mail size={18} />
    <span className="sr-only">Email</span>
  </a>
  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
    <Github size={18} />
    <span className="sr-only">GitHub</span>
  </a>
</div>
</div>

<div>
  <h4 className="text-sm font-semibold mb-4">Produto</h4>
  <ul className="space-y-2">
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Recursos</a></li>
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentação</a></li>
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Notas de Lançamento</a></li>
  </ul>
</div>

<div>
  <h4 className="text-sm font-semibold mb-4">Empresa</h4>
  <ul className="space-y-2">
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</a></li>
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Carreiras</a></li>
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a></li>
    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Termos de Serviço</a></li>
  </ul>
</div>
</div>

<div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
  <p className="text-xs text-muted-foreground">
    &copy; {currentYear} HealthPix Visualizer. Todos os direitos reservados.
  </p>
  <p className="text-xs flex items-center mt-4 sm:mt-0">
    <span>Feito com</span>
    <Heart size={12} className="mx-1 text-medical-danger" />
    <span>para profissionais da saúde</span>
  </p>
</div>
</div>
</footer>
);
}

export default Footer;
