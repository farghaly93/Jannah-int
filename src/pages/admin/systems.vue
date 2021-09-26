<template>
    <div>
        <div class="center">
            <loading v-if="loading"/>
        </div>
        <div class="container-fluid p-0">
            <h3 class="title text-center">Systems</h3>
            <div class="filters">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>choose system</label>
                            <select @change="filter" class="form-control" v-model="system">
                                <option :value="''">all</option>
                                <option v-for="option in categories" :key="option.number" :value="option.number">{{option.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="container p-0">
                <div class="row g-5">
                    <div v-for="system in filtered" :key="system._id" class="col-md-4">
                        <div class="card system-card">
                            <div class="content">
                                <h3 class="title text-center">{{system.category | category}}</h3>
                                <div class="system-title">
                                    <p>{{system.title}}</p>
                                </div>
                                <div class="options">
                                    <i @click="$router.push('edit-system/' + system._id)" class="fa fa-pencil"></i>
                                    <i @click="remove(system._id)" class="fa fa-trash"></i>
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
import axios from "axios"
export default {
    created() {
        axios.get("/getSystemsForAdmin").then(res => {
            this.systems = res.data.systems;
            this.filtered = res.data.systems;
            console.log(this.systems)
        })
    },
    data() {
        return {
            systems: [],
            filtered: [],
            system: "",
            loading: false,
        }
    },
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
    methods: {
        remove(id) {
            const confirmed = confirm("are you sure to delete system permenantly..?!");
            if(!confirmed) return;
            this.loading = true;
            axios.delete("/removeSystem/" + id).then(res => {
                this.loading = false;
                if(res.data.done) {
                    this.systems.splice(this.systems.findIndex(sys => sys._id == id), 1);
                    this.filter();
                }
            })
        },
        filter() {
            if(this.system == "") return this.filtered = [...this.systems];
            this.filtered = this.systems.filter(sys => sys.category == this.system);
        }
    }
}
</script>

<style lang="scss" scoped>
    .filters {
        margin: 40px 10px;
        padding: 10px;
        label {
            color: rgba(46, 41, 41, 0.701);
            font-weight: 400;
        }
        select {
            border: 3px solid rgba(68, 68, 68, 0.667);
        }
    }

    .system-card {
        position: relative;
        border: 2px solid rgba(85, 85, 85, 0.429);
        height: 320px;
        background: url("../../assets/imgs/immigration3.jpg") center center;
        background-size: cover;
        box-shadow: 2px 2px 12px 5px;

        .content {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.673);
        }
    }

    .system-title {
        overflow: auto;
        p {
            background:rgba(85, 85, 85, 0.571);
            text-align: center;
            color:rgba(255, 255, 255, 0.844);
            padding: 0;
            font-weight: 600;
            font-size: 1.5rem;
            font-family: "Cairo";
            line-height: 40px;
            text-shadow: 0px 0px 4px #000;
        }
    }
    .options {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        display: flex;
        justify-content: space-around;
        background: #fff;
        border-top: 2px solid rgba(85, 85, 85, 0.592);;

        i {
            font-size: 1.5rem;
        }
    }
</style>