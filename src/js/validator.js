function throw_error(id, error) {
    input = document.querySelector(`.input-${id}`);
    input.classList.add("is-invalid");

    p = document.querySelector(`.invalid-feedback-${id}`);
    p.innerHTML = error;

    img = document.querySelector(`.error-icon-${id}`);
    img.classList.remove('invisible')
}

function validaInputP() {
    inputP = parseInt(document.querySelector(".input-p").value);

    if (!verificaPrimo(inputP) || !inputP) {
        throw_error("p", "O número digitado deve ser um primo.");
    }
    
    else limpaInput("p");
}

function validaInputQ() {
    inputQ = parseInt(document.querySelector(".input-q").value);

    if (!verificaPrimo(inputQ) || !inputQ) {
        throw_error("q", "O número digitado deve ser um primo.");
    }
    
    else limpaInput("q");
    
}

function validaInputE() {
    inputE = parseInt(document.querySelector(".input-e").value);
    inputP = parseInt(document.querySelector(".input-p").value);
    inputQ = parseInt(document.querySelector(".input-q").value);

    if (!inputE) throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');

    else if (inputP < 1 || inputQ < 1 || !inputP || !inputQ) return;

    else if (!verificaCoprimo(inputE, (inputP - 1) * (inputQ - 1))) {
        throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
    }
    
    else limpaInput("e");
}

function gerarE() {
    inputE = document.querySelector(".input-e");
    inputP = parseInt(document.querySelector(".input-p").value);
    inputQ = parseInt(document.querySelector(".input-q").value);

    if (inputP < 1 || inputQ < 1 || !inputP || !inputQ) {
        throw_error("e", '"P" e "Q" devem ter algum número, para "E" ser gerado.');
    };

    inputE.value = retornaCoprimos((inputP - 1) * (inputQ - 1))
    limpaInput('e');
}

function gerarChave() {
    inputP = parseInt(document.querySelector(".input-p").value);
    inputQ = parseInt(document.querySelector(".input-q").value);
    inputE = parseInt(document.querySelector(".input-e").value);

    if (!verificaPrimo(inputQ) || !verificaPrimo(inputP)) {
        throw_error("p", "O número digitado deve ser um primo.");
        throw_error("q", "O número digitado deve ser um primo.");
        return;
    }

    n = inputP * inputQ;
    z = (inputP - 1) * (inputQ - 1)

    if (!verificaCoprimo(inputE, z)) {
        throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
        return;
    }

    alert(`A chave pública é (e=${inputE}, n=${n})`);
}

function limpaInput(id) {
    input = document.querySelector(`.input-${id}`);
    input.classList.remove("is-invalid");

    p = document.querySelector(`.invalid-feedback-${id}`);
    p.innerHTML = '';

    img = document.querySelector(`.error-icon-${id}`);
    img.classList.add("invisible");    
}

function criptografar() {
    inputN = parseInt(document.querySelector(".input-n").value);
    inputE = parseInt(document.querySelector(".input-e").value);
    inputMsg = document.querySelector('.input-msg').value.trim();

    alert(`Sua mensagem foi criptografada: ${encriptar(inputMsg, inputE, inputN)}`);
}

function descriptografar() {
    inputP = parseInt(document.querySelector(".input-p").value);
    inputQ = parseInt(document.querySelector(".input-q").value);
    inputE = parseInt(document.querySelector(".input-e").value);
    inputMsg = document.querySelector(".input-msg").value.trim();

    alert(`Sua mensagem foi descriptografada: ${desencriptar(inputMsg, inputP, inputQ, inputE)}`);
}