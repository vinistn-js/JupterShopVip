// Função para verificar o horário e redirecionar para aviso.html se necessário
function checkSiteAccess() {
    const now = new Date(); // Obtém a data e hora atuais
    const hours = now.getHours(); // Obtém a hora atual (0-23)
    
    // Define os horários de abertura e fechamento
    const openingHour = 7; // 07h
    const closingHour = 23; // 23h
    
    // Verifica se a hora atual está fora do horário permitido
    if (hours < openingHour || hours >= closingHour) {
        // Redireciona para aviso.html se estiver fora do horário
        window.location.href = 'aviso.html';
    }
}

// Chama a função para verificar o acesso quando a página é carregada
window.onload = checkSiteAccess;
