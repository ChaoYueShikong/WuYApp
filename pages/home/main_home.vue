<template>
	<view id="home-list">
		<cu-custom bgColor="bg-gradual-white" displayable :isBack="false">
			<block slot="content">门禁设备</block>
		</cu-custom>
		
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索幢数如: 6幢" v-model="inputResult"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="searchBuilding()">搜索</button>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 64px - 50px)">
				<!-- 左边列表item的标题 -->
				<view class="cu-item" :class="index==tabCur?'text-blue cur ':''" v-for="(item,index) in listData" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 64px - 50px); padding-left: 4%; padding-right: 4%;"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-lr" v-for="(item,index) in listData" :key="index" :id="'main-'+index" style="background: white; border: white; border-radius: 20rpx;margin-top: 4%;">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<!-- 右边列表导航的item标题 -->
							<text class="cuIcon-title text-blue"></text>{{item.name}}
						</view>
					</view>
					<view class="cu-list menu-avatar" v-for="(item2,index2) in item.units" :key="index2" :id="'item-' + index2">
						<view class="cu-item">
							<view class="cu-avatar" style="background-image:url(/static/img/ic_house_black.png);"></view>
							<view class="content" @tap="toDeviceDetail(item.buildingsId,item2.unitsId)">
								<view class="text-black">{{item2.uName}}</view>
							</view>
							<view class="action" @tap="openLock(item2)">
								<button class="cu-tag round  shadow  text-white" :style="{'background-color':item2.status == '离线中···'?'#8799a3':'#0081ff'}">
									{{item2.status}}
								</button>
							</view>
						</view>

					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				listData: [{
					'buildingsId': '1',
					'name': '1幢',
					'units': [{
						'uName': '1单元',
						'unitsId': '1',
						'status': '在线',
						"type": "1"
					}]
				}],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isDisable: false,
				inputResult: '搜索幢数如:6幢',
				myToken: '',
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onShow() {
			this.getToken();
		},
		onReady() {
			uni.hideLoading()
		},
		onPullDownRefresh() {
			this.getToken();
		},
		methods: {
			getToken() { //请求token
				const requestTask = uni.request({
					url: 'http://localhost:3000/login',
					method: 'GET',
					success(res) {
						uni.setStorageSync('token', res.data.token);
						console.log(uni.getStorageSync('token'));
					},
					fail(res,code) {
						console.log('fail' + JSON.stringify(res));
					}
				});
				
				if (null != uni.getStorageSync('token')) {
					this.myToken = uni.getStorageSync('token');
					this.getData();
					console.log("有token");
				} else {
					this.getToken();
				}
			},
			getData() {
				var self = this;
				const requestTask = uni.request({
					url: 'http://localhost:3000/moniData',
					method: 'GET',
					data: {
						token: this.myToken
					},
					success(res) {
						self.listData = res.data.buildings;
						console.log(self.listData);
					}
				})
			},
			searchBuilding() { //跳转搜索结果界面
				var result = this.inputResult.substring(this.inputResult.indexOf(":") + 1, this.inputResult.length);
				uni.navigateTo({
					url: `../home/search_result?inputResult=${result}`
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.listData.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.listData[i].id);
						view.fields({
							size: true
						}, data => {
							/*data.height 有可能为  */
							if (null != data) {
								tabHeight = tabHeight + data.height;
							}
							this.listData[i].top = tabHeight;
							this.listData[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false;
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.listData.length; i++) {
					if (scrollTop > this.listData[i].top && scrollTop < this.listData[i].bottom) {
						this.verticalNavTop = (this.listData[i].id - 1) * 50;
						this.tabCur = this.listData[i].id;
						console.log(scrollTop);
						return false;
					}
				}
			},
			toDeviceDetail(val, val2) { //跳转设备详情
				uni.navigateTo({
					url: `../device/device_detail?buidldingId=${val}&unitId=${val2}`
				})
			},
			openLock(val) {
				var isSuccess = false;
				console.log(val.uName + ":" + val.type + ":" + val.status);
				if (val.type !== "1") {
					uni.showToast({
						image: '../../static/img/ic_offline.png',
						title: "设备已离线"
					})
					return;
				}
				if (isSuccess) {
					uni.showToast({
						image: '../../static/img/ic_success.png',
						title: '开锁成功'
					})
				} else {
					uni.showModal({
						title: '提示',
						cancelColor: '#A8A8A9',
						content: '开锁失败，请重试!',
						confirmColor: '#4C7DFD',
						success(res) {
							if (res.confirm) {
								console.log("点击确认");
							} else {
								console.log("点击取消");
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #D8D8D8;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
		margin-top: 15%;
		background-color: #FFFFFF;

	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
