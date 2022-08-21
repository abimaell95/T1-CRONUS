from django.urls import path

from .views import login_view, RolEmployeeView

urlpatterns = [
    path("rolEmpleado", RolEmployeeView.as_view(), name="rolEmpleado"),
    path("login2", login_view, name="login"),
    ]
