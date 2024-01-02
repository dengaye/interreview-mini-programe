# uni-app

## 配置文件

### pages.json
pages.json 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。


- pages。第一项为应用的入口

官方文档：https://uniapp.dcloud.io/collocation/pages

```
{
  "pages": [{
		"path": "pages/component/index",
		"style": {
			"navigationBarTitleText": "组件"
		},
    <!-- 是否需要登录才可以访问 -->
    "needLogin": false
	}]
}
```

# 黑暗系列

- 开启 DarkMode

mp-weixin
```
 "mp-weixin" : {
		"darkmode" : true,
		"themeLocation" : "theme.json" // 如果 theme.json 在根目录可省略
 }
```

- theme.json 主题配置文件
```
{
	"light": {
		"navBgColor": "#f8f8f8",
		"navTxtStyle": "black"
	},
	"dark": {
		"navBgColor": "#292929",
		"navTxtStyle": "white"
	}
}
```
在 pages.json 中以@开头引用变量，注意：pages.json 中目前只有部分支持

```
<!-- 在 pages.json 中 -->
{
  "globalStyle": {
    "navigationBarBackgroundColor": "@navBgColor",
    "navigationBarTextStyle": "@navTxtStyle"
  }
}
```

- CSS 适配
```
@media (prefers-color-scheme: dark) {
	/* DarkMode 下的样式 start */
	.some-background {
		background: #1b1b1b;
	}
	.some-text {
		color: #ffffff;
	}
	/* DarkMode 下的样式 end */
}

```

https://uniapp.dcloud.net.cn/tutorial/darkmode.html