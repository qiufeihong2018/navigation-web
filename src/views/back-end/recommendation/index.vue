<template>
  <div class="app-container">
    <el-row v-for="o in 2" :key="o" style="margin-top:20px">
      <el-col v-for="(p,index) in 2" :key="p" :span="10" :offset="index===0?0:2">
        <el-card :body-style="{ padding: '10px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getMap
} from '@/api/admin'

export default {
  data() {
    return {
      currentDate: new Date()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getMap().then(res => {
        console.log(res)
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
    width: 100%;
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
