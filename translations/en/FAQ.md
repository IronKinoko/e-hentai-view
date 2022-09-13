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

- Copy a piece of [JavaScript code](https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/fixChromeExhentaiCookie.js)
- Visit [exhentai.org](https://exhentai.org)
- Press `F12` and click the `console` tab
- Paste the code and `Enter` to execute
- Return to EhentaiView to refresh the page and view the pictures normally

## 5. Android browser can't see pictures

Do the following:

-Save any website into the bookmark
-Go to bookmarks find the newly saved bookmark website.
-Edit the bookmark, change the URL into the JavaScript code below. (The JavaScript code are converted into bookmarklet by using this [JavaScript code](https://raw.githubusercontent.com/IronKinoko/asset/master/e-hentai-view/fixChromeExhentaiCookie.js) as reference.)
```
javascript:(function()%7Bif (location.href.indexOf('exhentai.org') %3D%3D%3D -1) %7Balert('Please run in Exhentai.org')%3B%7Delse%7Bconst cookies %3D document.cookie.split('%3B').map((cookie) %3D> cookie.trim())%3Bcookies.forEach((cookie) %3D> %7Bdocument.cookie %3Dcookie %2B'%3B domain%3D.exhentai.org%3B path%3D%2F%3B max-age%3D31536000%3B secure%3BSameSite%3DNone%3B'%7D)%3B%7D%7D)()
```
-Change the name of the bookmark into fixChromeExhentaiCookie.js
-Save the changes by going back (for chrome browser)
-Now visit exhentai.org, click the address bar and type in the newly saved bookmark name fixChromeExhentaiCookie.js and click on it to execute the JavaScript.
-Return to EhentaiView to refresh the page and view the pictures normally
