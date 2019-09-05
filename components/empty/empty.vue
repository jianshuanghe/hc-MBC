<template>
	<view class="empty-box-cent">
		<view class="empty-content">
			<view class="empty">
				<img :src="empty" alt="" class="img">
			</view>
			<view class="emptyBlankText">
				<p class=""><slot></slot></p>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data () {
        	return {
        		empty: this.Static + 'mbcImg/my/kong.png',
        	};
        },
    };
</script>

<style scoped>
	.empty-box-cent{
		position: absolute;
		height: 100vh;
		background: #fff;
		width: 750upx;
		left: 0;
	}
  .empty-content{
    position: relative;
    width: 750upx;
    padding-top: 24vw;
  }
  .empty{
    position: relative;
    width: 37.86vw;
    height: 32.26vw;
    margin: auto;
  }
  .empty>img{
    position: relative;
    width: 100%;
	height: 100%;
  }
  .emptyBlankText{
    position: relative;
    width: 100%;
    margin-top: 5vw;
  }
  .emptyBlankText>p{
    position: relative;
    width: 100%;
    font-size: 4vw;
    line-height: 10vw;
    text-align: center;
    color: #4a4c5b;
  }
</style>
