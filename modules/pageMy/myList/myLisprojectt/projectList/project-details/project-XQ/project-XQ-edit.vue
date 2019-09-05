<template>
	<view class="project-XQ-edit">
		<view class="edit-one">
			<view>添加标签</view>
			<view>
				<checkbox-group @change="checkboxChange1">
				  <label @click="labelBtn1(item.value,index)"  v-for="(item,index) in editarr" :key="index">
				    <checkbox :value="item.value" :checked="item.checked" v-show="false"/>
					<view class="left MIL-item items">
						<view :class="[item.checked ? 'edit' : '', 'MIL-item-text']">{{item.name}}</view>
					</view>
				  </label>
				</checkbox-group>
				<!-- <view v-for="(item,index) in editarr" :key="index" @tap="add(index)" :class="{'edit':hiden}">{{item}}<image :src="del"></image></view>
				<div class="clear"></div> -->
			</view>
			<view @tap="gotoeditbianji">+ 创建自己的标签</view>
		</view>
		<view class="Investor-Submission">
			<view @tap="Submission">
				<view>
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				del: this.Static + 'mbcImg/common/searchClose.png',
				id:'',
				editarr:[{
					name: '平台用户超2000万',
					value: 0,
					checked: false
				},
				{
					name: '大数据服务',
					value: 1,
					checked: false
				},
				{
					name: '消费生活',
					value: 2,
					checked: false
				},
				{
					name: '高新技术企业',
					value: 3,
					checked: false
				},
				{
					name: '天使轮融资2000万',
					value: 4,
					checked: false
				}],
				fieldsDataList:[],
				editnew:[],
				editshu:[],
				editadd:[]
			};
		},
		computed: {
			...mapGetters(['GET_MY'])
		},
		created() {
			console.log(this.GET_MY.MyList.Company.projLabels, '用户已选择的标签双向绑定');
			// let editData = this.GET_MY.MyList.Company.projLabels; // 用户已选择的
			// editData.map((item, index) => { // 对用户已选择的便利
			// 	let editItems = {
			// 		name: item.labelName,
			// 		value: item.id,
			// 		checked: true
			// 	};
			// 	this.editarr.push(editItems);
			// 	this.editadd.push(editItems);
			// })
			//获取标签
			// this.edits();
			console.log(...new Set(this.editarr))
		},
		watch: {
			GET_MY: {
				handler(a, b) {
					console.log(a.MyList.Edit, '----------------------------')
					this.editarr = a.MyList.Edit;
					// this.labelBtn1();
				},
				deep: true
			},
		},
		onLoad:function(options){
			this.id = options.id
			console.log(this.id);
			//获取标签
			this.edits();
		},
		methods: {
			...mapMutations({
				setCompany: 'setCompany',
				setHistory:'setHistory',
				setEdit: 'setEdit',
				setLabelarr: 'setLabelarr'
			}),
			labelBtn1(name,index){
			  console.log(name,index,"nameindex")
			  if(this.fieldsDataList.join(',').indexOf(name) >-1){
				  // console.log(this.editarr, '----------------this.editarr')
			    this.editarr[index].checked = true
				console.log(this.editarr)
				if(this.editarr[index].checked == true){
					this.editadd.push(this.editarr[index])
					console.log(this.editadd)
				}
			  }else{
			    this.editarr[index].checked = false
				console.log(this.editarr)
			  }
			},
			checkboxChange1: function (e) {
			  this.fieldsDataList = e.detail.value; // 获取选中的值
			  console.log(this.fieldsDataList,"fieldsDataList");
			},
			gotoeditbianji(){
				console.log('编辑标签内容')
				uni.navigateTo({
					url:'./project-XQ-edit-bianji?id='+this.id,
				})
			},
			newArr(e){ 
			    var arr = e;
				console.log(e, '-----------------e-----------')
			    var hash = {};
			    arr = arr.reduce(function(item, next) {
			        hash[next.name] ? '' : hash[next.name] = true && item.push(next);
			        return item
			    }, []);
				this.editarr = arr;
				this.$store.commit('setEdit', this.editarr);
			    console.log(arr, '----------------------去除e---------------------');
			},
			edits(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					// console.log(params)
					uni.request({
						url: this.api2 + '/proj/label/getProjLabel?projId='+this.id, //接口地址。
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data.content, '接口返回的标签数据');
							let editnew=response.data.content;
							let zidingyiData =[]; // 自定义数组
							this.editarr.map((item, key) => {
								editnew.map((items, index) => {
									if (items.labelName === item.name) { // 如果存在接口返回的，则认为是选择的数据
										console.log(item, '如果存在接口返回的，则认为是选择的数据');
										item.checked = true;
										this.editadd.push(item);
									} else { // 在默认中不存在数据标签，认为是用户自定义的
										let editItems = {
											name: items.labelName,
											value: this.editarr.length,
											checked: true
										};
										console.log(editItems, '在默认中不存在数据标签，认为是用户自定义的');
										zidingyiData.push(editItems);
									}
								})
							});
							console.log(zidingyiData instanceof Array)
							this.newArr(this.editarr.concat(zidingyiData));
							// this.resetDate(this.editarr);
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			Submission(){
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					let editEd = [];
					this.editarr.map((items, index) => {
						if (items.checked === true) {
							editEd.push(items)
						}
					})
					let params = editEd // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					console.log(params)
					console.log(this.pick)
					uni.request({
						url: this.api2 + '/proj/label/setProjLabel?projId=' + this.id, //接口地址。
						data: this.endParams(params),
						method: 'POST',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							// uni.navigateBack({})
							this.shujuxiang();
							this.Label();
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			Label() { //标签
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/label/getProjLabel?projId=' + this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.Labelarr = response.data.content;
							this.$store.commit('setLabelarr', this.Labelarr);
							console.log(this.Labelarr)
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			},
			shujuxiang() { //项目详情
				if (uni.getStorageSync('landRegist')) {
					let landRegistLG = JSON.parse(uni.getStorageSync('landRegist')); // 读取缓存的用户信息
					console.log(landRegistLG.user.id);
					// let params = {}; // 请求总数居时 参数为空
					uni.showLoading({ // 展示loading
						title: '加载中'
					});
					uni.request({
						url: this.api2 + '/proj/' + this.id, //接口地址。
						// data: this.endParams(params),
						method: 'GET',
						header: {
							Authorization: "Bearer " + landRegistLG.token //将token放到请求头中
						},
						success: (response) => {
							uni.hideLoading();
							console.log(response.data);
							this.arr = response.data.content
							this.$store.commit('setCompany', this.arr);
							this.$store.commit('setHistory', this.arr);
							uni.navigateBack({delta: 1});
							console.log(this.arr)
							
						},
						fail: (error) => {
							uni.hideLoading(); // 隐藏 loading
							uni.showToast({
								title: '网络繁忙，请稍后',
								icon: 'none',
								duration: 1000
							});
							console.log(error, '网络繁忙，请稍后');
						}
					});
				}
			}
		},
		
	};
</script>

<style>
	.edit{
		color: #02C2A2!important;
		border: 2upx solid #02C2A2!important;
	}
	.changeColor {
		color: #02C2A2;
		border: 2upx solid #02C2A2;
	}
	.project-XQ-edit{
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
		padding: 2upx;
		padding-bottom: 50upx;
	}
	.edit-one{
		margin: 50upx auto;
		width: 90%;
		min-height: 150upx;
		padding-bottom: 20upx;
		border-bottom: 2upx solid #F5F5F5;
	}
	.edit-one>view:nth-of-type(1){
		font-size: 28upx;
		color: #2E2E30;
		font-weight: 700;
	}
	.edit-one>view:nth-of-type(3){
		font-size: 28upx;
		margin-top: 20upx;
	}
	.edit-one>view:nth-of-type(2){
		width: 100%;
		min-height: 70upx;	
		margin-top: 0upx;
		display: flex;
		flex-wrap: wrap;
	}
	.items>view{
		border: 2upx solid #E2E2E2;
		border-radius: 4upx;
		padding:0 20upx;
		text-align: center;
		line-height: 70upx;
		font-size: 26upx;
		color: #5D5D5D;
		font-weight: 100;
		margin-left: 25upx;
		margin-top: 30upx;
		position: relative;
	}
	.items>view>image{
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: -20upx;
		top: -20upx;
	}
	.Investor-Submission {
		width: 100%;
		height: 122upx;
		background: #FFFFFF;
		bottom: 0;
		position: fixed;
	}
	
	.Investor-Submission view:nth-of-type(1) view {
		width: 690upx;
		height: 90upx;
		background: #02C2A2;
		border-radius: 2px;
		margin-top: 20upx;
		text-align: center;
		line-height: 90upx;
		font-size: 28upx;
		color: #FFFFFF;
	}
	
	.Investor-Submission view:nth-of-type(1) {
		margin: 0 auto;
	}
</style>
