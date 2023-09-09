import boto3

# AWS kimlik bilgilerini ayarlayın
aws_access_key_id = 'Your_AWS_Access_Key_ID'
aws_secret_access_key = 'Your_AWS_Secret_Access_Key'
aws_region = 'us-east-1'  # AWS bölge adınızı belirtin

# DynamoDB istemcisini oluşturun
dynamodb = boto3.resource('dynamodb', region_name=aws_region, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

# Tablo adı
table_name = 'SampleTable'

# DynamoDB tablosunu oluşturun (varsa, mevcut tabloyu kullanır)
table = dynamodb.create_table(
    TableName=table_name,
    KeySchema=[
        {
            'AttributeName': 'id',
            'KeyType': 'HASH'  # Anahtar sütunu (Primary Key)
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'id',
            'AttributeType': 'N'  # Sayı (Number) tipinde bir sütun
        }
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,  # Okuma kapasitesi birimi
        'WriteCapacityUnits': 5  # Yazma kapasitesi birimi
    }
)

# Tablo oluşturma işlemi tamamlandıktan sonra bekleme
table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
print(f"{table_name} adlı DynamoDB tablosu oluşturuldu veya mevcut tabloyu kullanıyor.")

# Veri ekleme
response = table.put_item(
    Item={
        'id': 1,
        'name': 'Örnek Kullanıcı',
        'age': 30
    }
)

print("Veri başarıyla eklendi.")

# Veriyi sorgulama
response = table.get_item(
    Key={
        'id': 1
    }
)
item = response.get('Item')

if item:
    print("Sorgu sonucu bulunan veri:")
    print(item)
else:
    print("Veri bulunamadı.")

# Tabloyu silme (İşlem sonrası veriler geri alınamaz, dikkatli kullanın)
# table.delete()
# print(f"{table_name} adlı DynamoDB tablosu silindi.")
