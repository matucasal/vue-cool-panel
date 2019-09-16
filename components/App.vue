<template>

<router-view/>
      

    <!-- <div>
        <h2>Vue Router Cedulas CMCABA</h2>

        <p>
            <router-link :to="{ name: 'home' }">Home</router-link> |
            <router-link :to="{ name: 'hello' }">Hello World</router-link>
            <router-link :to="{ name: 'cedulas' }">Cedulas</router-link>
        </p>

        <div class="container">
            
        </div>
    </div> -->
</template>

<script>
 export default {
   name: 'App'
 }
</script>

<style lang="scss">
@import './styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

