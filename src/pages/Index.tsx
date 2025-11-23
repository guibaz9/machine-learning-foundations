import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Brain, Network, Zap, BookOpen } from "lucide-react";
import SupervisedLearning from "@/components/ml-demos/SupervisedLearning";
import UnsupervisedLearning from "@/components/ml-demos/UnsupervisedLearning";
import ReinforcementLearning from "@/components/ml-demos/ReinforcementLearning";
import IntroSection from "@/components/ml-demos/IntroSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Header */}
      <header className="border-b bg-card/50 backdrop-blur-lg sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-soft">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                KiLearning
              </h1>
              <p className="text-sm text-muted-foreground">
                Fundamentos e Tendências da Aprendizagem de Máquina
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Info Card */}
        <Card className="mb-8 p-6 shadow-soft bg-gradient-to-r from-card to-card/80 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Tema 1 - IA2 2025.2</h2>
              <p className="text-muted-foreground mb-2">
                Demonstração interativa dos três paradigmas fundamentais da Aprendizagem de Máquina
              </p>
              <div className="text-sm text-muted-foreground">
                <strong>Equipe:</strong> João Guilherme, Zenilton, Bruna, Igor Dias, Pedro, Ciro
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-card shadow-soft">
            <TabsTrigger 
              value="intro" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Introdução</span>
            </TabsTrigger>
            <TabsTrigger 
              value="supervised"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Supervisionado</span>
            </TabsTrigger>
            <TabsTrigger 
              value="unsupervised"
              className="data-[state=active]:bg-gradient-accent data-[state=active]:text-accent-foreground flex items-center gap-2 py-3"
            >
              <Network className="w-4 h-4" />
              <span className="hidden sm:inline">Não Supervisionado</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reinforcement"
              className="data-[state=active]:bg-gradient-neural data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Por Reforço</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intro" className="space-y-6">
            <IntroSection />
          </TabsContent>

          <TabsContent value="supervised" className="space-y-6">
            <SupervisedLearning />
          </TabsContent>

          <TabsContent value="unsupervised" className="space-y-6">
            <UnsupervisedLearning />
          </TabsContent>

          <TabsContent value="reinforcement" className="space-y-6">
            <ReinforcementLearning />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Inteligência Artificial 2 - 2025.2</p>
          <p className="mt-1">Demonstração desenvolvida para fins educacionais</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
