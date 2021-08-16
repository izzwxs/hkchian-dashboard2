<template>
  <div class="q-header-onebg">
    <div class="q-header-twobg">
      <div class="q-header-threebg layout">
        <div
          class="layout-title cursor-pointer"
          @click="jumpHome()"
        >
          <img :src="require('@/assets/logo.svg')" class="logo" alt="logo" width="32">
          <span v-text="title" />
        </div>
        <div class="height-block flex layout flex-items-center"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QHeader',
  data () {
    return {
      title: process.env.VUE_APP_TITLE,
      publicMenus: [
        { name: 'DeptDatabase', title: '我的数据库' },
        { name: 'DeptDatabaseGovernance', title: '数据治理' },
        { name: 'AnalysisTools', title: '数据分析' }
      ]
    }
  },

  methods: {
    jumpHome () {
      this.jumpRoute('Index')
    },
    jumpRoute (name) {
      this.$route.name !== name && this.$router.push({ name })
    },
    enterClick: function () {
      this.$router.push({ name: 'ActuarialModel' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variables.scss';

.layout-title {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 50px;
  margin-right: 30px;
  font-weight: 600;
  font-size: 14px;
  color: $primary-color;
  user-select: none;

  .logo {
    margin-right: $slider-gutter;
    filter: invert(29%) sepia(67%) saturate(4037%) hue-rotate(222deg) brightness(99%) contrast(100%);
  }
}

.q-header-threebg {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  padding-right: 60px;
  background-image: url('../assets/images/headBgWhite.png');
  background-size: 100% 100%;
}

.keyanzhichi-icon {
  color: $primary-color;
}
</style>
