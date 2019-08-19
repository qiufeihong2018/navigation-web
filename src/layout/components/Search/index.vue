<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">搜索网站</h3>
      <HeaderSearch id="header-search" class="right-menu-item" />
    </div>
  </div>
</template>

<script>

  import HeaderSearch from '@/components/HeaderSearch'

  export default {
    components: {
      HeaderSearch
    },
    data() {
      return {}
    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, .85);
      font-size: 14px;
      line-height: 22px;
    }
  }

</style>
