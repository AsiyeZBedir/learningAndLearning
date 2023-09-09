import boto3
from botocore.exceptions import NoCredentialsError

# AWS kimlik bilgilerini ayarlayın
aws_access_key_id = 'Your_AWS_Access_Key_ID'
aws_secret_access_key = 'Your_AWS_Secret_Access_Key'

# AWS S3 istemcisini oluşturun
s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

# Yüklemek istediğiniz dosyanın adı ve S3 kovası adı
file_name = 'example.txt'
bucket_name = 'your-s3-bucket-name'

# Dosyayı S3 kovasına yükleme
try:
    s3.upload_file(file_name, bucket_name, file_name)
    print(f"{file_name} dosyası başarıyla {bucket_name} S3 kovasına yüklendi.")
except FileNotFoundError:
    print(f"{file_name} dosyası bulunamadı.")
except NoCredentialsError:
    print("AWS kimlik bilgileri bulunamadı veya geçersiz.")

# S3 kovasından dosya indirme
downloaded_file_name = 'downloaded_example.txt'
try:
    s3.download_file(bucket_name, file_name, downloaded_file_name)
    print(f"{file_name} dosyası başarıyla {downloaded_file_name} olarak indirildi.")
except FileNotFoundError:
    print(f"{file_name} dosyası bulunamadı.")
except NoCredentialsError:
    print("AWS kimlik bilgileri bulunamadı veya geçersiz.")
