<template>
  <div class="nav-container">
    提交的网站
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="category" label="分类" width="200" />
      <el-table-column prop="name" label="名字" width="200" />
      <el-table-column prop="website" label="网站链接" width="200" />
      <el-table-column prop="describe" label="描述" />
      <el-table-column prop="created_at" label="创建时间" width="200" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="postSuperMap(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as apiSuperAdmin from '@/api/superAdmin'
import * as apiAdmin from '@/api/admin'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getMap()
  },
  methods: {
    getMap() {
      apiAdmin.getMap().then(res => {
        this.tableData = res.data
      })
    },
    postSuperMap(nav) {
      apiSuperAdmin.postSuperMap(nav._id, nav).then(res => {
        if (res.state === 'ok') {
          this.$notify.success({
            title: '成功',
            message: `添加网站《${nav.name}》成功`
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: `添加网站《${nav.name}》失败`
          })
        }
        this.getMap()
      })
    }
  }
}

</script>
<style scoped>

  .nav-container,.el-table {
    margin: 20px
  }

</style>
