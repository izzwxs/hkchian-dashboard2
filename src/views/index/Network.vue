<template>
  <div class="network card">
    <div class="title">网络状态：实时网络</div>
    <div class="pulse-container">
      <div class="pulse"></div>
      <div class="pulse bottom"></div>
    </div>
    <div class="status">{{ status.success.text }}</div>
    <div>协议版本：17</div>
    <div>最后分类帐：#775560关闭～4s前5s。</div>
    <div>最近200个分类帐的平均分类帐关闭时间：5.21秒。</div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'Network', // 网络状态
  data () {
    return {
      status: {
        success: {
          text: '启动并运行！'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.network {
  font-size: 12px;

  .title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
    text-align: left;
  }

  .pulse-container {
    width: 60px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;

    .pulse {
      background-color: #2e5dfc;
      opacity: 0.6;
      height: 100%;
      border-radius: 50%;
      animation: scale 1s ease-in-out infinite;
    }

    .bottom {
      margin-top: -60px;
      animation: scale 1s ease-in-out infinite reverse;
    }
  }

  .status {
    margin-top: 8px;
    margin-bottom: 6px;
    color: #2e5dfc;
    font-size: 14px;
    font-weight: bold;
  }
}

@keyframes scale {
  0% {
    opacity: 0.6;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scale(0);
  }
}
</style>
