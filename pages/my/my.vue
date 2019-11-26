<template>
	<view>
		<cu-custom bgColor="bg-gradual-white" displayable :isBack="false">
			<block slot="content">我的</block>
		</cu-custom>
		<view class="content2">
			<view class="flex  justify-center">
				<view class="cu-avatar xxl round" style="background-image:url(../../static/img/ic_head.png);"></view>
			</view>
			<view class="flex  justify-center margin-top">
				<text style="color: #333333; font-size: 14px;">137****9009</text>
			</view>
			<view class="margin-top-l">
				<text id="setting">设置</text>
			</view>

			<view >
				<view @tap="toSetting" style="margin-left: 10%; margin-top: 5%; float: left;">
					<image style="width: 100upx;height: 100upx; clear: both;background-image:url(../../static/img/ic_setting.png); background-repeat: no-repeat;"></image>
					<view style="clear: both; margin-left: -10%;">系统设置</view>
				</view>
				
				<view style="width: 1px; height: 100upx; background-color: #D8D8D8; float: left; margin-left: 10%; margin-top: 8%;"></view>
				
				<view @tap="toForgetPwd" style="margin-left: 10%; margin-top: 5%; float: left;">
					<image style="width: 100upx;height: 100upx; clear: both;background-image:url(../../static/img/ic_update_pwd.png); background-repeat: no-repeat;"></image>
					<view style="clear: both; margin-left: -10%;">修改密码</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
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
		onShow() {
			//写请求数据的方法
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			toForgetPwd() {
				/* 跳转忘记密码界面 */
				uni.navigateTo({
					url:'../login/forget_pwd'
				})
			},
			toSetting() {
				/* 跳转忘记密码界面 */
				uni.navigateTo({
					url:'../my/setting'
				})
			}
		}

	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.content2 {
		margin-top: 5%;
	}

	.cu-avatar {}

	.margin-top-l {
		margin-top: 50upx;
	}

	#setting {
		color: #262628;
		font-size: 12px;
		margin-left: 68upx;
		font-weight: 600;
	}

	#item_text {
		display: block;
		margin-top: 10rpx;
		color: #333;
		font-size: 26rpx;
		line-height: 40rpx;
	}
</style>
