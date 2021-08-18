<template>
  <div class="recent">
    <div class="title">
      日志 <span class="more" @click="visiable = true">查看更多 ≫</span>
    </div>
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
          <td :title="item.address">
            <div class="link blue">{{ item.address }}</div>
          </td>
          <td width="44%" class="break-word">{{ item.record }}</td>
          <td width="22%" :title="item.transaction">
            <div class="link blue">
              {{ item.transaction }}
            </div>
          </td>
          <td>{{ formatTime(item.created, 'HH:mm:ss') }}</td>
        </tr>
      </tbody>
    </table>
    <el-dialog :visible="visiable" @close="visiable = false" width="90%">
      <el-form :inline="true" :model="form" size="mini">
        <el-row>
          <el-col :span="5">
            <el-form-item label="节点">
              <el-select v-model="form.node" placeholder="请选择节点">
                <el-option
                  v-for="item in nodes"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="状态">
              <el-input
                v-model="form.state"
                placeholder="请输入状态"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="10">
            <el-form-item label="选择时间">
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="搜索内容">
              <el-input
                style="width: 550px"
                v-model="form.content"
                placeholder="请输入查询内容"
              ></el-input>
              <el-button type="primary" style="margin-left: 10px" @click="onSubmit"
                >查询</el-button
              >
              <!-- <el-button type="defalut">导出</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="address"
          label="区块链账户"
          :show-overflow-tooltip="true"
          width="160"
        >
        </el-table-column>
        <el-table-column prop="record" label="日志描述"> </el-table-column>
        <el-table-column prop="transaction" :show-overflow-tooltip="true" label="hash">
        </el-table-column>
        <!-- <el-table-column prop="name" label="用户名" width="120">
        </el-table-column> -->
        <el-table-column prop="from_node" label="所属节点" width="190">
        </el-table-column>
        <el-table-column prop="to_node" label="目标节点" width="190">
        </el-table-column>
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatTime(scope.row.created, 'YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="page_size" @current-change="handlePageChange">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Dialog,
  Table,
  Select,
  Input,
  Form,
  FormItem,
  DatePicker,
  Button,
  TableColumn,
  Row,
  Col,
  Pagination,
  Option
} from 'element-ui'
import { getLogs, getNodes } from '@/api/index'
import { LOGS } from '@/constant/localStorage'
import * as dayjs from 'dayjs'

const data = []

for (let i = 0; i < 30; ++i) {
  data.push({
    account: 'G3FF',
    option: '齐鲁儿童医院登录成功',
    link: 'udai202108313fhsaldjkfhsajkdfhkjlhsdlfajhudai202108313fhsaldjkfhsajkdfhkjlhsdlfajh',
    duration: '09:29:17'
  })
}

export default {
  name: 'Recent', // 近期操作
  data () {
    return {
      data: [],
      nodes: [],
      visiable: false,
      total: 0,
      currentPage: 1,
      page_size: 5,
      head: ['账户', '操作', '区块链凭证', '时间'],
      form: {
        node: '',
        state: '',
        date: '',
        content: ''
      },
      tableData: []
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
    [Col.name]: Col,
    [Pagination.name]: Pagination,
    [Option.name]: Option
  },
  mounted () {
    const heightEl = this.$el.clientHeight
    const heightThead = document.querySelector('.thead').clientHeight
    const heightTitle = document.querySelector('.title').clientHeight
    this.$refs.tbody.style.height =
      heightEl - heightThead - heightTitle - 10 + 'px'

    setInterval(() => {
      this.getGetLogs()
    }, 1000)
    this.renderTable({
      page: 1,
      page_size: this.page_size
    })
    this.setNode()
  },
  methods: {
    // 查看更多
    handleMore () {
      this.visiable = true
    },
    getGetLogs () {
      getLogs().then(async (res) => {
        this.data = res.results
        const { results } = res
        // 获取本地缓存记录
        const localLogs = localStorage.getItem(LOGS)
          ? JSON.parse(localStorage.getItem(LOGS))
          : []
        const newLogs = []

        // 遍历比对缓存记录
        for (let i = 0; i < results.length; ++i) {
          const current = results[i]
          if (localLogs.length > 0) {
            let flag = 0
            for (let j = 0; j < localLogs.length; ++j) {
              const _current = localLogs[j]
              if (current.uuid === _current.uuid) {
                flag = 1
                break
              }
            }
            if (flag === 0 && current.from_node && current.to_node) {
              localLogs.push(current)
              newLogs.push(current)
            }
          } else {
            if (current.from_node && current.to_node) {
              localLogs.push(current)
              newLogs.push(current)
            }
          }
        }
        if (newLogs.length > 0) {
          this.$bus.$emit('update', newLogs)
        }
        localStorage.setItem(LOGS, JSON.stringify(localLogs))
      })
    },
    formatTime (date, exp) {
      return dayjs(date).format(exp)
    },
    onSubmit () {
      let startTime = ''
      let endTime = ''

      if (this.form.date.length > 0) {
        startTime = this.formatTime(this.form.date[0], 'YYYY-MM-DD HH:mm:ss')
        endTime = this.formatTime(this.form.date[1], 'YYYY-MM-DD HH:mm:ss')
      }

      const params = {
        node: this.form.node,
        state: this.form.state,
        record: this.form.content,
        start_time: startTime,
        end_time: endTime,
        page: this.currentPage,
        page_size: this.page_size
      }

      getLogs(params)
        .then(res => {
          this.tableData = res.results
          this.total = res.count
        })
    },
    renderTable (params) {
      getLogs(params)
        .then(res => {
          this.tableData = res.results
          this.total = res.count
        })
    },
    handlePageChange (current) {
      let startTime = ''
      let endTime = ''
      this.currentPage = current

      if (this.form.date.length > 0) {
        startTime = this.formatTime(this.form.date[0], 'YYYY-MM-DD HH:mm:ss')
        endTime = this.formatTime(this.form.date[1], 'YYYY-MM-DD HH:mm:ss')
      }
      const params = {
        node: this.form.node,
        state: this.form.state,
        record: this.form.content,
        start_time: startTime,
        end_time: endTime,
        page: current,
        page_size: this.page_size
      }

      this.renderTable(params)
    },
    async setNode () {
      const nodes = await getNodes()
      this.nodes = nodes
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
      font-size: 13px;
    }

    .tbody {
      display: block;
      height: 300px;
      overflow-y: scroll;
      font-size: 12px;

      .link {
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1; //多行在这里修改数字即可
        overflow: hidden;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }

      .blue {
        color: #2e5dfc;
      }

      .break-word {
        word-wrap: break-word;
      }
    }

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
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
    background: rgba(0, 0, 0, 0.5);
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
