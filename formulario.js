// Máscara de WhatsApp
document.getElementById('whatsapp').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    else if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    else if (value.length > 0) value = `(${value}`;
    e.target.value = value;
});

// Efeito de Digitação
const words = ["escalar suas vendas.", "gerar mais leads.", "posicionar sua marca."];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedTextSpan = document.getElementById("typed-text");

function typeEffect() {
    const currentWord = words[wordIndex];
    typedTextSpan.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) { 
        typeSpeed = 2000; 
        isDeleting = true; 
    } else if (isDeleting && charIndex === 0) { 
        isDeleting = false; 
        wordIndex = (wordIndex + 1) % words.length; 
        typeSpeed = 500; 
    }
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Seleção de Cards
function selectRadioCard(element) {
    document.querySelectorAll('.radio-card').forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input[type="radio"]').checked = true;
}

// Integração via Fetch para a API FastAPI
async function handleFormSubmit(event) {
    event.preventDefault();

    const btn = document.getElementById('btnSubmit');
    const originalBtnContent = btn.innerHTML;
    btn.disabled = true;
    btn.style.opacity = '0.7';
    btn.innerHTML = 'Enviando...';

    // Coleta os dados do formulário
    const payload = {
        nome: document.getElementById('nome').value,
        whatsapp: document.getElementById('whatsapp').value,
        empresa: document.getElementById('empresa').value || null,
        tipo_projeto: document.querySelector('input[name="tipo_projeto"]:checked').value,
        prazo: document.getElementById('prazo').value,
        detalhes: document.getElementById('detalhes').value || null
    };

    try {
        const response = await fetch('https://spyjk.top/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('success-message').style.display = 'flex';
        } else {
            alert('Houve um erro ao processar seu pedido. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Não foi possível conectar ao servidor. Verifique sua conexão.');
    } finally {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.innerHTML = originalBtnContent;
    }
}

function resetForm() {
    document.getElementById('leadForm').reset();
    document.getElementById('success-message').style.display = 'none';
}