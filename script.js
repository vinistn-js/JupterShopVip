// Variáveis globais
let cart = [];
let couponDiscount = 0; // Desconto do cupom em porcentagem
const usedCoupons = new Set(); // Armazena cupons já utilizados
let originalTotal = 0; // Armazena o total original sem desconto

// Função para carregar o carrinho e cupom do localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    const storedCoupon = localStorage.getItem('coupon');
    const lastUpdated = localStorage.getItem('lastUpdated');
    const storedUsedCoupons = localStorage.getItem('usedCoupons');

    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    if (storedCoupon) {
        couponDiscount = parseFloat(storedCoupon);
    }
    if (storedUsedCoupons) {
        const coupons = JSON.parse(storedUsedCoupons);
        coupons.forEach(coupon => usedCoupons.add(coupon));
    }

    // Verifica se passaram 24 horas desde a última atualização
    if (lastUpdated && (Date.now() - parseInt(lastUpdated) > 24 * 60 * 60 * 1000)) {
        cart = []; // Limpa o carrinho
        localStorage.removeItem('cart');
        couponDiscount = 0; // Reseta o desconto do cupom
        localStorage.removeItem('coupon');
        usedCoupons.clear(); // Limpa os cupons usados
        localStorage.removeItem('usedCoupons');
    }

    updateCartCount();
    updateCartModal();
}

// Função para salvar o carrinho e o cupom no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('coupon', couponDiscount.toString());
    localStorage.setItem('lastUpdated', Date.now().toString());
    localStorage.setItem('usedCoupons', JSON.stringify(Array.from(usedCoupons)));
}

// Função para adicionar produtos ao carrinho
function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    updateCartCount();
    updateCartModal();
    saveCart();
}

// Função para atualizar o número de itens no botão do carrinho
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Função para atualizar o conteúdo do modal do carrinho
function updateCartModal() {
    const cartItemsModal = document.getElementById('cart-items-modal');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItemsModal.innerHTML = ''; // Limpa o conteúdo atual

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = 
            `<img src="${item.image}" alt="${item.name}" width="80" />
            <div class="item-info">
                <h5>${item.name}</h5>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="increaseQuantity('${item.name}')">+</button>
            <button onclick="decreaseQuantity('${item.name}')">-</button>
            <button onclick="removeFromCart('${item.name}')">Remover</button>`;
        cartItemsModal.appendChild(li);
    });

    // Armazena o total original sem desconto
    originalTotal = total;
    
    // Aplica o desconto, se houver
    if (couponDiscount > 0) {
        const discount = couponDiscount / 100;
        const totalWithDiscount = total * (1 - discount);
        cartTotal.innerHTML = `Total com desconto: R$ ${totalWithDiscount.toFixed(2)}`;
    } else {
        cartTotal.innerHTML = `Total: R$ ${total.toFixed(2)}`;
    }
}

// Função para aumentar a quantidade de um produto no carrinho
function increaseQuantity(name) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity++;
        updateCartCount();
        updateCartModal();
        saveCart();
    }
}

// Função para diminuir a quantidade de um produto no carrinho
function decreaseQuantity(name) {
    const product = cart.find(item => item.name === name);
    if (product) {
        if (product.quantity > 1) {
            product.quantity--;
        } else {
            // Remove o item do carrinho se a quantidade for 1 e o botão "-" for clicado
            removeFromCart(name);
            return; // Sai da função para evitar salvar o carrinho duas vezes
        }
        updateCartCount();
        updateCartModal();
        saveCart();
    }
}

// Função para remover um produto do carrinho
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCount();
    updateCartModal();
    saveCart();
}

// Função para abrir o modal do carrinho
function openCartModal() {
    document.getElementById('cart-modal').style.display = 'block';
    // Recalcular o total ao abrir o modal
    updateCartModal();
}

// Função para fechar o modal do carrinho e limpar a mensagem de cupom
function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
    // Limpar a mensagem de cupom e o campo de cupom ao fechar o modal
    document.getElementById('coupon-message').textContent = '';
    document.getElementById('coupon-code').value = '';
    // Reseta o desconto do cupom e o total exibido ao fechar o modal
    couponDiscount = 0;
    saveCart();
    updateCartModal(); // Atualiza o modal para mostrar o total original sem desconto
}

// Função para aplicar o cupom
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();
    const couponMessage = document.getElementById('coupon-message');

    // Definição dos códigos de cupom e seus descontos
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
        'N8F4K1M': 23,
        'Q2R6P5J': 16,
        'R9L0X3M': 28,
        'F3K8J1N': 25,
        'L2P4M9F': 33,
        'N7R6J1K': 12,
        'Q0L8X2M': 30,
        'R4F1P9K': 21,
        'J3L7N0M': 29,
        'N5X2F6K': 22,
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

    if (coupons[couponCode] !== undefined) {
        if (usedCoupons.has(couponCode)) {
            couponMessage.textContent = 'Você já usou este cupom.';
        } else {
            couponDiscount = coupons[couponCode];
            usedCoupons.add(couponCode);
            couponMessage.textContent = `Cupom aplicado com sucesso! Desconto: ${couponDiscount}%`;
            saveCart();
            updateCartModal(); // Atualiza o modal com o desconto aplicado
        }
    } else {
        couponMessage.textContent = 'Código do cupom inválido.';
    }
}

// Função para finalizar a compra
document.getElementById('checkout-btn').addEventListener('click', () => {
    // Calcula o valor total do carrinho
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Aplica o desconto, se houver
    if (couponDiscount > 0) {
        total *= (1 - couponDiscount / 100);
    }
    // Redireciona para a página de pagamento passando o valor total como parâmetro
    window.location.href = `payment.html?amount=${total.toFixed(2)}`;
    // Marca o cupom como usado
    usedCoupons.add(document.getElementById('coupon-code').value.trim());
    couponDiscount = 0; // Reseta o desconto após finalizar o pedido
    saveCart();
});

// Carrega o carrinho e cupom ao iniciar
loadCart();

// Variáveis globais para paginação
const productsPerPage = 12; // Número de produtos por página
let currentPage = 1; // Página inicial
const products = Array.from(document.querySelectorAll('.product')); // Lista de produtos
const paginationButtons = Array.from(document.querySelectorAll('.pagination-btn'));

// Função para exibir produtos com base na página atual
function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    products.forEach((product, index) => {
        product.style.display = (index >= start && index < end) ? 'block' : 'none';
    });

    updatePagination();
}

// Função para atualizar a paginação
function updatePagination() {
    const numPages = Math.ceil(products.length / productsPerPage);

    paginationButtons.forEach(button => {
        const page = parseInt(button.getAttribute('data-page'));
        if (page) {
            button.style.display = (page <= numPages) ? 'inline-block' : 'none';
            button.classList.toggle('active', page === currentPage);
            button.disabled = page > numPages;
        }
    });

    document.getElementById('prev-page').style.display = (currentPage > 1) ? 'inline-block' : 'none';
    document.getElementById('next-page').style.display = (currentPage < numPages) ? 'inline-block' : 'none';
}

// Função para alterar a página
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage > 0 && newPage <= Math.ceil(products.length / productsPerPage)) {
        currentPage = newPage;
        displayProducts(currentPage);
    }
}

// Função para ir para uma página específica
function goToPage(page) {
    if (page > 0 && page <= Math.ceil(products.length / productsPerPage)) {
        currentPage = page;
        displayProducts(currentPage);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(currentPage);

    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.getAttribute('data-page'));
            if (page) goToPage(page);
        });
    });
});
