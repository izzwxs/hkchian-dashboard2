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
    tooltip: {}
  },
  series: {
    type: 'pie',
    labelLine: {
      show: false
    },
    center: ['30%', '58%'],
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

const color = ['#2E5DFC', '#63b931', '#ffc952', 'rgba(81,91,212,1)', '#8134af', '#dd2a7b', '#feda77', '#dcdcdc']
const color2 = ['#2E5DFC', '#63b931', '#ffc952', '#dcdcdc']

const data1 = [
  {
    name: '山东',
    value: 6
  },
  {
    name: '天津',
    value: 2
  },
  {
    name: '四川',
    value: 2
  },
  {
    name: '广东',
    value: 1
  },
  {
    name: '河南',
    value: 1
  },
  {
    name: '内蒙古',
    value: 1
  },
  {
    name: '安徽',
    value: 1
  },
  {
    name: '其他',
    value: 1
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
    this.render('area', '地区', data1, color)
    this.render('version', '版本', data2, color2)
    this.render('yzqfz', '验证器负载', data3, color2)
  },
  methods: {
    render (ref, name, data, color) {
      const chart = echarts.init(this.$refs[ref])

      chart.setOption({
        title: {
          text: name,
          ...commonOptions.title
        },
        color,
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
