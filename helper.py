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

