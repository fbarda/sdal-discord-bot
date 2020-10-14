# Sınıf Seçimi

Sınıf seçimini yapmak için öğrenci ilk önce `#sinif-sec` tarzındaki bir Discord kanalında mesaja reaksiyon vererek kendine sınıf rolünü atatır.

Daha sonrasında öğrenciye yeni gözüken bir `#n-sınıf-sube-sec` (n sınıf yılını temsil eder) kanalındaki mesaja reaksiyon vererek kendi şubesi rol olarak atanır.

## Örnek öğrenci ataması

1. Discord sunucusuna katılır. (Roller: "Yeni Öğrenci")
1. `#sinif-sec` üzerinden 9. sınıfı seçer. ("9. Sınıf" rolü eklendi.)
1. `#sinif-sec` kanalı kaybolur. ("Yeni Öğrenci" rolü kaldırıldı.)
1. `#9-sinif-sube-sec` kanalı gözükür. (Roller: "9. Sınıf")
1. `#9-sinif-sube-sec` üzerinden A şubesini seçer. ("9-A" rolü eklendi.)
1. `#9-sinif-sube-sec` kanalı kaybolur. ("9. Sınıf" Rolü kaldırıldı.)
1. `#9-A` ve `#9-A-ders`(ses) kanalları gözükür (Roller: "9-A")

## Özel rol listesi

- Yönetici: Öğretmen ataması ve bota diğer görevlerini yaptırma yetkilerine sahiptir.
- Öğretmen: Bütün Öğrenci kanallarına erişimi var. Ses kanallarında öğrencileri susturup sesini açabilir.
- Öğrenci: Bütün öğrencileri tek seferde belirtmek için kullanılır.

## Öğrenci rolleri yaratılması

Öğrenci rolleri [`genelAyarlar.json`](../../ayarlar/genelAyarlar.json)'daki `sınıflar` listesine göre hazırlanır.
**Örnek liste**

```json
    "sınıflar":[
        {
            "yıl":9,
            "şubeler":[
                "A","B","C","D","E","F"
            ]
        }
    ]
```

Burada verilen 9. sınıf örneğinde ilk önce `9. Sınıf` rolü hazırlanır, daha sonra `9-A` `9-B` `9-C` `9-D` `9-E` `9-F` rolleri hazırlanır. Hazırlanan rollerin id'leri ve atama mesajlarının id'leri PostgreSQL veritabanında kaydolur.

Bot yeniden başladığında PostgreSQL veritabanını roller ve atama mesajları için kontrol eder. Eğer boş ise, rolleri ve mesajları yaratır, kaydeder ve mesajları reaksiyonlar için dinlemeye başlar.
