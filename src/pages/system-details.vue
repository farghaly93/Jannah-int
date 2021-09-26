<template>
  <div class="wrapper" :style="{background: 'url('+ siteData.image +') center center', backgroundSize: 'cover'}">
    <div class="center">
      <loading v-if="loading"/>
    </div>
    <div class="cover"></div>
    <div class="system-cont">
      <div class="container mt-5">
        <h1 class="head">{{system.title}}</h1>
        <h3 class="sub-head">{{system.subtitle}}</h3>
        <div class="sections">
          <div v-for="(sec, i) in system.sections" :key="i" class="section">
            <div class="row">
              <div class="col-md-6">
                <div class="img">
                  <img src="@/assets/imgs/immigration5.jpg" alt="" class="img-fluid">
                </div>
              </div>
              <div class="col-md-6 desc">
                <div class="title sec-title">{{sec.title}}</div>
                <div class="text sec-text">{{sec.text}}</div>
                <div v-if="sec.link" class="sec-btn">
                  <a target="__blank" :href="sec.link" class="btn btn-secondary">الذهاب الي الرابط</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
  export default {
    created() {
      this.id = this.$route.params.id;
      this.loading = true;
      axios.get("/getSystemData/" + this.id).then(res => {
        this.loading = false;
        this.system = res.data.system;
        console.log(this.system);
      })
    },

    data() {
      return {
        id: null,
        system: {},
        loading: false
      }
    },
    computed: {
      siteData() {
        return this.$store.getters.siteData;
      }
    },
    methods: {
      randomizeImage() {
        const i = Math.ceil(Math.random() * this.system.sections.length);
        return '../assets/imgs/immigration' + i + '.jpg';
      }
    }
  }
</script>
<style scoped lang="scss">
$secondary_border: 4px solid rgba(22, 65, 95, 0.47);
$section_border: 4px solid rgba(161, 25, 66, 0.741);
  * {
      font-family: "Cairo";
    }
    .cover {
      z-index: -2000;
      background-size: cover;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
     }
     .system-cont {
      //  padding: 2rem;
       background: rgba(255, 255, 255, 0.851);
       height: 100vh;
       overflow: auto;
     }
     .container {
       background: rgba(255, 255, 255, 0.565);;
       border: 3px solid rgba(196, 194, 194, 0.395);
       border-radius: 17px;
     }
    h3 {
      color:rgba(55, 54, 54, 0.769);
    }

    .sections {
      margin-top: 100px;
      .section {
        width: 100%;
        padding: 40px 12px;
        border-top: $section_border;
        border-left: $section_border;
        &:nth-child(odd) {
          direction: rtl;
          border-left: 0;
          border-right: $section_border;
          .desc {
            .sec-text {
              border-left:  $secondary_border;
              border-right:  0;
              }
              .sec-btn {
                border-right: $secondary_border;
                border-left: 0;
                direction: rtl
              }
            }
          }

      }
    }

    .img {
          width: 100%;
          height: 100%;
          overflow: hidden;
          img {
            // height: 60%;
            // width: 100%;
          }
        }
    .desc {
      direction: rtl;
      .sec-title {
        font-weight: 700px;
        color: rgba(0, 0, 0, 0.626);
        border-bottom: $secondary_border;
      }
      .sec-text {
        padding: 2rem 7px;
        border-bottom:  $secondary_border;
        border-right:  $secondary_border;
      }
    }
    .sec-btn {
      padding: 1rem;
      border-left: $secondary_border;
      direction: ltr;
    }
</style>