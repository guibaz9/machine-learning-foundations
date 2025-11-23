import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Network, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const UnsupervisedLearning = () => {
  const [numClusters, setNumClusters] = useState([3]);
  const [numPoints, setNumPoints] = useState([60]);
  const [dataPoints, setDataPoints] = useState<Array<{ x: number; y: number; cluster?: number }>>([]);
  const [centroids, setCentroids] = useState<Array<{ x: number; y: number }>>([]);
  const [isClustering, setIsClustering] = useState(false);

  const COLORS = [
    "hsl(262, 83%, 58%)",  // primary
    "hsl(175, 70%, 50%)",  // accent
    "hsl(280, 90%, 70%)",  // primary-glow
    "hsl(45, 100%, 60%)",  // yellow
    "hsl(340, 82%, 52%)",  // pink
  ];

  // Gera dados não rotulados com clusters naturais
  const generateData = () => {
    const data = [];
    const clusterCenters = [];
    
    // Cria centros de cluster aleatórios
    for (let i = 0; i < numClusters[0]; i++) {
      clusterCenters.push({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      });
    }

    // Gera pontos ao redor dos centros
    for (let i = 0; i < numPoints[0]; i++) {
      const center = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 15;
      
      data.push({
        x: Math.max(5, Math.min(95, center.x + Math.cos(angle) * radius)),
        y: Math.max(5, Math.min(95, center.y + Math.sin(angle) * radius)),
      });
    }

    setDataPoints(data);
    setCentroids([]);
    toast.success(`${numPoints[0]} pontos gerados!`);
  };

  // Implementa K-Means clustering simplificado
  const runKMeans = () => {
    if (dataPoints.length === 0) {
      toast.error("Gere dados primeiro!");
      return;
    }

    setIsClustering(true);

    // Inicializa centróides aleatoriamente
    const initialCentroids = [];
    for (let i = 0; i < numClusters[0]; i++) {
      const randomPoint = dataPoints[Math.floor(Math.random() * dataPoints.length)];
      initialCentroids.push({ ...randomPoint });
    }

    let currentCentroids = initialCentroids;
    let iterations = 0;
    const maxIterations = 10;

    const iterate = () => {
      if (iterations >= maxIterations) {
        setCentroids(currentCentroids);
        setIsClustering(false);
        toast.success("Clustering concluído!");
        return;
      }

      // Atribui cada ponto ao centróide mais próximo
      const newDataPoints = dataPoints.map(point => {
        let minDist = Infinity;
        let closestCluster = 0;

        currentCentroids.forEach((centroid, idx) => {
          const dist = Math.sqrt(
            Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            closestCluster = idx;
          }
        });

        return { ...point, cluster: closestCluster };
      });

      // Recalcula centróides
      const newCentroids = currentCentroids.map((_, clusterIdx) => {
        const clusterPoints = newDataPoints.filter(p => p.cluster === clusterIdx);
        if (clusterPoints.length === 0) return currentCentroids[clusterIdx];

        const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        return { x: avgX, y: avgY };
      });

      setDataPoints(newDataPoints);
      currentCentroids = newCentroids;
      iterations++;

      setTimeout(iterate, 300);
    };

    iterate();
  };

  const reset = () => {
    setDataPoints([]);
    setCentroids([]);
    toast.info("Demonstração reiniciada");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="shadow-soft border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Network className="w-6 h-6 text-accent" />
            Aprendizado Não Supervisionado: K-Means Clustering
          </CardTitle>
          <CardDescription>
            Descobrindo padrões e agrupamentos em dados não rotulados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Explicação */}
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <h3 className="font-semibold mb-2 text-accent">Como funciona:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Geramos pontos sem rótulos (não sabemos a que grupo pertencem)</li>
              <li>O algoritmo K-Means agrupa pontos similares automaticamente</li>
              <li>Centróides são calculados como o centro de cada cluster</li>
              <li>O processo itera até convergir para a melhor configuração</li>
            </ol>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Número de clusters: {numClusters[0]}
                </label>
                <Slider
                  value={numClusters}
                  onValueChange={setNumClusters}
                  min={2}
                  max={5}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Número de pontos: {numPoints[0]}
                </label>
                <Slider
                  value={numPoints}
                  onValueChange={setNumPoints}
                  min={20}
                  max={150}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button onClick={generateData} variant="default" className="bg-gradient-accent">
                Gerar Dados
              </Button>
              <Button 
                onClick={runKMeans} 
                disabled={dataPoints.length === 0 || isClustering}
                variant="default"
                className="bg-gradient-primary"
              >
                <Play className="w-4 h-4 mr-2" />
                {isClustering ? "Clusterizando..." : "Executar K-Means"}
              </Button>
              <Button onClick={reset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Visualization */}
          {dataPoints.length > 0 && (
            <div className="space-y-4">
              <div className="relative w-full aspect-square bg-card border-2 border-border rounded-lg overflow-hidden">
                <svg className="absolute inset-0 w-full h-full">
                  {/* Grid */}
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
                  
                  {/* Data points */}
                  {dataPoints.map((point, idx) => (
                    <circle
                      key={idx}
                      cx={`${point.x}%`}
                      cy={`${100 - point.y}%`}
                      r="3"
                      fill={point.cluster !== undefined ? COLORS[point.cluster] : "hsl(var(--muted-foreground))"}
                      opacity="0.7"
                      stroke="white"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Centroids */}
                  {centroids.map((centroid, idx) => (
                    <g key={idx}>
                      <circle
                        cx={`${centroid.x}%`}
                        cy={`${100 - centroid.y}%`}
                        r="8"
                        fill={COLORS[idx]}
                        opacity="0.3"
                      />
                      <circle
                        cx={`${centroid.x}%`}
                        cy={`${100 - centroid.y}%`}
                        r="5"
                        fill={COLORS[idx]}
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
                {centroids.length > 0 ? (
                  centroids.map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: COLORS[idx] }}
                      ></div>
                      <span>Cluster {idx + 1}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted-foreground"></div>
                    <span>Dados não clusterizados</span>
                  </div>
                )}
              </div>

              {/* Results */}
              {centroids.length > 0 && (
                <Card className="bg-accent/5 border-accent/30">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-accent">{dataPoints.length}</p>
                        <p className="text-xs text-muted-foreground">Pontos</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{numClusters[0]}</p>
                        <p className="text-xs text-muted-foreground">Clusters</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {(dataPoints.length / numClusters[0]).toFixed(0)}
                        </p>
                        <p className="text-xs text-muted-foreground">Média/Cluster</p>
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
              <code>{`from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Aplicar K-Means
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)

# Visualizar resultados
plt.scatter(X[:, 0], X[:, 1], c=clusters, cmap='viridis')
plt.scatter(kmeans.cluster_centers_[:, 0], 
           kmeans.cluster_centers_[:, 1], 
           marker='X', s=200, c='red')
plt.show()`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnsupervisedLearning;
