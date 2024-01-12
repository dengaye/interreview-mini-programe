<template>
	<view style="height: 100%;">
		<ezpage title="前端面试题">
			<!-- <view slot="navigationSection">
				
			</view> -->
			<view slot="contentSection" style="padding-bottom: 40px;">
				<view v-if="detail" style="padding: 20px;">
					<view class="title">
						{{detail.title}}
					</view>
					<collection :questionId="detail._id" :collected="detail.collected" @updateDetail="initData"/>
					<view v-if="detail.desc" class="desc">
						<mp-html :content="detail.desc" :markdown="true" />
					</view>
					<view v-if="!showExplanation" @click="showExplanation=true" class="explain-box">
						查看解答
					</view>
					<view v-if="detail.explanation&&showExplanation" class="markdown">
						<mp-html :content="detail.explanation" :markdown="true" />
					</view>
				</view>
			</view>
			<view slot="tabSection" style="padding-bottom: 10px;">
				<view class="share-wrapper">
					<view class="share-content">
						<button class="clear_button share-btn" open-type="share">分享这道题</button>
					</view>
				</view>
			</view>
		</ezpage>
	</view>
</template>

<script>
	import ezpage from "../../components/ezpage.vue"
	import mpHtml from "../../components/mp-html/mp-html.vue"
	import collection from '../../components/collection.vue'

	import { getDetailStorageSync } from '../../utils/storage'
	
	export default {
		components:{
			ezpage,
			mpHtml,
			collection,
		},
		data() {
			return {
				detail: null,
				showExplanation: false
			}
		},
		onShareAppMessage() {
			return {
				title: `${this.detail.title} | 前端面试题`,
				path: `/pages/femap/detail?id=${this.detail._id}`,
			}
		},
		onLoad(options){
			const id  =  options.id;
			const detailInfo = getDetailStorageSync(id);
			if (detailInfo) {
				this.detail = detailInfo;
				return;
			}
			this.initData(id);
		},
		methods: {
			initData(_id) {
				const id = _id || this.detail._id;
				uniCloud.callFunction({
					name:"femap",
					data:{
						action: "detail",
						id,
					},
					success: (res) => {
						this.detail = res.result.data;
					}
				})
			}
		}
	}
</script>

<style scoped>
.title {
	font-size: 18px;
	margin-bottom: 10px;
	word-break: break-all;
	font-weight: bold;
}

.desc {
	font-size: 16px;
	color:#fff;
	margin-bottom: 10px;
}

.explain-box {
	font-size: 14px;
	margin-bottom: 10px;
	border-radius: 4px;
	height:100px;
	line-height: 100px;
	text-align: center;
}

.desc,
.explain-box,
.markdown {
	margin-top: 10px;
}

.markdown {
	font-size: 14px;
	margin-bottom: 10px;
	padding:10px;
	border-radius: 4px;
}

.markdown,
.explain-box {
	background-color: #353541;
}

.share-wrapper {
	width: 100%;
	padding:5px 10px;
	display: flex;
	justify-content: center;
}

.share-content {
	padding:0px 20px;
	height: 40px;
	border-radius: 25px;
	background-color: #333333;
	color:#fff;
	overflow: hidden;
	text-align: center;
	line-height: 40px;
}

.share-btn {
	width: 100%;
	height: 100%;
	color:#fff;
}
</style>
