import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Zap, Play, RotateCcw, Trophy, Download } from "lucide-react";
import { toast } from "sonner";
import GIF from "gif.js";

interface GridCell {
  x: number;
  y: number;
  type: 'empty' | 'goal' | 'trap' | 'agent';
  value: number;
}

const ReinforcementLearning = () => {
  const gridSize = 5;
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [agentPos, setAgentPos] = useState({ x: 0, y: 0 });
  const [episodes, setEpisodes] = useState([100]);
  const [isTraining, setIsTraining] = useState(false);
  const [totalReward, setTotalReward] = useState(0);
  const [episodeCount, setEpisodeCount] = useState(0);
  const [qTable, setQTable] = useState<number[][][]>([]);
  const [isGeneratingGif, setIsGeneratingGif] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Inicializa o grid
  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid: GridCell[][] = [];
    for (let y = 0; y < gridSize; y++) {
      const row: GridCell[] = [];
      for (let x = 0; x < gridSize; x++) {
        row.push({
          x,
          y,
          type: 'empty',
          value: 0,
        });
      }
      newGrid.push(row);
    }

    // Define objetivo (canto superior direito)
    newGrid[0][gridSize - 1].type = 'goal';
    newGrid[0][gridSize - 1].value = 100;

    // Define armadilhas
    newGrid[2][2].type = 'trap';
    newGrid[2][2].value = -50;
    newGrid[3][1].type = 'trap';
    newGrid[3][1].value = -50;

    // Posição inicial do agente
    newGrid[gridSize - 1][0].type = 'agent';

    setGrid(newGrid);
    setAgentPos({ x: 0, y: gridSize - 1 });
    
    // Inicializa Q-table (4 ações: cima, direita, baixo, esquerda)
    const newQTable = Array(gridSize).fill(0).map(() => 
      Array(gridSize).fill(0).map(() => Array(4).fill(0))
    );
    setQTable(newQTable);
  };

  const getReward = (x: number, y: number): number => {
    if (grid[y] && grid[y][x]) {
      return grid[y][x].value;
    }
    return -1; // Penalidade por movimento
  };

  const isValidMove = (x: number, y: number): boolean => {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
  };

  const trainAgent = async () => {
    if (isTraining) return;
    
    setIsTraining(true);
    setTotalReward(0);
    setEpisodeCount(0);
    
    let currentQTable = [...qTable];
    const learningRate = 0.1;
    const discountFactor = 0.95;
    const epsilon = 0.2; // Exploration rate
    
    for (let episode = 0; episode < episodes[0]; episode++) {
      let currentX = 0;
      let currentY = gridSize - 1;
      let episodeReward = 0;
      let steps = 0;
      const maxSteps = 50;

      while (steps < maxSteps) {
        // Escolhe ação (epsilon-greedy)
        let action;
        if (Math.random() < epsilon) {
          action = Math.floor(Math.random() * 4); // Explore
        } else {
          // Exploit: escolhe melhor ação conhecida
          action = currentQTable[currentY][currentX].indexOf(
            Math.max(...currentQTable[currentY][currentX])
          );
        }

        // Executa ação
        let nextX = currentX;
        let nextY = currentY;
        
        switch(action) {
          case 0: nextY--; break; // Cima
          case 1: nextX++; break; // Direita
          case 2: nextY++; break; // Baixo
          case 3: nextX--; break; // Esquerda
        }

        // Verifica se movimento é válido
        if (!isValidMove(nextX, nextY)) {
          nextX = currentX;
          nextY = currentY;
        }

        const reward = getReward(nextX, nextY);
        episodeReward += reward;

        // Atualiza Q-value
        const oldQValue = currentQTable[currentY][currentX][action];
        const nextMaxQ = Math.max(...currentQTable[nextY][nextX]);
        const newQValue = oldQValue + learningRate * (reward + discountFactor * nextMaxQ - oldQValue);
        currentQTable[currentY][currentX][action] = newQValue;

        currentX = nextX;
        currentY = nextY;
        steps++;

        // Termina episódio se chegou no objetivo ou armadilha
        if (grid[currentY][currentX].type === 'goal' || 
            grid[currentY][currentX].type === 'trap') {
          break;
        }
      }

      setTotalReward(prev => prev + episodeReward);
      setEpisodeCount(episode + 1);

      // Atualiza visualização a cada 10 episódios
      if (episode % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    setQTable(currentQTable);
    setIsTraining(false);
    toast.success("Treinamento concluído!");
  };

  const captureFrame = async (): Promise<HTMLCanvasElement> => {
    return new Promise((resolve) => {
      if (!gridRef.current) return;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 400;
      canvas.height = 400;
      
      const cellSize = 80;
      const gap = 2;
      
      grid.forEach((row, y) => {
        row.forEach((cell, x) => {
          const posX = x * cellSize;
          const posY = y * cellSize;
          
          // Background color
          if (cell.x === agentPos.x && cell.y === agentPos.y) {
            ctx.fillStyle = '#9b87f5';
          } else if (cell.type === 'goal') {
            ctx.fillStyle = '#0EA5E9';
          } else if (cell.type === 'trap') {
            ctx.fillStyle = '#ef4444';
          } else {
            ctx.fillStyle = '#1A1F2C';
          }
          
          ctx.fillRect(posX, posY, cellSize - gap, cellSize - gap);
          
          // Emojis
          ctx.font = '40px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          if (cell.x === agentPos.x && cell.y === agentPos.y) {
            ctx.fillText('🤖', posX + cellSize/2, posY + cellSize/2);
          } else if (cell.type === 'goal') {
            ctx.fillText('🎯', posX + cellSize/2, posY + cellSize/2);
          } else if (cell.type === 'trap') {
            ctx.fillText('💥', posX + cellSize/2, posY + cellSize/2);
          }
        });
      });
      
      resolve(canvas);
    });
  };

  const generateGif = async () => {
    if (isTraining || qTable.length === 0) {
      toast.error("Treine o agente primeiro!");
      return;
    }

    setIsGeneratingGif(true);
    toast.info("Gerando GIF...");

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: 400,
      height: 400,
      workerScript: 'https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js'
    });

    let currentX = 0;
    let currentY = gridSize - 1;
    const maxSteps = 20;
    let steps = 0;

    // Captura frame inicial
    let frame = await captureFrame();
    gif.addFrame(frame, { delay: 500 });

    while (steps < maxSteps) {
      const action = qTable[currentY][currentX].indexOf(
        Math.max(...qTable[currentY][currentX])
      );

      let nextX = currentX;
      let nextY = currentY;
      
      switch(action) {
        case 0: nextY--; break;
        case 1: nextX++; break;
        case 2: nextY++; break;
        case 3: nextX--; break;
      }

      if (!isValidMove(nextX, nextY)) break;

      setAgentPos({ x: nextX, y: nextY });
      currentX = nextX;
      currentY = nextY;
      steps++;

      await new Promise(resolve => setTimeout(resolve, 50));
      frame = await captureFrame();
      gif.addFrame(frame, { delay: 500 });

      if (grid[currentY][currentX].type === 'goal' || 
          grid[currentY][currentX].type === 'trap') {
        break;
      }
    }

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      setIsGeneratingGif(false);
      toast.success("GIF gerado com sucesso!");
      
      // Volta posição inicial
      setAgentPos({ x: 0, y: gridSize - 1 });
    });

    gif.render();
  };

  const demonstratePath = async () => {
    if (isTraining || qTable.length === 0) {
      toast.error("Treine o agente primeiro!");
      return;
    }

    let currentX = 0;
    let currentY = gridSize - 1;
    const maxSteps = 20;
    let steps = 0;

    while (steps < maxSteps) {
      await new Promise(resolve => setTimeout(resolve, 500));

      const action = qTable[currentY][currentX].indexOf(
        Math.max(...qTable[currentY][currentX])
      );

      let nextX = currentX;
      let nextY = currentY;
      
      switch(action) {
        case 0: nextY--; break;
        case 1: nextX++; break;
        case 2: nextY++; break;
        case 3: nextX--; break;
      }

      if (!isValidMove(nextX, nextY)) break;

      setAgentPos({ x: nextX, y: nextY });
      currentX = nextX;
      currentY = nextY;
      steps++;

      if (grid[currentY][currentX].type === 'goal') {
        toast.success("Agente chegou ao objetivo!", {
          icon: <Trophy className="w-4 h-4" />,
        });
        break;
      }
      
      if (grid[currentY][currentX].type === 'trap') {
        toast.error("Agente caiu em uma armadilha!");
        break;
      }
    }

    setTimeout(() => {
      setAgentPos({ x: 0, y: gridSize - 1 });
    }, 1000);
  };

  const downloadGif = () => {
    if (!gifUrl) return;
    
    const link = document.createElement('a');
    link.href = gifUrl;
    link.download = 'agente-q-learning.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download iniciado!");
  };

  const reset = () => {
    initializeGrid();
    setTotalReward(0);
    setEpisodeCount(0);
    toast.info("Demonstração reiniciada");
  };

  const getCellColor = (cell: GridCell) => {
    if (cell.x === agentPos.x && cell.y === agentPos.y) {
      return 'bg-primary';
    }
    switch (cell.type) {
      case 'goal': return 'bg-accent';
      case 'trap': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="shadow-soft border-primary-glow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Zap className="w-6 h-6 text-primary-glow" />
            Aprendizado por Reforço: Q-Learning
          </CardTitle>
          <CardDescription>
            Agente aprende navegação através de tentativa e erro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Explicação */}
          <div className="p-4 bg-primary-glow/5 rounded-lg border border-primary-glow/20">
            <h3 className="font-semibold mb-2 text-primary-glow">Como funciona:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>O agente (roxo) começa no canto inferior esquerdo</li>
              <li>Objetivo: alcançar a meta (ciano) evitando armadilhas (vermelho)</li>
              <li>Recebe recompensas (+100 meta, -50 armadilha, -1 por movimento)</li>
              <li>Aprende a melhor política através do algoritmo Q-Learning</li>
            </ol>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Episódios de treino: {episodes[0]}
              </label>
              <Slider
                value={episodes}
                onValueChange={setEpisodes}
                min={50}
                max={500}
                step={50}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button 
                onClick={trainAgent} 
                disabled={isTraining}
                variant="default"
                className="bg-gradient-neural"
              >
                <Play className="w-4 h-4 mr-2" />
                {isTraining ? `Treinando... (${episodeCount}/${episodes[0]})` : "Treinar Agente"}
              </Button>
              <Button 
                onClick={demonstratePath}
                disabled={isTraining || qTable.length === 0}
                variant="default"
                className="bg-gradient-accent"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Demonstrar Caminho
              </Button>
              <Button 
                onClick={generateGif}
                disabled={isTraining || qTable.length === 0 || isGeneratingGif}
                variant="default"
                className="bg-gradient-primary"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isGeneratingGif ? "Gerando GIF..." : "Gerar GIF"}
              </Button>
              {gifUrl && (
                <Button 
                  onClick={downloadGif}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar GIF
                </Button>
              )}
              <Button onClick={reset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Grid Visualization */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div ref={gridRef} className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
                {grid.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all ${getCellColor(cell)}`}
                    >
                      {cell.x === agentPos.x && cell.y === agentPos.y && "🤖"}
                      {cell.type === 'goal' && "🎯"}
                      {cell.type === 'trap' && "💥"}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded"></div>
                <span>Agente 🤖</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent rounded"></div>
                <span>Meta 🎯 (+100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-destructive rounded"></div>
                <span>Armadilha 💥 (-50)</span>
              </div>
            </div>

            {/* Results */}
            {episodeCount > 0 && (
              <Card className="bg-primary-glow/5 border-primary-glow/30">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-glow">{episodeCount}</p>
                      <p className="text-xs text-muted-foreground">Episódios</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">
                        {(totalReward / episodeCount).toFixed(0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Recompensa Média</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-2xl font-bold text-foreground">
                        {isTraining ? "🔄" : "✅"}
                      </p>
                      <p className="text-xs text-muted-foreground">Status</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Example */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-semibold mb-2 text-muted-foreground">Exemplo de código (Python):</p>
            <pre className="text-xs overflow-x-auto">
              <code>{`import numpy as np

# Inicializa Q-table
Q = np.zeros((state_size, action_size))

# Parâmetros
alpha = 0.1    # learning rate
gamma = 0.95   # discount factor
epsilon = 0.2  # exploration rate

# Q-Learning
for episode in range(episodes):
    state = env.reset()
    done = False
    
    while not done:
        # Escolhe ação (epsilon-greedy)
        if np.random.rand() < epsilon:
            action = env.action_space.sample()
        else:
            action = np.argmax(Q[state])
        
        # Executa ação
        next_state, reward, done, _ = env.step(action)
        
        # Atualiza Q-value
        Q[state, action] += alpha * (
            reward + gamma * np.max(Q[next_state]) - Q[state, action]
        )
        
        state = next_state`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReinforcementLearning;
