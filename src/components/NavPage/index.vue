<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col v-for="(nav,key) in navArr" :key="key" :span="6">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '10px' }" shadow="hover">
            <img :src="nav.logo" class="image">
            <el-form label-width="80px">
              <el-form-item label="网站名称">
                {{ nav.name }}
              </el-form-item>
              <el-form-item label="网站链接">
                <a class="font-website" target="_blank" :href="nav.website">{{ nav.website }}</a>
              </el-form-item>
              <el-form-item label="网站描述">
                <div>{{ nav.describe }}</div>
              </el-form-item>
            </el-form>
            <div class="bottom clearfix">
              <time class="time">创建时间：{{ nav.created_at|timeTrans}}</time>
              <el-button type="text" class="button" @click="openDialog(nav)">编辑</el-button>
              <el-button type="text" class="button" @click="deleteMap(nav)">删除</el-button>
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
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

  </div>
</template>

<script>
  import * as apiAdmin from '@/api/admin'
  import router from '@/router'

  export default {
    data() {
      return {
        navArr: [],
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px',
        categoryOptions: []
      }
    },
    created() {
      this.getMap()

      const routes = router.options.routes
      for (let i = 0; i < routes.length; i++) {
        const children = routes[i].children
        for (const j in children) {
          const obj = {
            value: '',
            label: ''
          }
          obj.value = children[j].path
          obj.label = children[j].meta.title

          this.categoryOptions.push(obj)
        }
      }
      this.categoryOptions.shift()
    },
    methods: {
      openDialog(nav) {
        this.dialogFormVisible = true
        this.form = nav
      },
      getMap() {
        apiAdmin.getMap().then(res => {
          this.navArr = res.data.filter(item => {
            return item.category.toLowerCase() === router.currentRoute.name.toLowerCase()
          })
        })
      },
      deleteMap(nav) {
        this.$confirm('此操作将永久删除该网站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiAdmin.deleteMap(nav._id).then(res => {
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
            this.getMap()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      putMap(form) {
        this.dialogFormVisible = false
        apiAdmin.putMap(form._id, form).then(res => {
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

  
</style>
