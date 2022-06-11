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

// def gera_chave(p, q):

//   # Calcula "n", e seus coprimos
//   n = p * q

//   coprimos_de_n = retorna_coprimos(n)

//   print(f'Os coprimos de n são: {[{x} for x in coprimos_de_n]}')
//   e = int(input('\nDigite o e: '))

//   # # Calcula "d"
//   # totiente = (p - 1) * (q - 1)

//   # d = calcula_d(e, totiente)

//   print(f'\nA chave pública é: (e={e}, n={n})')

// gera_chave(
//     51058519510333014836762459628027973450795103113193673361037892391005571903381, 31567027958063216250381038962067482561657729251678645535009694808528411493373)
