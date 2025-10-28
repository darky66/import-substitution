from django.shortcuts import render
from .models import Import
from .forms import ContactForm
from django.views.decorators.csrf import requires_csrf_token
from .data import db

@requires_csrf_token
def main_page(request):
    qwe = Import.objects.all()
    if request.method == 'POST':
            form = ContactForm(request.POST)
            if form.is_valid():
                name = form.cleaned_data['name']
                print(123)
                return render(request, 'main/main_page.html', { 'qwe': qwe })
            else:
                print('qwe')
    else:
        form = ContactForm()
    return render(request, 'main/main_page.html')