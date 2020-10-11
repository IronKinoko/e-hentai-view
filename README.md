<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

English | [简体中文](/translations/zh_CN/README.md) | [ภาษาไทย](/translations/th/README.md) | [한국어](/translations/kr/README.md) | [Bahasa Melayu](/translations/ms/README.md)

welcome to EhentaiView, a mobile(PWA) website for exhentai.org, build with Next.js.

**If google chrome version >= 84, you need change exhentai.org cookies with `Secure` and `SameSite=None`** [see here](https://github.com/IronKinoko/e-hentai-view/blob/master/translations/en/FAQ.md#4-windows-browser-cant-see-pictures)

## Screenshot

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/dark-zh.png" width="25%" title="home"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/light-en.png" width="25%" title="home" />
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/detail.png" width="25%" title="detail"/>
</div>

## Usage

**Because webSecurity in browser (cors), we can't direct access the exhentai image, you should sign in e-hentai before use this website**

1. Login [here](https://exhentai.appspot.com/signin)
2. If you haven't signed in to [e-hentai](https://forums.e-hentai.org/index.php), also you need sign in e-hentai
3. Now you can browse the website

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="login"/>

## FAQ

If you can't see the picture, please see [here](/translations/en/FAQ.md)

## PWA install

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/pwa_install.gif" width="25%" title="pwa install"/>

## Development

```shell
# The first time
# npm
npm install
npm run dev:server
npm run dev:app
#yarn
yarn
yarn run dev:server
yarn run dev:app
```

## Thanks

- [seven332/EhViewer](https://github.com/seven332/EhViewer)
- [Nicezki](https://github.com/Nicezki) Thai translation
- [KeepSOBP](https://github.com/KeepSOBP) Kr translation
- [TeeVenDick](https://github.com/TeeVenDick) Malay translation
