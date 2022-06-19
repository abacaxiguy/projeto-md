from django.http import JsonResponse
from helper import criptografia


def gerar_chave(request):
  p = request.GET.get('p')
  q = request.GET.get('q')
  e = request.GET.get('e')

  if not p or not q or not e:
    return JsonResponse({"errors": "P, Q ou E estão faltando."})

  chave = criptografia.gera_chave(int(p), int(q), int(e))

  return JsonResponse(chave)


def criptografar(request):
  n = request.GET.get('n')
  e = request.GET.get('e')
  msg = request.GET.get('msg')

  if not n or not e or not msg:
    return JsonResponse({"errors": "Algum campo está faltando (n, e ou msg)."})

  msg = criptografia.encriptar(str(msg), int(e), int(n))

  return JsonResponse(msg)


def descriptografar(request):
  p = request.GET.get('p')
  q = request.GET.get('q')
  e = request.GET.get('e')
  msg = request.GET.get('msg')

  if not p or not q or not e or not msg:
    return JsonResponse({"errors": "Algum campo está faltando (p, q, e ou msg)."})

  msg = criptografia.desencriptar(str(msg), int(p), int(q), int(e))

  return JsonResponse(msg)


def validar_primo(request):
  numero = request.GET.get('numero')

  if not numero:
    return JsonResponse({"errors": "O campo número está faltando."})

  result = criptografia.verifica_primo(int(numero))

  return JsonResponse({"result": str(result)})


def validar_coprimo(request):
  p = request.GET.get('p')
  q = request.GET.get('q')
  e = request.GET.get('e')

  if not p or not q or not e:
    return JsonResponse({"errors": "P, Q ou E estão faltando."})

  z = (int(p) - 1) * (int(q) - 1)

  result = criptografia.verifica_coprimo(int(z), int(e))

  return JsonResponse({"result": str(result)})


def gerar_e(request):
  p = request.GET.get('p')
  q = request.GET.get('q')

  if not p or not q:
    return JsonResponse({"errors": "Algum campo está faltando (p, ou q)."})

  z = (int(p) - 1) * (int(q) - 1)

  e = criptografia.retorna_coprimo(z)

  return JsonResponse({"e": e})
  