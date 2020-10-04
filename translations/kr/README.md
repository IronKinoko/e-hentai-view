<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

[English](/README.md) | [中文说明](/translations/zh_CN/README.md) | [ภาษาไทย](/translations/th/README.md) | 한국어 | [Malay](/translations/ml/README.md)

EhentaiView에 오신것을 환영합니다, exhentai.org를 위한 모바일(PWA) 웹 사이트이며, Next.js로 빌드 하였습니다.

**만약 크롬 버전이 84 이상이라면, [스크립트를 이용하여](https://github.com/IronKinoko/e-hentai-view/blob/master/translations/kr/FAQ.md#4-%EC%9C%88%EB%8F%84%EC%9A%B0-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EC%82%AC%EC%A7%84%EC%9D%B4-%EB%B3%B4%EC%9D%B4%EC%A7%80-%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4) exhentai.org의 `Secure`, `SameSite=None` 쿠키를 변경해야 합니다.** 

## 스크린샷

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/dark-zh.png" width="25%" title="home"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/light-en.png" width="25%" title="home" />
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/detail.png" width="25%" title="detail"/>
</div>

## 사용법

**브라우저에 있는 웹 보안(cors)으로 인하여 exhentai 이미지들을 바로 엑세스할 수 없으므로, 무조건 e-hentai에 로그인을 하셔야 합니다.**

1. [로그인](https://exhentai.appspot.com/signin)
2. [e-hentai](https://forums.e-hentai.org/index.php)에 로그인을 안하셨다면, 먼저 [e-hentai](https://forums.e-hentai.org/index.php)에 로그인을 하셔야 합니다.
3. 이제 웹 사이트를 사용하실 수 있습니다.

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="login"/>

## FAQ

혹시 사진들이 안보인다면, [여길](/translations/kr/FAQ.md) 봐주세요.

## PWA 설치

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/pwa_install.gif" width="25%" title="pwa install"/>

## 개발

```shell
# 첫 사용
# npm
npm install
npm run dev:server
npm run dev:app

# yarn
yarn
yarn run dev:server
yarn run dev:app
```

## Thanks

- [seven332/EhViewer](https://github.com/seven332/EhViewer)
- [KeepSOBP](https://github.com/KeepSOBP) 한국어 번역 제공
