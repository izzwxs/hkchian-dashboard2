<template>
  <div class="recent">
    <div class="title">日志 <span class="more" @click="visiable = true">查看更多</span></div>
    <table class="table">
      <thead class="thead">
        <tr>
          <th>{{ head[0] }}</th>
          <th width="46%">{{ head[1] }}</th>
          <th width="24%">{{ head[2] }}</th>
          <th>{{ head[3] }}</th>
        </tr>
      </thead>
      <tbody ref="tbody" class="tbody">
        <tr v-for="(item, index) in data" :key="index">
          <td class="blue">{{ item.account }}</td>
          <td width="46%">{{ item.option }}</td>
          <td width="24%">
            <div class="link blue">
              {{ item.link }}
            </div>
          </td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
    <el-dialog :visible="visiable" @close="visiable = false" width="90%">
      <el-form :inline="true" :model="form" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="筛选节点">
              <el-select v-model="form.node" placeholder="请选择节点"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择时间">
              <el-select v-model="form.date" placeholder="请选择时间"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="搜索内容">
              <el-input style="width: 500px" v-model="form.content" placeholder="请输入区块链地址、hash、用户名查询"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="defalut">导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="account"
          label="区块链账户"
          :show-overflow-tooltip="true"
          width="180">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="日志描述">
        </el-table-column>
        <el-table-column
          prop="node"
          label="所属节点"
          width="180">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { Dialog, Table, Select, Input, Form, FormItem, DatePicker, Button, TableColumn, Row, Col } from 'element-ui'

const data = []

for (let i = 0; i < 20; ++i) {
  data.push({
    account: 'G3FF',
    option: '齐鲁儿童医院2021.08.13 20:29:17 登录成功',
    link: 'udai202108313fhsaldjkfhsajkdfhkjlhsdlfajhudai202108313fhsaldjkfhsajkdfhkjlhsdlfajh',
    duration: '2s'
  })
}

export default {
  name: 'Recent', // 近期操作
  data () {
    return {
      data,
      visiable: false,
      head: ['账户', '操作', '区块链凭证', '时间'],
      form: {
        node: '',
        status: '',
        date: '',
        content: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          account: 'FDHJKDSJFKHSDFJKHSDFKLSDHFLKSJDHF',
          desc: '数据hash上链',
          node: '四川协作中心'
        },
        {
          date: '2016-05-02',
          account: 'FDHJKDSJFKHSDFJKHSDFKLSDHFLKSJDHF',
          desc: '数据hash上链',
          node: '四川协作中心'
        },
        {
          date: '2016-05-02',
          account: 'FDHJKDSJFKHSDFJKHSDFKLSDHFLKSJDHF',
          desc: '数据hash上链',
          node: '四川协作中心'
        },
        {
          date: '2016-05-02',
          account: 'FDHJKDSJFKHSDFJKHSDFKLSDHFLKSJDHF',
          desc: '数据hash上链',
          node: '四川协作中心'
        },
        {
          date: '2016-05-02',
          account: 'FDHJKDSJFKHSDFJKHSDFKLSDHFLKSJDHF',
          desc: '数据hash上链',
          node: '四川协作中心'
        }
      ]
    }
  },
  components: {
    [Dialog.name]: Dialog,
    [Table.name]: Table,
    [Form.name]: Form,
    [Input.name]: Input,
    [Select.name]: Select,
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [FormItem.name]: FormItem,
    [TableColumn.name]: TableColumn,
    [Row.name]: Row,
    [Col.name]: Col
  },
  mounted () {
    const heightEl = this.$el.clientHeight
    const heightThead = document.querySelector('.thead').clientHeight
    const heightTitle = document.querySelector('.title').clientHeight
    this.$refs.tbody.style.height = (heightEl - heightThead - heightTitle - 10) + 'px'
  },
  methods: {
    // 查看更多
    handleMore () {
      this.visiable = true
    }
  }
}
</script>

<style lang="scss" scoped>
/* 滚动条宽度 */
::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
}

.recent {
  height: 100%;
  overflow: hidden;

  .title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
    text-align: left;

    .more {
      float: right;
      cursor: pointer;
    }
  }

  .table {
    table-layout: fixed;

    .thead {
      font-size: 14px;
    }

    .tbody {
      display: block;
      height: 300px;
      overflow-y: scroll;
      font-size: 12px;

      .link {
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1; //多行在这里修改数字即可
        overflow:hidden;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }

      .blue {
        color: #2e5dfc;
      }
    }

    tr {
      display: table;
      width: 100%;
      table-layout:fixed;
    }
  }

  .mask {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    max-width: 1200px;
    height: 80vh;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
    border-radius: 4px;
  }
}
</style>

<style>
.el-col {
  text-align: left;
}
</style>
