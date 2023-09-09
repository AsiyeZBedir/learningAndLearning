import pandas as pd

# Veri çerçevesi oluşturma
data = {'Ad': ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma'],
        'Yaş': [25, 30, 28, 22]}

df = pd.DataFrame(data)

# Veriyi CSV dosyasına kaydetme
df.to_csv('veri.csv', index=False)
