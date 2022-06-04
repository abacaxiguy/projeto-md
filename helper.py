def verifica_primo(num):
  """
    Verifica se o numero digitado é primo, retornando True se for, False se não for.
  """

  # Retorna True se em qualquer uma das iterações, nesse caso, da variável "i", o "num" atende a condição, e False se não. No final inverte o booleano.

  return not any((num % i == 0 and i != num and i != 1) or num == 1 for i in range(1, num+1))


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
