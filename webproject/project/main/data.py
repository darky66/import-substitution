import pandas as pd

db = pd.read_csv('main/123.csv',  lineterminator='\n')
dict_apps = {}
k = 0
for i in db['Иностранное ПО']:
    dict_apps[i] = dict_apps.get(i, db['Российский аналог'][k].split(', '))
    k += 1