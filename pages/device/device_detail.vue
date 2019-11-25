<template>
	<view style="background-color: #FFFFFF;">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设备详情</block>
		</cu-custom>
		<view class="content2">
			<view style="color: #6B6B6B; width: 100%; text-align: center; margin-top: 50upx; font-weight: bold;">—— 门禁设备 ——</view>
			<view style=" margin-top: 30upx;">
				<view style="color: #6B6B6B;font-size: 32upx; font-weight: bold; float: left;">设备ID:</view>
				<view id="device_id" style="color: #6B6B6B;font-size: 30upx; float: left; margin-top: 5upx;">{{deviceId}}</view>
			</view>
			<view style="margin-top: 30px ; clear: left;">
				<view style="color: #6B6B6B;font-size: 32upx; font-weight: bold; float: left;">设备版本:</view>
				<view id="device_version" style="color: #6B6B6B;font-size: 30upx; float: left; margin-top: 5upx;">{{deviceVersion}}</view>
			</view>
			<view style=" margin-top: 50px ;clear: left;">
				<view style="color: #6B6B6B;font-size: 32upx; font-weight: bold; float: left;">系统版本:</view>
				<view id="device_sys_version" style="color: #6B6B6B;font-size: 30upx; float: left; margin-top: 5upx;">{{sysVersion}}</view>
			</view>
			<view style=" margin-top: 70px ;clear: left;">
				<view style="color: #6B6B6B;font-size: 32upx; font-weight: bold; float: left;">设备状态:</view>
				<view id="device_status" :style="{'color':deviceStau == '离线中···'?'#8799a3':'#0081ff'}" style="color: #6B6B6B;font-size: 30upx; float: left; margin-top: 5upx;">{{deviceStau}}</view>
			</view>
			<view style=" margin-top: 90px ; clear: left;">
				<view style="color: #6B6B6B;font-size: 32upx; font-weight: bold; float: left;">设备位置:</view>
				<view id="device_position" style="color: #6B6B6B;font-size: 30upx; float: left; margin-top: 5upx;">{{deviceLocation}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deviceId:'DH123456789',
				deviceVersion:'V1.0.0',
				sysVersion:'Android 5.0',
				deviceStau:'在线',
				deviceLocation:'北软泰嘉园I座'
			}
		},
		created() {
			this.getDeviceInfo();
		},
		onLoad(options) {
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
			if(null != options){
				console.log(options);
			}
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			getDeviceInfo(){//获取设备详情
				var self = this;
				const requestTask = uni.request({
					url:"http://localhost:3000/deviceInfo",
					success(res) {
						self.deviceId = res.data.data.deviceId;
						self.deviceVersion = res.data.data.deviceVersion;
						self.deviceStau = res.data.data.deviceStau;
						self.sysVersion = res.data.data.sysVersion;
						self.deviceLocation = res.data.data.deviceLocation;
					}
				})
			}
		}
	}
</script>

<style>
	.content2 {
		width: 100%;
		height: 32%;
		background-image: url(../../static/img/bg_card.png);
		background-size: 100% 100%;
		position: absolute;
		margin-top: 10upx;
		padding-left: 10%;
		padding-right: 10%;
	}
</style>
