"""
KiLearning - Demonstrações de Aprendizagem de Máquina
Tema 1: Fundamentos e Tendências da Aprendizagem de Máquina

Equipe: João Guilherme, Zenilton, Bruna, Igor Dias, Pedro, Ciro
IA2 - 2025.2

Este notebook pode ser executado no Google Colab.
Para usar: File > Save a copy in Drive, depois execute as células sequencialmente.
"""

# =============================================================================
# INSTALAÇÃO E IMPORTS
# =============================================================================

# Instalar dependências (descomente se necessário no Colab)
# !pip install numpy matplotlib scikit-learn pandas seaborn

import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import make_classification, make_blobs
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, silhouette_score
import pandas as pd
from IPython.display import clear_output
import time

# Configuração de estilo
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 6)

print("✅ Bibliotecas importadas com sucesso!")
print("\n📚 KiLearning - Demonstrações de Machine Learning")
print("=" * 60)

# =============================================================================
# PARTE 1: APRENDIZADO SUPERVISIONADO - CLASSIFICAÇÃO
# =============================================================================

print("\n🧠 PARTE 1: APRENDIZADO SUPERVISIONADO")
print("=" * 60)

# Gerar dados sintéticos para classificação binária
X, y = make_classification(
    n_samples=200,
    n_features=2,
    n_redundant=0,
    n_informative=2,
    n_clusters_per_class=1,
    random_state=42,
    class_sep=1.5
)

# Dividir em treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

print(f"📊 Dados gerados:")
print(f"   - Total de amostras: {len(X)}")
print(f"   - Amostras de treino: {len(X_train)}")
print(f"   - Amostras de teste: {len(X_test)}")
print(f"   - Features: {X.shape[1]}")
print(f"   - Classes: {len(np.unique(y))}")

# Treinar modelo de Regressão Logística
print("\n🔄 Treinando modelo de Regressão Logística...")
model = LogisticRegression(random_state=42)
model.fit(X_train, y_train)

# Fazer predições
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"✅ Modelo treinado!")
print(f"📈 Acurácia no conjunto de teste: {accuracy * 100:.2f}%")

# Visualização
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Plot 1: Dados de treino
axes[0].scatter(X_train[y_train == 0, 0], X_train[y_train == 0, 1], 
                c='#A855F7', label='Classe 0', alpha=0.6, edgecolors='white', s=50)
axes[0].scatter(X_train[y_train == 1, 0], X_train[y_train == 1, 1], 
                c='#14B8A6', label='Classe 1', alpha=0.6, edgecolors='white', s=50)
axes[0].set_title('Dados de Treino', fontsize=14, fontweight='bold')
axes[0].set_xlabel('Feature 1')
axes[0].set_ylabel('Feature 2')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Plot 2: Fronteira de decisão
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.02),
                     np.arange(y_min, y_max, 0.02))

Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
Z = Z.reshape(xx.shape)

axes[1].contourf(xx, yy, Z, alpha=0.3, cmap='RdYlBu')
axes[1].scatter(X_test[y_test == 0, 0], X_test[y_test == 0, 1], 
                c='#A855F7', label='Classe 0', alpha=0.8, edgecolors='white', s=50)
axes[1].scatter(X_test[y_test == 1, 0], X_test[y_test == 1, 1], 
                c='#14B8A6', label='Classe 1', alpha=0.8, edgecolors='white', s=50)
axes[1].set_title(f'Fronteira de Decisão (Acurácia: {accuracy*100:.1f}%)', 
                  fontsize=14, fontweight='bold')
axes[1].set_xlabel('Feature 1')
axes[1].set_ylabel('Feature 2')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Matriz de confusão
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=True, square=True)
plt.title('Matriz de Confusão', fontsize=14, fontweight='bold')
plt.ylabel('Valor Real')
plt.xlabel('Valor Predito')
plt.show()

print("\n💡 Interpretação:")
print("   - Modelo aprendeu uma fronteira de decisão linear")
print("   - Exemplos bem classificados ficam do lado correto da fronteira")
print("   - Acurácia indica % de predições corretas no teste")

# =============================================================================
# PARTE 2: APRENDIZADO NÃO SUPERVISIONADO - K-MEANS
# =============================================================================

print("\n\n🔍 PARTE 2: APRENDIZADO NÃO SUPERVISIONADO (K-MEANS)")
print("=" * 60)

