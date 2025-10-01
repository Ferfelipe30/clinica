from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import usuarios, especialidades, pacientes
from .serializers import UsuarioSerializer, EspecialidadSerializer, PacienteSerializer

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

class EspecialidadList(generics.ListCreateAPIView):
    queryset = especialidades.objects.all()
    serializer_class = EspecialidadSerializer

    def get(self, request):
        especialidades_list = especialidades.objects.all()
        serializer = EspecialidadSerializer(especialidades_list, many=True)
        if not especialidades_list:
            raise NotFound('No se encontraron especialidades.')
        return Response({'success': True, 'details': 'Listado de especialidades.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class EspecialidadCrear(generics.CreateAPIView):
    queryset = especialidades.objects.all()
    serializer_class = EspecialidadSerializer

    def post(self, request):
        serializer = EspecialidadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Especialidad creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class EspecialidadActualizar(generics.UpdateAPIView):
    queryset = especialidades.objects.all()
    serializer_class = EspecialidadSerializer
    lookup_field = 'id_especialidades'

    def put(self, request, id_especialidades):
        especialidad = get_object_or_404(especialidades, id_especialidades=id_especialidades)
        serializer = EspecialidadSerializer(especialidad, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Especialidad actualizada exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class EspecialidadEliminar(generics.DestroyAPIView):
    queryset = especialidades.objects.all()
    serializer_class = EspecialidadSerializer
    lookup_field = 'id_especialidades'

    def delete(self, request, id_especialidades):
        especialidad = get_object_or_404(especialidades, id_especialidades=id_especialidades)
        especialidad.delete()
        return Response({'success': True, 'details': 'Especialidad eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class pacientesList(generics.ListCreateAPIView):
    queryset = pacientes.objects.all()
    serializer_class = PacienteSerializer

    def get(self, request):
        pacientes_list = pacientes.objects.all()
        serializer = PacienteSerializer(pacientes_list, many=True)
        if not pacientes_list:
            raise NotFound('No se encontraron pacientes.')
        return Response({'success': True, 'details': 'Listado de pacientes.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class PacienteCrear(generics.CreateAPIView):
    queryset = pacientes.objects.all()
    serializer_class = PacienteSerializer

    def post(self, request):
        serializer = PacienteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Paciente creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class PacienteActualizar(generics.UpdateAPIView):
    queryset = pacientes.objects.all()
    serializer_class = PacienteSerializer
    lookup_field = 'id_pacientes'

    def put(self, request, id_pacientes):
        paciente = get_object_or_404(pacientes, id_pacientes=id_pacientes)
        serializer = PacienteSerializer(paciente, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Paciente actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class PacienteEliminar(generics.DestroyAPIView):
    queryset = pacientes.objects.all()
    serializer_class = PacienteSerializer
    lookup_field = 'id_pacientes'

    def delete(self, request, id_pacientes):
        paciente = get_object_or_404(pacientes, id_pacientes=id_pacientes)
        paciente.delete()
        return Response({'success': True, 'details': 'Paciente eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
