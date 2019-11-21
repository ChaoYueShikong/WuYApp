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
			<view class="cu-form-group " @click="choseAdd2()">
				<view class="title">住户小区</view>
				<input placeholder="请选择小区" style="margin-right: 2%; margin-left: 30%; color: #333333; text-align: right;" name="input" disabled
				 v-model="currentCommunity">
				<view style="width: 11px; height: 11px; background-image:url(/static/img/ic_more.png); background-size: contain; margin-left: -1%;"></view>
			</view>

			<!-- #endif -->
			<view class="cu-form-group" @click="choseAdd()">
				<view class="title">住房信息</view>
				<input placeholder="请选住户地址" style="margin-right: 2%; margin-left: 36%; color: #333333;" name="input" disabled
				 v-model="area">
				<view style="width: 11px; height: 11px; background-image:url(/static/img/ic_more.png); background-size: contain; margin-left: -1%;"></view>
			</view>
			<view class="cu-form-group">
				<view class="action">
					身份证照片上传
				</view>
			</view>
			<!-- 小区选择列表 -->
			<section class="showChose2" v-show="showChose2">
				<section class="address">
					<section class="title" style="display: inline-flex; width: 100%;">
						<view style=" width: 28px; height: 28px;  margin-top: 2%; background-image:url(/static/img/ic_close.png); background-size:contain; "
						 @click="closeAdd2()">
						</view>
						<view :class="Community?'':'active'" style="margin-left: 66%; color: #0081FF;" @tap="btnSure()">确定</view>
					</section>

					<ul ref="selectUl">
						<li class="addList"  style="text-align: center; margin-left: 0rpx;" v-for="(v,index) in picker" :key="index" @click="getCommunityId(v.id, v.name, index)" v-show="showCommunity"
						 :class="v.selectedC ? 'active' : ''">
						 {{v.name}}
						</li>
					</ul>
				</section>
			</section>
			<!-- 幢单元选择列表 -->
			<section class="showChose" v-show="showChose">
				<section class="address">
					<section class="title" style="display: inline-flex; width: 100%;">
						<view>请选择居住地址</view>
						<view style=" width: 28px; height: 28px; margin-left: 45%; margin-top: 2%; background-image:url(/static/img/ic_close.png); background-size:contain; "
						 @click="closeAdd()">
						</view>
					</section>
					<section class="title title2">
						<div class="area" @click="provinceSelected()">{{Province?Province:''}}</div>
						<div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
						<div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
					</section>
					<ul ref="selectUl">
						<li class="addList" v-for="(v,index) in info" :key="index" @click="getProvinceId(v.id, v.name, index)" v-show="showProvince"
						 :class="v.selected ? 'active' : ''">{{v.name}}</li>
						<li class="addList" v-for="(v,index) in showCityList" :key="index" @click="getCityId(v.id, v.name, index)" v-show="showCity"
						 :class="v.selected ? 'active' : ''">{{v.name}}</li>
						<li class="addList" v-for="(v,index) in showDistrictList" :key="index" @click="getDistrictId(v.id, v.name, index)"
						 v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
					</ul>
				</section>
			</section>

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
				picker: [{
					"id": "10001",
					"name": "北软泰嘉园1"
				}],
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
				area: '',
				currentCommunity: '',
				showChose: false,
				showChose2: false,
				showProvince: true,
				showCommunity: true,
				showCity: false,
				showDistrict: false,
				showCityList: false,
				showDistrictList: false,
				province: 1,
				community: 1,
				city: 3,
				district: 57,
				GetProvinceId: 2,
				District: false,
				Province: false,
				Community: false,
				City: false,
				// v-for循环判断是否为当前
				selected: false,
				selectedC: false,
				info: [{
					id: 1,
					name: '1幢',
					city: [{
						id: 1,
						name: '1单元',
						district: [{
								id: 1,
								name: '101室'
							},
							{
								id: 2,
								name: '102室'
							},
							{
								id: 3,
								name: '103室'
							},
							{
								id: 4,
								name: '104室'
							}
						]
					}]
				}]
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});

		},
		created() {
			this.getAddress();
			this.getCommunityList();
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			getAddress() {
				var self = this;
				const requestTask = uni.request({ //请求地址接口
					url: 'http://localhost:3000/address',
					success(res) {

						//转换成字符串
						var cityData = JSON.stringify(res.data);
						// 第二步用正则把这些相对应的关键字段转化成element ui  三级联动需要 的字段
						var options = JSON.parse(cityData.replace(/roomId/g, 'id').replace(/rName/g, 'name').replace(/roomList/g,
								'district')
							.replace(/buildId/g, 'id').replace(/buildName/g, 'name')
							.replace(/unitList/g, 'city').replace(/unitId/g, 'id').replace(/uName/g, 'name'));
						// console.log(options.data);
						self.info = options.data;
					}
				})
			},
			getCommunityList() {
				var self = this;
				const requestTask2 = uni.request({
					url: 'http://localhost:3000/communityList',
					success(res) {
						var communityDatas = JSON.stringify(res.data);
						var options = JSON.parse(communityDatas.replace(/commuId/g, 'id').replace(/commuName/g, 'name'));
						self.picker = options.communityList;
						console.log(options);
						console.log(self.picker);
					}
				})
			},
			choseAdd: function() {
				this.showChose = true;
			},
			closeAdd: function() {
				this.showChose = false;
			},
			choseAdd2: function() {
				this.showChose2 = true;
			},
			closeAdd2: function() {
				this.showChose2 = false;
			},
			_filter(add, name, code) {
				let result = [];
				for (let i = 0; i < add.length; i++) {
					if (code == add[i].id) {
						result = add[i][name];
					}
				}
				return result;
			},
			getProvinceId: function(code, input, index) {
				this.province = code;
				this.Province = input;
				this.showProvince = false;
				this.showCity = true;
				this.showDistrict = false;
				this.showCityList = this._filter(this.info, 'city', this.province);
				// 点击选择当前
				this.info.map(a => a.selected = false);
				this.info[index].selected = true;
				// this.$refs.selectUl.scrollTop = 0;
			},
			provinceSelected: function() {
				// 清除市级和区级列表
				this.showCityList = false;
				this.showDistrictList = false;
				// 清除市级和区级选项
				this.City = false;
				this.District = false;
				// 选项页面的切换
				this.showProvince = true;
				this.showCity = false;
				this.showDistrict = false;
			},
			getCommunityId: function(code, input, index) {
				this.community = code;
				this.Community = input;
				this.showCommunity = true;
				//点击选择当前的
				this.picker.map(a => a.selectedC = false);
				this.picker[index].selectedC = true;
			},
			btnSure(){
				this.currentCommunity = this.Community + ":" + this.community;
				console.log("当前选中：" + this.currentCommunity);
				this.showChose2 = false;
				this.sendValue(this.currentCommunity);
			},
			communitySelected: function() {
				this.showCommunity = true;
				this.Community = true;
			},
			getCityId: function(code, input, index) {
				this.city = code;
				this.City = input;
				this.showProvince = false;
				this.showCity = false;
				this.showDistrict = true;
				this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
				// 选择当前添加active
				this.showCityList.map(a => a.selected = false);
				this.showCityList[index].selected = true;
				// this.$refs.selectUl.scrollTop = 0;
			},
			citySelected: function() {
				this.showProvince = false;
				this.showCity = true;
				this.showDistrict = false;
			},
			getDistrictId: function(code, input, index) {
				this.district = code;
				this.District = input;
				// 选择当前添加active
				this.showDistrictList.map(a => a.selected = false);
				this.showDistrictList[index].selected = true;
				this.area = this.Province + this.City + this.District /* + " : " + this.province + " : " + this.city + " : " + this.district */ ;
				// 选取市区选项之后关闭弹层
				this.showChose = false;
				this.sendValue(this.area);
				// this.$refs.selectUl.scrollTop = 0;
			},
			districtSelected: function() {
				this.showProvince = false;
				this.showCity = false;
				this.showDistrict = true;
			},
			//给父组件传值
			sendValue(val) {
				this.$emit('getValue', val);
			},
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
			}
		}

	}
