from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import usuarios
from .serializers import UsuarioSerializer

class UsuarioList(generics.ListCreateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def get(self, request):
        Usuarios = usuarios.objects.all()
        serializer = UsuarioSerializer(Usuarios, many=True)
        if not Usuarios:
            raise NotFound('No se encontraron usuarios.')
        return Response({'success': True, 'details': 'Listado de usuarios.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class UsuarioCrear(generics.CreateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Usuario creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)

class UsuarioActualizar(generics.UpdateAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'id_usuarios'

    def put(self, request, id_usuarios):
        usuario = get_object_or_404(usuarios, id_usuarios=id_usuarios)
        serializer = UsuarioSerializer(usuario, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Usuario actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class UsuarioEliminar(generics.DestroyAPIView):
    queryset = usuarios.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'id_usuarios'

    def delete(self, request, id_usuarios):
        usuario = get_object_or_404(usuarios, id_usuarios=id_usuarios)
        usuario.delete()
        return Response({'success': True, 'details': 'Usuario eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
