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

function gera_chave(msg, e, n) {

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

    // if (msg_encriptada.length == 0) {
    //     console.log("deu erro fdp 🙏");
    // }

    // // Junta os numeros, em uma unica string
    // msg_encriptada = msg_encriptada.join("");

    // // Pega quantos digitos tem em "n"
    // digitos_em_n = n.toString().length;

    // // cria uma variavel pra msg_quebrada em bloquinhos 🏠
    // msg_quebrada = msg_encriptada;

    // // Verifica se a msg_encriptada é maior q "n"
    // if (msg_quebrada >= digitos_em_n - 1) {
    //     // Se os digitos para serem quebrados for igual a um, só dar um 🍌split
    //     if (digitos_em_n - 1 <= 1) msg_quebrada = msg_quebrada.split("");
    //     //  Se não, entra aqui
    //     else {
    //         // Separa em um array, em blocos de 1, n
    //         msg_quebrada = msg_quebrada.match(new RegExp(".{1," + (digitos_em_n - 1) + "}", "g"));

    //         // se o ultimo digito for menor que a dos bloco 🗒, bota n - length de "0"s
    //         if (msg_quebrada[msg_quebrada.length - 1].length < digitos_em_n - 1) {
    //             // Faz o calculo de quantos "0"s faltam
    //             numeros_que_falta = digitos_em_n - 1 - msg_quebrada[msg_quebrada.length - 1].length;

    //             for (i = 0; i < numeros_que_falta; i++) {
    //                 msg_quebrada[msg_quebrada.length - 1] = msg_quebrada[msg_quebrada.length - 1] + "0";
    //             }
    //         }
    //     }
    // }

    // for (indice in msg_quebrada) {
    //     msg_quebrada[indice] = parseInt(msg_quebrada[indice]);
    //     msg_quebrada[indice] = fermat(e, n, msg_quebrada[indice]);
    // }

    // return msg_quebrada;
}

// int main() {
//     char str[600];
//     int e, n;

//     printf("Digite o texto que deseja encriptar:\n");
//     fgets(str, 600, stdin);

//     printf("Digite os valores da chave pública(e,n):\n");
//     scanf("%d %d", &e, &n);

//     int num[strlen(str)];

//     //Transformar o texto em letras maiúsculas, pois estou utilizando como base a tabela ascii
//     for(int i = 0; i < strlen(str)-1; i++){
//         str[i] = toupper(str[i]);
//     }
//     int exp = 0;
//     //Criar um array com valores numéricos, utilizando a tabela ascii
//     for(int i = 0; i < strlen(str)-1; i++){
//         if(str[i] != ' '){
//             num[i] = str[i] - 'A' + 2; //pois "A" na tabela ascii tem valor 65 e quero que fique no valor 2
//         } else {
//             num[i] = 28; //o espaço entre as palavras terá valor 28
//         }
//         if (num[i] <= 9){
//             exp += 1; //quantidade de digitos do numero
//         } else {
//             exp += 2;
//         }
//     }
//     exp -= 1;
//     //Transformar os valores numéricos em um único número
//     long double numero = 0;
//     for(int i = 0; i < strlen(str)-1; i++){
//         if(num[i]/10 == 0){
//             numero += (long double)(num[i]*pow(10, exp));
//             exp--;
//         } else {
//             numero += (long double)((num[i]/10)*pow(10, exp));
//             numero += (long double)((num[i]%10)*pow(10, exp-1));
//             exp -= 2;
//         }
//     }
//     //usar fermat para diminuir a potencia, caso "e" seja um numero maior que 10, e irei criptografar usando a formula (texto^e) mod(n)
//     fermat(e, n, numero);

//     return 0;
// }

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