# Gerar dados com clusters naturais
X_cluster, y_true = make_blobs(
    n_samples=300,
    centers=4,
    n_features=2,
    cluster_std=0.8,
    random_state=42
)

print(f"📊 Dados gerados:")
print(f"   - Total de amostras: {len(X_cluster)}")
print(f"   - Features: {X_cluster.shape[1]}")
print(f"   - Clusters verdadeiros: 4 (não revelados ao algoritmo)")

# Aplicar K-Means
print("\n🔄 Executando K-Means clustering...")
n_clusters = 4
kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
y_kmeans = kmeans.fit_predict(X_cluster)
centroids = kmeans.cluster_centers_

# Calcular métrica de silhueta
silhouette_avg = silhouette_score(X_cluster, y_kmeans)

print(f"✅ Clustering concluído!")
print(f"📈 Coeficiente de Silhueta: {silhouette_avg:.3f}")
print(f"   (valores próximos de 1 indicam clusters bem definidos)")

# Visualização
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Plot 1: Dados originais (sem rótulos)
axes[0].scatter(X_cluster[:, 0], X_cluster[:, 1], 
                c='gray', alpha=0.5, edgecolors='white', s=50)
axes[0].set_title('Dados Não Rotulados (Entrada)', fontsize=14, fontweight='bold')
axes[0].set_xlabel('Feature 1')
axes[0].set_ylabel('Feature 2')
axes[0].grid(True, alpha=0.3)

# Plot 2: Clusters descobertos
colors = ['#A855F7', '#14B8A6', '#F59E0B', '#EC4899']
for i in range(n_clusters):
    cluster_points = X_cluster[y_kmeans == i]
    axes[1].scatter(cluster_points[:, 0], cluster_points[:, 1],
                    c=colors[i], label=f'Cluster {i+1}', 
                    alpha=0.6, edgecolors='white', s=50)

# Plot centróides
axes[1].scatter(centroids[:, 0], centroids[:, 1], 
                c='red', marker='X', s=200, 
                edgecolors='white', linewidths=2,
                label='Centróides', zorder=10)

axes[1].set_title(f'Clusters Descobertos (Silhueta: {silhouette_avg:.3f})', 
                  fontsize=14, fontweight='bold')
axes[1].set_xlabel('Feature 1')
axes[1].set_ylabel('Feature 2')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Análise do número ideal de clusters (Elbow Method)
print("\n📊 Método do Cotovelo (Elbow Method):")
inertias = []
K_range = range(2, 10)

for k in K_range:
    kmeans_temp = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans_temp.fit(X_cluster)
    inertias.append(kmeans_temp.inertia_)

plt.figure(figsize=(10, 6))
plt.plot(K_range, inertias, 'bo-', linewidth=2, markersize=8)
plt.xlabel('Número de Clusters (K)', fontsize=12)
plt.ylabel('Inércia (Within-Cluster Sum of Squares)', fontsize=12)
plt.title('Método do Cotovelo para K-Means', fontsize=14, fontweight='bold')
plt.grid(True, alpha=0.3)
plt.axvline(x=4, color='r', linestyle='--', alpha=0.5, label='K ótimo = 4')
plt.legend()
plt.show()

print("\n💡 Interpretação:")
print("   - Algoritmo descobriu grupos sem rótulos prévios")
print("   - Centróides representam o 'centro' de cada cluster")
print("   - Método do cotovelo sugere K=4 como número ideal de clusters")

# =============================================================================
# PARTE 3: APRENDIZADO POR REFORÇO - Q-LEARNING
# =============================================================================

print("\n\n⚡ PARTE 3: APRENDIZADO POR REFORÇO (Q-LEARNING)")
print("=" * 60)

# Definir ambiente GridWorld
GRID_SIZE = 5
GOAL = (0, 4)  # Canto superior direito
TRAPS = [(2, 2), (3, 1)]  # Posições de armadilhas
START = (4, 0)  # Canto inferior esquerdo

# Recompensas
REWARD_GOAL = 100
REWARD_TRAP = -50
REWARD_MOVE = -1

print(f"🎮 Configuração do ambiente GridWorld {GRID_SIZE}x{GRID_SIZE}:")
print(f"   - Posição inicial: {START}")
print(f"   - Meta: {GOAL} (+{REWARD_GOAL} pontos)")
print(f"   - Armadilhas: {TRAPS} ({REWARD_TRAP} pontos cada)")
print(f"   - Custo de movimento: {REWARD_MOVE} ponto")

