from django.db import models
import pandas as pd
from django.core.exceptions import ValidationError

class Import(models.Model):
    specific = models.TextField('Избранное')
    
    def __str__(self):
        return self.specific
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    

