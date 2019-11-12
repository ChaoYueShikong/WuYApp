<template>

	<view class="content2">
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">忘记密码</block>
		</cu-custom>

		<view class="forget-group" style="margin-left: 10%; margin-top: 5px;">
			<text style="color: #262628; font-size: 30px; font-weight: bold;">忘记密码</text>
			<view class="input-row border" style="margin-top: 30px;">
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>

			<view class="input-row3">
				<input id="verCodeId" type="text" v-model="verCode" placeholder="请输入验证码" selection-start="-1" selection-end="-1"
				 cursor="-1"></input>
				<!-- <button class='cu-btn bg-green shadow' @tap="sendCode(this)">发送验证码</button> -->
				<button class='cu-btn bg-blue shadow' @click="getCode" :disabled="disabled" >
					{{countdown}} <text v-show="timestatus">秒重获</text>
				</button>
			</view>

			<view class="input-row2">
				<m-input type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
			</view>

			<view class="btn-row">
				<button class="primary" type="button" @tap="updatePwd">确定</button>
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
				password: '',
				verCode: '',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				clear: ''
			}
		},
		methods: {
			updatePwd() {
				/* 提交修改密码的请求 */
			},
			// 获取验证码
			getCode() {
				var that = this;
					that.disabled = true; //禁用点击
					var isSuccess = true;//假设校验手机号  和 请求验证码成功
					
					if(isSuccess){
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
					}else{
						that.disabled = false; //获取失败开启点击
					}
					
			},
			// 倒计时
			countDown() {
				var that = this;
				if (!that.countdown) {
					that.disabled = false;
					that.timestatus = false;
					that.countdown = '获取验证码';
					clearInterval(that.clear);
				} else {
					--that.countdown;
				}
			}

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
		margin-top: 160upx;
	}

	.forget-group {
		margin-left: 10%;
		margin-right: 10%;
	}

	.primary {
		margin-top: 30upx;
		background: #4C7DFD;
		border: #4C7DFD;
		border-radius: 60upx;
		color: #FFFFFF;
		font-size: 30upx;
		font-weight: bold;
		padding: 2%;
	}

	.input-row2 {
		margin-top: 30upx;
	}

	.input-row3 {
		margin-top: 30upx;
		align-items: center;
		display: flex;
		border: #F7F8FA;
		border-radius: 60upx;
		background-color: #F7F8FA;
	}

	#verCodeId {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		color: #555;
		padding-right: 20rpx;
		font-size: 16px;
		width: 90%;
		height: 46px;
		padding: 0 30upx;
	}
</style>
