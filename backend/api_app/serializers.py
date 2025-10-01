from rest_framework import serializers
from .models import doctores, pacientes, administradores, especialidades, usuarios, citas, historial_clinico

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarios
        fields = '__all__'

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = especialidades
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    id_usuario = UsuarioSerializer()
    
    class Meta:
        model = pacientes
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    id_usuario = UsuarioSerializer()
    id_especialidad = EspecialidadSerializer()
    
    class Meta:
        model = doctores
        fields = '__all__'

class AdministradorSerializer(serializers.ModelSerializer):
    id_usuario = UsuarioSerializer()
    
    class Meta:
        model = administradores
        fields = '__all__'

class CitaSerializer(serializers.ModelSerializer):
    id_paciente = PacienteSerializer()
    id_doctor = DoctorSerializer()
    creada_por_usuario = UsuarioSerializer()
    
    class Meta:
        model = citas
        fields = '__all__'

class HistorialClinicoSerializer(serializers.ModelSerializer):
    cita_id = CitaSerializer()
    
    class Meta:
        model = historial_clinico
        fields = '__all__'