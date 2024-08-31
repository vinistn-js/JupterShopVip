document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = parseFloat(urlParams.get('amount')) || 0;
    document.getElementById('total-amount').textContent = `R$ ${amount.toFixed(2).replace('.', ',')}`;
    
    // Atualiza a imagem e o código do QR code
    updateQRCode(amount);

    document.getElementById('copy-btn').addEventListener('click', () => {
        copyToClipboard(document.getElementById('pix-code').textContent);
        showNotification('notification-card');
    });

    document.getElementById('pix-code').addEventListener('click', () => {
        copyToClipboard(document.getElementById('pix-code').textContent);
        showNotification('notification-card');
    });

    document.getElementById('close-notification').addEventListener('click', () => {
        document.getElementById('notification-card').style.display = 'none';
        document.getElementById('support-card').style.display = 'block'; // Mostrar o cartão de suporte após fechar a notificação
    });

    document.getElementById('close-support').addEventListener('click', () => {
        document.getElementById('support-card').style.display = 'none';
    });
});

function updateQRCode(amount) {
    // Ajusta o valor para os múltiplos de 5
    const roundedAmount = Math.floor(amount / 5) * 5;

    // Atualiza a imagem do QR code
    const qrCodeImageSrc = getQRCodeImage(roundedAmount);
    const qrCodeImage = document.getElementById('qr-code-image');
    qrCodeImage.src = qrCodeImageSrc;

    // Atualiza o código do QR code
    const qrCodeText = getQRCodeText(roundedAmount);
    document.getElementById('pix-code').textContent = qrCodeText;
}

function getQRCodeText(amount) {
    // Adicione os códigos dos QR codes aqui
    const qrCodes = {
        5: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b52040000530398654045.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510mQnYyJkzNW63045653',
        10: '00020126580014BR.GOV.BCB.PIX01364233e44b-e6e9-4290-826f-e3fe72bbe019520400005303986540510.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510UexsY3eEjL6304F1A0',
        15: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540515.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510PrDodjLwSS6304778E',
        20: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540520.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510hFFzlqkB2s6304B011',
        25: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540525.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510Tza4pQaLnX6304540B',
        30: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540530.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510FVzlIjQbX86304F2FE',
        35: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540535.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510hk1KDkbiwd63047216',
        40: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540540.005802BR5925Vinicius de Jesus Santana6009SAO PAULO62140510vNqwLNnU2t6304B943',
        45: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540545.005802BR5925Vinicius de Jesus Santana6009SAO PAULO621405104Jpdi7jiuu6304D48F',
        50: '00020126580014BR.GOV.BCB.PIX013656792e72-880c-4019-ba09-98e8bb6c661b520400005303986540550.005802BR5925Vinicius de Jesus Santana6009SAO PAULO621405106Kbb8qfPDO63049E03',
        // Adicione mais valores e códigos conforme necessário
    };

    return qrCodes[amount] || 'Código não encontrado';
}

function getQRCodeImage(amount) {
    // Adicione os caminhos das imagens dos QR codes aqui
    const qrImages = {
        5: '/qrcode/qrcode5.png',
        10: '/qrcode/qrcode10.png',
        15: '/qrcode/qrcode15.png',
        20: '/qrcode/qrcode20.png',
        25: '/qrcode/qrcode25.png',
        30: '/qrcode/qrcode30.png',
        35: '/qrcode/qrcode35.png',
        40: '/qrcode/qrcode40.png',
        45: '/qrcode/qrcode45.png',
        50: '/qrcode/qrcode50.png',
        55: '/qrcode/qrcode55.png',
        60: '/qrcode/qrcode60.png',
        65: '/qrcode/qrcode65.png',
        70: '/qrcode/qrcode70.png',
        75: '/qrcode/qrcode75.png',
        80: '/qrcode/qrcode80.png',
        85: '/qrcode/qrcode85.png',
        90: '/qrcode/qrcode90.png',
        95: '/qrcode/qrcode95.png',
        100: '/qrcode/qrcode100.png',
        // Adicione mais caminhos conforme necessário
    };

    return qrImages[amount] || '/qrcode/default.png'; // Caminho padrão se o QR code não for encontrado
}

function copyToClipboard(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function showNotification(notificationId) {
    const notificationCard = document.getElementById(notificationId);
    notificationCard.style.display = 'block';
}
