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

    if (!inputP || !inputQ || !inputE) throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');

    
    else if (inputP < 1 || inputQ < 1) throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');


    else if (!verificaCoprimo(inputE, (inputP - 1) * (inputQ - 1))) {
        throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
    }
    
    else limpaInput("e");
}

function limpaInput(id) {
    input = document.querySelector(`.input-${id}`);
    input.classList.remove("is-invalid");

    p = document.querySelector(`.invalid-feedback-${id}`);
    p.innerHTML = '';

    img = document.querySelector(`.error-icon-${id}`);
    img.classList.add("invisible");    
}

