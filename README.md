# Descubra o Universo - NASA APOD 🚀

Um projeto simples de integração com a API "Astronomy Picture of the Day" (APOD) da NASA, permitindo aos usuários descobrir as imagens do universo que foram publicadas em seus aniversários ou em datas especiais.

## Estrutura do Projeto
- **Backend:** Construído em Python usando o framework `FastAPI`. O backend atua como um intermediário para consumir a API da NASA em segurança (escondendo a chave de API e lidando com questões de certificado SSL caso existam na máquina local).
- **Frontend:** HTML, CSS (com design Glassmorphic) e Vanilla JavaScript.

Lembrando que o próprio **Backend (FastAPI) já está configurado para servir e renderizar a página do Frontend**. Portanto, basta rodar o backend!

---

## 🛠️ Como preparar e rodar o projeto

Siga os passos abaixo no seu terminal (PowerShell, CMD, ou VS Code Terminal).

### Passo 1: Acesse a pasta do projeto e crie o Ambiente Virtual
Abra o seu terminal na pasta raiz do projeto (`Desktop\NASA`) e navegue até a pasta do backend, depois crie sua virtual environment (venv):

```powershell
cd Backend
python -m venv venv
```

### Passo 2: Ative o Ambiente Virtual
*(Aviso: Se você encontrar o erro "A execução de scripts foi desabilitada neste sistema", rode antes o comando `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` no seu PowerShell e tente ativar de novo).*

**Windows (PowerShell ou Command Prompt):**
```powershell
.\venv\Scripts\activate
```

**Mac / Linux:**
```bash
source venv/bin/activate
```
Você verá um `(venv)` aparecendo no início da linha de comando, o que significa que o ambiente virtual está ativado.

### Passo 3: Instale as Dependências
Com o ambiente ativado, instale as bibliotecas necessárias para o servidor funcionar:

```powershell
pip install -r requirements.txt
```

### Passo 4: Configure a chave de API (.env)
Dentro da pasta `Backend`, garanta que você tem um arquivo chamado `.env`.
Este arquivo `.env` deve conter a sua chave de API fornecida pela NASA:
```env
NASA_API_KEY=sua_chave_de_api_aqui
```
*(Nota: Para testes básicos, você pode usar a chave `DEMO_KEY`, mas ela tem limites severos de requisições: `NASA_API_KEY=DEMO_KEY`)*

### Passo 5: Inicie o Servidor Backend (e o Frontend junto!)
Agora basta rodar o servidor FastAPI usando o Uvicorn na porta `8001` (para evitar conflitos):

```powershell
uvicorn main:app --reload --port 8001
```

### Passo 6: Acesse o Site! 🎉
Como configuramos o FastAPI para servir nossos arquivos HTML estáticos, basta abrir o seu navegador preferido e acessar:

👉 **[http://localhost:8001/](http://localhost:8001/)**

Pronto! Coloque a sua data de aniversário e viaje no tempo através das lentes espaciais. 🌌
