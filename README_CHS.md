# e-hentai-view

[english](./README.md) | 中文说明

## 声明

这是一个关于 exhentai 的 H5 项目，用于优化 exhentai 在手机浏览器中的体验， 不过也适配了 PC 端

## 截图

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/dark-zh.png" width="25%" title="home"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/light-en.png" width="25%" title="home" />
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/detail.png" width="25%" title="detail"/>
</div>

## 特色

1. 该项目添加了PWA功能，可以在 ios/android 安装到桌面使用
2. 该项目适配了手机/PC 端，让手机看 exhentai 更方便
3. 所有页面 gallery 都支持打包下载(PC)功能

## 使用

1. [点此登录](https://exhentai.appspot.com/signin)
2. 如果你还没有登录过 [e-hentai](https://forums.e-hentai.org/index.php) 论坛, 那你还需要登录下论坛
3. 两个都登录完后 你就可以正常浏览了

<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/login.gif" width="25%" title="登录教程"/>

## IOS 特殊说明

**需要关闭Safari的`阻止跨网站跟踪`才能正常查看预览图**

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
