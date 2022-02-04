<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

[English](/README.md) | 简体中文

**如果 Chrome 浏览器版本>=84，则会造成的无法查看图片** [点此修复](./FAQ.md#4-windows-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9C%8B%E4%B8%8D%E5%88%B0%E7%94%BB%E5%BB%8A%E5%9B%BE%E7%89%87)

**_如果你习惯在 PC 端浏览 exhentai，可以使用[IronKinoko/e-hentai-infinite-scroll](https://github.com/IronKinoko/e-hentai-infinite-scroll)_**

## 截图

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/dark-zh.png" width="25%" title="home"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/light-en.png" width="25%" title="home" />
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/detail.png" width="25%" title="detail"/>
</div>

## 项目定位

项目主要服务于 IOS, 其他设备可以查看[同类推荐](#同类推荐)

项目采用 PWA 技术, 用浏览器页面模拟原生 APP, 便于分发维护

项目部署在谷歌云上, 需要翻墙访问. **网页中 ex 的图源并不需要翻墙**

## 特色

1. 该项目添加了 PWA 功能，可以在 ios/android 安装到桌面使用
2. 该项目适配了手机/PC 端，让手机看 exhentai 更方便

## 使用

**Because webSecurity in browser (cors), we can't direct access the exhentai image, you should sign in e-hentai before use this website**

```
docker run -d -p 80:8080 --restart always ironkinoko/e-hentai-view
```

浏览器访问 http://localhost

更多查看 https://hub.docker.com/r/ironkinoko/e-hentai-view

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="login"/>

## 常见问题

如果存在看不到图片的问题, 请看[这里](./FAQ.md)

## 安装到桌面(PWA)

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/pwa_install.gif" width="25%" title="IOS PWA 安装"/>

## 开发

```shell
# 首次运行请先安装依赖
# npm
npm install
npm run dev:server
npm run dev:app
#yarn
yarn
yarn run dev:server
yarn run dev:app
```

## 同类推荐

- PC 端 建议直接使用 exhentai 官网浏览，配合 **_[IronKinoko/e-hentai-infinite-scroll](https://github.com/IronKinoko/e-hentai-infinite-scroll)_** 更方便
- 安卓端 推荐使用[seven332/EhViewer](https://github.com/seven332/EhViewer)原生 APP 访问

## 特别感谢

- [seven332/EhViewer](https://github.com/seven332/EhViewer)