# Inicializar Q-table
# Estados: posições (x, y), Ações: 0=cima, 1=direita, 2=baixo, 3=esquerda
Q = np.zeros((GRID_SIZE, GRID_SIZE, 4))

# Parâmetros de aprendizado
LEARNING_RATE = 0.1
DISCOUNT_FACTOR = 0.95
EPSILON = 0.2  # Taxa de exploração
NUM_EPISODES = 500

def get_reward(pos):
    """Retorna recompensa para uma posição"""
    if pos == GOAL:
        return REWARD_GOAL
    elif pos in TRAPS:
        return REWARD_TRAP
    else:
        return REWARD_MOVE

def is_valid_move(pos):
    """Verifica se movimento é válido"""
    x, y = pos
    return 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE

def get_next_position(pos, action):
    """Retorna próxima posição baseada na ação"""
    x, y = pos
    if action == 0:  # Cima
        next_pos = (x - 1, y)
    elif action == 1:  # Direita
        next_pos = (x, y + 1)
    elif action == 2:  # Baixo
        next_pos = (x + 1, y)
    else:  # Esquerda
        next_pos = (x, y - 1)
    
    return next_pos if is_valid_move(next_pos) else pos

# Treinamento
print("\n🔄 Iniciando treinamento do agente...")
print(f"   - Episódios: {NUM_EPISODES}")
print(f"   - Learning rate: {LEARNING_RATE}")
print(f"   - Discount factor: {DISCOUNT_FACTOR}")
print(f"   - Epsilon (exploração): {EPSILON}")

episode_rewards = []
steps_per_episode = []

for episode in range(NUM_EPISODES):
    current_pos = START
    episode_reward = 0
    steps = 0
    max_steps = 50
    
    while steps < max_steps:
        x, y = current_pos
        
        # Escolher ação (epsilon-greedy)
        if np.random.random() < EPSILON:
            action = np.random.randint(4)  # Explorar
        else:
            action = np.argmax(Q[x, y])  # Explotar
        
        # Executar ação
        next_pos = get_next_position(current_pos, action)
        reward = get_reward(next_pos)
        episode_reward += reward
        
        # Atualizar Q-value
        next_x, next_y = next_pos
        old_q = Q[x, y, action]
        next_max_q = np.max(Q[next_x, next_y])
        new_q = old_q + LEARNING_RATE * (reward + DISCOUNT_FACTOR * next_max_q - old_q)
        Q[x, y, action] = new_q
        
        current_pos = next_pos
        steps += 1
        
        # Terminar episódio se atingiu objetivo ou armadilha
        if current_pos == GOAL or current_pos in TRAPS:
            break
    
    episode_rewards.append(episode_reward)
    steps_per_episode.append(steps)
    
    # Mostrar progresso a cada 100 episódios
    if (episode + 1) % 100 == 0:
        avg_reward = np.mean(episode_rewards[-100:])
        print(f"   Episódio {episode + 1}: Recompensa média (últimos 100) = {avg_reward:.2f}")

print("\n✅ Treinamento concluído!")

# Visualizar aprendizado
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Plot 1: Recompensas ao longo do tempo
window_size = 50
rewards_smoothed = pd.Series(episode_rewards).rolling(window=window_size).mean()

