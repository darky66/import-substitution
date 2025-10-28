import pandas as pd

db = pd.read_csv('main/123.csv',  lineterminator='\n')
print(db.head())