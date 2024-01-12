<template>
  <view>
    <view @click="handleCancel" v-if="collected">取消收藏</view>
    <view @click="handleAdd" v-else>收藏</view>
  </view>
</template>

<script>
import { UNICLOUD_FUNCTION_NAMES, INTERREVIEW_FUNCTION_ACTIONS } from '../constants/common'

export default {
  props: {
    questionId: {
      type: String,
    },
    collected: {
      type: Boolean,
    }
  }, 
  methods: {
    handleCancel() {
      if (!this.questionId) return;

      uniCloud.callFunction({
        name: UNICLOUD_FUNCTION_NAMES.interview_collect,
        data: {
          action: INTERREVIEW_FUNCTION_ACTIONS.remove,
          body: {
            question_id: this.questionId,
          },
        },
        success: (res) => {
          this.$emit('updateDetail');
        }
      })
    },
    handleAdd() {
      if (!this.questionId) return;
      uniCloud.callFunction({
        name: UNICLOUD_FUNCTION_NAMES.interview_collect,
        data: {
          action: INTERREVIEW_FUNCTION_ACTIONS.add,
          body: {
            question_id: this.questionId,
          }
        },
        success: (res) => {
          this.$emit('updateDetail');
        }
      })
    }
  }
}
</script>

<style>
</style>