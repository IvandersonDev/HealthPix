import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ImageComparison from '@/components/ImageComparison';
import ProcessingStatus from '@/components/ProcessingStatus';
import InfoCard from '@/components/InfoCard';
import { Button } from '@/components/ui/button';
import { useImageProcessing } from '@/hooks/useImageProcessing';
import { 
  Upload, 
  ImageDown, 
  Zap, 
  Brain, 
  Microscope, 
  PieChart, 
  ScanLine, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const [isClient, setIsClient] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const { 
    originalImage, 
    processedImage, 
    status, 
    progress, 
    message, 
    handleImageUpload 
  } = useImageProcessing();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollCue(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      document.body.classList.remove('preload');
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (typeof document !== 'undefined' && !document.body.classList.contains('preload')) {
    document.body.classList.add('preload');
  }

  const featureCards = [
    {
      icon: Upload,
      title: "Envio Sem Esforço",
      description: "Envie imagens médicas através de uma interface intuitiva de arrastar e soltar ou seleção manual.",
      index: 0
    },
    {
      icon: ScanLine,
      title: "Segmentação Automatizada",
      description: "A segmentação baseada em IA identifica estruturas e anomalias nas imagens médicas.",
      index: 1
    },
    {
      icon: Brain,
      title: "Detecção de Anomalias",
      description: "Algoritmos avançados destacam anomalias potenciais, como tumores, fraturas e outras anormalidades.",
      index: 2
    },
    {
      icon: ImageDown,
      title: "Visualização Interativa",
      description: "Compare imagens originais e processadas lado a lado com capacidades de zoom, panorâmica e rotação.",
      index: 3
    },
    {
      icon: PieChart,
      title: "Análise Detalhada",
      description: "Receba relatórios completos sobre anomalias detectadas com capacidades de medição.",
      index: 4
    },
    {
      icon: Zap,
      title: "Processamento em Tempo Real",
      description: "Obtenha resultados imediatos com nossa tecnologia de processamento de imagem de alto desempenho.",
      index: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Seção Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent to-background"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 animate-fade-in">
              <Microscope className="w-4 h-4 mr-2" />
              Análise Avançada de Imagens Médicas
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-down">
              Processamento de Imagens Médicas<br />
              <span className="text-primary">Reimaginado</span>
            </h1>
            
            <p className="max-w-2xl text-lg text-muted-foreground mb-8 animate-slide-down [animation-delay:100ms]">
              Envie e analise imagens médicas com precisão e clareza. 
              Nosso algoritmo avançado detecta anomalias, segmenta regiões de interesse, 
              e fornece visualizações detalhadas para profissionais da saúde.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-down [animation-delay:200ms]">
              <Button size="lg" className="gap-2" asChild>
                <a href="#upload">
                  Comece Agora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </div>
            
            <div className="w-full max-w-4xl h-64 sm:h-80 md:h-96 rounded-xl bg-muted/50 shadow-elevation relative overflow-hidden animate-fade-in [animation-delay:300ms]">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-medical-blue/5 to-medical-light-blue/20 z-0">
                <svg width="160" height="160" viewBox="0 0 24 24" className="text-medical-blue/10">
                  <path d="M8 15C9.10457 15 10 14.1046 10 13C10 11.8954 9.10457 11 8 11C6.89543 11 6 11.8954 6 13C6 14.1046 6.89543 15 8 15Z" 
                    fill="currentColor"/>
                  <path d="M16.5 12C17.6046 12 18.5 11.1046 18.5 10C18.5 8.89543 17.6046 8 16.5 8C15.3954 8 14.5 8.89543 14.5 10C14.5 11.1046 15.3954 12 16.5 12Z" 
                    fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" 
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" 
                    fill="currentColor"/>
                </svg>
              </div>
              
              <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-around">
                <img 
                  src="https://s1.static.brasilescola.uol.com.br/be/e/raio%20X(1).jpg" 
                  alt="Exemplo de raio-X" 
                  className="w-1/3 h-auto rounded-lg shadow-elevation object-cover"
                  style={{ opacity: 0.9 }}
                />
                <ArrowRight className="w-8 h-8 text-medical-blue" />
                <img 
                  src="https://radiologiaprofissional.com.br/wp-content/uploads/2021/08/fatores-de-qualidade-da-imagem-724x1024.png" 
                  alt="Raio-X Processado" 
                  className="w-1/3 h-auto rounded-lg shadow-elevation object-cover relative"
                  style={{ opacity: 0.9 }}
                />
              </div>
              
              <div className="absolute top-1/2 right-[33%] transform -translate-y-1/2 w-16 h-16 rounded-full bg-medical-danger/30 border-2 border-medical-danger animate-pulse-subtle"></div>
            </div>
            
            {showScrollCue && isClient && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-float">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-2">Role para explorar</span>
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Seção de Características */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recursos Poderosos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma oferece um conjunto abrangente de ferramentas para ajudar os profissionais de saúde
                a analisar e interpretar imagens médicas com maior precisão e eficiência.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCards.map((feature) => (
                <InfoCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={feature.index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Seção de Upload e Processamento */}
        <section id="upload" className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Envie e Analise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Envie suas imagens médicas para obter análise instantânea e visualização das possíveis anomalias.
                Nossa plataforma suporta vários formatos de imagens médicas, incluindo DICOM, JPEG e PNG.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:order-1 order-2">
                <h3 className="text-xl font-semibold mb-4">Enviar Imagem Médica</h3>
                <ImageUploader 
                  onImageSelected={handleImageUpload} 
                  className="mb-4"
                />
                
                <ProcessingStatus 
                  status={status} 
                  progress={progress} 
                  message={message} 
                />
              </div>
              
              <div className="lg:order-2 order-1">
                <h3 className="text-xl font-semibold mb-4">Visualização dos Resultados</h3>
                
                {originalImage ? (
                  <ImageComparison 
                    originalImage={originalImage} 
                    processedImage={processedImage} 
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-xl border bg-muted/20 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <ImageDown className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Nenhuma imagem enviada ainda</h4>
                    <p className="text-sm text-muted-foreground mb-6">
                      Envie uma imagem médica à esquerda para ver os resultados do processamento aqui
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Como Funciona */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma avançada de processamento de imagens combina aprendizado de máquina de ponta
                com expertise médica para fornecer resultados precisos e confiáveis.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Linha do tempo */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
              
              {/* Passos */}
              <div className="space-y-12">
                {[ 
                  {
                    title: "Enviar Imagem Médica",
                    description: "Envie suas imagens médicas através da nossa interface intuitiva de arrastar e soltar ou por seleção manual.",
                    icon: Upload
                  },
                  {
                    title: "Processamento Automatizado",
                    description: "Nossos algoritmos de IA analisam a imagem, identificam estruturas e segmentam regiões de interesse.",
                    icon: Brain
                  },
                  {
                    title: "Detecção de Anomalias",
                    description: "O sistema detecta automaticamente anomalias potenciais, como tumores, fraturas ou outras anormalidades.",
                    icon: Microscope
                  },
                  {
                    title: "Resultados Interativos",
                    description: "Veja e interaja com a imagem processada, comparando-a lado a lado com a original.",
                    icon: ImageDown
                  }
                ].map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={step.title} className="relative flex flex-col md:flex-row items-center">
                      <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-1'}`}>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                      
                      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground my-4 md:my-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className={`md:w-1/2 ${isEven ? 'md:order-1 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                        {/* Div vazia para layout */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        
        {/* Seção de CTA */}
        <section className="py-16 bg-gradient-to-b from-medical-light-blue to-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Junte-se aos profissionais de saúde ao redor do mundo que estão usando nossa plataforma
              para aprimorar suas capacidades de diagnóstico.
            </p>
            
            <Button size="lg" className="animate-pulse-subtle" asChild>
              <a href="#upload">
                Envie Sua Primeira Imagem
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
