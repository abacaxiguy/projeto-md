export function verificaPrimo(num) {
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

export function verificaCoprimo(a, b) {
    if (a % b == 0) {
        return b == 1 ? true : false;
    }

    return verificaCoprimo(b, a % b);
}

export function retornaCoprimos(n) {
    coprimo = Math.round(Math.random() * (n / 2 - 1) + 1);

    if (coprimo > n) retornaCoprimos(n);

    if (!verificaCoprimo(n, coprimo)) retornaCoprimos(n);

    return coprimo;
}

export function calcula_d(e, totiente) {
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
        final = Math.pow(msg, p);
        return final % n;
    } else {
        final = Math.pow(msg, e);
        return final % n;
    }
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
