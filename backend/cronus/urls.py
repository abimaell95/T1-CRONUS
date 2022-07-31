"""cronus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import logout
from django.views.generic import TemplateView
from rest_framework import routers
from core import views
from core.task import views as eventviews
from core.workflow import views as workflowviews

router = routers.DefaultRouter()
router.register(r"event_type", eventviews.EventTypeViewSet)
router.register(r"maintenance_period", eventviews.MaintenancePeriodViewSet)
router.register(r"reparation_priorities", eventviews.PriorityViewSet)
router.register(r"branchoffice", views.BranchOfficeViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/events/", eventviews.EventsView.as_view()),
    path("api/workflows/", workflowviews.WorkflowsView.as_view()),
    path("api/orders/", eventviews.OrdersView.as_view()),
    path("api/available_hours/", eventviews.available_hours),
    path("api/order/", eventviews.OrderView.as_view()),
    path("api/workflow/", workflowviews.MachineWorkflowStepView.as_view()),
    path("accounts/login/", views.login_view, name="login"),
    path("logout/", logout, name="logout"),
    path("api-auth/", include("rest_framework.urls",
                              namespace="rest_framework")),
    path('', TemplateView.as_view(template_name="index.html"), {'resource': ''}),
    path('<path:resource>', TemplateView.as_view(template_name="index.html"))
]
