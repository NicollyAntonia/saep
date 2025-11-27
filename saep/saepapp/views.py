from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ferramenta , Movimentacao
from .serializers import FerramentaSerializer , MovimentacaoSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView , ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

import json
def bubble_sort(ferramentas):
    n = len(ferramentas)
    ferramentas = list(ferramentas)

    for i in range(n):
        for j in range(0, n - i - 1):
            if ferramentas[j].nome.lower() > ferramentas[j+1].nome.lower():
                ferramentas[j], ferramentas[j+1] = ferramentas[j+1], ferramentas[j]
    return ferramentas

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # cria a sessão
            return JsonResponse({"message": "Login realizado com sucesso!"})
        else:
            return JsonResponse({"error": "Credenciais inválidas."}, status=400)

    return JsonResponse({"error": "Método não permitido."}, status=405)


def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logout realizado!"})

class FerramentaOrdenadaAPIView(APIView):
    permission_classes = [AllowAny]


    def get(self, request):
        ferramentas = Ferramenta.objects.all()
        ferramentas_ordenadas = bubble_sort(ferramentas)

        serializer = FerramentaSerializer(ferramentas_ordenadas, many=True)
        return Response(serializer.data)
        
class FerramentaListCreateAPIView(ListCreateAPIView):
    queryset = Ferramenta.objects.all()
    serializer_class = FerramentaSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        queryset = super().get_queryset()

        nome = self.request.query_params.get('nome')
        quantidade = self.request.query_params.get('quantidade')

        if nome:
            queryset = queryset.filter(nome__icontains=nome)
        if quantidade:
            queryset = queryset.filter(quantidade=quantidade)

        return queryset

    def perform_create(self, serializer):
        serializer.save()

class FerramentaRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Ferramenta.objects.all()
    serializer_class = FerramentaSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny]

class MovimentacaoCreateAPIView(CreateAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        

        # Se não estiver autenticado, registra como admin (id=1)
        user = self.request.user if self.request.user.is_authenticated else User.objects.get(pk=1)

        movimentacao = serializer.save(usuario=user)

        ferramenta = movimentacao.ferramenta

        if movimentacao.tipo == "entrada":
            ferramenta.quantidade += movimentacao.quantidade

        else:  # saída
            ferramenta.quantidade -= movimentacao.quantidade

            if ferramenta.quantidade < ferramenta.estoque_minimo:
                print("⚠ ALERTA: ESTOQUE ABAIXO DO MÍNIMO!")

        ferramenta.save()


class MovimentacaoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [AllowAny]


class MovimentacaoListAPIView(ListAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [AllowAny]
