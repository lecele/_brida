# Brida Chat Interface

Interface de chat web para o agente **_brida** (n8n).

## 🚀 Como Rodar

### 1. Pré-requisitos
*   Node.js instalado.
*   n8n rodando localmente na porta 5678.
*   **ngrok** configurado (Necessário para conexão externa/Vercel).

### 2. Configuração do Túnel (Importante!)
Para que o chat funcione (tanto local quanto no Vercel), o túnel ngrok precisa estar aberto no endereço fixo configurado.

1.  Execute o arquivo: `iniciar_tunnel.bat`
2.  Mantenha a janela aberta.

### 3. Rodar Localmente
```bash
npm install
node server.js
```
Acesse: `http://localhost:3001`

##  Estrutura

*   `server.js`: Servidor Express que faz o proxy das requisições para evitar erro de CORS.
*   `script.js`: Lógica do frontend.
*   `iniciar_tunnel.bat`: Script para abrir a conexão com o n8n.

## ☁️ Deploy (Vercel)

O projeto está configurado para deploy automático no Vercel.
A URL do webhook está definida no `vercel.json` e aponta para o túnel fixo do ngrok.
