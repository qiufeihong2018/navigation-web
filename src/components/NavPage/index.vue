<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="app-container"
    element-loading-text="别催了，我在加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="navArr.length>0">
      <waterfall
        :col="col"
        :width="itemWidth"
        :gutter-width="gutterWidth"
        :data="navArr"
        @loadmore="loadmore"
        @scroll="scroll"
      >
        <template>
          <div v-for="(nav,key) in navArr" :key="key" style="margin-top: 10px;">
            <el-card :body-style="{ padding: '10px' }" shadow="hover">
              <img :src="nav.logo" class="image" alt="加载错误">
              <el-form label-width="100px" label-position="left">
                <el-form-item label="网站名称">
                  {{ nav.name }}
                </el-form-item>
                <el-form-item label="iframe链接">
                  <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: nav.website }}">
                    {{ nav.website }}
                  </router-link>
                </el-form-item>
                <el-form-item label="新窗口链接">
                  <a class="font-website" :href="nav.website" target="_blank">{{ nav.website }}</a>
                </el-form-item>
                <el-form-item label="网站描述">
                  <div>{{ nav.describe || '需要您添加网站描述' }}</div>
                </el-form-item>
              </el-form>
              <div class="bottom clearfix">
                <time class="time">创建时间：{{ nav.created_at|timeTrans }}</time>
                <el-button type="text" class="button" @click="openDialog(nav)">编辑</el-button>
                <el-button type="text" class="button" @click="deleteMap(nav)">删除</el-button>
              </div>
            </el-card>
          </div>
        </template>
      </waterfall>
      <div class="pagination-container">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
    <div v-else>
      <img src="@/assets/noData.png" style="margin-left: -102px;">
    </div>
    <el-dialog title="编辑网站" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="网站分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择网站分类">
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
        <el-button type="primary" @click="putMap(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import {
  getOption
} from '@/utils/index'
import * as apiAdmin from '@/api/admin'
import * as apiSuperAdmin from '@/api/superAdmin'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    BackToTop
  },
  data() {
    return {
      navArr: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      categoryOptions: [],
      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1' // 按钮的背景颜色 The background color of the button
      },
      currentRoute: this.$router.currentRoute.path.split('/'),
      loading: true,
      total: 0,
      queryData: {
        limit: 10,
        offset: 0,
        category: 'recommendationFront-end'
      }
    }
  },
  computed: {
    col() {
      if (this.device === 'mobile') {
        return 1
      }
      if (this.sidebar.opened === true) {
        return 3
      }
      return 4
    },
    itemWidth() {
      if (this.device === 'mobile') {
        return (0.885 * (document.documentElement.clientWidth / 1))
      }
      if (this.sidebar.opened === true) {
        return (0.8 * (document.documentElement.clientWidth / 3))
      }
      return (0.9 * (document.documentElement.clientWidth / 4))
    },
    gutterWidth() {
      if (this.device === 'mobile') {
        return 0
      }
      return (9 * 0.5 * (document.documentElement.clientWidth / 375))
    },
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  created() {
    this.getSuperMap()
    const routes = this.$router.options.routes
    this.categoryOptions = getOption('label', routes)
  },
  methods: {
    getSuperMap() {
      this.queryData.category = this.currentRoute[this.currentRoute.length - 1]
      apiSuperAdmin.getSuperMap(this.queryData).then(res => {
        this.loading = false
        this.total = res.total
        this.navArr = res.data
        // Front end classification
        // this.navArr = res.data.filter(item => {
        //   return item.category.toLowerCase() === this.currentRoute.toLowerCase()
        // })
      })
    },

    deleteMap(nav) {
      this.$confirm('此操作将永久删除该网站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify.error({
          title: '失败',
          message: `您没有权限删除网站《${nav.name}》`
        })
      })
    },
    putMap(form) {
      this.dialogFormVisible = false
      form.way = 'put'
      apiAdmin.putMap(form._id, form).then(res => {
        if (res.state === 'ok') {
          this.$notify.success({
            title: '成功',
            message: `管理员会处理编辑请求！`
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
    handleCurrentChange(val) {
      this.queryData.offset = (val - 1) * 10
      this.getSuperMap()
    },
    scroll(scrollData) {
      // console.log(scrollData)
    },
    loadmore(index) {
      // console.log('没有了')
    },
    openDialog(nav) {
      this.dialogFormVisible = true
      this.form = nav
    }
  }
}

</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 80px;
    height: 80px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .font-website:hover {
    color: #409EFF;
  }

  .dialog-footer {
    white-space: nowrap
  }

  .el-message-box {
    width: 46vh;
  }

</style>
