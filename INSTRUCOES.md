# KiLearning - Fundamentos e Tendências da Aprendizagem de Máquina

## 📋 Tema 1 - IA2 2025.2

**Equipe:** João Guilherme, Zenilton, Bruna, Igor Dias, Pedro, Ciro

---

## 🎯 Sobre o Projeto

Este projeto é uma aplicação web interativa que demonstra os três paradigmas fundamentais da Aprendizagem de Máquina:

1. **Aprendizado Supervisionado** - Classificação Linear
2. **Aprendizado Não Supervisionado** - K-Means Clustering  
3. **Aprendizado por Reforço** - Q-Learning

A aplicação foi desenvolvida com React, TypeScript e Tailwind CSS, oferecendo visualizações interativas em tempo real.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou bun

### Opção 1: Executar Localmente

1. **Clone o repositório ou extraia os arquivos**

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   bun install
   ```

3. **Execute o projeto:**
   ```bash
   npm run dev
   # ou
   bun run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:8080
   ```

### Opção 2: Deploy Online (Recomendado para Apresentação)

O projeto já está configurado para deploy automático no Lovable. Você pode acessar a versão publicada através do link fornecido pela plataforma.

---

## 📚 Estrutura do Projeto

```
src/
├── pages/
│   └── Index.tsx                    # Página principal com tabs
├── components/
│   └── ml-demos/
│       ├── IntroSection.tsx         # Introdução e conceitos
│       ├── SupervisedLearning.tsx   # Demo de aprendizado supervisionado
│       ├── UnsupervisedLearning.tsx # Demo de K-Means
│       └── ReinforcementLearning.tsx # Demo de Q-Learning
└── index.css                        # Design system personalizado
```

---

## 🎨 Funcionalidades

### 1. Introdução
- Overview dos três paradigmas de ML
- Explicação de conceitos fundamentais
- Tendências e fronteiras de pesquisa
- Aplicações práticas de cada paradigma

### 2. Aprendizado Supervisionado
- Geração de dados rotulados
- Visualização de classificação binária
- Cálculo de acurácia em tempo real
- Demonstração de linha de decisão
- Código de exemplo em Python

### 3. Aprendizado Não Supervisionado
- Algoritmo K-Means interativo
- Ajuste dinâmico do número de clusters
- Visualização de centróides
- Animação do processo de clustering
- Código de exemplo com scikit-learn

### 4. Aprendizado por Reforço
- Ambiente grid-world
- Algoritmo Q-Learning implementado
- Navegação inteligente do agente
- Sistema de recompensas e penalidades
- Demonstração do caminho aprendido

---

## 💻 Versão Google Colab (Código Python)

Além da aplicação web, preparamos um notebook Google Colab com implementações práticas em Python. 

### Como usar o Colab:

1. Acesse o arquivo `KiLearning_ML_Demos.ipynb` no Google Drive
2. Abra com Google Colaboratory
3. Execute as células sequencialmente
4. Interaja com as visualizações

**Conteúdo do Notebook:**

- Implementação de classificação supervisionada com scikit-learn
- K-Means clustering com datasets reais
- Q-Learning para ambiente GridWorld
- Visualizações com matplotlib e seaborn
- Métricas de avaliação

**Link para o notebook:** [Será fornecido após upload no Drive da equipe]

---

## 🎓 Uso Acadêmico

Este projeto foi desenvolvido como parte da avaliação da disciplina Inteligência Artificial 2, seguindo os requisitos:

✅ Apresentação dos fundamentos teóricos  
✅ Demonstração prática com código funcional  
✅ Visualizações interativas  
✅ Código organizado e comentado  
✅ Executável em ambiente web moderno  

---

## 📖 Referências

1. **Russell, S., & Norvig, P.** (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson.

2. **Géron, A.** (2022). *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* (3rd ed.). O'Reilly Media.

3. **Sutton, R. S., & Barto, A. G.** (2018). *Reinforcement Learning: An Introduction* (2nd ed.). MIT Press.

4. **Murphy, K. P.** (2022). *Probabilistic Machine Learning: An Introduction*. MIT Press.

5. **Goodfellow, I., Bengio, Y., & Courville, A.** (2016). *Deep Learning*. MIT Press.

6. **Scikit-learn Documentation.** (2024). Retrieved from https://scikit-learn.org/

7. **OpenAI Gym Documentation.** (2024). Retrieved from https://www.gymlibrary.dev/

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Build:** Vite
- **Visualização:** SVG nativo, Canvas
- **State Management:** React Hooks

---

## 👥 Equipe KiLearning

- **João Guilherme** - Desenvolvimento do código
- **Zenilton** - [Responsabilidade]
- **Bruna** - [Responsabilidade]
- **Igor Dias** - [Responsabilidade]
- **Pedro** - [Responsabilidade]
- **Ciro** - [Responsabilidade]

---

## 📝 Notas para Apresentação

### Pontos-chave a destacar:

1. **Interatividade:** Todas as demos são interativas e executam em tempo real
2. **Visualização:** Gráficos e animações facilitam o entendimento
3. **Código Real:** Implementações seguem os algoritmos clássicos
4. **Escalabilidade:** Parâmetros ajustáveis para diferentes cenários

### Sugestões para demo ao vivo:

- Comece pela introdução para contextualizar
- Demonstre cada paradigma sequencialmente
- Ajuste os parâmetros para mostrar diferentes comportamentos
- Destaque o código Python equivalente em cada seção

---

## 🔧 Troubleshooting

**Problema:** Aplicação não inicia  
**Solução:** Verifique se Node.js 18+ está instalado e execute `npm install` novamente

**Problema:** Visualizações não aparecem  
**Solução:** Limpe o cache do navegador e recarregue a página

**Problema:** Botões não respondem  
**Solução:** Gere os dados primeiro antes de treinar os modelos

---

## 📧 Contato

Para dúvidas sobre o projeto, entre em contato com a equipe KiLearning através do Google Classroom da disciplina.

---

**Data de Apresentação:** 02 de dezembro de 2025  
**Disciplina:** Inteligência Artificial 2 - 2025.2  
**Instituição:** [Nome da Instituição]
