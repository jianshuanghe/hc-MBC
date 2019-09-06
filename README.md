##样式层级
*搜索框层级100，
## 页面路由描述
* pages -- 主页
	mbc -- 陌拜商机项目
		template -- 组件
			lanRegistration -- 登录模块
				h5 -- h5模式下登录
				mp -- mp小程序小登录
			pageHome -- 首页->展示
			pageFind -- 发现->展示
			pagePublish -- 发布->展示
			pageNews -- 消息->展示
			pageMy -- 我的->展示
		home -- 首页（tabBar）
* modules -- 分包加载
	pageHome -- 首页->组件
	pageFind -- 发现->组件
	pagePublish -- 发布->组件
	pageNews -- 消息->组件
	pageMy -- 我的->组件


## 接口描述
* 暂时无接口

## 需求文档
  详见墨刀地址：[](https://org.modao.cc/app/d32a394660ea860c79b8b4ab451538941fc04f31#screen=s47F34DCC9E1557890264134)

## 首页url 带参详情

## 项目进展
 
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



uni-app学习心得：
官网地址：[](https://uniapp.dcloud.io/)
在学习之前也是评估了公司的项目和团队的研发能力，公司项目需求一日三变，既要开发小程序又要开发web端，多变的需求，就要多端同时改变，所以就开始尝试多端开发，首选的mp-vue,但是这个已经不在维护了，所以就开始考虑uni-app和taro
uni-app是基于vue的，公司团队也在使用vue开发项目，我个人更是喜欢taro,优质的开发规范，庞大的开源市场，可是无奈，只能选择uni-app了

##先介绍下这个框架ios和安卓下的兼容性问题吧
1、首先是滚动,在ios下页面超出屏幕长度，就会出现这个情况：用户可以左右拖动页面，安卓正常。-----------------解决办法： 在页面的relative定位的部位顶部配上scroll-view组件，高度设置100vh;fixed定位的放在这个组件外边，否则页面上划会被遮盖
2、页面上拉加载：这个框架上拉加载需要配合scroll-view组件，组件属性中的@scrolltolower是侦听用户触底行为，此时可以触发加载更多接口
3、采用v-html去渲染后台返回的html模板时，会出现图片溢出问题，这个解决的办法可以采用样式替换：使用正则匹配，给所有的img便签的样式替换成最大宽度100%；html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');

##聊一下 这个项目出现的复杂问题吧
1、附件上传，我们公司的附件上传采用的上传到服务器统一管理，需要要求：图片可多张上传，可删除，可预览，要求双向绑定。我们使用了一个组件[](https://ext.dcloud.net.cn/plugin?id=326)，不过这个组件需要对他进行修改，双向绑定时组件将onload生命周期
改成monted，因为只有在页面路由组件才会存在onload生命周期，组件时不存在的；还有一个需要注意的，在双向绑定图片时，接口请求到数据，当时组件中拿不到，其实时组件先渲染了，然后接口才请求完数据，所以有两个解决办法，a、通过watch监听数据变化，组件渲染数据；
b、在组件便签上添加v-if=false,等接口返回成功在将false改成true;很明显，第二种更简单。
2、附件双向绑定时，接口返回的附件只有一个路径，点击天机图片返回两个，一个是图片上传到服务器的路径，还有一个是附件名称，所以双向绑定渲染时，需要对渲染的路径做条件判断
3、
