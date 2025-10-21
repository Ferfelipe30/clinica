from django.db import models

class usuarios(models.Model):
    id_usuarios = models.AutoField(primary_key=True, editable=False, db_column='id')
    nombre = models.CharField(max_length=50, db_column='nombre_usuario')
    password = models.CharField(max_length=50, db_column='hash_contrasena')
    email = models.EmailField(unique=True, db_column='email')
    rol = models.CharField(max_length=20, db_column='rol')
    fecha_creacion = models.DateTimeField(auto_now_add=True, db_column='fecha_creacion')
    fecha_actualizacion = models.DateTimeField(auto_now=True, db_column='fecha_actualizacion')

    def __str__(self):
        return f"{self.nombre} {self.email}"
    
    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

class especialidades(models.Model):
    id_especialidades = models.AutoField(primary_key=True, editable=False, db_column='id')
    nombre = models.CharField(max_length=100, db_column='nombre')
    descripcion = models.TextField(db_column='descripcion')

    def __str__(self):
        return self.nombre
    
    class Meta:
        db_table = 'especialidades'
        verbose_name = 'Especialidad'
        verbose_name_plural = 'Especialidades'

class pacientes(models.Model):
    id_pacientes = models.AutoField(primary_key=True, editable=False, db_column='id')
    id_usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='usuario_id')
    nombre = models.CharField(max_length=100, db_column='nombre')
    apellido = models.CharField(max_length=100, db_column='apellido')
    fecha_nacimiento = models.DateField(db_column='fecha_nacimiento')
    genero = models.CharField(max_length=20, db_column='genero')
    telefono = models.CharField(max_length=20, db_column='telefono')
    direccion = models.CharField(max_length=255, db_column='direccion')

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
    class Meta:
        db_table = 'pacientes'
        verbose_name = 'Paciente'
        verbose_name_plural = 'Pacientes'

class doctores(models.Model):
    id_doctores = models.AutoField(primary_key=True, editable=False, db_column='id')
    id_usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='usuario_id')
    id_especialidad = models.ForeignKey(especialidades, on_delete=models.CASCADE, db_column='especialidad_id')
    nombre = models.CharField(max_length=100, db_column='nombre')
    apellido = models.CharField(max_length=100, db_column='apellido')
    numero_licencia = models.CharField(max_length=50, unique=True, db_column='numero_licencia')

    def __str__(self):
        return f"Dr. {self.nombre} {self.apellido} - {self.id_especialidad.nombre}"
    
    class Meta:
        db_table = 'doctores'
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctores'

class administradores(models.Model):
    id_administradores = models.AutoField(primary_key=True, editable=False, db_column='id')
    id_usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='usuario_id')
    nombre = models.CharField(max_length=100, db_column='nombre')
    apellido = models.CharField(max_length=100, db_column='apellido')
    puesto = models.CharField(max_length=100, db_column='puesto')

    def __str__(self):
        return f"{self.nombre} {self.apellido} {self.puesto}"
    
    class Meta:
        db_table = 'administradores'
        verbose_name = 'Administrador'
        verbose_name_plural = 'Administradores'

class citas(models.Model):
    ESTADO_CHOICES = [
        ('programada', 'Programada'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
        ('completada', 'Completada'),
        ('activa', 'Activa'),
    ]

    id_citas = models.AutoField(primary_key=True, editable=False, db_column='id')
    id_paciente = models.ForeignKey(pacientes, on_delete=models.CASCADE, db_column='paciente_id')
    id_doctor = models.ForeignKey(doctores, on_delete=models.CASCADE, db_column='doctor_id')
    fecha_hora = models.DateTimeField(db_column='fecha_hora')
    motivo = models.TextField(db_column='motivo')
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, db_column='estado')
    creada_por_usuario = models.ForeignKey(usuarios, on_delete=models.CASCADE, db_column='creada_por_usuario_id')

    def __str__(self):
        return f"Cita {self.id_citas} - {self.fecha_hora} - {self.estado} - {self.creada_por_usuario}"
    
    class Meta:
        db_table = 'citas'
        verbose_name = 'Cita'
        verbose_name_plural = 'Citas'

class historial_clinico(models.Model):
    id_historial_clinico = models.AutoField(primary_key=True, editable=False, db_column='id')
    cita_id = models.ForeignKey(citas, on_delete=models.CASCADE, db_column='cita_id')
    fecha = models.DateTimeField(auto_now_add=True, db_column='fecha_creacion')
    diagnostico = models.TextField(db_column='diagnostico')
    tratamiento = models.TextField(db_column='tratamiento')
    notas = models.TextField(db_column='notas_doctor', blank=True, null=True)

    def __str__(self):
        return f"Historial Clinico {self.id_historial_clinico} - {self.fecha}"
    
    class Meta:
        db_table = 'historial_clinico'
        verbose_name = 'Historial Clinico'
        verbose_name_plural = 'Historiales Clinicos'