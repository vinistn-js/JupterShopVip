// Lista de cupons com descontos
const coupons = {
    'A3B9K2L': 5,
    'R7P0Q4M': 12,
    'F8J1L6X': 17,
    'H5K9N3M': 23,
    'B2R7X4L': 8,
    'N9F0L6M': 14,
    'P3J1X5K': 19,
    'Q8N4L2M': 27,
    'R5X0K9F': 32,
    'J2L6N7P': 25,
    'M4X9F1K': 9,
    'N6P3L8J': 11,
    'F7R4K0M': 20,
    'L9J2X5N': 15,
    'P1K8M4F': 22,
    'R3N0L5K': 18,
    'Q6P1J9M': 30,
    'L2N4X8F': 21,
    'F7K9M1P': 16,
    'J0R6N2L': 29,
    'M8X3P5K': 10,
    'N1L9F2J': 13,
    'P4K6R8M': 26,
    'Q9J2L4N': 24,
    'R5F8M1K': 33,
    'L0N7X3P': 28,
    'F2J6P9K': 12,
    'K4R1L8M': 34,
    'N9X2F6J': 31,
    'P3M8K0L': 19,
    'Q5J1L4N': 27,
    'R8F2M6K': 22,
    'L4N9P1J': 15,
    'F0K3X8M': 11,
    'J7L2N9P': 14,
    'N8M4K1F': 23,
    'Q2R6P5J': 16,
    'R9L0X3M': 28,
    'F3K8J1N': 25,
    'L2P4M9F': 33,
    'N7R6J1K': 12,
    'Q0L8X2M': 30,
    'R4F1P9K': 21,
    'J3L7N0M': 14,
    'N8X4P1F': 27,
    'Q5J2L9K': 19,
    'R6M3N1P': 22,
    'F0X8K4L': 34,
    'L2J7N9M': 30,
    'N4P1K6F': 18,
    'Q8R5L0J': 25,
    'R1X9M2K': 16,
    'F7J4N8L': 20,
    'L9P2K3M': 21,
    'N6X8F1J': 32,
    'Q4L0P9K': 23,
    'R2J7M6N': 14,
    'F8P4X1L': 19,
    'L3K6N9M': 27,
    'N7J0X2F': 11,
    'Q1R8P4K': 22,
    'R9L3M6N': 28,
    'F2J4X1L': 30,
    'L7P6K0M': 19,
    'N1X8J4F': 25,
    'Q4L9R2K': 33,
    'R0J7N1M': 18,
    'F8X3P4L': 30,
    'L2J6N9K': 32,
    'N4P1F0J': 20,
    'Q6R3L8K': 27,
    'R1X9M2N': 14,
    'F7P4L6K': 21,
    'L0J8N2M': 19,
    'N3X1F4J': 22,
    'Q8L6P9K': 28,
    'R2J7M1N': 23,
    'F9X4L2K': 30,
    'L6P3N0M': 27,
    'N1J4X8F': 25,
    'Q2R9K6L': 20,
    'R8L1M3N': 28,
    'F4X7P2J': 22,
    'L9K0N6M': 19,
    'N3J8F1P': 25,
    'Q4R2L9K': 33,
    'R0X6J7N': 18,
    'F8P4L2K': 27,
    'L3N1X9M': 30,
    'N7J4F0K': 32,
    'Q6R8P1L': 23,
    'R2X9M4N': 20
};

// Função para gerar um cupom aleatório
function getRandomCoupon() {
    const keys = Object.keys(coupons);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { code: randomKey, discount: coupons[randomKey] };
}

// Função para criar e inserir o card
function createAndInsertCard(coupon) {
    // Remove o container se ele já existir
    let existingContainer = document.getElementById('card-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Cria o container do card
    const container = document.createElement('div');
    container.id = 'card-container';
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.zIndex = '1000';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    // Cria o card
    const card = document.createElement('div');
    card.id = 'congratulations-card';
    card.style.backgroundColor = '#fff';
    card.style.padding = '20px';
    card.style.borderRadius = '10px';
    card.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
    card.style.textAlign = 'center';
    card.style.width = '80%';
    card.style.maxWidth = '400px';
    card.style.fontFamily = 'Arial, sans-serif';

    card.innerHTML = `
        <h2>Parabéns!</h2>
        <p>Você ganhou um cupom de desconto de <strong>${coupon.discount}%</strong>!</p>
        <p>Código do cupom: <strong>${coupon.code}</strong></p>
        <button onclick="document.getElementById('card-container').remove()">Fechar</button>
    `;

    // Adiciona o card ao container
    container.appendChild(card);
    
    // Adiciona o container ao body
    document.body.appendChild(container);
}

// Rastrear visitas e tempo
let visits = parseInt(localStorage.getItem('visits')) || 0;
let totalTime = parseInt(localStorage.getItem('totalTime')) || 0;
let accumulatedTime = parseInt(localStorage.getItem('accumulatedTime')) || 0;
let lastVisit = parseInt(localStorage.getItem('lastVisit')) || Date.now();
let lastCouponDate = parseInt(localStorage.getItem('lastCouponDate')) || 0;

// Incrementa o número de visitas
visits++;
localStorage.setItem('visits', visits);

function updateTimeSpent() {
    let now = Date.now();
    let timeSpent = now - lastVisit;
    totalTime += timeSpent;
    accumulatedTime += timeSpent;

    // Atualiza o localStorage
    localStorage.setItem('totalTime', totalTime);
    localStorage.setItem('accumulatedTime', accumulatedTime);
    localStorage.setItem('lastVisit', now);
}

window.addEventListener('beforeunload', updateTimeSpent);

// Função para verificar e exibir o card baseado no tempo
function checkAndDisplayCard() {
    let now = Date.now();
    let tenMinutes = 10 * 60 * 1000; // 10 minutos em milissegundos
    let threeDays = 3 * 24 * 60 * 60 * 1000; // 3 dias em milissegundos

    // Verifica se o tempo acumulado é igual ou maior que 10 minutos e se passaram 3 dias desde o último cupom
    if (accumulatedTime >= tenMinutes && now - lastCouponDate >= threeDays) {
        let coupon = getRandomCoupon();
        createAndInsertCard(coupon);
        localStorage.setItem('lastCouponDate', now); // Atualiza a data do último cupom
        accumulatedTime = 0; // Reinicia o tempo acumulado
        localStorage.setItem('accumulatedTime', accumulatedTime); // Atualiza no localStorage
    }
}

// Verificar e exibir o card baseado no tempo
checkAndDisplayCard();

console.log(`Visitas: ${visits}, Tempo total: ${totalTime}`);
