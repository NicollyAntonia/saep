from django.db import models
from django.contrib.auth.models import User   # <-- faltava isso

class Ferramenta(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    quantidade = models.IntegerField(default=0)
    estoque_minimo = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome


class Movimentacao(models.Model):
    TIPO_CHOICES = (
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
    )

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    ferramenta = models.ForeignKey(Ferramenta, on_delete=models.CASCADE, related_name='movimentacoes')
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    descricao = models.TextField()
    data_alteracao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Movimentação de {self.usuario.username} em {self.data_alteracao.strftime('%d/%m/%Y %H:%M')}"
