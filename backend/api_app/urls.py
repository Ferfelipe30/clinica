from django.urls import path
from .views import (
    LoginView, UsuarioList, UsuarioCrear, UsuarioActualizar, UsuarioEliminar,
    EspecialidadList, EspecialidadCrear, EspecialidadActualizar, EspecialidadEliminar,
    pacientesList, PacienteCrear, PacienteActualizar, PacienteEliminar,
    DoctorList, DoctorCrear, DoctorActualizar, DoctorEliminar,
    AdministradorList, AdministradorCrear, AdministradorActualizar, AdministradorEliminar,
    CitaList, CitaCrear, CitaActualizar, CitaEliminar,
    HistorialClinicoList, HistorialClinicoCrear, HistorialClinicoActualizar, HistorialClinicoEliminar
)

urlpatterns = [
    # Usuarios
    path('usuarios/', UsuarioList.as_view(), name='usuario-list'),
    path('usuarios/crear/', UsuarioCrear.as_view(), name='usuario-crear'),
    path('usuarios/actualizar/<int:id_usuarios>/', UsuarioActualizar.as_view(), name='usuario-actualizar'),
    path('usuarios/eliminar/<int:id_usuarios>/', UsuarioEliminar.as_view(), name='usuario-eliminar'),

    # Especialidades
    path('especialidades/', EspecialidadList.as_view(), name='especialidad-list'),
    path('especialidades/crear/', EspecialidadCrear.as_view(), name='especialidad-crear'),
    path('especialidades/actualizar/<int:id_especialidades>/', EspecialidadActualizar.as_view(), name='especialidad-actualizar'),
    path('especialidades/eliminar/<int:id_especialidades>/', EspecialidadEliminar.as_view(), name='especialidad-eliminar'),

    # Pacientes
    path('pacientes/', pacientesList.as_view(), name='paciente-list'),
    path('pacientes/crear/', PacienteCrear.as_view(), name='paciente-crear'),
    path('pacientes/actualizar/<int:id_pacientes>/', PacienteActualizar.as_view(), name='paciente-actualizar'),
    path('pacientes/eliminar/<int:id_pacientes>/', PacienteEliminar.as_view(), name='paciente-eliminar'),

    # Doctores
    path('doctores/', DoctorList.as_view(), name='doctor-list'),
    path('doctores/crear/', DoctorCrear.as_view(), name='doctor-crear'),
    path('doctores/actualizar/<int:id_doctores>/', DoctorActualizar.as_view(), name='doctor-actualizar'),
    path('doctores/eliminar/<int:id_doctores>/', DoctorEliminar.as_view(), name='doctor-eliminar'),

    # Administradores
    path('administradores/', AdministradorList.as_view(), name='administrador-list'),
    path('administradores/crear/', AdministradorCrear.as_view(), name='administrador-crear'),
    path('administradores/actualizar/<int:id_administradores>/', AdministradorActualizar.as_view(), name='administrador-actualizar'),
    path('administradores/eliminar/<int:id_administradores>/', AdministradorEliminar.as_view(), name='administrador-eliminar'),

    # Citas
    path('citas/', CitaList.as_view(), name='cita-list'),
    path('citas/crear/', CitaCrear.as_view(), name='cita-crear'),
    path('citas/actualizar/<int:id_citas>/', CitaActualizar.as_view(), name='cita-actualizar'),
    path('citas/eliminar/<int:id_citas>/', CitaEliminar.as_view(), name='cita-eliminar'),

    # Historial Clinico
    path('historial_clinico/', HistorialClinicoList.as_view(), name='historial-clinico-list'),
    path('historial_clinico/crear/', HistorialClinicoCrear.as_view(), name='historial-clinico-crear'),
    path('historial_clinico/actualizar/<int:id_historial_clinico>/', HistorialClinicoActualizar.as_view(), name='historial-clinico-actualizar'),
    path('historial_clinico/eliminar/<int:id_historial_clinico>/', HistorialClinicoEliminar.as_view(), name='historial-clinico-eliminar'),

    path('login/', LoginView.as_view(), name='login'),
]