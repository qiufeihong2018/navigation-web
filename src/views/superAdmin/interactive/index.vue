<template>
  <div>
    <div class="nav-container">
      <H3>添加的网站</H3>
      <el-table :data="tableAddData" stripe style="width: 100%" highlight-current-row>
        <el-table-column type="index" />
        <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip />
        <el-table-column prop="name" label="名字" width="200" show-overflow-tooltip />
        <el-table-column prop="website" label="网站链接" width="200" show-overflow-tooltip />
        <el-table-column prop="describe" label="描述" show-overflow-tooltip />
        <el-table-column prop="created_at" label="创建时间" width="200" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="postSuperMap(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="nav-container">
      <H3>添加的网站</H3>
      <el-table :data="tablePutData" stripe style="width: 100%" highlight-current-row>
        <el-table-column type="index" />
        <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip />
        <el-table-column prop="name" label="名字" width="200" show-overflow-tooltip />
        <el-table-column prop="website" label="网站链接" width="200" show-overflow-tooltip />
        <el-table-column prop="describe" label="描述" show-overflow-tooltip />
        <el-table-column prop="created_at" label="创建时间" width="200" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="putSuperMap(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

</template>

<script>
import * as apiSuperAdmin from '@/api/superAdmin'
import * as apiAdmin from '@/api/admin'

export default {
  data() {
    return {
      tableAddData: [],
      tablePutData: [],
      currentPage: 4
    }
  },
  created() {
    this.getMap()
  },
  methods: {
    putSuperMap(form) {
      this.dialogFormVisible = false
      apiSuperAdmin.putSuperMap(form._id, form).then(res => {
        if (res.state === 'ok') {
          this.$notify.success({
            title: '成功',
            message: `编辑网站《${form.name}》成功！`
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: `编辑网站《${form.name}》失败！`
          })
        }
        this.getMap()
      })
    },
    getMap() {
      apiAdmin.getMap().then(res => {
        this.tableAddData = res.data.filter(item => {
          return !item.way
        })
        this.tablePutData = res.data.filter(item => {
          return item.way
        })
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped>
  .nav-container {
    margin: 20px 20px 100px 20px
  }

  .pagination-container {
    margin: 20px;
    float: right
  }
</style>
