from django.urls import path

from . import views

urlpatterns = [
    path('gerar_chave/', views.gerar_chave),
    path('criptografar/', views.criptografar),
    path('descriptografar/', views.descriptografar),
    path('validar_primo/', views.validar_primo),
    path('validar_coprimo/', views.validar_coprimo),
    path('gerar_e/', views.gerar_e),
]
