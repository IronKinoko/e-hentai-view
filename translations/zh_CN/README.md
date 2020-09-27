<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

[english](/README.md) | 中文说明 | [ภาษาไทย](/translations/th/README.md)

**如果Chrome浏览器版本>=84，则会造成的无法查看图片** [点此修复](https://github.com/IronKinoko/e-hentai-view/blob/master/translations/kr/FAQ.md#4-%EC%9C%88%EB%8F%84%EC%9A%B0-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EC%82%AC%EC%A7%84%EC%9D%B4-%EB%B3%B4%EC%9D%B4%EC%A7%80-%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4)

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
3. 所有页面 gallery 都支持打包下载(PC)功能

## 常见问题

如果存在看不到图片的问题, 请看[这里](./FAQ.md)

## 使用

1. [点此登录](https://exhentai.appspot.com/signin)
2. 如果你还没有登录过 [e-hentai](https://forums.e-hentai.org/index.php) 论坛, 那你还需要登录下论坛
3. 两个都登录完后 你就可以正常浏览了

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="登录教程"/>

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

- PC 端 建议直接使用 exhentai 官网浏览
- 安卓端 推荐使用[seven332/EhViewer](https://github.com/seven332/EhViewer)原生 APP 访问
- IOS 端 欢迎使用本网站, [点此登录](https://exhentai.appspot.com/signin)

## 特别感谢

- [seven332/EhViewer](https://github.com/seven332/EhViewer)
