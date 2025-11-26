from rest_framework import serializers
from .models import Ferramenta, Movimentacao


class FerramentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ferramenta
        fields = '__all__'

class MovimentacaoSerializer(serializers.ModelSerializer):
    usuario = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Movimentacao
        fields = "__all__"

    def validate(self, data):
        tipo = data["tipo"]
        qtd = data["quantidade"]
        ferramenta = data["ferramenta"]

       
        if tipo == "saida" and ferramenta.quantidade < qtd:
            raise serializers.ValidationError(
                f"Estoque insuficiente! Disponível: {ferramenta.quantidade}"
            )

        return data

    def create(self, validated_data):
        tipo = validated_data["tipo"]
        qtd = validated_data["quantidade"]
        ferramenta = validated_data["ferramenta"]

        if tipo == "entrada":
            ferramenta.quantidade += qtd
        else:
            ferramenta.quantidade -= qtd

        ferramenta.save()

        return super().create(validated_data)
