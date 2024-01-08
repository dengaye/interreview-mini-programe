<template>
	<ezpage>
		<view slot="navigationSection">
			<eznavigationbar :backgroundColor="bgColor" :hasBottomLine="false" titleColor="#f7d05f">
				<text slot='title'>前端面试题</text>
			</eznavigationbar>
		</view>
		<view slot="contentSection" class="content">
			<view class="tips">好好学习，天天向上</view>
			<view class="question-wrapper">
				<ezflycard @onThrowDone='onCardThrowDone' :cardWidth="cardWidth" :cardHeight="140" :throwTriggerDistance="100"
					dragDirection="horizontal" :hasShadow="true" :hasBorder="false">
					<view :slot="cardSlots[index]" style="width:100%;height:100%;" v-for="(item, index) in randomlist"
						:key="item._id">
						<view @click="onRandomlistItemTap(item)" style="height: 100%;width: 100%;">
							<text class='card-label'>难度：{{ getLevelStar(item.level) }}</text>
							<view class="card-item">
								<view class="card-title">{{ item.title }}</view>
							</view>
						</view>
					</view>
				</ezflycard>
			</view>
			<view class="change-btn-wrapper">
				<button @click="btnGetRandom" type="primary" size="mini" class="change-btn">
					<text class="iconfont icon-touzi"></text>
					<text class="change-btn-text">换三道题</text>
				</button>
			</view>
			<view class="tag-wrapper">
				<view v-for="(item, index) in taglist" @click='btnGoList(item)' :key='index' class="tag-item">
					<view class="tag-item-content">
						<view :class="item.icon" style="font-size: 40px;color: #f7d05f;"></view>
						<view class="tag-item-name">{{ item.tagName }}</view>
					</view>
				</view>
			</view>
		</view>
		<view slot="tabSection" style="padding-bottom: 10px;">
			<view class="share-btn-wrapper">
				<view class="share-btn-content">
					<button class="clear_button share-btn-text" open-type="share">分享给好友</button>
				</view>
			</view>
		</view>
	</ezpage>
</template>

<script>
import ezpage from "../../components/ezpage.vue"

import ezflycard from "../../components/ezflycard.vue"
import eznavigationbar from "../../components/eznaviagtionbar.vue"

import { 
	setDetailStorageSync, 
	setTagListStorageSync,
	getTagListStorageSync,
	setRandomListStorageSync,
	getRandomListStorageSync,
	removeOutdateAllListStorage,
	removeCurrentRandomListStorageSync,
} from '../../utils/storage'

export default {
	components: {
		ezpage,
		ezflycard,
		eznavigationbar
	},
	data() {
		return {
			taglist: [],
			randomlist: [],
			cardWidth: 100,
			bgColor: "#202123",
			cardSlots: ['firstCard', 'secondCard', 'thirdCard']
		}
	},
	onLoad() {
		removeOutdateAllListStorage();
		this.cardWidth = uni.getSystemInfoSync().screenWidth - 100;
		this.requestTagList();
		this.requestRandomlist();
	},
	onShareAppMessage() {
		return {
			title: '前端面试题',
			path: '/pages/femap/index'
		}
	},
	methods: {
		getCategoryCN(category) {
			return { 'Choice': '选择题', 'QA': '问答题' }[category];
		},
		getLevelStar(level) {

			var str = '';
			var roundLevel = Math.floor(level);
			for (var i = 0; i < roundLevel; i++) {
				str += '★';
			}

			if (level - roundLevel > 0) str += '☆';
			return str;
		},
		onRandomlistItemTap(item) {
			setDetailStorageSync(item);
			uni.navigateTo({
				url: '/pages/femap/detail?id=' + item._id
			});
		},
		onCardThrowDone(e) {
			var prev = this.randomlist.slice(0, 1);
			this.randomlist.shift();
			this.randomlist.push(prev[0]);
		},
		btnGoDetail(e) {
			var index = e.currentTarget.dataset.index;
			var item = this.list[index];

			uni.navigateTo({
				url: '/pages/femap/detail?id=' + item._id
			});
		},
		btnGetRandom() {
			removeCurrentRandomListStorageSync();
			this.requestRandomlist();
		},
		btnGoList(item) {
			uni.navigateTo({
				url: '/pages/femap/list?tagid=' + item.id
			});
		},
		requestRandomlist() {
			const storageData = getRandomListStorageSync();
			if (storageData) {
				this.randomlist = storageData;
				return;
			}
			uniCloud.callFunction({
				name: "femap",
				data: {
					action: "random",
				},
				success: (res) => {
					const data = res.result.data;
					setRandomListStorageSync(data)
					this.randomlist = data;
				}
			})
		},
		requestTagList() {
			const storageData = getTagListStorageSync();
			if (storageData) {
				this.taglist = storageData;
				return;
			}
			uniCloud.callFunction({
				name: "femap",
				data: {
					action: "tags"
				},
				success: (res) => {
					const list = res.result.data;
					setTagListStorageSync(list)
					this.taglist = list;
				}
			})
		}
	}
}
</script>

<style scoped>
.content {
	background-color: var(--bg);
	padding-bottom: 60px;
}

.tips {
	width: 100%;
	text-align: center;
	font-size: 16px;
	padding: 20px 0px 0px 0px;
	color: #f7d05f;
}

.question-wrapper {
	width: 100%;
	height: 210px;
	position: relative;
	overflow-y: visible;
	overflow-x: hidden;
}

.card-item {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
}

.card-title {
	width: 100%;
	padding: 0px 20px;
	font-size: 20px;
	word-wrap: break-word;
	transform: translate(-50%, -50%);
	position: absolute;
	top: 50%;
	left: 50%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	word-break: break-all;
}

.card-label {
	box-shadow: 0 0 4px 0 #000;
	padding: 1px 5px 3px 4px;
	color: #fff;
	font-size: 9px;
	border-bottom-right-radius: 10px;
	background: #444654;
	position: absolute;
	z-index: 2;
	left: 0px;
	top: 0px;
}

.change-btn-wrapper {
	width: 100%;
	text-align: center;
	margin-bottom: 20px;
	margin-top: 20px;
}

.change-btn {
	background-color: #f7d05f;
	color: #000;
	padding: 0px 10px;
	border-radius: 6px;
	border-bottom: 2px solid #333;
}

.change-btn-text {
	font-size: 14px;
	margin-left: 6px;
}

.tag-wrapper {
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 0px 10px;
}

.tag-item {
	width: 30vw;
	height: 24vw;
	text-align: center;
}

.tag-item-content {
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.tag-item-name {
	font-size: 16px;
	white-space: nowrap;
	margin-top: 4px;
	color: #f7d05f;
}

.share-btn-wrapper {
	width: 100%;
	padding: 5px 10px;
	display: flex;
	justify-content: center;
}

.share-btn-content {
	padding: 0px 20px;
	height: 40px;
	border-radius: 25px;
	background-color: #333333;
	color: #fff;
	overflow: hidden;
	text-align: center;
	line-height: 40px;
}

.share-btn-text {
	width: 100%;
	height: 100%;
	color: #fff;
}
</style>
