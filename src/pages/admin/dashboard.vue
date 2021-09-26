<template>
  <div class="wrapper">
    <div class="cover"></div>
    <div class="container-fluid cont p-1">
        <nav>
            <div
            @click="toggleMenu" 
            class="toggle">
                <i class="fa fa-bars mx-3"></i>
                <h5>menu</h5>
            </div>
            <div id="menu" class="">
                <div 
                @click="()=>{$router.push('/dashboard'); toggleMenu()}" 
                class="link"
                :class="{active: !current}">
                    <p>Main</p>
                </div>
                <div 
                @click="() => {$router.push('/dashboard/site-data'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'site-data'}">
                    <p>Site Data</p>
                </div>
                <div 
                @click="() => {$router.push('/dashboard/transactions'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'transactions'}">
                    <p>Transactions</p>
                </div>
                <div 
                @click="() => {$router.push('/dashboard/systems'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'systems'}">
                    <p>Systems</p>
                </div>
                <div 
                @click="() => {$router.push('/dashboard/add-system'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'add-system'}">
                    <p>Add system</p>
                </div>
                <div 
                @click="() => {$router.push('/dashboard/categories'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'categories'}">
                    <p>Categories</p>
                </div>
                <div 
                @click="() => {$router.push('/editAdminData'); toggleMenu()}" 
                class="link"
                :class="{active: current == 'editAdminData'}">
                    <p>Edit admin</p>
                </div>
                <div 
                @click="() => {$store.dispatch('logout'); toggleMenu()}"
                class="link">
                    <p>Logout</p>
                </div>
            </div>
        </nav>
        <div class="content container-fluid p-0">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
      updated() {
          this.current = this.$route.path.split("/")[2];
      },
      data() {
          return {
              current: null,
          }
      },
      methods: {
          toggleMenu: ()=>document.getElementById('menu').classList.toggle("open")
      }
  }
</script>
<style scoped lang="scss">

    .wrapper {
        padding: 100px 0;
        background: rgba(255, 255, 255, 0.531);
        height: 100vh;
        overflow-y: auto;
    }
</style>