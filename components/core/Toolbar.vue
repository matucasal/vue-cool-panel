<template>
 <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
    
    <!-- <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
       {{ $store.getters.username }}
      </v-toolbar-title>
    </div> -->
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
     
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <v-text-field v-if="responsiveInput" class="mr-4 mt-2 purple-input" label="Search..." hide-details color="purple"/>
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon >apps</v-icon>
        </router-link>
        <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
          <router-link v-ripple slot="activator" class="toolbar-items" to="/">
            <v-badge color="error" overlap>
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">notifications</v-icon>
            </v-badge>
          </router-link>
          <v-card>
             <v-list dense>
              <v-list-tile v-for="notification in notifications" :key="notification" @click="onClick">
                <v-list-tile-title v-text="notification"/>
              </v-list-tile>
            </v-list> 
          </v-card>
        </v-menu>
        <router-link v-ripple class="toolbar-items" to="/logout">
          <v-icon color="tertiary">exit_to_app</v-icon>
        </router-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
  
import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      'nueva notificacion'
    ],
    title: null,
    responsive: false,
    responsiveInput: false
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    // ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    // onClickBtn () {
    //   this.setDrawer(!this.$store.state.app.drawer)
    // },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 1) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>


<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
