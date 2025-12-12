# 🤖 Brida Chat Interface

Uma interface de chat web moderna e responsiva projetada para interagir com o agente de IA **_brida**, rodando em **n8n**. O projeto serve como um frontend leve que se conecta ao seu workflow de automação via webhook.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📋 Sobre o Projeto

Este projeto resolve o problema de interagir com workflows do n8n (que rodam localmente ou em servidores restritos) através de uma interface web pública e amigável. Ele utiliza um **Proxy Node.js (Express)** para contornar limitações de CORS e **ngrok** para expor o servidor local para a internet de forma segura.

### Principais Funcionalidades
*   💬 **Interface de Chat em Tempo Real**: Design limpo e responsivo.
*   🔄 **Proxy Integrado**: Resolve problemas de CORS entre o frontend e a API do n8n.
*   🌍 **Conexão Externa**: Configurado para funcionar com túneis (ngrok/Cloudflare) para acesso remoto.
*   🚀 **Deploy Automático**: Pronto para rodar no Vercel.

---

## 🛠️ Tecnologias Utilizadas

*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla).
*   **Backend**: Node.js, Express.
*   **Integração**: n8n (Webhook), ngrok (Tunneling).
*   **Deploy**: Vercel.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
*   **Node.js** instalado.
*   **n8n** rodando (porta padrão 5678).
*   **ngrok** instalado e configurado.

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/lecele/_brida.git
    cd _brida
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Inicie o Túnel de Conexão**
    Para que o chat converse com o n8n local, precisamos abrir um túnel.
    *   Execute o arquivo: `iniciar_tunnel.bat` (Windows)
    *   *Ou rode manualmente:* `ngrok http --domain=SEU-DOMINIO.ngrok-free.app 5678`

4.  **Inicie o Servidor**
    ```bash
    node server.js
    ```

5.  **Acesse**
    Abra `http://localhost:3001` no seu navegador.

---

## ☁️ Deploy no Vercel

O projeto já está configurado para deploy contínuo.

1.  O arquivo `vercel.json` contém a configuração de redirecionamento.
2.  A variável `N8N_WEBHOOK_URL` define para onde as mensagens são enviadas (seu túnel ngrok).

**Importante:** Se o seu túnel ngrok cair ou mudar de endereço (caso não esteja usando domínio fixo), você precisará:
1.  Reiniciar o túnel e pegar a nova URL.
2.  Atualizar o `vercel.json`.
3.  Fazer um novo commit/push para atualizar o Vercel.

*(Recomendamos usar um Domínio Fixo no ngrok para evitar isso, conforme configurado neste projeto).*

---

## 📂 Estrutura de Arquivos

```
/
├── index.html          # Interface do chat
├── script.js           # Lógica do frontend (envio/recebimento de msgs)
├── server.js           # Servidor Proxy e API
├── vercel.json         # Configuração de deploy
├── iniciar_tunnel.bat  # Script facilitar para abrir o túnel
└── package.json        # Dependências do Node.js
```

## 🤝 Contribuição

Sinta-se à vontade para fazer forks, abrir issues ou enviar pull requests.

---
Desenvolvido para integração com **n8n**.
