<template>
  <div class="lines">
    <!-- 健康大数据节点 -->
    <div class="chart-container card">
      <h3 class="chart-title">健康大数据节点 <span class="tips"></span></h3>
      <div class="value">78</div>
      <div class="chart" ref="jkdsj"></div>
    </div>
    <div class="chart-container card">
      <h3 class="chart-title">华链节点 <span class="tips"></span></h3>
      <div class="value">78</div>
      <div class="chart" ref="hl"></div>
    </div>
    <div class="chart-container card">
      <h3 class="chart-title">完整验证器 <span class="tips"></span></h3>
      <div class="value">78</div>
      <div class="chart" ref="wzyzq"></div>
    </div>
    <div class="chart-container card">
      <h3 class="chart-title">组织 <span class="tips"></span></h3>
      <div class="value">78</div>
      <div class="chart" ref="zz"></div>
    </div>
    <div class="chart-container card">
      <h3 class="chart-title">顶级验证器 <span class="tips"></span></h3>
      <div class="value">78</div>
      <div class="chart" ref="djyzq"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import dayjs from 'dayjs'
import * as echarts from 'echarts'

const xAxis = []
const data = []

for (let i = 11; i >= 0; --i) {
  xAxis.push(dayjs().subtract(i, 'month').format('YYYY-MM'))
  data.push(Math.floor(50 + 30 * Math.random()))
}

const commonOptions = {
  grid: {
    left: -8,
    right: -8,
    bottom: 0,
    top: 4
  },
  xAxis: {
    data: xAxis,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  tooltip: {
    trigger: 'axis',
    showContent: false,
    axisPointer: {
      lineStyle: {
        opacity: 0
      }
    }
  }
}

const commonSeriesOptions = {
  type: 'line',
  smooth: true,
  itemStyle: {
    opacity: 0
  },
  areaStyle: {
    color: '#8da8fc'
  },
  lineStyle: {
    color: '#2E5DFC'
  },
  emphasis: {
    itemStyle: {
      opacity: 1
    }
  }
}

export default {
  name: 'Lines', // 折线图
  mounted () {
    this.render('jkdsj', '健康大数据节点', data)
    this.render('hl', '健康大数据节点', data)
    this.render('wzyzq', '健康大数据节点', data)
    this.render('zz', '健康大数据节点', data)
    this.render('djyzq', '健康大数据节点', data)
  },
  methods: {
    render (ref, name, data) {
      const chart = echarts.init(this.$refs[ref])
      chart.setOption({
        ...commonOptions,
        series: [
          {
            ...commonSeriesOptions,
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
.lines {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 10px;

  .chart-container {
    padding: 0;

    .chart-title {
      padding: 10px 10px 0;
      margin-top: 0;
      margin-bottom: 4px;
      color: #333;
      font-size: 14px;
      text-align: left;
      font-weight: 400;
    }

    .value {
      padding: 0 10px 0;
      font-size: 18px;
      font-weight: 700;
      line-height: 20px;
      text-align: left;
    }

    .chart {
      height: 20px;
    }

    .tips {
      float: right;
      width: 15px;
      height: 15px;
      margin-top: 2px;
      background: url(../../assets/images/icon-tips.svg);
      cursor: pointer;
    }
  }
}
</style>
