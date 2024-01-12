<template>
  <view>
    <view v-for="item, index in dataSource" :key='index' @click="() => handleGoToDetail(item)" class="item-container">
      <view class="item-header">
        <text>
          难度：{{ getLevelStar(item.level) }}
        </text>
        <text class="item-star">
          {{ getCategoryCN(item.category) }}
        </text>
      </view>
      <view class="title">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<script>

export default {
  props: {
    dataSource: {
      type: Array,
      default: [],
    },
    toDetail: {
      type: Function,
    }
  },
  methods: {
    getLevelStar(level) {
      let str = '';
      const roundLevel = Math.floor(level);
      for (var i = 0; i < roundLevel; i++) {
        str += '★';
      }

      if (level - roundLevel > 0) str += '☆';
      return str;
    },
    getCategoryCN(category) {
      return { 'Choice': '选择题', 'QA': '问答题' }[category];
    },
    handleGoToDetail(item) {
      if (!item) return;
      if (this.toDetail) {
        this.toDetail(item);
      } else {
        uni.navigateTo({
          url: `/pages/femap/detail?id=${item._id}`
        });
      }
    }
  }
}

</script>


<style scoped>
.item-container {
  width: 100%;
  background: #353541;
  margin-bottom: 10px;
}

.item-header {
  background-color: #444654;
  height: 24px;
  line-height: 24px;
  padding: 0px 10px;
  font-size: 12px;
}

.item-star {
  float: right;
}

.title {
  padding: 20px 10px;
  word-wrap: break-word;
}
</style>
