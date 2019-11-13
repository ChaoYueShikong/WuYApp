<template>
	<view id="home-list">
		<cu-custom bgColor="bg-gradual-white" displayable :isBack="false">
			<block slot="content">门禁设备</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-blue shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 64px - 50px)">
				<!-- 左边列表item的标题 -->
				<view class="cu-item" :class="index==tabCur?'text-blue cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					1幢-{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 64px - 50px)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<!-- 左边导航的item标题 -->
							<text class="cuIcon-title text-blue"></text> 1幢{{item.name}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item shadow" >
							<view class="cu-avatar" style="background-image:url(/static/img/ic_house_black.png);"></view>
							<view class="content" @tap="toDeviceDetail">
								<view class="text-black">1单元</view>
							</view>
							<view class="action">
								<button class="cu-tag round bg-blue shadow">立即开锁</button>
							</view>
						</view>
						<view class="cu-item shadow">
							<view class="cu-avatar" style="background-image:url(/static/img/ic_house_black.png);">
							</view>
							<view class="content">
								<view class="text-black ">
									<text class="text-cut">2单元</text>
								</view>
							</view>
							<view class="action">
								<button class="cu-tag round bg-blue shadow ">立即开锁</button>
							</view>
						</view>
						<view class="cu-item  shadow">
							<view class="cu-avatar" style="background-image:url(/static/img/ic_house_black.png);"></view>
							<view class="content">
								<view class="text-black ">
									<text class="text-cut">3单元</text>
								</view>
							</view>
							<view class="action">
								<button class="cu-tag round bg-grey shadow "> 离线中··· </button>
							</view>
						</view>
						<view class="cu-item grayscale shadow">
							<view class="cu-avatar" style="background-image:url(/static/img/ic_house_black.png);"></view>
							<view class="content">
								<view class="text-black">
									<text class="text-cut">4单元</text>
								</view>
							</view>
							<view class="action">
								<button class="cu-tag round bg-grey shadow ">离线中···</button>
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
		onReady() {
			uni.hideLoading()
		},
		methods: {
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
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
			toDeviceDetail(){
				uni.navigateTo({
					url: '../device/device_detail'
				})
			}
		}
	}
</script>

<style>
	#home-list {}

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
