from django.shortcuts import render
from .forms import ContactForm
from django.views.decorators.csrf import requires_csrf_token
from .data import dict_apps, dict_fav

@requires_csrf_token
def main_page(request):
    description = {}
    if request.method == 'POST':
            form = ContactForm(request.POST)
            request_result = request.POST.get('name').lower()
            if request_result in dict_apps.keys():
                result = dict_apps[request_result] # result = [0, 1]
                for value in result:
                   description[value] = description.get(value, dict_fav[value])
            else:
                result = ['К сожалению, мы не можем найти похожие приложения']
            print(result)
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
def favourites(request):
    return render(request, 'main/favourites.html', {'dict': dict_fav})
