<template>
	<view>
		<cu-custom bgColor="bg-gradual-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{topTitle}}</block>
		</cu-custom>
		<view class="VerticalBox">
			<scroll-view class="VerticalMain " style="padding-left: 4%; padding-right: 4%;" scroll-y scroll-with-animation :scroll-top="verticalNavTop" >
				<!-- 左边列表item的标题 -->
				<view class="cu-list menu-avatar  shadow-lg" style="background: white; border: white; border-radius: 20rpx;" :class="index==tabCur?'text-blue cur ':''" v-for="(item,index) in unitList" :key="index"
				 :data-id="index">
					<view class="cu-item">
						<view class="cu-avatar" style="background-image:url(/static/img/ic_house_black.png);"></view>
						<view class="content" @tap="toDeviceDetail(item.buildingsId,item.unitsId)">
							<view class="text-black">{{item.uName}}</view>
						</view>
						<view class="action" @tap="openLock(item)">
							<button class="cu-tag round  shadow  text-white" :style="{'background-color':item.status == '离线中···'?'#8799a3':'#0081ff'}">
								{{item.status}}
							</button>
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
				data: '',
				load: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				unitList: [{
					'uName': '1单元',
					'unitsId': '1',
					'status': '离线中···',
					'type': '2'
				}],
				topTitle:'6幢'
			}
		},
		created() {
			this.getUnitList();
		}
		,
		onReady() {
			uni.hideLoading();
		},
		onLoad(options) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			if (null != options) {
				var result = JSON.stringify(options);
				var result2 = JSON.parse(result);
				this.topTitle = this.getJsonValue(result2,'inputResult');
			}
		},
		methods:{
			getUnitList(){//根据幢数搜索对应单元数  幢数： this.topTitle
			var self = this;
				const request = uni.request({
					url: self.GLOBAL.baseUrl + 'detailUnitList',
					success(res) {
						self.unitList = res.data.unitList;
					}
				})
			}
			,
			 getJsonValue(obj,name){//obj  json数据  name要获取的值
			        var result = null;
			        var value  = null;
			        for(var key in obj){        
			            value = obj[key];
			            if(key == name){
			                console.log("getjsonvalue:"+value)
			            return value;
			        } else {
			            if( typeof value == "object" ){
			            result = getJsonValue(value,name);
			            }
			        }
			    }
			    return result;
			}
			,
			toDeviceDetail(val, val2) { //跳转设备详情
				console.log("设备buildingID：" + val + "设备单元的id" + val2)
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
		margin-top: 2%;
		background-color: #FFFFFF;
	
	}
	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
