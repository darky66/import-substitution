from pandas import pd

db = pd.read_csv('Таблица.csv')
dict = db.to_dict()
