const { default: axios } = require("axios");

function saveFile(name, content) {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name + ".txt";
    element.click();
}

function throw_error(id, error) {
    input = document.querySelector(`.input-${id}`);
    input.classList.add("is-invalid");

    p = document.querySelector(`.invalid-feedback-${id}`);
    p.innerHTML = error;

    img = document.querySelector(`.error-icon-${id}`);
    img.classList.remove("invisible");
}

function limpaInput(id) {
    input = document.querySelector(`.input-${id}`);
    input.classList.remove("is-invalid");

    p = document.querySelector(`.invalid-feedback-${id}`);
    p.innerHTML = "";

    img = document.querySelector(`.error-icon-${id}`);
    img.classList.add("invisible");
}

async function getData(url, data) {
    try {
        const response = await axios.get("https://projeto-md-api.herokuapp.com/api/" + url + data);
        return response.data;
    } catch (err) {
        return err;
    }
}

async function validaInputP() {
    inputP = document.querySelector(".input-p").value;

    // Valida primo P

    url = "validar_primo/";

    data = `?numero=${inputP}`;

    p = await getData(url, data);

    if (p["result"] != "True") {
        throw_error("p", "O número digitado deve ser um primo.");
        return;
    }
    
    else limpaInput("p");
}

async function validaInputQ() {
    inputQ = document.querySelector(".input-q").value;

    // Valida primo Q

    url = "validar_primo/";

    data = `?numero=${inputQ}`;

    q = await getData(url, data);

    if (q["result"] != "True") {
        throw_error("q", "O número digitado deve ser um primo.");
        return;
    }

    else limpaInput("q");
}

async function validaInputE() {
    inputE = document.querySelector(".input-e").value;
    inputP = document.querySelector(".input-p").value;
    inputQ = document.querySelector(".input-q").value;
    
    if (!inputE) throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
    
    else if (!inputP || !inputQ) return;

    url = "validar_coprimo/";

    data = `?p=${inputP}&q=${inputQ}&e=${inputE}`;
    
    e = await getData(url, data);
    
    if (e["result"] != "True") {
        throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
        return;
    }
    
    else limpaInput("e");
}

async function gerarE() {
    inputE = document.querySelector(".input-e");
    inputP = document.querySelector(".input-p").value;
    inputQ = document.querySelector(".input-q").value;

    if (!inputP || !inputQ) {
        throw_error("e", '"P" e "Q" devem ter algum número, para "E" ser gerado.');
        return;
    }

    // Valida primo P

    url = "validar_primo/";

    data = `?numero=${inputP}`;

    p = await getData(url, data);

    // Valida primo Q

    url = "validar_primo/";

    data = `?numero=${inputQ}`;

    q = await getData(url, data);

    if (p["result"] != "True" || q["result"] != "True"){
        throw_error("e", '"P" e "Q" devem ser primos, para "E" ser gerado.');
        return;
    }

    url = "gerar_e/";

    data = `?p=${inputP}&q=${inputQ}`;

    e = await getData(url, data);

    inputE.value = e["e"];
    limpaInput("e");
}

async function gerarChave() {
    inputP = document.querySelector(".input-p").value;
    inputQ = document.querySelector(".input-q").value;
    inputE = document.querySelector(".input-e").value;
    feedback = document.querySelector('.gerar-feedback');
    error = 0;
    
    if (!inputE) {
        throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
        error = 1;
    }
    if (!inputP){
        throw_error("p", "O número digitado deve ser um primo.");
        error = 1;
    }
    if (!inputQ){
        throw_error("q", "O número digitado deve ser um primo.");
        error = 1;
    }

    if (error == 1) return;

    // Valida primo P

    url = "validar_primo/";

    data = `?numero=${inputP}`;

    p = await getData(url, data);

    // Valida primo Q

    url = "validar_primo/";

    data = `?numero=${inputQ}`;

    q = await getData(url, data);

    if (p["result"] != "True"){
        throw_error("p", "O número digitado deve ser um primo.");
        return;
    }

    if (q["result"] != "True") {
        throw_error("q", "O número digitado deve ser um primo.");
        return;
    }

    // Valida E

    url = "validar_coprimo/";

    data = `?p=${inputP}&q=${inputQ}&e=${inputE}`;

    e = await getData(url, data);

    if (e["result"] != "True") {
        throw_error("e", '"E" deve ser um coprimo de (p - 1)(q - 1).');
        return;
    }
    
    // Gera chave

    url = "gerar_chave/";

    data = `?p=${inputP}&q=${inputQ}&e=${inputE}`;

    chave = await getData(url, data);

    if (!chave["e"] || !chave['n']) {
        feedback.style.color = "var(--rosa)";
        feedback.innerHTML = "Ocorreu um erro desconhecido.";
        return;
    }
    
    saveFile("public_key", `e = ${chave["e"]}, n = ${chave["n"]}`);  
    feedback.style.color = "var(--verde)";
    feedback.innerHTML = "Sua chave pública foi criada com sucesso!"
}

async function criptografar() {
    inputN = document.querySelector(".input-n").value;
    inputE = document.querySelector(".input-e").value;
    inputMsg = document.querySelector('.input-msg').value.trim();
    feedback = document.querySelector(".criptografar-feedback");

    error = 0;

    if (!inputN) {
        throw_error("n", 'Este campo é obrigatório.');
        error = 1;
    }
    if (!inputE) {
        throw_error("e", "Este campo é obrigatório.");
        error = 1;
    }
    if (!inputMsg) {
        throw_error("msg", "Este campo é obrigatório.");
        error = 1;
    }

    if (error == 1) return;

    url = "criptografar/";

    data = `?n=${inputN}&e=${inputE}&msg=${inputMsg}`;

    msg = await getData(url, data);

    if (!msg["msg_encriptada"]) {
        feedback.style.color = "var(--rosa)";
        feedback.innerHTML = "Ocorreu um erro desconhecido.";
        return;
    }

    saveFile("encrypted_message", `${msg["msg_encriptada"]}`);
    feedback.style.color = "var(--verde)";
    feedback.innerHTML = "Sua mensagem foi criptografada com sucesso!";
}

async function descriptografar() {
    inputP = document.querySelector(".input-p").value;
    inputQ = document.querySelector(".input-q").value;
    inputE = document.querySelector(".input-e").value;
    inputMsg = document.querySelector(".input-msg").value.trim();
    feedback = document.querySelector(".descriptografar-feedback");
    error = 0;


    if (!inputP) {
        throw_error("p", "Este campo é obrigatório.");
        error = 1;
    }
    if (!inputQ) {
        throw_error("q", "Este campo é obrigatório.");
        error = 1;
    }
    if (!inputE) {
        throw_error("e", "Este campo é obrigatório.");
        error = 1;
    }
    if (!inputMsg) {
        throw_error("msg", "Este campo é obrigatório.");
        error = 1;
    }

    if (error == 1) return;

    url = "descriptografar/";

    data = `?p=${inputP}&q=${inputQ}&e=${inputE}&msg=${inputMsg}`;

    msg = await getData(url, data);

    if (!msg["msg_desencriptada"]) {
        feedback.style.color = "var(--rosa)";
        feedback.innerHTML = "Ocorreu um erro desconhecido.";
        return;
    }

    saveFile("decrypted_message", `${msg["msg_desencriptada"]}`);
    feedback.style.color = "var(--verde)";
    feedback.innerHTML = "Sua mensagem foi descriptografada com sucesso!";
}