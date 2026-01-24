from django.shortcuts import render, redirect
from .forms import ContactForm
from django.views.decorators.csrf import requires_csrf_token
from .data import dict_apps, dict_fav
from .forms import RegisterForm, LoginForm
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required

@requires_csrf_token
def main_page(request):
    description = {}
    if request.method == 'POST':
            form = ContactForm(request.POST)
            request_result = request.POST.get('name').lower()
            if len(request_result.split()) > 1:
                if request_result in dict_apps.keys():
                    result = dict_apps[request_result] # result = [0, 1]
                    for value in result:
                        description[value] = description.get(value, dict_fav[value])
                else:
                    result = ['К сожалению, мы не можем найти похожие приложения']
            else:
                fl = False
                for key, value in dict_apps.items():
                    if request_result in key.split():
                        fl = True 
                        result = dict_apps[key]
                        for value in result:
                            description[value] = description.get(value, dict_fav[value])
                if fl == False:
                    result = ['К сожалению, мы не можем найти похожие приложения']
            if form.is_valid():
                name1 = form.cleaned_data['name']
                result_with_descriptions = []
                for name in result:
                    if name != 'К сожалению, мы не можем найти похожие приложения':
                        result_with_descriptions.append((name, description.get(name, '')))
                    else:
                        result_with_descriptions.append(('К сожалению, мы не можем найти похожие приложения', ''))
                return render(request, 'main/main_page.html', {'items': result_with_descriptions})
            else:
                return render(request, 'main/main_page.html', { 'result': result })
    else:
        form = ContactForm()
    return render(request, 'main/main_page.html')

@requires_csrf_token
@login_required
def favourites(request):
    return render(request, 'main/favourites.html', {'dict': dict_fav})
@requires_csrf_token
def register_view(request):
    form = LoginForm(data=request.POST)
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password) 
            print(user)
            if user is not None:
                login(request, user)   
            return redirect('/') 
    return render(request, 'main/login.html', {'form': form})

@requires_csrf_token
def login_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()         
            login(request, user)       
            return redirect('/')    
    else:
        form = RegisterForm()
    return render(request, 'main/register.html', {'form': form})
@requires_csrf_token
def logout_page(request):
    logout(request)
    messages.success(request, 'Вы успешно вышли из системы')
    return redirect('login')

def error_404(request, exception):
    return render(request, 'main/error_404.html', status=404)

def error_500(request):
    return render(request, 'main/error_505.html', status=500)

