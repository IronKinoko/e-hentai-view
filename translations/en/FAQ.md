<p align="center">
  <img width="144px" height="144px" src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/icon.png"/>
</p>

<h1 align="center">EHentaiView FAQ</h1>

## 1. IOS can not see the picture

**`Prevent Cross-Site Tracking` needs to be turned off**

`Settings -> Safari -> Prevent Cross-Site Tracking`

<div style="display: flex;">
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/setting.PNG" width="25%" title="settings"/>
<img src="https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/safari.PNG" width="25%" title="safari"/>
</div>

## 2. IOS PWA mode switches to other applications, and then the page is stuck

This is a bug in `IOS 13.x`. You can upgrade `IOS14` to completely solve this problem

`Settings -> General -> software update`

## 3. MAC system Safari browser can not see the picture

**`Prevent Cross-Site Tracking` needs to be turned off**

`Safari -> Preferences -> Privacy -> Prevent Cross-Site Tracking`

## 4. Windows browser can't see pictures

**This problem is common in the browser version is too high, cookie security policy changes caused by not seeing the pictures**

If you are using the following browsers:

- Chrome browser, and version > = 80
- New edge browser (chrome kernel)

Do the following:

- Copy a piece of JavaScript code
- Visit [exhentai.org](https://exhentai.org)
- Press `F12` and click the `console` tab
- Paste the code and `Enter` to execute
- Return to EhentaiView to refresh the page and view the pictures normally
