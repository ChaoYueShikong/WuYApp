<template>
	<view class="content">
		<view class="login-group" style="margin-left: 10%; margin-top: 50px;">
			<text style="color: #262628; font-size: 30px; font-weight: bold;">登录</text>
			<view class="input-row border" style="margin-top: 30px;">
				<text class="login" style="color: #BEBFC1; font-size: 16px; ">登录</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row" style="margin-top: 10px;">
				<text class="title" style="color: #BEBFC1; font-size: 16px;">密码</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="btn-row">
				<button class="primary" @tap="bindLogin">登录</button>
			</view>
			<view class="btn-forget-pwd" >
				<text @tap="toForgetPwd">忘记密码?</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			bindLogin() {
				if (this.account.length == 0 || this.account.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入长度为11的手机号!'
					});
					return;
				}
				if (this.password == "" && this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '请输入长度大于等于6位数的密码!'
					});
					return;
				}

				/* 请求登录接口，登陆成功跳转首页 */
				uni.reLaunch({
					url: '../home/main_home'
				})
				
			},
			toForgetPwd() {
				/* 跳转忘记密码界面 */
				uni.navigateTo({
					url:'../login/forget_pwd'
				})

			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 80%;
		background-image: url(../../static/img/bg_card.png);
		background-size: 100% 100%;
		position: absolute;
		margin-top: 160upx;
	}

	.login-group {
		margin-left: 10%;
		margin-right: 10%;
	}

	.primary {
		margin-top: 15%;
		background: #4C7DFD;
		border: none;;
		border-radius: 60upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		padding-top: 6upx;
		font-weight: bold;
		padding: 2%;
	}

	.btn-forget-pwd {
		text-align: center;
		color: #262628;
		font-size: 30upx;
		font-weight: bold;
		margin-top: 50upx;
	}
</style>
