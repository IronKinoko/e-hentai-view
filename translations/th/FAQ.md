<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView FAQ</h1>

## 1. IOS ไม่สามารถมองเห็นรูปภาพได้

**จำเป็นต้องปิด `การป้องกันการติดตามข้ามไซต์`**

`การตั้งค่า -> Safari -> ป้องกันการติดตามข้ามไซต์`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="settings"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="safari"/>
</div>

## 2. IOS โหมด PWA เมื่อสลับไปหน้าแอปพลิเคชั่นอื่น หลังจากนั้นหน้าเพจก็ค้างไปเลย

นี่เป็นบั๊กที่เกิดขึ้นใน `IOS 13.x` คุณสามารถอัปเกรดเป็น `IOS14` เพื่อแก้ปัญหานี้อย่างสมบูรณ์
`การตั้งค่า -> ทั่วไป -> การอัปเดตซอฟต์แวร์`

## 3. บนระบบ MAC  เบราว์เซอร์ Safari ไม่สามารถมองเห็นรูปภาพได้

**จำเป็นต้องปิด `การป้องกันการติดตามข้ามไซต์`**

`Safari -> ค่ากำหนด -> ความเป็นส่วนตัว -> ป้องกันการติดตามข้ามไซต์`

## 4. เบราว์เซอร์ Windows ไม่สามารถมองเห็นรูปภาพได้

**ปัญหานี้พบได้บ่อยในเบราว์เซอร์เวอร์ชันที่สูงเกินไป ซึ่งมีการเปลี่ยนแปลงนโยบายความปลอดภัยของคุกกี้ ทำให้เกิดปัญหามองไม่เห็นรูปภาพ**

หากคุณกำลังใช้เบราว์เซอร์ต่อไปนี้:

- เบราว์เซอร์ Chrome และเป็นเวอร์ชั่น > = 80
- เบราว์เซอร์ edge แบบใหม่ (เคอร์เนล chrome)

ดำเนินการดังต่อไปนี้:

- คัดลอก [โค้ด JavaScript](https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/fixChromeExhentaiCookie.js)
- ไปที่ [exhentai.org](https://exhentai.org)
- กดปุ่ม `F12` แล้วคลิกแท็บ `console`
- วางโค้ดและกด `Enter` เพื่อรันโค้ด
- กลับไปที่ EhentaiView เพื่อรีเฟรชหน้า และดูรูปภาพได้ตามปกติ
