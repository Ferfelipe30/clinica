from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import usuarios, especialidades, pacientes, doctores, administradores, citas, historial_clinico
from .serializers import UsuarioSerializer, EspecialidadSerializer, PacienteSerializer, DoctorSerializer, AdministradorSerializer, CitaSerializer, HistorialClinicoSerializer

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
    
class DoctorList(generics.ListCreateAPIView):
    queryset = doctores.objects.all()
    serializer_class = DoctorSerializer

    def get(self, request):
        doctors_list = doctores.objects.all()
        serializer = DoctorSerializer(doctors_list, many=True)
        if not doctors_list:
            raise NotFound('No se encontraron doctores.')
        return Response({'success': True, 'details': 'Listado de doctores.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class DoctorCrear(generics.CreateAPIView):
    queryset = doctores.objects.all()
    serializer_class = DoctorSerializer

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Doctor creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class DoctorActualizar(generics.UpdateAPIView):
    queryset = doctores.objects.all()
    serializer_class = DoctorSerializer
    lookup_field = 'id_doctores'

    def put(self, request, id_doctores):
        doctor = get_object_or_404(doctores, id_doctores=id_doctores)
        serializer = DoctorSerializer(doctor, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Doctor actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class DoctorEliminar(generics.DestroyAPIView):
    queryset = doctores.objects.all()
    serializer_class = DoctorSerializer
    lookup_field = 'id_doctores'

    def delete(self, request, id_doctores):
        doctor = get_object_or_404(doctores, id_doctores=id_doctores)
        doctor.delete()
        return Response({'success': True, 'details': 'Doctor eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class AdministradorList(generics.ListCreateAPIView):
    queryset = administradores.objects.all()
    serializer_class = AdministradorSerializer

    def get(self, request):
        admins_list = administradores.objects.all()
        serializer = AdministradorSerializer(admins_list, many=True)
        if not admins_list:
            raise NotFound('No se encontraron administradores.')
        return Response({'success': True, 'details': 'Listado de administradores.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class AdministradorCrear(generics.CreateAPIView):
    queryset = administradores.objects.all()
    serializer_class = AdministradorSerializer

    def post(self, request):
        serializer = AdministradorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Administrador creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class AdministradorActualizar(generics.UpdateAPIView):
    queryset = administradores.objects.all()
    serializer_class = AdministradorSerializer
    lookup_field = 'id_administradores'

    def put(self, request, id_administradores):
        admin = get_object_or_404(administradores, id_administradores=id_administradores)
        serializer = AdministradorSerializer(admin, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Administrador actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class AdministradorEliminar(generics.DestroyAPIView):
    queryset = administradores.objects.all()
    serializer_class = AdministradorSerializer
    lookup_field = 'id_administradores'

    def delete(self, request, id_administradores):
        admin = get_object_or_404(administradores, id_administradores=id_administradores)
        admin.delete()
        return Response({'success': True, 'details': 'Administrador eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class CitaList(generics.ListCreateAPIView):
    queryset = citas.objects.all()
    serializer_class = CitaSerializer

    def get(self, request):
        citas_list = citas.objects.all()
        serializer = CitaSerializer(citas_list, many=True)
        if not citas_list:
            raise NotFound('No se encontraron citas.')
        return Response({'success': True, 'details': 'Listado de citas.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class CitaCrear(generics.CreateAPIView):
    queryset = citas.objects.all()
    serializer_class = CitaSerializer

    def post(self, request):
        serializer = CitaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Cita creada exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class CitaActualizar(generics.UpdateAPIView):
    queryset = citas.objects.all()
    serializer_class = CitaSerializer
    lookup_field = 'id_citas'

    def put(self, request, id_citas):
        cita = get_object_or_404(citas, id_citas=id_citas)
        serializer = CitaSerializer(cita, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Cita actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class CitaEliminar(generics.DestroyAPIView):
    queryset = citas.objects.all()
    serializer_class = CitaSerializer
    lookup_field = 'id_citas'

    def delete(self, request, id_citas):
        cita = get_object_or_404(citas, id_citas=id_citas)
        cita.delete()
        return Response({'success': True, 'details': 'Cita eliminada exitosamente.'}, status=status.HTTP_204_NO_CONTENT)
    
class HistorialClinicoList(generics.ListCreateAPIView):
    queryset = historial_clinico.objects.all()
    serializer_class = HistorialClinicoSerializer

    def get(self, request):
        historial_list = historial_clinico.objects.all()
        serializer = HistorialClinicoSerializer(historial_list, many=True)
        if not historial_list:
            raise NotFound('No se encontraron historiales clínicos.')
        return Response({'success': True, 'details': 'Listado de historiales clínicos.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class HistorialClinicoCrear(generics.CreateAPIView):
    queryset = historial_clinico.objects.all()
    serializer_class = HistorialClinicoSerializer

    def post(self, request):
        serializer = HistorialClinicoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Historial clínico creado exitosamente.', 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
class HistorialClinicoActualizar(generics.UpdateAPIView):
    queryset = historial_clinico.objects.all()
    serializer_class = HistorialClinicoSerializer
    lookup_field = 'id_historial_clinico'

    def put(self, request, id_historial_clinico):
        historial = get_object_or_404(historial_clinico, id_historial_clinico=id_historial_clinico)
        serializer = HistorialClinicoSerializer(historial, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': True, 'details': 'Historial clínico actualizado exitosamente.', 'data': serializer.data}, status=status.HTTP_200_OK)
    
class HistorialClinicoEliminar(generics.DestroyAPIView):
    queryset = historial_clinico.objects.all()
    serializer_class = HistorialClinicoSerializer
    lookup_field = 'id_historial_clinico'

    def delete(self, request, id_historial_clinico):
        historial = get_object_or_404(historial_clinico, id_historial_clinico=id_historial_clinico)
        historial.delete()
        return Response({'success': True, 'details': 'Historial clínico eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)