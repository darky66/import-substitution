from django.db import models
import pandas as pd
from django.core.exceptions import ValidationError

class Import(models.Model):
    name = models.CharField('Иностранное ПО', max_length = 50)    
    name_import = models.CharField('Российский аналог', max_length = 100)
    specific = models.TextField('Характеристики')
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'Приложение'
        verbose_name_plural = 'Приложения'
    

