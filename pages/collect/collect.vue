<template>
	<ezpage title="我的收藏">
		<view slot="contentSection" class="list-container">
			<questionCard :dataSource="list"/>
		</view>
	</ezpage>
</template>

<script>
import questionCard from '../../components/question-card.vue'
import ezpage from "../../components/ezpage.vue"

import { store } from 'uni_modules/uni-id-pages/common/store.js'

import { UNICLOUD_FUNCTION_NAMES, INTERREVIEW_FUNCTION_ACTIONS } from '../../constants/common'

	export default {
		components: {
			questionCard,
			ezpage,
		},
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			console.log('collect show', store.hasLogin);
			if (!store.hasLogin) {
				uni.redirectTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
				})
			} else {
				this.getList();
			}
		},
		methods: {
			getList() {
				uniCloud.callFunction({
					name: UNICLOUD_FUNCTION_NAMES.interview_collect,
					data: {
						action: INTERREVIEW_FUNCTION_ACTIONS.list,
						body: {
							user_id: store.userInfo._id,
						}
					},
					success: (res) => {
						this.list = res.result.data;
					}
				})
			},
		}
	}
</script>

<style>
.list-container {
	background-color: #282c34;
	color: #fff;
}
</style>
