<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView</h1>

[english](./README.md) | 中文说明 | [ภาษาไทย](./README_THA.md)

## 项目定位

由于 IOS 的开发者资格需要 99 美元一年, 而免费面向个人开发者的证书必须 7 天更新一次, 不利于分发应用.

所以项目采用 PWA 技术, 用浏览器页面模拟原生 APP, 便于分发维护

项目部署在谷歌云上, 需要翻墙访问. **网页中 ex 的图源并不需要翻墙**

## 同类推荐

- PC 端 建议直接使用 exhentai 官网浏览
- 安卓端 推荐使用[seven332/EhViewer](https://github.com/seven332/EhViewer)原生 APP 访问
- IOS 端 欢迎使用本网站, [点此登录](https://exhentai.appspot.com/signin)

## 截图

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/dark-zh.png" width="25%" title="home"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/light-en.png" width="25%" title="home" />
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/detail.png" width="25%" title="detail"/>
</div>

## 特色

1. 该项目添加了 PWA 功能，可以在 ios/android 安装到桌面使用
2. 该项目适配了手机/PC 端，让手机看 exhentai 更方便
3. 所有页面 gallery 都支持打包下载(PC)功能

## 使用

1. [点此登录](https://exhentai.appspot.com/signin)
2. 如果你还没有登录过 [e-hentai](https://forums.e-hentai.org/index.php) 论坛, 那你还需要登录下论坛
3. 两个都登录完后 你就可以正常浏览了

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="登录教程"/>

## IOS 特殊说明

**需要关闭 Safari 的`阻止跨网站跟踪`才能正常查看预览图**

`设置 -> Safari浏览器 -> 阻止跨网站跟踪`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="设置"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="Safari浏览器"/>
</div>

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

## TODO

- [ ] 优化手机端体验
- [x] 下载进度条
- [ ] 下载错误处理
