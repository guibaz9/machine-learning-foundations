import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Network, Zap, TrendingUp } from "lucide-react";

const IntroSection = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Overview */}
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-6 h-6 text-primary" />
            Fundamentos da Aprendizagem de Máquina
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">
            A <strong>Aprendizagem de Máquina (Machine Learning)</strong> é um subcampo da Inteligência 
            Artificial que permite aos sistemas aprenderem e melhorarem automaticamente através da experiência, 
            sem serem explicitamente programados para cada tarefa específica.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Diferente da programação tradicional, onde definimos regras explícitas, em ML os algoritmos 
            descobrem padrões nos dados e constroem modelos preditivos que podem generalizar para novos casos.
          </p>
        </CardContent>
      </Card>

      {/* Three Paradigms */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-soft hover:shadow-hover transition-smooth border-l-4 border-l-primary">
          <CardHeader>
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Aprendizado Supervisionado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              O modelo aprende a partir de dados rotulados, onde cada exemplo de entrada possui uma saída conhecida.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Exemplos de aplicação:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Classificação de e-mails (spam/não spam)</li>
                <li>Previsão de preços de imóveis</li>
                <li>Diagnóstico médico assistido</li>
                <li>Reconhecimento de dígitos manuscritos</li>
              </ul>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-primary font-medium">
                Algoritmos: Regressão Linear, SVM, Random Forest, Redes Neurais
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-hover transition-smooth border-l-4 border-l-accent">
          <CardHeader>
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
              <Network className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-xl">Aprendizado Não Supervisionado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              O modelo descobre padrões e estruturas ocultas em dados não rotulados, sem orientação explícita.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Exemplos de aplicação:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Segmentação de clientes</li>
                <li>Detecção de anomalias</li>
                <li>Compressão de dados</li>
                <li>Sistemas de recomendação</li>
              </ul>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-accent font-medium">
                Algoritmos: K-Means, DBSCAN, PCA, Autoencoders
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-hover transition-smooth border-l-4 border-l-primary-glow">
          <CardHeader>
            <div className="p-3 bg-primary-glow/10 rounded-lg w-fit mb-2">
              <Zap className="w-6 h-6 text-primary-glow" />
            </div>
            <CardTitle className="text-xl">Aprendizado por Reforço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              O agente aprende através de tentativa e erro, recebendo recompensas ou penalidades por suas ações.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Exemplos de aplicação:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Jogos (AlphaGo, xadrez)</li>
                <li>Robótica e controle</li>
                <li>Carros autônomos</li>
                <li>Otimização de recursos</li>
              </ul>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-primary-glow font-medium">
                Algoritmos: Q-Learning, DQN, PPO, A3C
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Section */}
      <Card className="shadow-soft bg-gradient-to-br from-card to-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="w-6 h-6 text-primary" />
            Tendências e Fronteiras de Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Deep Learning e Transformers</h3>
              <p className="text-sm text-muted-foreground">
                Arquiteturas como GPT, BERT e Vision Transformers revolucionaram o processamento de 
                linguagem natural e visão computacional, permitindo modelos com bilhões de parâmetros.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Federated Learning</h3>
              <p className="text-sm text-muted-foreground">
                Aprendizado distribuído que preserva privacidade, treinando modelos em dispositivos 
                locais sem compartilhar dados brutos.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-accent">AutoML e Neural Architecture Search</h3>
              <p className="text-sm text-muted-foreground">
                Automatização do design de modelos de ML, democratizando o acesso à IA através 
                de ferramentas que otimizam hiperparâmetros e arquiteturas.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-accent">Explainable AI (XAI)</h3>
              <p className="text-sm text-muted-foreground">
                Técnicas para tornar modelos de IA interpretáveis e transparentes, essencial 
                para aplicações críticas em saúde, finanças e justiça.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t mt-4">
            <p className="text-sm text-muted-foreground italic">
              💡 <strong>Explore as abas acima</strong> para ver demonstrações interativas de cada paradigma 
              com exemplos práticos e visualizações em tempo real!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroSection;
