# Analytics Dashboard

[Analytics Backend](https://github.com/burakaltinbicak/analytics-backend)'den gelen verileri görselleştiren Next.js dashboard uygulaması.

## Özellikler

- 📊 Gerçek zamanlı site istatistikleri
- 🗺️ Tıklama ısı haritası
- 📜 Scroll derinliği görselleştirmesi
- ⏱️ Oturum süreleri analizi
- 🌍 Ülke, tarayıcı, cihaz dağılımı
- 📄 Sayfa bazlı ziyaret istatistikleri
- ➕ Yeni site ekleme ve script üretme

## Teknolojiler

| Teknoloji | Kullanım |
|---|---|
| Next.js 16 | Framework |
| React 19 | UI |
| TypeScript | Tip güvenliği |
| Tailwind CSS | Stil |

## Kurulum

```bash
npm install
```

## Ortam Değişkenleri

`.env.local` dosyası oluştur:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Kullanım

1. Dashboard'a gir
2. "Yeni Site Ekle" butonuna tıkla
3. Site adı ve domain'i gir
4. Üretilen script tag'ini sitenin `<head>` kısmına yapıştır
5. Verilerin gelmesini bekle

## Deploy

Vercel üzerinde deploy edilmiştir:

```
https://nextjs-dashboard-auc6.vercel.app/dashboard
```

## Bağlantılı Projeler

- [Analytics Tracker](https://github.com/burakaltinbicak/analytics-tracker) — Sitelere eklenen tracker script
- [Analytics Backend](https://github.com/burakaltinbicak/analytics-backend) — API ve veri depolama