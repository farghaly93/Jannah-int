<template>
    <div class="systems-sec">
        <svg class="svg1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" class="shape-fill"></path>
        </svg>
        <div class="cats p-1 p-md-4">
            <div v-for="(cat, i) in categories" :key="i" class="category">
                <h1 class="text-medium">{{cat.name}}</h1>
                <div class="row cont">
                    <div class="col-md-6">
                        <div class="img p-0 p-md-5">
                            <img src="../assets/imgs/systems.svg" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="systems">
                            <div v-for="(system, s) in filterSystems(cat.number)" :key="system._id" class="system">
                                <div class="number">{{s + 1}}</div>
                                <div class="sys-title text-medium">{{system.title}}</div>
                                <div class="sys-subtitle text-small">{{system.subtitle}}</div>
                                <hr>
                                <div class="sys-btn">
                                    <button @click="$router.push('/system-details/' + system._id)" class="btn">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <svg class="svg2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" class="shape-fill"></path>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
    $svg_color: rgba(59, 58, 58, 0.442);//linear-gradient(to bottom right, rgba(84, 4, 87, 0.422), rgba(235, 227, 230, 0.605));
    $bg_color: #ffffffba;
    $primary_border_color: #790e59c9;
    $secondary_border_color: #0ca871b4;
    .systems-sec {
        height: 100%;
        background: $bg_color;
    }

    .svg1 {
        position: relative;
        display: block;
        width: 100%;
        height: 280px;
        transform: rotate(180deg);
        fill: $svg_color;
        @media(max-width: 700px) {
            height: 110px;
        }
    }
    .svg2 {
        position: relative;
        display: block;
        width: 100%;
        height: 280px;
        fill: $svg_color;
        @media(max-width: 700px) {
            height: 110px;
        }
    }
    .category {
        margin: 0;
        padding: 20px 0;
        h1 {
            border-bottom: 6px solid $primary_border_color;
            border-left: 6px solid $primary_border_color;
            color: $primary_border_color;
            padding: 9px;
            margin: 0;
        }
        .cont {
            margin: 0;
            padding: 6px 0;
            // border-bottom: 3px solid $primary_border_color;
            border-right: 6px solid $primary_border_color;
        }
    }

    .systems {
        // padding: 20px;
        .system {
            margin-top: 20px;
            padding: 20px 10px;
            margin: 0;
            border-radius: 10px;
            font-family: "Cairo";
            border-top: 3px solid $secondary_border_color; 
            &:nth-child(odd) {
                border-right: 3px solid $secondary_border_color;
            } 
            &:nth-child(even) {
                border-left: 3px solid $secondary_border_color;
            }
            .number {
                text-align: center;
                width: 100%;
                border-radius: 3px;
                font-size: 1.6rem;
                font-weight: 800;
                // border: 2px solid #fff;
                background: linear-gradient(to bottom right, $secondary_border_color, rgb(4, 86, 109));
                color: #fff;
            }
            .sys-title {
                color: #444;
                text-align: center;
            }
            .sys-subtitle {
                text-align: center;
                color: rgba(36, 53, 49, 0.763);
            }
            .sys-btn {
                display: flex;
                justify-content: center;
                button {
                    color: #fff;
                    background: linear-gradient(to bottom right, $primary_border_color, rgba(212, 70, 156, 0.776));
                    font-weight: 800;
                    font-size: 1rem;
                    padding: 6px 17px;
                    width: 50%;
                }
            }
        }
    }
</style>

<script>
import axios from 'axios';
export default {
    created() {
        axios.get("/getSystemsForAdmin").then(res => {
            this.systems = res.data.systems;
            console.log(this.systems)
        })
    },
    data() {
        return {
            systems: []
        }
    },  
    computed: {
        categories() {
            return this.$store.getters.categories;
        }
    },
    methods: {
        filterSystems(cat) {
            return this.systems.filter(sys => sys.category == cat);
        }
    }
}
</script>