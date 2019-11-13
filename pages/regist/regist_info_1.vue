<template>
	<view id="home-list">
		<cu-custom bgColor="bg-gradual-white" displayable :isBack="false">
			<block slot="content">住户信息登记</block>
		</cu-custom>
		<view class="content2">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号</view>
				<input placeholder="请输入身份证号" name="input"></input>
			</view>
			<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">住房信息</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group ">
				<view class="title">室</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'301室'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="action">
					身份证照片上传
				</view>
			</view>

			<view class="cu-form-group">
				<!-- 上传照片 -->
				<view class="grid col-2 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="bg-img2" @tap="ChooseImage" v-if="imgList.length<1">

					</view>
				</view>
				<view class="grid col-2 grid-square flex-sub ">
					<view class="bg-img" v-for="(item,index) in imgList2" :key="index" @tap="ViewImage2" :data-url="imgList2[index]">
						<image :src="imgList2[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg2" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="bg-img3" @tap="ChooseImage2" v-if="imgList2.length<1">

					</view>
				</view>
			</view>
			<view style="display: inline; ">
				<view style="float: left; margin-left: 20%; margin-top: 2%;">身份证正面</view>
				<view style="float: right; margin-right: 20%;margin-top: 2%;">身份证反面</view>
			</view>
			<view class="btn-row">
				<button class="primary" type="button" @tap="updateInfo">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				picker: ['301室', '302室', '303室'],
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				imgList: [],
				imgList2: [],
				modalName: null,
				upType: '',
				region: ['水印康庭', '9幢', '6单元']
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
		onReady() {
			uni.hideLoading()
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {

						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},

			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除此照片么吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage2() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList2.length != 0) {
							this.imgList2 = this.imgList2.concat(res.tempFilePaths)
						} else {
							this.imgList2 = res.tempFilePaths
						}
					}
				});
			},
			ViewImage2(e) {
				uni.previewImage({
					urls: this.imgList2,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg2(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除此照片么吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList2.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			RegionChange(e) {
				this.region = e.detail.value
			}
		}

	}
</script>

<style>
	#home-list {}

	.content2 {
		width: 100%;
		height: 84%;
		background-image: url(../../static/img/bg_card.png);
		background-size: 100% 100%;
		position: absolute;
		
	}

	.bg-img2 {
		background-image: url(../../static/img/ic_card_font.png);
		display: flex;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.bg-img3 {
		background-image: url(../../static/img/ic_card_reverse.png);
		display: flex;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.primary {
		margin-top: 15%;
		background: #4C7DFD;
		border: #4C7DFD;
		border-radius: 60upx;
		color: #FFFFFF;
		font-size: 30upx;
		font-weight: bold;
		margin-left: 10%;
		margin-right: 10%;
		padding: 2%;
	}
</style>
