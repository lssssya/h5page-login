<template>
  <div class="empty-data-main"  ref="emptygd">
    <img src="@/assets/images/icon_empty.png" alt="" />
    <p>{{data}}</p>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  data () {
    return {
    }
  },
  props: {
    data: {
      type: String,
      default: '暂无数据'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.empty-data-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  color: rgba(167, 222, 255, 0.6);
  &.hlh {
    min-height: 300px;
  }
  > img {
    width: 81px;
    height: 53px;
    margin-bottom: 10px;
  }
}
</style>
