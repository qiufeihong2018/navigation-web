<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col v-for="(i,key) in navArr" :key="key" :span="6"><div class="grid-content bg-purple">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="i.logo" class="image">
          <div style="padding: 14px;">
            <div>网站名称:{{ i.name }}</div>
            <div>网站链接:{{ i.website }}</div>
            <div>网站描述:{{ i.describe }}</div>
            <div class="bottom clearfix">
              <time class="time">创建时间：{{ i.created_at }}</time>
              <el-button type="text" class="button">编辑</el-button>
              <el-button type="text" class="button" @click="deleteMap(i)">删除</el-button>
            </div>
          </div>
        </el-card></div></el-col>

    </el-row>

  </div>
</template>

<script>
import * as apiAdmin from '@/api/admin'

export default {
  data() {
    return {
      navArr: []
    }
  },
  created() {
    this.getMap()
  },
  methods: {
    getMap() {
      apiAdmin.getMap().then(res => {
        this.navArr = res.data
      })
    },
    deleteMap(nav) {
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
    width: 20%;
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
</style>
