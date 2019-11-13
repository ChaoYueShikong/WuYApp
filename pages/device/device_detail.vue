<template>
	<view style="background-color: #FFFFFF;">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设备详情</block>
		</cu-custom>
		<view class="content2">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
				list[i].id = i;
			}
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods:{
			
		}
	}
</script>

<style>
	.content2 {
		width: 100%;
		height: 70%;
		background-image: url(../../static/img/bg_card.png);
		background-size: 100% 100%;
		position: absolute;
		margin-top: 10upx;
	}
</style>
