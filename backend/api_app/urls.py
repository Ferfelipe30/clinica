from django.urls import path
from .views import (
    UsuarioList, UsuarioCrear, UsuarioActualizar, UsuarioEliminar
)

urlpatterns = [
    # Usuarios
    path('usuarios/', UsuarioList.as_view(), name='usuario-list'),
    path('usuarios/crear/', UsuarioCrear.as_view(), name='usuario-crear'),
    path('usuarios/actualizar/<int:id_usuarios>/', UsuarioActualizar.as_view(), name='usuario-actualizar'),
    path('usuarios/eliminar/<int:id_usuarios>/', UsuarioEliminar.as_view(), name='usuario-eliminar'),
]