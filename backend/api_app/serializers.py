from rest_framework import serializers
from .models import doctores, pacientes, administradores, especialidades, usuarios, citas, historial_clinico

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarios
        fields = '__all__'
        extra_kwargs = {
            "rol": {"required": False}
        }
    
    def create(self, validated_data):
        if 'rol' not in validated_data:
            validated_data['rol'] = 'paciente'
        return super().create(validated_data)

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = especialidades
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    id_usuario = serializers.PrimaryKeyRelatedField(queryset=usuarios.objects.all())
    
    class Meta:
        model = pacientes
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    id_usuario = serializers.PrimaryKeyRelatedField(queryset=usuarios.objects.all())
    id_especialidad = serializers.PrimaryKeyRelatedField(queryset=especialidades.objects.all())
    
    class Meta:
        model = doctores
        fields = '__all__'

class AdministradorSerializer(serializers.ModelSerializer):
    id_usuario = serializers.PrimaryKeyRelatedField(queryset=usuarios.objects.all())
    
    class Meta:
        model = administradores
        fields = '__all__'

class CitaSerializer(serializers.ModelSerializer):
    id_paciente = serializers.PrimaryKeyRelatedField(queryset=pacientes.objects.all())
    id_doctor = serializers.PrimaryKeyRelatedField(queryset=doctores.objects.all())
    creada_por_usuario = serializers.PrimaryKeyRelatedField(queryset=usuarios.objects.all())
    estado = serializers.CharField() 
    
    class Meta:
        model = citas
        fields = '__all__'

    def validate_estado(self, value):
        allowed = [choice[0] for choice in citas.ESTADO_CHOICES]
        low = value.strip().lower()
        if low in allowed:
            return low
        raise serializers.ValidationError(f"Estado inválido. Valores válidos: {allowed}")

class HistorialClinicoSerializer(serializers.ModelSerializer):
    cita_id = serializers.PrimaryKeyRelatedField(queryset=citas.objects.all())
    
    class Meta:
        model = historial_clinico
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            user = usuarios.objects.get(email=attrs['email'])
            if not user.check_password(attrs['password']):
                raise serializers.ValidationError('Invalid credentials')
            return {
                'id_usuarios': user.id_usuarios,
                'nombre': user.nombre,
                'email': user.email,
                'rol': user.rol
            }
        except usuarios.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials')
        return attrs