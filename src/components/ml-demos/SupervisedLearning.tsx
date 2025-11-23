import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Brain, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const SupervisedLearning = () => {
  const [numPoints, setNumPoints] = useState([30]);
  const [trainingData, setTrainingData] = useState<Array<{ x: number; y: number; label: string }>>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [model, setModel] = useState<{ slope: number; intercept: number } | null>(null);

  // Gera dados de treino para classificação linear simples
  const generateData = () => {
    const data = [];
    for (let i = 0; i < numPoints[0]; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      // Classificação simples: pontos acima da linha y = x são classe A, abaixo são classe B
      const label = y > x + (Math.random() - 0.5) * 20 ? "Classe A" : "Classe B";
      data.push({ x, y, label });
    }
    setTrainingData(data);
    setModel(null);
    toast.success(`${numPoints[0]} pontos gerados!`);
  };

  // Simula o treinamento de um modelo de regressão linear
  const trainModel = () => {
    if (trainingData.length === 0) {
      toast.error("Gere dados primeiro!");
      return;
    }

    setIsTraining(true);
    
    // Simula delay do treinamento
    setTimeout(() => {
      // Calcula regressão linear simples para separar as classes
      const classAPoints = trainingData.filter(p => p.label === "Classe A");
      const avgX = classAPoints.reduce((sum, p) => sum + p.x, 0) / classAPoints.length;
      const avgY = classAPoints.reduce((sum, p) => sum + p.y, 0) / classAPoints.length;
      
      // Linha de decisão simples
      const slope = 1.0 + (Math.random() - 0.5) * 0.3;
      const intercept = avgY - slope * avgX;
      
      setModel({ slope, intercept });
      setIsTraining(false);
      toast.success("Modelo treinado com sucesso!");
    }, 1500);
  };

  const reset = () => {
    setTrainingData([]);
    setModel(null);
    toast.info("Demonstração reiniciada");
  };

  // Calcula acurácia do modelo
  const calculateAccuracy = () => {
    if (!model || trainingData.length === 0) return 0;
    
    let correct = 0;
    trainingData.forEach(point => {
      const predictedY = model.slope * point.x + model.intercept;
      const predictedLabel = point.y > predictedY ? "Classe A" : "Classe B";
      if (predictedLabel === point.label) correct++;
    });
    
    return ((correct / trainingData.length) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="shadow-soft border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-6 h-6 text-primary" />
            Aprendizado Supervisionado: Classificação Linear
          </CardTitle>
          <CardDescription>
            Demonstração de classificação binária usando dados rotulados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Explicação */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold mb-2 text-primary">Como funciona:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Geramos pontos 2D com rótulos conhecidos (Classe A ou Classe B)</li>
              <li>O modelo aprende uma linha de decisão para separar as classes</li>
              <li>O objetivo é classificar corretamente novos pontos baseado nos dados de treino</li>
              <li>A acurácia indica o percentual de classificações corretas</li>
            </ol>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Número de pontos: {numPoints[0]}
              </label>
              <Slider
                value={numPoints}
                onValueChange={setNumPoints}
                min={10}
                max={100}
                step={10}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button onClick={generateData} variant="default" className="bg-gradient-primary">
                Gerar Dados
              </Button>
              <Button 
                onClick={trainModel} 
                disabled={trainingData.length === 0 || isTraining}
                variant="default"
                className="bg-gradient-accent"
              >
                <Play className="w-4 h-4 mr-2" />
                {isTraining ? "Treinando..." : "Treinar Modelo"}
              </Button>
              <Button onClick={reset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Visualization */}
          {trainingData.length > 0 && (
            <div className="space-y-4">
              <div className="relative w-full aspect-square bg-card border-2 border-border rounded-lg overflow-hidden">
                {/* Grid */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Grid lines */}
                  {[...Array(10)].map((_, i) => (
                    <g key={i}>
                      <line
                        x1={`${i * 10}%`}
                        y1="0%"
                        x2={`${i * 10}%`}
                        y2="100%"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                      <line
                        x1="0%"
                        y1={`${i * 10}%`}
                        x2="100%"
                        y2={`${i * 10}%`}
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    </g>
                  ))}
                  
                  {/* Decision boundary */}
                  {model && (
                    <line
                      x1="0%"
                      y1={`${100 - model.intercept}%`}
                      x2="100%"
                      y2={`${100 - (model.slope * 100 + model.intercept)}%`}
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                  )}
                  
                  {/* Data points */}
                  {trainingData.map((point, idx) => (
                    <circle
                      key={idx}
                      cx={`${point.x}%`}
                      cy={`${100 - point.y}%`}
                      r="4"
                      fill={point.label === "Classe A" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                      opacity="0.7"
                      stroke="white"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span>Classe A</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent"></div>
                  <span>Classe B</span>
                </div>
                {model && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-primary"></div>
                    <span>Linha de Decisão</span>
                  </div>
                )}
              </div>

              {/* Results */}
              {model && (
                <Card className="bg-primary/5 border-primary/30">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{trainingData.length}</p>
                        <p className="text-xs text-muted-foreground">Pontos de Treino</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-accent">{calculateAccuracy()}%</p>
                        <p className="text-xs text-muted-foreground">Acurácia</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">2</p>
                        <p className="text-xs text-muted-foreground">Classes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Code Example */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-semibold mb-2 text-muted-foreground">Exemplo de código (Python):</p>
            <pre className="text-xs overflow-x-auto">
              <code>{`from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Treinar modelo
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression()
model.fit(X_train, y_train)

# Fazer predições
accuracy = model.score(X_test, y_test)
print(f"Acurácia: {accuracy * 100:.1f}%")`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisedLearning;
