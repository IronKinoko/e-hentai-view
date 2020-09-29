<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView FAQ</h1>

## 1. IOS 에서 사진이 보이지 않습니다.

**`크로스 사이트 추적 방지`를 끄셔야 합니다.**

`설정 -> Safari -> 크로스 사이트 추적 방지`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="settings"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="safari"/>
</div>

## 2. IOS에서 PWA 모드가 다른 어플로 변경된 다음, 그대로 멈춰버립니다.

`IOS 13.x` 버전에서 발생하는 버그입니다. `IOS 14.x` 버전으로 업그레이드 하셔서 해결하실 수 있습니다.

`설정 -> 일반 -> 소프트웨어 업데이트`

## 3. MAC을 통하여 Safari 브라우저로 보려고 하면 사진이 보이지 않습니다.

**`크로스 사이트 추적 방지`를 끄셔야 합니다.**

`설정 -> Safari -> 크로스 사이트 추적 방지`

## 4. 윈도우 브라우저에서 사진이 보이지 않습니다.

**이 문제는 보통 브라우저 버전이 높을때 발생하며, 쿠키 보안 정책으로 인하여 사진이 안 보여지는 겁니다.**

만약 이 브라우저를 쓰고 계신다면:

- 버전이 80 이상인 크롬
- 새로운 Edge 브라우저(크롬 기반 커널)

다음과 같이 따라 해주세요:

- [JavaScript 코드](https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/fixChromeExhentaiCookie.js)를 복사해주세요.
- [exhentai.org](https://exhentai.org)에 접속해주세요.
- `F12`를 누르고 `console` 탭을 눌러주세요.
- 코드를 눌러주시고 `엔터`를 눌러주세요.
- EhentaiView로 돌아와주시고 새로고침을 하시면 정상적으로 됩니다.