</script>

<style>
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
		padding: 1.5%;
	}

	/** 关于地址选择样式 */
	.myAddress {
		width: 100%;
		background-color: white;
		border-top: 4px solid rgba(245, 245, 245, 1);
		color: #333;
		margin-top: 30%;
	}

	.myAddress .cont {
		border-bottom: 1px solid rgba(245, 245, 245, 0.8);
	}

	.myAddress .cont span {
		display: inline-block;
		font-size: 0.28rem;
		color: #333;
		line-height: 0.88rem;
		margin-left: 0.32rem;
	}

	.myAddress .cont section {
		float: left;
	}

	.myAddress .cont p {
		display: inline-block;
		font-size: 0.28rem;
		color: #333333;
		line-height: 0.88rem;
		margin-left: 1rem;
	}

	.myAddress .cont .pic2 {
		float: right;
		width: 0.14rem;
		height: 0.24rem;
		margin: 0.32rem 0.32rem 0.32rem 0;
	}

	.myAddress .cont p.text {
		margin-left: 0.72rem;
	}

	.showChose .showChose2 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 120;
		background: rgba(0, 0, 0, 0.5);
	}

	.address {
		position: absolute;
		bottom: -20px;
		left: 0;
		z-index: 121;
		background: #fff;
		width: 100%;
		font-size: 20px;
		height: 44%;
	}

	.title {
		display: inline-block;
		margin-left: 5%;
		font-size: 40upx;
		line-height: 45px;
		font-weight: normal;
		color: #999;
	}

	.title2 {
		display: inline-block;
		margin-left: 2%;
		font-size: 30upx;
		line-height: 45px;
		font-weight: normal;
		color: #999;
		margin-top: -4%;
	}

	.title span {
		margin: 0.42rem 0 0 2.2rem;
		font-size: 20rpx;
		line-height: 0.34rem;
		color: #D8D8D8;
	}

	.area {
		display: inline-block;
		font-size: 40rpx;
		line-height: 45rpx;
		margin-left: 0.42rem;
		color: #333;
	}

	.addList {
		width: 100%;
		padding: 0.32rem;
		font-size: 40rpx;
		line-height: 44rpx;
		color: #333;
	}

	/* 修改的格式 */
	.address ul {
		width: 100%;
		height: 100%;
		height: 8rem;
		overflow: auto;
	}

	.address ul li {
		margin-left: 5%;
	}

 
	.address .title .active {
		color: #4C7DFD;
		border-bottom: 0.02rem solid #4C7DFD;
	}

	.address ul .active {
		color: #4C7DFD;
	}
</style>
