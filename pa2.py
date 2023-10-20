import pandas as pd
import matplotlib.pyplot as plt


# CSV dosyasından veri okuma
data = pd.read_csv('veri.csv')

# Veriyi inceleme
print("Veri Özeti:")
print(data.head())

# Temel istatistiksel bilgileri alma
summary_stats = data.describe()
print("\nİstatistiksel Bilgiler:")
print(summary_stats)

# Veri görselleştirme
data.plot(kind='bar', x='Ad', y='Yaş', title='Yaş Grafiği')
plt.show()
