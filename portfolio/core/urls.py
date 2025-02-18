from django.urls import path

from portfolio.core import views

urlpatterns = [
    path('', views.index, name='index'),
]