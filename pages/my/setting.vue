<template>

	<view>
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">系统设置</block>
		</cu-custom>
		<view class="content2 action ">
			<view class="sys_version">系统版本</view>
			<view class="sys_version_text">V1.0.0</view>
		</view>
		<view class="btn-row" @tap="toLogin">
			<button class="primary" type="button" @tap="updatePwd">退出登录</button>
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
			toLogin(){
				uni.reLaunch({
					url: '../login/login'
				})
			}
				
		}
	}
</script>

<style>
	.content2 {
		width: 100%;
		padding: 50rpx;
		background-color: #FFFFFF;
		position: absolute;
		margin-top: 10upx;
	}

	.sys_version {
		color: #6B6B6B;
		font-size: 30upx;
		font-weight: bold;
		float: left;
	}

	.sys_version_text {
		color: #6B6B6B;
		font-size: 30upx;
		font-weight: bold;
		float: right;
	}
	.primary {
		margin-top: 30%;
		background: #BEBFC1;
		border: #BEBFC1;
		border-radius: 60upx;
		color: #FFFFFF;
		font-size: 30upx;
		font-weight: bold;
		padding: 2%;
		margin-left: 10%;
		margin-right: 10%;
	}
</style>
