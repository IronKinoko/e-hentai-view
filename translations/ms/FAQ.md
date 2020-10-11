<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView FAQ</h1>

## 1. IOS tidak dapat melihat gambar

**`Prevent Cross-Site Tracking` perlu dimatikan**

`Settings -> Safari -> Prevent Cross-Site Tracking`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="settings"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="safari"/>
</div>

## 2. IOS mod PWA beralih ke aplikasi lain, dan kemudiannya halaman tersekat

Ini adalah masalah pada `IOS 13.x`. Anda perlu menaik taraf ke `IOS14` untuk menyelesaikan masalah ini sepenuhnya

`Settings -> General -> software update`

## 3. Sistem operasi MAC, pelayar web Safari tidak dapat melihat gambar

**`Prevent Cross-Site Tracking` perlu dimatikan**

`Safari -> Preferences -> Privacy -> Prevent Cross-Site Tracking`

## 4. Pelayar web Windows tidak dapat melihat gambar

**Masalah ini biasa berlaku apabila versi pelayar web yang terlalu tinggi, perubahan dasar keselamatan cookies menyebabkan gambar tidak dapat dilihat**

Sekiranya anda menggunakan pelayar web berikut:

- Pelayar web Chrome versi > = 80
- Pelayar web edge baru (chrome kernel)

Sila lakukan perkara berikut:

- Salin sekeping [Kod JavaScript](https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/fixChromeExhentaiCookie.js)
- Layari [exhentai.org](https://exhentai.org)
- Tekan `F12` dan klick pada tab `console`
- Tampal kod dan tekan`Enter` untuk mulakan
- Kembali ke EhentaiView untuk memuat semula halaman dan melihat gambar seperti biasa
