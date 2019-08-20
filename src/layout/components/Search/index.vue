<template>
  <div class="drawer-container">
    <div class="search-container">
      <h3 class="drawer-title">搜索网站</h3>
      <el-input slot="prepend" v-model="query" placeholder="请输入" @keyup.enter.native="click">
        <el-button slot="append" icon="el-icon-search" @click.stop="click" />
      </el-input>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
      <el-table-column type="index" />
      <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip />
      <el-table-column prop="name" label="名字" width="200" show-overflow-tooltip />
      <el-table-column prop="website" label="网站链接" width="200" show-overflow-tooltip />
      <el-table-column prop="describe" label="描述" show-overflow-tooltip />
      <el-table-column prop="created_at" label="创建时间" width="200" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" class="button" @click="openDialog(scope.row)">编辑</el-button>
          <el-button type="text" class="button" @click="deleteSuperMap(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as apiSuperAdmin from '@/api/superAdmin'
export default {
  data() {
    return {
      query: '',
      tableData: []
    }
  },
  methods: {
    click() {
      apiSuperAdmin.getSuperSearch(this.query).then(res => {
        this.tableData = res.data
      })
    }
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

    .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }

  }
</style>
