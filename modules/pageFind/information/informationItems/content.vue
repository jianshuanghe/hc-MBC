<template>
	<div class="content-content">
		<div class="activeDetails">
			<div class="AD-content">
				<div class="AD-title">此处是资讯名称限制字数15字，多余的用省略代替…</div>
				<div class="AD-items">2018.08.14 </div>
				<!-- 活动详情 -->
				<div class="AD-details-text">
					专利转让是专利人获取经济收益的重要放方式，除此之外专利转让出去有什么好处？其实好处非常的多，以下是专利转让好处的细分。
专利技术人才比较吃香的便是利用自己的专利技术，获取更多好处，其实除了专利人以外，非专利人一样可以获取专利技术，那就是通过专利转让的方式来获取专利，话说回来，专利转让出去有什么什么好处呢？我们在进行专利抓人的时候需要了解哪些重要的知识呢，相信专利人迫不及待想了解了。
				</div>
				<div class="AD-details-img">
					<image :src="msgData.activityImg || banner1"></image>
				</div>
				<div class="AD-details-text">
					专利转让是专利人获取经济收益的重要放方式，除此之外专利转让出去有什么好处？
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import banner1 from '@/static/mbcImg/home/banner1.png';
	import date from '@/static/mbcJs/dateTime.js';
	export default {
	    data () {
			return {
				banner1: banner1,
				dataList: [] // 后台返回数据
			};
	    },
		components: {
		},
		props: {
			msgData: {
				type: Object
			}
		},
		filters: {
		  /* 格式化时间戳 */
		  dateTime (val) {
		    return date.dateTime('m/d h minute', val);
		  },
		  /* 格式图片 */
		  dataImg (val) {
			  return 'https://' + val;
		  }
		},
		computed: {},
		watch: {},
		created() {
		},
	    methods: {
	    }
	};
</script>

<style>
	.content-content{
		position: relative;
		width: 750upx;
	}
	.activeDetails{
		position: relative;
		width: 100%;
	}
	.AD-content{
		position: relative;
		width: 750upx;
		padding: 30upx;
		background: #fff;
	}
	.AD-title{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Bold;
		font-size: 40upx;
		color: #2E2E30;
		line-height: 50upx;
		margin: 20upx 0;
	}
	.AD-items{
		position: relative;
		width: 100%;
		font-family: PingFangSC-Regular;
		font-size: 28upx;
		color: #5D5D5D;
		line-height: 110upx;
	}
	
	.AD-details-title{
		font-family: PingFangSC-Semibold;
		font-size: 34upx;
		color: #2E2E30;
		letter-spacing: 0;
		line-height: 100upx;
	}
	.AD-details-text{
		position: relative;
		width: 100%;
		font-family: PingFang-SC-Medium;
		font-size: 28upx;
		color: #5D5D5D;
		letter-spacing: 0;
		line-height: 40upx;
		margin: 40upx 0;
	}
	.AD-details-img>image{
		position: relative;
		width: 100%;
		height: 384upx;
	}
</style>
