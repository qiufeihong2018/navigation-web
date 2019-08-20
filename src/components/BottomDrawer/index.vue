<template>
  <div>
    <el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button>
    <el-drawer title="我嵌套了表格!" :visible.sync="table" direction="btt" size="50%">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>
<script>
  export default {
    name: 'BottomDrawer',
    data() {
      return {
        table: false,
        dialog: false,
        loading: false,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px'
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              done();
            }, 2000);
          })
          .catch(_ => {});
      }
    }
  }
</script>