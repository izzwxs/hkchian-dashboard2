<template>
  <div class="home">
    <q-header class="header" />
    <div class="container">
      <div class="left">
        <network />
        <div class="recent-wrap card gutter-top">
          <recent />
        </div>
      </div>
      <div class="right">
        <lines />
        <pies class="gutter-top" />
        <node class="gutter-top node" />
      </div>
    </div>
  </div>
</template>

<script>
import QHeader from '@/components/QHeader.vue'
import Network from './index/Network.vue'
import Recent from './index/Recent.vue'
import Lines from './index/Lines.vue'
import Pies from './index/Pies.vue'
import Node from './index/Node.vue'

export default {
  name: 'Home',
  components: {
    [QHeader.name]: QHeader,
    [Network.name]: Network,
    [Recent.name]: Recent,
    [Lines.name]: Lines,
    [Pies.name]: Pies,
    [Node.name]: Node
  }
}
</script>

<style lang="scss" scoped>
$gutter: 10px;

.home {
  display: grid;
  height: 100vh;
  overflow: hidden;
  grid-template-rows: 45px auto;
  align-items: stretch;
  overflow: hidden;

  .container {
    display: grid;
    grid-template-columns: 32% auto;
    column-gap: $gutter;
    padding: $gutter;
    box-sizing: border-box;
    overflow: hidden;

    .gutter-top {
      margin-top: $gutter;
    }

    .left, .right {
      display: flex;
      flex-flow: column;
      flex: 1;
      overflow: hidden;
    }

    .left .recent-wrap, .right .node {
      flex: 1;
    }

    .left .recent-wrap {
      flex: 1;
      overflow: hidden;
      min-height: min-content;
    }
  }
}

</style>
