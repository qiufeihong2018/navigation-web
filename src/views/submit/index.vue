<template>
  <div class="submit-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p>提交网站</p>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="例如：navigation-web" />
        </el-form-item>
        <el-form-item label="网站分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择网站分类">
            <el-option v-for="(item,key) in categoryOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="网站链接" prop="website">
          <el-input v-model="ruleForm.website" placeholder="例如：http://navigation.qiufeihong.top" />
        </el-form-item>
        <el-form-item label="网站LOGO" prop="logo">
          <el-input v-model="ruleForm.logo" placeholder="例如：http://navigation.qiufeihong.top/favicon.ico" />
        </el-form-item>
        <el-form-item label="网站描述" prop="describe">
          <el-input v-model="ruleForm.describe" type="textarea" placeholder="例如：一个网站导航和收藏平台（请用中文）" />
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import * as apiAdmin from '@/api/admin'
import {
  getOption
} from '@/utils/index'
export default {
  name: 'Submit',
  data() {
    return {
      ruleForm: {
        name: '',
        category: '',
        website: '',
        describe: '',
        logo: '',
        way: 'add'
      },
      rules: {
        name: [{
          required: true,
          message: '请输入网站名称',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          message: '请选择网站分类',
          trigger: 'change'
        }],
        website: [{
          required: true,
          message: '请输入网站链接',
          trigger: 'blur'
        }]
      },
      categoryOptions: []
    }
  },
  created() {
    const routes = this.$router.options.routes
    this.categoryOptions = getOption('label', routes)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.logo === '') {
            this.ruleForm.logo = 'http://navigation.qiufeihong.top/favicon.ico'
          }
          apiAdmin.postMap(this.ruleForm).then(res => {
            if (res.state === 'ok') {
              this.$notify.success({
                title: '成功',
                message: `提交网站《${this.ruleForm.name}》成功`
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: `提交网站《${this.ruleForm.name}》失败`
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .submit {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .btn-container{
    white-space:nowrap;
    margin-left: -100px;
  }
</style>
