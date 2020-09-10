<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

[English](./README.md) | [中文说明](./README_CHS.md) | ภาษาไทย

ยินดีต้อนรับสู่ EhentaiView ซึ่งเป็นเว็บไซต์สำหรับมือถือ(PWA) สำหรับ exhentai.org ที่สร้างด้วย Next.js

**ถ้าเวอร์ชั่นของ Google Chrome  >= 84, คุณต้องเปลี่ยนแปลงคุกกี้ exhentai.org ให้เป็น `Secure` และ `SameSite=None`**

## ภาพหน้าจอ

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/dark-zh.png" width="25%" title="หน้าหลัก"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/light-en.png" width="25%" title="หน้าหลัก" />
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/detail.png" width="25%" title="รายละเอียด"/>
</div>

## การใช้งาน

**เนื่องจาก ความปลอดภัยเว็บไซต์ในเบราว์เซอร์ (cors) เราไม่สามารถเข้าถึงภาพ exhentai ได้โดยตรง คุณควรลงชื่อเข้าใช้ e-hentai ก่อนใช้เว็บไซต์นี้**

1. เข้าสู่ระบบ [ที่นี่](https://exhentai.appspot.com/signin)
2. หากคุณยังไม่ได้ลงชื่อเข้าใช้ใน [e-hentai](https://forums.e-hentai.org/index.php) คุณต้องลงชื่อเข้าใช้ใน e-hentai ด้วย
3. ตอนนี้คุณสามารถใช้งานเว็บไซต์ได้แล้ว

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="เข้าสู่ระบบ"/>

## คำอธิบายเพิ่มเติมสำหรับ IOS

**จำเป็นต้องปิดการป้องกันการติดตามข้ามไซต์**

`การตั้งค่า -> Safari -> ป้องกันการติดตามข้ามไซต์`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="การตั้งค่า"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="safari"/>
</div>

## การติดตั้ง PWA

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/pwa_install.gif" width="25%" title="การติดตั้ง pwa"/>

## สำหรับการพัฒนา

```shell
# ใช้งานครั้งแรก
# npm
npm install
npm run dev:server
npm run dev:app
#yarn
yarn
yarn run dev:server
yarn run dev:app
```

## สิ่งที่ต้องทำ

- [ ] เพิ่มประสิทธิภาพประสบการณ์ใช้งานในมือถือ
- [x] แถบความคืบหน้าการดาวน์โหลด
- [ ] การจัดการข้อผิดพลาดของการดาวน์โหลด

## ขอขอบคุณ

- [seven332/EhViewer](https://github.com/seven332/EhViewer)
