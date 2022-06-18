function verificaPrimo(num) {
    /*
    Verifica se o numero digitado é primo, retornando True se for, False se não for.

    Retorna True se em qualquer uma das iterações, nesse caso, da variável "i", o "num" atende a condição, e False se não. No final inverte o booleano.
    Se for 1, retorna False de imediato.

  */

    if (num == 1) return false;
    else {
        for (i = 2; i < num; i++) {
            if (num % i == 0) return false;
        }
        return true;
    }
}

function verificaCoprimo(a, b) {
    if (a % b == 0) {
        return b == 1 ? true : false;
    }

    return verificaCoprimo(b, a % b);
}

function retornaCoprimos(n) {
    coprimo = Math.round(Math.random() * (n / 2 - 1) + 1);

    if (coprimo > n) retornaCoprimos(n);

    if (!verificaCoprimo(n, coprimo)) retornaCoprimos(n);

    return coprimo;
}

function calcula_d(e, totiente) {
    d = 0;

    while (true) {
        if ((e * d) % totiente == 1) break;

        d++;
    }

    return d;
}

function fermat(e, n, msg) {
    if (e > 10) {
        p = e % (n - 1);
        bloquinho = Math.pow(msg, p);

        return bloquinho % n;
    } else {
        bloquinho = Math.pow(msg, e);

        return bloquinho % n;
    }
}

function exponenciacaoModular(x, y, m) {
    if (y == 0) return 1;

    p = exponenciacaoModular(x, parseInt(y / 2), m) % m;

    p = (p * p) % m;

    return y % 2 == 0 ? p : (x * p) % m;
}

function encriptar(msg, e, n) {

    // Tabela ASCII
    ascii = { A: 2, B: 3, C: 4, D: 5, E: 6, F: 7, G: 8, H: 9, I: 10, J: 11, K: 12, L: 13, M: 14, N: 15, O: 16, P: 17, Q: 18, R: 19, S: 20, T: 21, U: 22, V: 23, W: 24, X: 25, Y: 26, Z: 27, " ": 28 };

    // Array pra msg encriptada
    msg_encriptada = [];

    // Transforma a msg dada em maiuscula
    msg = msg.toUpperCase();

    // Separa as letras em um array
    letras = msg.split("");

    // Pega o codigo da letra, e coloca no array "msg_encriptada"
    msg_encriptada = []
    for (letra of letras) {
        letra_num = ascii[letra];
        msg_encriptada.push(exponenciacaoModular(letra_num, e, n).toString());
    }

    return msg_encriptada;

}

function euclides_estendido(a, b, s, t) {
    if (a == 0) {
        s = 0;
        t = 1;
        let resultados = [b, s, t];
        return resultados;
    }

    [mdc, s, t] = euclides_estendido(b % a, a, s, t);

    let temp = s;
    s = t - parseInt(b / a) * s;
    t = temp;

    let resultados = [mdc, s, t];

    return resultados;
}

function inverso_mod(e, z) {
    return euclides_estendido(e, z)[1];
}

function desencriptar(msg, p, q, e) {
    // ASCII invertido

    ascii_inverso = { 2: "A", 3: "B", 4: "C", 5: "D", 6: "E", 7: "F", 8: "G", 9: "H", 10: "I", 11: "J", 12: "K", 13: "L", 14: "M", 15: "N", 16: "O", 17: "P", 18: "Q", 19: "R", 20: "S", 21: "T", 22: "U", 23: "V", 24: "W", 25: "X", 26: "Y", 27: "Z", 28: " " }
    
    n = p * q;
    z = (p - 1) * (q - 1);

    d = inverso_mod(e, z);

    console.log({d})

    numeros = msg.split(" ")

    msg_desencriptada = ""

    for (numero of numeros) {
        valor = Math.pow(parseInt(numero), d) % n;
        msg_desencriptada += ascii_inverso[valor];

    }

    return msg_desencriptada;
}