axes[0].plot(episode_rewards, alpha=0.3, color='gray', label='Recompensa por episódio')
axes[0].plot(rewards_smoothed, color='#A855F7', linewidth=2, label=f'Média móvel ({window_size} episódios)')
axes[0].set_xlabel('Episódio', fontsize=12)
axes[0].set_ylabel('Recompensa Total', fontsize=12)
axes[0].set_title('Evolução do Aprendizado', fontsize=14, fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Plot 2: Visualizar política aprendida (melhor ação por estado)
grid_display = np.zeros((GRID_SIZE, GRID_SIZE))
arrows = {0: '↑', 1: '→', 2: '↓', 3: '←'}

for i in range(GRID_SIZE):
    for j in range(GRID_SIZE):
        if (i, j) == GOAL:
            grid_display[i, j] = 2  # Meta
        elif (i, j) in TRAPS:
            grid_display[i, j] = -1  # Armadilha
        else:
            grid_display[i, j] = 0  # Caminho

# Criar visualização do grid
ax = axes[1]
cmap = plt.cm.colors.ListedColormap(['white', 'red', 'green'])
ax.imshow(grid_display, cmap=cmap, vmin=-1, vmax=2)

# Adicionar setas mostrando a política
for i in range(GRID_SIZE):
    for j in range(GRID_SIZE):
        if (i, j) != GOAL and (i, j) not in TRAPS:
            best_action = np.argmax(Q[i, j])
            ax.text(j, i, arrows[best_action], ha='center', va='center', 
                   fontsize=20, fontweight='bold', color='#A855F7')
        elif (i, j) == GOAL:
            ax.text(j, i, '🎯', ha='center', va='center', fontsize=20)
        elif (i, j) in TRAPS:
            ax.text(j, i, '💥', ha='center', va='center', fontsize=20)

# Marcar posição inicial
start_x, start_y = START
ax.add_patch(plt.Rectangle((start_y - 0.4, start_x - 0.4), 0.8, 0.8, 
                           fill=False, edgecolor='blue', linewidth=3))
ax.text(start_y, start_x - 0.7, '🤖 START', ha='center', va='center', 
       fontsize=10, color='blue', fontweight='bold')

ax.set_xticks(range(GRID_SIZE))
ax.set_yticks(range(GRID_SIZE))
ax.set_xticklabels(range(GRID_SIZE))
ax.set_yticklabels(range(GRID_SIZE))
ax.set_title('Política Aprendida (Melhor Ação por Estado)', 
            fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.5)

plt.tight_layout()
plt.show()

# Demonstrar caminho ótimo
print("\n🎯 Demonstrando caminho ótimo aprendido:")
current_pos = START
path = [current_pos]
steps = 0
max_steps = 20

while current_pos != GOAL and steps < max_steps:
    x, y = current_pos
    best_action = np.argmax(Q[x, y])
    next_pos = get_next_position(current_pos, best_action)
    
    if next_pos == current_pos:  # Movimento inválido
        break
    
    path.append(next_pos)
    current_pos = next_pos
    steps += 1
    
    if current_pos in TRAPS:
        print(f"   ❌ Agente caiu em armadilha na posição {current_pos}")
        break

if current_pos == GOAL:
    print(f"   ✅ Agente alcançou a meta em {steps} passos!")
    print(f"   📍 Caminho: {' → '.join(str(p) for p in path)}")
else:
    print(f"   ⚠️ Agente não alcançou a meta (posição final: {current_pos})")

print("\n💡 Interpretação:")
print("   - Agente aprendeu através de tentativa e erro")
print("   - Q-table armazena valores de ações para cada estado")
print("   - Setas mostram a melhor ação aprendida para cada posição")
print("   - Política converge para caminho eficiente até a meta")

# =============================================================================
# CONCLUSÃO
# =============================================================================

print("\n\n" + "=" * 60)
print("📊 RESUMO DAS DEMONSTRAÇÕES")
print("=" * 60)

print("\n1️⃣ APRENDIZADO SUPERVISIONADO:")
print(f"   ✓ Modelo: Regressão Logística")
print(f"   ✓ Acurácia: {accuracy * 100:.2f}%")
print(f"   ✓ Uso: Classificação com dados rotulados")

print("\n2️⃣ APRENDIZADO NÃO SUPERVISIONADO:")
print(f"   ✓ Algoritmo: K-Means")
print(f"   ✓ Clusters: {n_clusters}")
print(f"   ✓ Silhueta: {silhouette_avg:.3f}")
print(f"   ✓ Uso: Descoberta de padrões sem rótulos")

print("\n3️⃣ APRENDIZADO POR REFORÇO:")
print(f"   ✓ Algoritmo: Q-Learning")
print(f"   ✓ Episódios: {NUM_EPISODES}")
print(f"   ✓ Recompensa final média: {np.mean(episode_rewards[-100:]):.2f}")
print(f"   ✓ Uso: Aprendizado por interação e feedback")

print("\n" + "=" * 60)
print("✅ Todas as demonstrações concluídas com sucesso!")
print("=" * 60)
print("\n📚 KiLearning - Equipe: João Guilherme, Zenilton, Bruna, Igor Dias, Pedro, Ciro")
print("🎓 IA2 - 2025.2\n")
