<template>
  <iframe ref="inlineFrameExample" title="Inline Frame Example" width="100%" height="898px" :src="iframeSrc" />
</template>
<script>
export default {
  data() {
    return {
      iframeSrc: ''
    }
  },
  created() {
    this.iframeSrc = this.$route.query.website
  }
}
</script>
