<template>
    <div>
        <nav>
            <div
            @click="toggleMenu" 
            class="toggle">
                <i class="fa fa-bars mx-3"></i>
                <h5>menu</h5>
            </div>
            <div id="menu" class="">
                <div 
                @click="()=>{$router.push('/'); toggleMenu()}" 
                class="link"
                :class="{active: current == ''}">
                    <p>Main</p>
                </div>
                <div 
                @click="() => {$router.push('/payment'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'payment'}">
                    <p>payment</p>
                </div>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
    created() {
        this.current = this.$route.path.split("/")[1];
    },
    data() {
        return {
            current: null,
        }
    },
    methods: {
        toggleMenu() {
            this.current = this.$route.path.split("/")[1];
            document.getElementById('menu').classList.toggle("open");
        }
    }
}
</script>