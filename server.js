const express = require('express');
const cors = require('cors');
const path = require('path');

// Configuração
const app = express();
const PORT = 3001;
const N8N_URL = process.env.N8N_WEBHOOK_URL || 'https://malinda-oscitant-trivially.ngrok-free.dev/webhook/76481988-7d5a-4a82-a6ef-bffad0b029c3/chat';


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve arquivos estáticos (index.html, script.js)

// Rota de Proxy para o Chat
app.post('/api/chat', async (req, res) => {
    try {
        console.log('Recebendo mensagem:', req.body);

        // Importação dinâmica do node-fetch (para compatibilidade com versões recentes do Node)
        const fetch = (await import('node-fetch')).default;

        // Tenta primeiro a URL de Produção (Workflow Ativo)
        console.log(`Tentando conectar em: ${N8N_URL}`);
        let response = await fetch(N8N_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bypass-Tunnel-Reminder': 'true', // Para localtunnel
                'ngrok-skip-browser-warning': 'true' // Para ngrok
            },
            body: JSON.stringify(req.body)
        });

        // Se der 404, tenta a URL de Teste (Workflow em modo de execução manual)
        if (response.status === 404) {
            const testUrl = N8N_URL.replace('/webhook/', '/webhook-test/');
            console.log(`Erro 404 na produção. Tentando URL de teste: ${testUrl}`);

            response = await fetch(testUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            });
        }

        if (!response.ok) {
            throw new Error(`Erro do n8n: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Resposta do n8n:', data);
        res.json(data);

    } catch (error) {
        console.error('Erro no proxy:', error);
        // Tenta extrair detalhes do erro se for uma resposta do n8n
        let errorDetails = error.message;
        if (error.cause) errorDetails += ` - ${error.cause}`;

        res.status(500).json({
            error: 'Erro de conexão com o n8n',
            details: errorDetails,
            hint: 'Verifique se o n8n está rodando em http://localhost:5678 e se o workflow está ATIVO.'
        });
    }
});

// Exporta o app para o Vercel (Serverless)
module.exports = app;

// Iniciar servidor apenas se executado diretamente (Local)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n=== Servidor do Chat Brida Rodando ===`);
        console.log(`Acesse: http://localhost:${PORT}`);
        console.log(`Proxy configurado para: ${N8N_URL}\n`);
    });
}
