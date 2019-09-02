<template>
  <div>
    <div class="nav-container">
      <H3>添加的网站</H3>
      <el-table
        v-loading.fullscreen.lock="loading"
        :data="tableAddData"
        stripe
        style="width: 100%"
        highlight-current-row
        element-loading-text="别催了，我在加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="index" />
        <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.category" size="small" placeholder="请输入内容" />
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
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
            <el-button type="text" size="small" @click="postSuperMap(scope.row)">添加</el-button>
            <el-button type="text" size="small" @click="deleteMap(scope.row,'添加')">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="currentPageAdd"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalAdd"
          @size-change="handleSizeAdd"
          @current-change="handleCurrentAdd"
        />
      </div>
    </div>
    <div class="nav-container">
      <H3>修改的网站</H3>
      <el-table :data="tablePutData" stripe style="width: 100%" highlight-current-row>
        <el-table-column type="index" />
        <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.category" size="small" placeholder="请输入内容" />
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
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
            <el-button type="text" size="small" @click="putSuperMap(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteMap(scope.row,'修改')">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="currentPagePut"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPut"
          @size-change="handleSizePut"
          @current-change="handleCurrentPut"
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
      currentPageAdd: 1,
      currentPagePut: 1,
      loading: true,
      totalAdd: 0,
      totalPut: 0,
      addQueryData: {
        limit: 5,
        offset: 0,
        tag: 'add'
      },
      putQueryData: {
        limit: 5,
        offset: 0,
        tag: 'put'
      },
      reg: /[\u4e00-\u9fa5]/g
    }
  },
  created() {
    this.getMap()
  },
  methods: {
    putSuperMap(form) {
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
    getMap() {
      apiAdmin.getMap(this.addQueryData).then(res => {
        this.loading = false
        this.totalAdd = res.total
        this.tableAddData = res.data
      })
      apiAdmin.getMap(this.putQueryData).then(res => {
        this.loading = false
        this.totalPut = res.total
        this.tablePutData = res.data
      })
    },
    deleteMap(nav, tag) {
      apiAdmin.deleteMap(nav._id).then(res => {
        if (res.state === 'ok') {
          this.$notify.success({
            title: '成功',
            message: `${tag}网站《${nav.name}》取消！`
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: `取消网站《${nav.name}》失败！`
          })
        }
        this.getMap()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作'
        })
      })
    },
    handleSizeAdd(val) {
      this.addQueryData.limit = val
      this.getMap()
    },
    handleCurrentAdd(val) {
      this.addQueryData.offset = (val - 1) * this.addQueryData.limit
      this.getMap()
    },
    handleSizePut(val) {
      this.putQueryData.limit = val
      this.getMap()
    },
    handleCurrentPut(val) {
      this.putQueryData.offset = (val - 1) * this.putQueryData.limit
      this.getMap()
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

  .el-table .el-input {
    display: none
  }

  .el-table .current-row .el-input {
    display: block
  }

  .el-table .current-row .el-input+span {
    display: none
  }
</style>
