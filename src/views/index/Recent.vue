<template>
  <div class="recent">
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
  </div>
</template>

<script type="text/ecmascript-6">
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
      head: ['账户', '操作', '区块链凭证', '时间']
    }
  },
  mounted () {
    const heightEl = this.$el.clientHeight
    this.$refs.tbody.style.height = (heightEl - 33) + 'px'
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
}
</style>
