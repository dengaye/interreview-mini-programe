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
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				uniCloud.callFunction({
					name: UNICLOUD_FUNCTION_NAMES.interview_collect,
					data: {
						action: INTERREVIEW_FUNCTION_ACTIONS.list,
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
