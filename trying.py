# Örnek bir Machine Learning projesi için Python kodu
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Veri oluşturma (örnek veri)
X, y = np.random.rand(100, 2), np.random.randint(0, 2, 100)

# Veriyi eğitim ve test setlerine ayırma
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model oluşturma ve eğitme
model = LogisticRegression()
model.fit(X_train, y_train)

# Tahminler yapma
y_pred = model.predict(X_test)

# Doğruluk skorunu hesaplama
accuracy = accuracy_score(y_test, y_pred)
print("Doğruluk: {:.2f}%".format(accuracy * 100))
