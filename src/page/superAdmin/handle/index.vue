<template>
  <div class="table-container">
    <template v-if="categoryOptions">
      <el-select v-model="queryData.category" placeholder="请选择网站分类" @change="changeCategory">
        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </template>

    <el-table
      v-loading.fullscreen.lock="loading"
      :data="tableData"
      stripe
      style="width: 100%"
      highlight-current-row
      element-loading-text="别催了，我在加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="index" />
      <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip />
      <el-table-column prop="name" label="名字" width="200" show-overflow-tooltip />
      <el-table-column prop="website" label="网站链接" width="200" show-overflow-tooltip>
        <template slot-scope="slot">
          <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: slot.row.website }}">
            {{ slot.row.website }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="描述" show-overflow-tooltip />
      <el-table-column prop="created_at" label="创建时间" width="200" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" class="button" @click="openDialog(scope.row)">编辑</el-button>
          <el-button type="text" class="button" @click="deleteSuperMap(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="编辑网站" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="网站分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择网站分类" allow-create filterable default-first-option>
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="网站链接" prop="website">
          <el-input v-model="form.website" />
        </el-form-item>
        <el-form-item label="网站LOGO" prop="logo">
          <el-input v-model="form.logo" />
        </el-form-item>
        <el-form-item label="网站描述" prop="describe">
          <el-input v-model="form.describe" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putSuperMap(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import * as apiSuperAdmin from '@/api/superAdmin'
import {
  getOption
} from '@/utils/index'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      categoryOptions: [],
      currentPage: 1,
      loading: true,
      total: 0,
      queryData: {
        limit: 10,
        offset: 0,
        category: 'recommendationFront-end'
      }
    }
  },
  created() {
    this.getSuperMap()
    const routes = this.$router.options.routes
    this.categoryOptions = getOption('label', routes)
  },
  methods: {
    changeCategory() {
      this.getSuperMap()
    },
    getSuperMap() {
      apiSuperAdmin.getSuperMap(this.queryData).then(res => {
        this.loading = false
        this.tableData = res.data
        this.total = res.total
      })
    },
    openDialog(nav) {
      this.dialogFormVisible = true
      this.form = nav
    },
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
        this.getSuperMap()
      })
    },
    deleteSuperMap(nav) {
      this.$confirm('此操作将永久删除该网站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiSuperAdmin.deleteSuperMap(nav._id).then(res => {
          if (res.state === 'ok') {
            this.$notify.success({
              title: '成功',
              message: `删除网站《${nav.name}》成功！`
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: `删除网站《${nav.name}》失败！`
            })
          }
          this.getSuperMap()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.queryData.limit = val
      this.getSuperMap()
    },
    handleCurrentChange(val) {
      this.queryData.offset = (val - 1) * this.queryData.limit
      this.getSuperMap()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .table-container {
    margin: 100px 20px 20px 20px
  }

  .pagination-container {
    margin: 10px;
    float: right
  }

  .el-tooltip__popper {
    width: 400px
  }
</style>
