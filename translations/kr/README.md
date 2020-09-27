<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

[English](/README.md) | [中文说明](/translations/zh_CN/README.md) | [ภาษาไทย](./translations/th/README.md) | 한국어

EhentaiView에 오신것을 환영합니다, exhentai.org를 위한 모바일(PWA) 웹 사이트이며, Next.js로 빌드 하였습니다.

**만약 크롬 버전이 84 이상이라면, exhentai.org의 `Secure`, `SameSite=None` 쿠키를 변경해야 합니다.**

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

혹시 사진들이 안보인다면, [여길](/translations/en/FAQ.md) 봐주세요.

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

## TODO

- [ ] 모바일 환경 최적화
- [x] 다운로드 진행률
- [ ] 다운로드 에러 처리

## Thanks

- [seven332/EhViewer](https://github.com/seven332/EhViewer)