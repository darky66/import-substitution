from django import forms

class ContactForm(forms.Form):
    app = forms.CharField()