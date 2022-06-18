from math import sqrt
import random


def verifica_primo(num):
  """
  Verifica se o numero digitado é primo, retornando True se for, False se não for.

  Para otimização, checar até a raiza qudrada do numero digitado
  """

  # Casos bases:
  if num <= 1: return False
  elif num == 2 or num == 3: return True

  for i in range(2, int(sqrt(num)) + 1):
    return False if num % i == 0 else True


def verifica_coprimo(a, b):
    """
    Essa função verifica se os numeros digitados pelo usuário são coprimos (Por meio do algoritmo de euclides).

    Dois numeros podem ser ditos coprimos, quando o mdc entre os dois for 1.
    """

    if a % b == 0: # Se o resto da divisão é 0 retorna
      return True if b == 1 else False # Se o b for 1, é coprimo

    return verifica_coprimo(b, a % b)


def retorna_coprimo(n):
    """
    Essa função calcula um coprimo aleatório, de [1, (n / 2) - 1]
    """

    coprimo = random.randint(1, n/2 - 1)

    if coprimo > n: retorna_coprimo(n)

    if(not verifica_coprimo(n, coprimo)): retorna_coprimo(n)

    return coprimo


def atualiza_s_e_t(a, b, s, t):
    return (t - (b // a) * s, s)


def euclides_extendido(a, b):
    """
    Essa função é o algoritmo de euclides padrão, porem, ele retorna tbm, o s, e o t, atualizando o coeficiente a cada recursão
    """

    if a == 0:
        return b, 0, 1

    mdc, s1, t1 = euclides_extendido(b % a, a)

    s, t = atualiza_s_e_t(a, b, s1, t1)

    return mdc, s, t


def inverso_mod(e, z):
    """
    Retorna apenas o "s" da função de euclides extendido
    """
  
    return euclides_extendido(e, z)[1]


def gera_chave(p, q):

  if (not verifica_primo(p) or not verifica_primo(q)):
    print('p e q precisam ser primos')

  n = p * q
  z = (p - 1) * (q - 1)

  sugestao_coprimo = retorna_coprimo(z)

  print(f'Sugestão de um número "e": {sugestao_coprimo}')
  e = int(input('\nDigite o e: '))

  while(not verifica_coprimo(z, e)):
    print(f'{e} não é coprimo de (p - 1) * (q - 1) - {z}, por favor digite outro e')
    e = int(input('Digite o e: '))

  print(f'\nA chave pública é: (e={e}, n={n})')



def encriptar(msg, e, n):

    # Tabela ASCII
    ascii = { "A": 2, "B": 3, "C": 4, "D": 5, "E": 6, "F": 7, "G": 8, "H": 9, "I": 10, "J": 11, "K": 12, "L": 13, "M": 14, "N": 15, "O": 16, "P": 17, "Q": 18, "R": 19, "S": 20, "T": 21, "U": 22, "V": 23, "W": 24, "X": 25, "Y": 26, "Z": 27, " ": 28 }

    #Transforma a msg dada em maiuscula
    msg = msg.upper()

    # Pega o codigo da letra, e coloca no array "msg_encriptada"
    msg_encriptada = []

    for letra in msg:
        letra_num = ascii[letra]
        msg_encriptada.append(str(pow(letra_num, e, n)))

    return msg_encriptada;


def desencriptar(msg, p, q, e):
    """
    Essa função calculará o "d" de des. Receberá o "e" e o totiente.
    Totiente = (p - 1)(q - 1)
    d = inverso de "e" mod totiente
    """

    n = p * q
    z = (p - 1) * (q - 1)
    
    # d e n são a chave privada
    d = inverso_mod(e, z)

    # Tabela ASCII
    ascii_inverso = { 2: "A", 3: "B", 4: "C", 5: "D", 6: "E", 7: "F", 8: "G", 9: "H", 10: "I", 11: "J", 12: "K", 13: "L", 14: "M", 15: "N", 16: "O", 17: "P", 18: "Q", 19: "R", 20: "S", 21: "T", 22: "U", 23: "V", 24: "W", 25: "X", 26: "Y", 27: "Z", 28: " "}

    #Transforma a msg dada em maiuscula
    numeros = msg.split()

    # Pega o codigo da letra, e coloca no array "msg_desencriptada"
    msg_desencriptada = ""

    for numero in numeros:
        valor = pow(int(numero), d, n)
        msg_desencriptada += ascii_inverso[valor]

    return msg_desencriptada;