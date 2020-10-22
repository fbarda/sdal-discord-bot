# Veritabanı modülü

Veritabanı olarak PostgreSQL, modül olarak da [pg](https://npmjs.org/packages/pg) kullanıyoruz.

## Veritabanı muhtemel tabloları

Not: JSON anlatımlarındaki `(...)` bir önceki girşin kopyalarını belirtir. Mesela bir `alfabe` listesinde `${harf}`tan sonra `(...)` varsa, bu diğer harflerin potansiyel girişlerini belirtir. Hem tek tek `a`, `b` gibi tekrar eden girişleri belirtmekten kaçınmayı, duruma göre bulunmayan girişleri belirtmeyi sağlayarak daha okunabilir bir şema çıkarmamızı sağlıyor.

### Tablo anlatımı

**Tablo İsmi**: `tablonun veritabanındaki ismi` yada `${değişken}li isim`

1. Guilder Tablosu: `guildler`
    - `guild_id` **PRIMARY KEY**, **NOT NULL** CHAR(20)
      Kayıtlı guildlerin IDlerini içerir. Bot buradaki listeyi çeker ve elindeki guild listesini kontrol ederek kapalıyken eklenen yeni guildleri bulur, yeni guilderin hazırlıklarını yapar ve listeye ekler.

2. **Guild başı tablo**: `g${guild id'si}` -- Bu tabloların tek satırı vardır.
    - `roller` **NOT NULL** JSONB
      Sunucu için oluşturulan roller bu girişte saklanır. JSON şeması aşağıda verilmiştir.

      ```json
      {
          "tam atanmayanlar":{
              "sınıfsız":"${rol id'si}",
              "${sınıf yılı}":"${rol id'si}",
              (...)
          }
          "9":{"${şube ismi}":"${rol id'si}", (...)},
          "10":{(...)},
          "11":{(...)},
          "12":{(...)},
          "yetkili":{
              "Yönetici":"${id}",
              "Öğretmen":"${id}"
          }
      }
      ```

    - `sunucuSemasi` **NOT NULL** JSONB
    Sunucuda kullanılacak sınıflar ve onların sınıf kanalları bu girişte belirtilir. Bu girişin kontrolü sırasında eklenmemiş veya silinen bir kanala veya role rastlanırsa bot bunu düzeltmeye çalışır. JSON şeması aşağıda verilmiştir.

    ```json
    {
        "sınıflar":{
            "${sınıf yılı}":["${şube belirteci, genelde bir harf}",(...)],
            /*bir sınıftaki şubelerin belirteçlerinin bulunduğu liste*/
            (...)
        },
        "kanallar":{
            "${sınıf yılı}-${şube belirteci}":{
                "kategori":"${kanal id'si}",
                /*kategori kanalları gruplama için kullanılır*/
                "yazı":"${kanal id'si}",
                "ses":"${kanal id'si}"
            },
            (...),
            "sistem kanalları":{
                "bakım kanalı":"${kanal id'si}",
                "sınıf atama kanalı":"${kanal id'si}",
                "şube atama kanalları":{"${sınıf yılı}":"${kanal id'si}", (...)},
                "ders duyuru kanalı":"${kanal id'si}",
                "bot kategori kanalı":"${kanal id'si}"
            }
        }
    }
    ```

    - `dersProgrami` **NOT NULL** JSONB
    Sunucuda kullanılacak ders programı bu girişte belirtilir. JSON şeması aşağıda verilmiştir.

    ```json
    {
        "${sınıf yılı}-${şube belirteci}":{
            "${gün}":[
                {
                    "dersİsmi":"${isim}",
                    "başlangıç":"${saat}.${dakika}",
                    "bitiş":"${saat}.${dakika}"
                },
                (...)
            ],
            (...)
        },
        (...)
    }
    ```
