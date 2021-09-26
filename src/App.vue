<template>
  <div id="app">
    <div class="center">
      <loading v-if="!siteData"/>
    </div>
    <div v-if="siteData" class="main-cont">
      <div class="coverrr" :style="{background: 'url('+siteData.image+') center center', backgroundSize: 'cover'}"></div>
      <div id="cont" class="cont">
        <div :class="{show: message}" class="message">
          <p class="text-small">{{message}}</p>
        </div>
        <router-view name="header"></router-view>
        <br><br>
        <router-view></router-view>
        <app-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppFooter from './components/footer'
export default {
  name: 'App',
  mounted() {
    const mainPage = document.getElementById("main-page-cont");
    mainPage.onscroll = () => {
      console.log(window.pageYOffset); console.log(mainPage.innerHeight);
    }
  },
  created() {
    if(!localStorage.getItem("admin")) {
      axios.get("/addVisit");
    }
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getSiteData");
    this.$store.dispatch("autoLogin");
    
  },
  computed: {
    message() {
      return this.$store.getters.message;
    },
    siteData() {
      return this.$store.getters.siteData;
    }
  },
  watch: {
  },
  components: {
    AppFooter
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main-content {
  position: relative;
}
.coverrr {
  z-index: -3000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // background: url("./assets/imgs/immigration6.jpg") center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.cont {
  height: 100vh;
  background:rgba(31, 32, 31, 0.565);
  overflow-y: auto;
}

.message {
  z-index: 3000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  // height: 100px;
  padding: 10px;
  background: rgba(19, 114, 19, 0.885);
  transition: .3s all ease-in-out;
  transform: translateY(-100vh);
  &.show {
    transform: translateY(0);
  }
  p {
    padding: 0;
    font-size: 1.4rem;
    text-align: center;
    color: #fff;
  }
}
</style>
