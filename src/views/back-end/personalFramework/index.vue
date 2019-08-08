<template>
  <div class="app-container" />
</template>

<script>
import { getMap } from '@/api/admin'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMap().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
