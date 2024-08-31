document.addEventListener('DOMContentLoaded', () => {
    const supportButton = document.getElementById('support-btn');
    const closeChatButton = document.getElementById('close-chat');
    const sendMsgButton = document.getElementById('send-msg');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.querySelector('.minichat-body');

    const totalAmountElement = document.getElementById('total-amount');
    const totalAmount = totalAmountElement ? totalAmountElement.textContent.trim().replace('R$', '').replace(',', '.').trim() : '0.00';

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

    supportButton.addEventListener('click', () => {
        const minichat = document.getElementById('minichat');
        minichat.style.display = 'flex';
        if (!document.getElementById('greeted')) {
            simulateRobotGreeting();
        }
    });

    closeChatButton.addEventListener('click', () => {
        document.getElementById('minichat').style.display = 'none';
    });

    sendMsgButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            chatInput.value = '';
            chatInput.focus();
            handleUserMessage(message);
        }
    });

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `
            <div class="chat-avatar"><img src="${sender === 'user' ? 'user.png' : 'bot.png'}" alt="${sender === 'user' ? 'Você' : 'Robô'}" /></div>
            <div class="chat-bubble">${message}</div>
        `;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function simulateRobotGreeting() {
        const robotGreeting = document.createElement('div');
        robotGreeting.className = 'chat-message robot';
        robotGreeting.innerHTML = `
            <div class="chat-bubble thinking">
                <div class="thinking-indicator">●●●</div>
            </div>
        `;
        chatBody.appendChild(robotGreeting);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            robotGreeting.querySelector('.thinking-indicator').style.display = 'none';
            const greetingMessage = document.createElement('div');
            greetingMessage.className = 'chat-message robot';
            greetingMessage.innerHTML = `
                <div class="chat-avatar"><img src="bot.png" alt="Robô" /></div>
                <div class="chat-bubble">Seja Bem-Vindo! Preencha o formulario abaixo com o mesmo nome que está no comprovante!</div>
            `;
            chatBody.removeChild(robotGreeting);
            chatBody.appendChild(greetingMessage);
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {
                const formMessage = document.createElement('div');
                formMessage.className = 'chat-message robot';
                formMessage.innerHTML = `
                    <div class="chat-avatar"><img src="bot.png" alt="Robô" /></div>
                    <div class="chat-bubble">
                        <div id="chat-form" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                            <label for="payer-name">Nome no Comprovante:</label>
                            <input type="text" id="payer-name" placeholder="Nome do Pagador" required />

                            <label for="payment-date">Data do Pagamento:</label>
                            <input type="date" id="payment-date" value="${formattedDate}" readonly required />

                            <label for="payment-time">Hora do Pagamento:</label>
                            <input type="time" id="payment-time" value="${formattedTime}" required />

                            <label for="payment-amount">Valor Pago:</label>
                            <input type="text" id="payment-amount" value="${totalAmount}" readonly required />

                            <button id="submit-form">Enviar</button>
                        </div>
                    </div>
                `;
                chatBody.appendChild(formMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 2000); // Exibe o formulário após 2 segundos
        }, 2000); // Simula o robô "pensando" por 2 segundos
    }

    function handleUserMessage(message) {
        if (message.toLowerCase() === 'obrigado') {
            displayMessage('De nada! Se precisar de mais alguma coisa, é só me chamar.', 'robot');
        } else {
            displayMessage('Desculpe, não entendi. Pode repetir?', 'robot');
        }
    }

    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'submit-form') {
            const payerName = document.getElementById('payer-name').value.trim();
            const paymentDate = document.getElementById('payment-date').value.trim();
            const paymentTime = document.getElementById('payment-time').value.trim();
            const paymentAmount = document.getElementById('payment-amount').value.trim().replace(',', '.');

            const currentDate = new Date();
            const todayDate = currentDate.toISOString().split('T')[0]; // Apenas a data no formato YYYY-MM-DD
            const minDate = new Date();
            minDate.setHours(minDate.getHours() - 1); // Máximo de uma hora no passado
            const minDateStr = minDate.toISOString().split('T')[0] + 'T' + minDate.toTimeString().split(' ')[0].substring(0, 5);
            const maxDateStr = currentDate.toISOString().split('T')[0] + 'T' + currentDate.toTimeString().split(' ')[0].substring(0, 5);

            const isValidDate = paymentDate >= minDate.toISOString().split('T')[0] && paymentDate <= todayDate;
            const isValidTime = paymentTime >= minDateStr.split('T')[1] && paymentTime <= maxDateStr.split('T')[1];
            const isValidAmount = paymentAmount === totalAmount;

            if (payerName && isValidDate && isValidTime && isValidAmount) {
                displayMessage(`Dados recebidos:
Nome do Pagador: ${payerName}
Data do Pagamento: ${paymentDate}
Hora do Pagamento: ${paymentTime}
Valor Pago: ${paymentAmount}`, 'robot');

                document.getElementById('chat-form').style.display = 'none';

                setTimeout(() => {
                    displayRatingStars();
                }, 1000); // Exibe a opção de estrelas após 1 segundo
            } else {
                let errorMessage = 'Por favor, verifique os seguintes erros:\n';
                if (!isValidAmount) errorMessage += '- Valor incorreto.\n';
                if (!isValidDate) errorMessage += '- Data inválida.\n';
                if (!isValidTime) errorMessage += '- Hora inválida.\n';
                displayMessage(errorMessage, 'robot');
            }
        }
    });

    function displayRatingStars() {
        const ratingMessage = document.createElement('div');
        ratingMessage.className = 'chat-message robot';
        ratingMessage.innerHTML = `
            <div class="chat-avatar"><img src="bot.png" alt="Robô" /></div>
            <div class="chat-bubble">
                Como você avaliaria nosso atendimento?
                <div id="feedback-form" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                    <label for="rating">Escolha de 1 a 5 </label>
                    <div id="star-rating" style="display: flex; gap: 5px;">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                    </div>
                    <label for="comments">Deixe um Comentario</label>
                    <textarea id="comments" rows="4" placeholder="Deixe um comentário aqui..."></textarea>
                    <button id="submit-feedback">Enviar Feedback</button>
                    <input type="hidden" id="rating-value" value="0" />
                </div>
            </div>
        `;
        chatBody.appendChild(ratingMessage);
        chatBody.scrollTop = chatBody.scrollHeight;

        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function () {
                const rating = this.getAttribute('data-value');
                document.getElementById('rating-value').value = rating;
                updateStars(rating);
            });
        });

        document.getElementById('submit-feedback').addEventListener('click', function () {
            const ratingValue = document.getElementById('rating-value').value;
            const comments = document.getElementById('comments').value.trim();

            if (ratingValue && comments) {
                const payerName = document.getElementById('payer-name').value.trim();
                const paymentDate = document.getElementById('payment-date').value.trim();
                const paymentTime = document.getElementById('payment-time').value.trim();
                const paymentAmount = document.getElementById('payment-amount').value.trim().replace(',', '.');

                const whatsappMessage = encodeURIComponent(`Dados do formulário:
Nome do Pagador: ${payerName}
Data do Pagamento: ${paymentDate}
Hora do Pagamento: ${paymentTime}
Valor Pago: ${paymentAmount}
Avaliação: ${ratingValue} estrelas
Comentários: ${comments}`);

                window.open(`https://wa.me/5579996492993?text=${whatsappMessage}`, '_blank');
                document.getElementById('minichat').style.display = 'none';
            } else {
                displayMessage('Por favor, preencha todos os campos do feedback antes de enviar.', 'robot');
            }
        });
    }

    function updateStars(rating) {
        document.querySelectorAll('.star').forEach(star => {
            star.style.color = star.getAttribute('data-value') <= rating ? 'gold' : 'gray';
        });
    }
});
