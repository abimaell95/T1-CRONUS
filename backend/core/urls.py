from django.urls import path

from .views import *

urlpatterns = [
    path("login1", LoginView.as_view(), name="login"),
    path("login2", login_view, name="login"),
    ]