<template>
	<view class="content">
		<view class="login-group" style="margin-left: 10%; margin-top: 50px;">
			<text style="color: #262628; font-size: 30px; font-weight: bold;">登录</text>
			<view class="input-row border" style="margin-top: 30px;">
				<text class="login" style="color: #BEBFC1; font-size: 16px; ">登录</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title" style="color: #BEBFC1; font-size: 16px;">密码</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="btn-row">
			    <button  class="primary"   @tap="bindLogin">登录</button>
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
				account:'',
				password:''
			}
		},
		methods:{
			bindLogin(){
				if (this.account.length == 0 || this.account.length != 11) {
					uni.showToast({
						icon:'none',
						title:'请输入长度为11的手机号!'
					});
					return;
				}
				if (this.password == "" && this.password.length < 6) {
					uni.showToast({
						icon:'none',
						title:'请输入长度大于等于6位数的密码!'
					});
					return;
				}
			}
		}
	}
</script>

<style>
	.content {
		height: 520px;
		width: 370px;
		background-image: url(../../static/img/bg_card.png);
		float: left;
		background-size: 100% 100%;
	}

	.login-group {
		margin-left: 10%;
		margin-right: 10%;
	}
	.primary{
		margin-top: 30upx;
		background: #BEBFC1;
		border: #BEBFC1;
		border-radius: 40upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		padding-top: 10upx;
		width: 90%;
		height: 50px;
	}
</style>
