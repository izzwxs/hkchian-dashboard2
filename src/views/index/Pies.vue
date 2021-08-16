<template>
  <div class="pies">
    <div class="chart card" ref="area"></div>
    <div class="chart card" ref="version"></div>
    <div class="chart card" ref="yzqfz"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import * as echarts from 'echarts'

const commonOptions = {
  options: {
    legend: {
      right: 0,
      top: '15%',
      orient: 'vertical',
      itemGap: 10
    },
    color: ['#2E5DFC', '#63b931', '#ffc952', '#dcdcdc']
  },
  series: {
    type: 'pie',
    labelLine: {
      show: false
    },
    center: ['40%', '58%'],
    radius: ['36%', '64%'],
    label: {
      show: false
    }
  },
  title: {
    textStyle: {
      fontSize: 14
    }
  }
}

const data1 = [
  {
    name: '济南',
    value: 25
  },
  {
    name: '北京',
    value: 25
  },
  {
    name: '上海',
    value: 25
  },
  {
    name: '其他',
    value: 25
  }]

const data2 = [
  {
    value: '52',
    name: '17.1.0'
  },
  {
    value: '30',
    name: '17.2.0'
  },
  {
    value: '22',
    name: '17.3.0'
  },
  {
    value: '26',
    name: 'other'
  }
]

const data3 = [
  {
    name: 'high load',
    value: 70
  },
  {
    name: 'low load',
    value: 20
  }
]

export default {
  name: 'Pies', // 饼图
  mounted () {
    this.render('area', '地区', data1)
    this.render('version', '版本', data2)
    this.render('yzqfz', '验证器负载', data3)
  },
  methods: {
    render (ref, name, data) {
      const chart = echarts.init(this.$refs[ref])

      chart.setOption({
        title: {
          text: name,
          ...commonOptions.title
        },
        ...commonOptions.options,
        series: [
          {
            ...commonOptions.series,
            name,
            data
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pies {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;

  .chart {
    height: 120px;
  }
}
</style>
