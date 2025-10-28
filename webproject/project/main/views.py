from django.shortcuts import render
from .forms import ContactForm
from django.views.decorators.csrf import requires_csrf_token
from .data import dict_apps

@requires_csrf_token
def main_page(request):
    if request.method == 'POST':
            form = ContactForm(request.POST)
            request_result = request.POST.get('name')
            print(request_result)
            if request_result in dict_apps.keys():
                result = dict_apps[request_result]
            else:
                result = ['К сожалению, мы не можем найти похожие приложения']
            if form.is_valid():
                name = form.cleaned_data['name']
                return render(request, 'main/main_page.html', { 'result': result })
            else:
                return render(request, 'main/main_page.html', { 'result': result })
    else:
        form = ContactForm()
    return render(request, 'main/main_page.html')