from django.shortcuts import render
from .models import Import
from .forms import ContactForm
from django.views.decorators.csrf import requires_csrf_token
#from data import dict

# def catalog(request):
#     db = pd.read_csv('Таблица.csv')
#     print(db.head())
#     qwe = Import.objects.all()
#     return render(request, 'main/catalog.html', { 'qwe': qwe })
@requires_csrf_token
def main_page(request):
    qwe = Import.objects.all()
    if request.method == 'POST':
            form = ContactForm(request.POST)
            print(form)
            if form.is_valid():
                name = form.cleaned_data['name']
                #print(dict[:5])
                return render(request, 'main/main_page.html', { 'qwe': qwe })
    else:
        form = ContactForm()
    return render(request, 'main/main_page.html')