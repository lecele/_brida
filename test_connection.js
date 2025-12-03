const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5678';
const WEBHOOK_ID = '76481988-7d5a-4a82-a6ef-bffad0b029c3';

async function testUrl(url, method) {
    try {
        console.log(`Testando ${method} ${url}...`);
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: method === 'POST' ? JSON.stringify({ chatInput: 'test' }) : undefined
        });
        console.log(`=> Status: ${response.status} ${response.statusText}`);
        if (response.ok) {
            console.log('   SUCESSO! Use esta URL.');
            return true;
        }
    } catch (error) {
        console.log(`=> Erro: ${error.message}`);
    }
    return false;
}

async function runTests() {
    console.log('=== Iniciando Testes de Conexão N8N ===\n');

    const urls = [
        `${BASE_URL}/webhook/${WEBHOOK_ID}`,
        `${BASE_URL}/webhook-test/${WEBHOOK_ID}`
    ];

    let found = false;

    for (const url of urls) {
        // Testar POST (Padrão para chat)
        if (await testUrl(url, 'POST')) found = true;
        // Testar GET (Às vezes usado para handshake)
        if (await testUrl(url, 'GET')) found = true;
    }

    console.log('\n=== Conclusão ===');
    if (found) {
        console.log('Uma URL válida foi encontrada! Atualize seu código.');
    } else {
        console.log('Nenhuma URL funcionou. Verifique:');
        console.log('1. O n8n está rodando?');
        console.log('2. O workflow está ATIVO (para /webhook/)?');
        console.log('3. Você clicou em "Execute" (para /webhook-test/)?');
        console.log('4. O ID do webhook mudou?');
    }
}

runTests();
