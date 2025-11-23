# 📓 Como Usar o Notebook Python no Google Colab

## Passo a Passo Rápido

### Método 1: Upload direto do arquivo .py

1. Acesse [Google Colab](https://colab.research.google.com/)
2. Clique em **"Arquivo" > "Fazer upload de notebook"**
3. Selecione o arquivo `KiLearning_Colab_Notebook.py`
4. Aguarde o upload
5. Clique em **"Runtime" > "Run all"** (ou Ctrl+F9)
6. Aguarde a execução de todas as células

### Método 2: Copiar e colar o código

1. Acesse [Google Colab](https://colab.research.google.com/)
2. Clique em **"Arquivo" > "Novo notebook"**
3. Abra o arquivo `KiLearning_Colab_Notebook.py` em um editor de texto
4. Copie todo o conteúdo
5. Cole em uma célula de código no Colab
6. Execute a célula (Shift+Enter)

### Método 3: Google Drive

1. Faça upload do arquivo `KiLearning_Colab_Notebook.py` para seu Google Drive
2. Clique com botão direito no arquivo
3. Selecione **"Abrir com" > "Google Colaboratory"**
4. Execute as células sequencialmente

## ⚙️ Primeira Execução

Na primeira execução, o Colab pode pedir para instalar algumas bibliotecas:

```python
!pip install numpy matplotlib scikit-learn pandas seaborn
```

Isso é normal e leva cerca de 1-2 minutos.

## 🎯 O Que Esperar

O notebook demonstra os três paradigmas de ML:

### Parte 1: Aprendizado Supervisionado (2-3 minutos)
- Gera dataset de classificação
- Treina modelo de Regressão Logística
- Mostra fronteira de decisão
- Exibe matriz de confusão

### Parte 2: Aprendizado Não Supervisionado (2-3 minutos)
- Gera dados com clusters naturais
- Aplica K-Means clustering
- Visualiza clusters descobertos
- Método do cotovelo para K ótimo

### Parte 3: Aprendizado por Reforço (5-7 minutos)
- Cria ambiente GridWorld
- Treina agente com Q-Learning
- Mostra evolução do aprendizado
- Demonstra política aprendida

**Tempo total de execução:** ~10-15 minutos

## 📊 Visualizações

O notebook gera automaticamente:
- ✅ Gráficos de dispersão (scatter plots)
- ✅ Fronteiras de decisão
- ✅ Matriz de confusão
- ✅ Heatmaps de clustering
- ✅ Curvas de aprendizado
- ✅ Grid do ambiente de reforço

## 💾 Salvando o Notebook

Para salvar uma cópia no seu Drive:
1. **"Arquivo" > "Salvar uma cópia no Drive"**
2. Renomeie para `KiLearning_ML_Demos.ipynb`

## 🔧 Problemas Comuns

### Erro: "ModuleNotFoundError"
**Solução:** Execute a célula de instalação:
```python
!pip install numpy matplotlib scikit-learn pandas seaborn
```

### Visualizações não aparecem
**Solução:** Certifique-se de executar as células em ordem sequencial

### Notebook muito lento
**Solução:** 
- Vá em **"Runtime" > "Change runtime type"**
- Selecione **GPU** ou **TPU** (não necessário, mas pode acelerar)

### Desconectou durante a execução
**Solução:** 
- Clique em **"Runtime" > "Run all"** novamente
- O Colab salva automaticamente o progresso

## 📱 Usar no Celular

É possível executar no celular:
1. Instale o app **"Colaboratory"** (Google Play / App Store)
2. Abra o notebook
3. Execute as células tocando no botão ▶️

**Atenção:** Algumas visualizações podem ficar pequenas em telas de celular.

## 🎓 Para a Apresentação

### Dicas:
1. **Execute tudo antes** da apresentação (salva tempo)
2. **Use modo apresentação:** `View > Presentation mode`
3. **Amplie visualizações:** Clique nas imagens para expandir
4. **Explique enquanto roda:** Mostre o código executando em tempo real

### Ordem Sugerida:
1. Mostre a introdução e conceitos
2. Execute e explique cada parte sequencialmente
3. Destaque as visualizações interativas
4. Compare com a aplicação web (se demonstrar ambas)

## 📚 Recursos Adicionais

- [Documentação Colab](https://colab.research.google.com/)
- [Atalhos de Teclado](https://colab.research.google.com/notebooks/basic_features_overview.ipynb)
- [Scikit-learn Docs](https://scikit-learn.org/stable/)

## ✅ Checklist para Apresentação

- [ ] Arquivo enviado no Google Classroom
- [ ] Notebook executado com sucesso pelo menos uma vez
- [ ] Todas as visualizações renderizando corretamente
- [ ] Código comentado e legível
- [ ] Link de compartilhamento gerado (se necessário)

---

**Equipe KiLearning** - João Guilherme, Zenilton, Bruna, Igor Dias, Pedro, Ciro  
**IA2 - 2025.2**
