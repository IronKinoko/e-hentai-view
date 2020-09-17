<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView 常见问题</h1>

## 1. IOS 看不到画廊图片

**需要关闭 Safari 的`阻止跨网站跟踪`才能正常查看预览图**

`设置 -> Safari浏览器 -> 关闭“阻止跨网站跟踪”`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="设置"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="Safari浏览器"/>
</div>

## 2. IOS PWA 模式下切换应用后界面卡死

这是`IOS 13.x`版本的 bug, 你可以升级`IOS14`彻底解决这个问题

`设置 -> 通用 -> 软件更新`

## 3. mac 系统 Safari 浏览器看不到图片

**需要关闭 Safari 的`阻止跨网站跟踪`才能正常查看预览图**

`Safari 浏览器 -> 偏好设置 -> 隐私 -> 关闭“阻止跨站跟踪”`

## 4. Windows 浏览器看不到画廊图片

**这个问题常见于浏览器版本过高,Cookie 安全策略变更导致看不到图**

如果你正在使用下列浏览器:

- Chrome 浏览器,并且版本>=80
- 新版 edge 浏览器(chrome 内核)

请执行以下操作:

- 复制一段 JavaScript 代码
- 访问 [exhentai.org](https://exhentai.org)
- 按下`F12`, 点击`控制台(console)`标签
- 粘贴代码并`回车(Enter)`执行
- 返回 EhentaiView 刷新页面,即可正常查看图片
