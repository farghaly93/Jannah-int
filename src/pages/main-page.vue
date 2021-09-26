<template>
    <div>
        <nav class="main-page-nav">
            <div
            @click="toggleMenu" 
            class="toggle">
                <i class="fa fa-bars mx-3"></i>
                <h5>menu</h5>
            </div>
            <div id="menu" class="">
                <div
                v-for="link in links" :key="link"
                @click="scrollTo(link)" 
                class="link"
                :class="{active: current == link}">
                    <p>{{link}}</p>
                </div>
            </div>
        </nav>

        <!----------------------------------------------->
        <!----------------------------------------------->
        <!----------------------------------------------->

        <div class="main-page-cover"></div>
        <div id="main-page-cont" class="main-page-cont">
            <section class="sec" id="start">
                <div class="video">
                    <video width="100%" height="100%" id="video" autoplay loop preload="auto" muted>
                        <source :src="siteData.video" type="" />
                    </video>
                </div>
                <div class="start-cont pt-5 d-flex flex-column justify-content-center">
                    <div class="site-data">
                        <h1 class="overlap text-large">{{siteData.siteName}}</h1>
                        <h3 class="suboverlap text-small2">{{siteData.description}}</h3>
                        <h2 class="overlap text-medium">{{siteData.field}}</h2>
                        <br>
                        <div v-show="siteData.phone" class="phone text-medium">
                            <i class="fa fa-phone"></i>
                            <span class="text-small">{{siteData.phone}}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-9">
                            <div class="custom-shape-divider-bottom-1632178739">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                    <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" class="shape-fill"></path>
                                </svg>
                                <div class="svg-btn">
                                    <button @click="$router.push('/payment')" class="btn">PAY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section class="pt-0" id="social">
                <svg class="svg-top" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" class="shape-fill"></path>
                </svg>
                <social-icons/>
                <!-- <svg class="svg-bottom" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" class="shape-fill"></path>
                </svg> -->
            </section>
            <section class="sec" id="instructions">
                <h1 class="text-large sec-title text-center">Instructions</h1>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <div class="img">
                            <img src="../assets/imgs/instructions.svg" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="instrcts">
                            <div v-for="(instrct, i) in siteData.instructions.split(',')" :key="i" class="instrct">
                                <span class="index">{{i + 1}}</span>
                                <h3 class="text text-medium">{{instrct}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="sec" id="systems">
                <h1 class="text-large sec-title text-center">Systems</h1>
                <systems-section/>
            </section>
        </div>
    </div>
</template>

<script>
import SocialIcons from "../components/social-icons"
import SystemsSection from "../components/systems"
export default {
    components: {
        SocialIcons,
        SystemsSection
    },
    mounted() {
      document.getElementById("video").play();
      console.log(this.siteData)
    },
    data() {
        return {
            links: ["start", "social", "instructions", "systems"],
            current: null,
        }
    },
    methods: {
        scrollTo(link) {
            this.current = link;
            const el = document.getElementById(link);
            el.scrollIntoView({block: 'start', behavior: 'smooth'});
            this.toggleMenu();
        },
        toggleMenu() {
            document.getElementById('menu').classList.toggle("open");
        }
    },
    computed: {
        siteData() {
            return this.$store.getters.siteData;
        }
    }
}
</script>

<style scoped lang="scss">
    .main-page-cover {
        z-index: -2000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: url("../assets/imgs/immigration6.png") center center;
        background-size: cover;
    }
    .main-page-cont {
        background: rgba(255, 255, 255, 0.191);
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
    }

   ///////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////


    .sec {
        margin: 5rem 0;
    }
    .overlap {
        width: fit-content;
        block-size: fit-content;
        text-shadow: 5px 5px 3px rgb(0, 0, 0);
        color: white;
        font-family: "Stencil Std, fantasy";
    }
    .suboverlap {
        width: fit-content;
        block-size: fit-content;
        box-sizing:floor($number: 0);
        text-shadow: 1px 1px rgba(0, 0, 0, 0.776);
        color: rgba(255, 255, 255, 0.633);
    }
    .phone {
        text-shadow: 5px 5px 3px rgb(0, 0, 0);
        color: white;
        font-weight: 900;
        span {margin-left: 14px;}
    }
    #start {
        height: 100vh;
        margin: 0;
        position: relative;
        .video {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.592);
            video {
                min-width: 100%;
                height: 100%;
            }
            @media(max-width: 700px) {
                height: 60%;
            }
        }
        .start-cont {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.551);
            padding: 5rem 2rem;
            @media(max-width: 700px) {
                padding: 10px;
            }
        }
    }

    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////

    .custom-shape-divider-bottom-1632178739 {
        position: relative;
        // bottom: 0;
        // left: 0;
        overflow: hidden;
        // line-height: 0;
        .shape-fill {
            fill: #ffffffa5;
         }
        svg {
            // position: relative;
            transform: rotate(180deg);
            display: block;
            // width: calc(300% + 1.3px);
            width: 70%;
            height: 30vh;
            @media (max-width: 767px) {
                width: calc(500% + 1.3px);
                height: 30vh;
            }
        }
        .svg-btn {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 100%;
            // padding: 20%;
            button {
                width: 40%;
                padding: 10px 0;
                background: rgb(82, 8, 54);
                color: #fff;
                border: 3px solid #fff;
                font-size: 1.2rem;
                @media(max-width: 700px) {
                    width: 80%;
                    padding: 9px 0;
                    font-size: 1rem;
                }
            }
        }
    }

    #social {
        .svg-top, .svg-bottom {
            fill: rgba(121, 14, 89, 0.79);
            @media(max-width: 700px) {
                height: 100px;
            }
        }
        .svg-bottom {
            transform: rotate(180deg);
        }
    }

    #instructions {
        background: rgba(255, 255, 255, 0.483);
        padding: 15px;
        .instrcts {
            .instrct {
                position: relative;
                background: rgba(12, 97, 99, 0.755);
                border-radius: 14px;
                box-shadow: 2px 2px 9px 4px #666;
                margin-top: 14px;
                .text {
                    padding: 8px;
                    padding-left: 50px;
                    @media(max-width: 700px) {
                        padding-left: 20px;
                    }
                    color: #fff;
                    width: 100%;;
                }
                .index {
                    position: absolute;
                    left: 2px;
                    top: 0;
                    font-weight: 500;
                    padding: 12px;
                    // border: 2px solid rgb(7, 51, 70);
                    border-radius: 5px;
                    color: rgb(255, 255, 255);
                }
            }
        }
    }

    #systems {
        h1 {
            background: rgba(255, 255, 255, 0.66);;
            padding: 20px 0;
            margin: 0;
        }
    }
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

.sec-title {
    font-weight: 800;
}
</style>


