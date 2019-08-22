<template>
  <div>
    <el-drawer title="搜索网站" :visible.sync="openDrawer" :before-close="closeDrawer" direction="btt" size="50%">
      <div class="search-container">
        <el-input slot="prepend" v-model="query" placeholder="请输入，例如：ppt" @keyup.enter.native="getSuperSearch">
          <el-button slot="append" icon="el-icon-search" @click.stop="getSuperSearch" />
        </el-input>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
        <el-table-column type="index" />
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
        <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: scope.row.website }}">
              iframe链接
            </router-link>
            <a class="font-website" :href="scope.row.website" target="_blank">新窗口链接</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination small background layout="prev, pager, next" :total="total" page-size="2" @current-change="handleCurrentChange" />
      </div>
    </el-drawer>
  </div>
</template>
<script>
import * as apiSuperAdmin from '@/api/superAdmin'

import {
  mapGetters
} from 'vuex'
import store from '@/store'
export default {
  name: 'BottomDrawer',
  data() {
    return {
      query: '',
      tableData: [],
      queryData: {
        'query': 'ppt',
        'limit': '2',
        'offset': '0'
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'openDrawer'
    ])
  },
  methods: {
    closeDrawer() {
      store.dispatch('app/toggle_openDrawer', false)
    },
    getSuperSearch() {
      apiSuperAdmin.getSuperSearch(this.queryData).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    handleCurrentChange(val) {
      this.queryData.offset = (val - 1) * 2
      this.getSuperSearch()
    }
  }
}
</script>

<style lang="scss">
  .el-drawer__body {
    padding: 20px;

    .search-container {
      margin-bottom: 20px
    }
  }

  .el-drawer.btt {
    height: 66% !important;
  }

  .pagination-container {
    margin: 10px;
    float: right
  }
</style>
