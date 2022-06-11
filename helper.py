def verifica_primo(num):
  """
    Verifica se o numero digitado é primo, retornando True se for, False se não for.
  """

  # Retorna True se em qualquer uma das iterações, nesse caso, da variável "i", o "num" atende a condição, e False se não. No final inverte o booleano.
  # Se for 1, retorna False de imediato.

  return False if num == 1 else not any((num % i == 0) for i in range(2, num))


def verifica_coprimo(a, b):
    """
    Essa função verifica se os numeros digitados pelo usuário são coprimos (Por meio do algoritmo de euclides).
    Dois numeros podem ser ditos coprimos, quando o mdc entre os dois for 1.
    """

    if a % b == 0: # Se o resto da divisão é 0 retorna
      return True if b == 1 else False # Se o b for 1, é coprimo

    return verifica_coprimo(b, a % b)


def retorna_coprimos(n):
    """
    Essa função calcula os coprimos de um número e o retorna ao usuário em uma lista.
    """

    return [i for i in range(1, n+1) if verifica_coprimo(n, i)]


def calcula_d(e, totiente):
  """
  Essa função calculará o "d" da criptografia. Receberá o "e" e o totiente.
  Totiente = (p - 1)(q - 1)
  d = inverso de "e" mod totiente
  """

  d = 0

  while True:
    if ((e * d) % totiente) == 1:
      break

    d+=1

  return d


def gera_chave(p, q):

  # Calcula "n", e seus coprimos
  n = p * q

  coprimos_de_n = retorna_coprimos(n)

  print(f'Os coprimos de n são: {[{x} for x in coprimos_de_n]}')
  e = int(input('\nDigite o e: '))

  # # Calcula "d"
  # totiente = (p - 1) * (q - 1)

  # d = calcula_d(e, totiente)

  print(f'\nA chave pública é: (e={e}, n={n})')


gera_chave(
    51058519510333014836762459628027973450795103113193673361037892391005571903381, 31567027958063216250381038962067482561657729251678645535009694808528411493373)
