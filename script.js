// Configuração
// IMPORTANTE: Substitua pela URL da sua instância n8n
const N8N_BASE_URL = 'http://localhost:5678'; // Configurado para localhost padrão
const WEBHOOK_ID = '76481988-7d5a-4a82-a6ef-bffad0b029c3'; // ID extraído do _brida.json
const WEBHOOK_URL = '/api/chat'; // Usa o proxy local para evitar CORS

// Elementos do DOM
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Gerar ID de sessão único
const sessionId = 'session-' + Math.random().toString(36).substr(2, 9);

// Função para adicionar mensagem à tela
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    // Tratamento básico de Markdown para HTML (opcional, pode ser expandido)
    // Converte quebras de linha em <br>
    const formattedText = text.replace(/\n/g, '<br>');
    messageDiv.innerHTML = formattedText;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Função para rolar para o fim
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para mostrar indicador de carregamento
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'loading');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.textContent = '_brida está digitando...';
    chatMessages.appendChild(loadingDiv);
    scrollToBottom();
}

// Função para remover indicador de carregamento
function hideLoading() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Função para enviar mensagem
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // Limpar input
    messageInput.value = '';

    // Adicionar mensagem do usuário
    addMessage(text, 'user');

    // Mostrar carregando
    showLoading();

    try {
        // Enviar para o n8n
        // Nota: O formato do payload depende de como o nó chatTrigger está configurado.
        // Geralmente espera 'chatInput' ou similar, ou pega do query param.
        // O nó LangChain Chat Trigger padrão geralmente usa POST com JSON.

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatInput: text,
                sessionId: sessionId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || errorData.error || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // A resposta do n8n geralmente vem no campo 'output' ou 'text'
        // Ajuste conforme o retorno real do seu workflow
        const botResponse = data.output || data.text || data.message || JSON.stringify(data);

        hideLoading();
        addMessage(botResponse, 'bot');

    } catch (error) {
        console.error('Erro:', error);
        hideLoading();
        // Tenta mostrar a mensagem de erro específica se disponível
        let msg = 'Desculpe, ocorreu um erro ao conectar com a _brida.';
        if (error.message) msg += `<br><small style="color:red">${error.message}</small>`;
        addMessage(msg, 'bot');
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Foco inicial
messageInput.focus();
