from django.urls import path
from .views import (
    FerramentaListCreateAPIView,
    FerramentaRetrieveUpdateDestroyAPIView,
    MovimentacaoListAPIView,
    MovimentacaoCreateAPIView,
    MovimentacaoRetrieveUpdateDestroyAPIView,
    FerramentaOrdenadaAPIView,
)
from .views import login_view, logout_view

urlpatterns = [
    
    path("ferramentas/", FerramentaListCreateAPIView.as_view(), name="ferramenta-list-create"),
    path("ferramentas/<int:pk>/", FerramentaRetrieveUpdateDestroyAPIView.as_view(), name="ferramenta-detail"),
    path("ferramentas/ordenadas/", FerramentaOrdenadaAPIView.as_view(), name="ferramenta-ordenada"),
    path("movimentacoes/", MovimentacaoListAPIView.as_view(), name="movimentacao-list"),
    path("movimentacoes/criar/", MovimentacaoCreateAPIView.as_view(), name="movimentacao-create"),
    path("movimentacoes/<int:pk>/", MovimentacaoRetrieveUpdateDestroyAPIView.as_view(), name="movimentacao-detail"),
]
