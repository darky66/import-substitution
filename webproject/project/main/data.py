import pandas as pd

db = pd.read_csv('main/123.csv',  lineterminator='\n')
db1 = pd.read_csv('main/Таблица_v2.csv',  encoding='cp1251')
dict_apps = {}
dict_fav = {}
k = 0
for i in db['Иностранное ПО']:
    dict_apps[i.lower()] = dict_apps.get(i, db['Российский аналог'][k].split(', '))
    k += 1
k1 = 0
for i in db1['Российский аналог']:
    if i not in dict_fav.keys():
        dict_fav[i] = [
            dict_fav.get(i, db1['Описание'][k1]),
            dict_fav.get(i, db1['Ссылка для скачивания'][k1])
        ]
        k1 += 1