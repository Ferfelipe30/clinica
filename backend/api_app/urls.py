from django.urls import path
from .views import (
    UsuarioList, UsuarioCrear, UsuarioActualizar, UsuarioEliminar,
    EspecialidadList, EspecialidadCrear, EspecialidadActualizar, EspecialidadEliminar,
    pacientesList, PacienteCrear, PacienteActualizar, PacienteEliminar
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
]