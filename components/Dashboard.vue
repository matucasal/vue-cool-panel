<template>  
   
   <!-- 
    <v-app> 
        <Menu></Menu>
        
        <v-app-bar
        app
        clipped-left
        >

          <v-toolbar-title>Cedulas</v-toolbar-title>
        
        </v-app-bar>
      
        <v-content>
            <router-view name="content"></router-view>
        </v-content>
    </v-app> -->



<div id="app">
    <div class="app-header">
      <div class="title">Aplicacion de cedulas</div>
    </div>
    <div class="app-content">
      <div class="app-nav">
        <Menu></Menu>
      </div>
      <div class="app-wrap">
        <div class="template-tabs">
           <el-tabs
            v-model="activeIndex"
            type="border-card"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in options"
              :label="item.name"
              :name="item.route">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content-wrap">
          <keep-alive>
            <router-view name="content"></router-view>
          </keep-alive>
        </div>
      </div>
    </div>

  </div>


</template>

<script>

import axios from 'axios';
import Menu from './Menu/Menu';
import { mapGetters } from 'vuex';
import CoreToolbar from './core/Toolbar';
export default {

  components: {
    Menu,
    //CoreToolbar
  }

  ,data: () => ({
    drawer: null,
  }),
  props: {
    source: String
  },
  mounted() {
    //Si se monta quiere decir que estoy logueado, obtengo y  pongo el username en el store
    //Esto tambien guarda el acl en el store
    this.$store.dispatch("getuser");
  },
  computed: {
    options () {
      return this.$store.state.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  }

  ,watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.options ) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          break
        }
      }
      if (!flag) {
        console.log(to.path)
        console.log(to.path.split('/')[1])
        //this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
        //this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
        this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
      }
    }
  }

  ,methods: {
    logout() {
        console.log("supuestamente me deslogueo");
        return axios.post("/logout").then(response => {
            this.$router.push("/");
        });
    },
    //este metodo todavia no lo use
    dividirCadena(cadenaADividir,separador) {
          var arrayDeCadenas = cadenaADividir.split(separador);
          
        for (var i=0; i < arrayDeCadenas.length; i++) {
            document.write(arrayDeCadenas[i] + " / ");
        }
    },


    // Metodos del tab
    tabClick (tab) {
        let path = this.activeIndex;
        //console.log(this.activeIndex)
        //Si el que activo es el user info pongo la data del usuario 
        if (this.activeIndex === '/userInfo') {
            path = this.activeIndex + '/' + this.$store.state.userInfo.name;
        }

        // Mando el router a donde mi dice el path
        this.$router.push({path: path});
    },

    tabRemove (targetName) {
        if(targetName == '/') {
            return;
        }

        //Borra el path en el store
        this.$store.commit('delete_tabs', targetName);


        if (this.activeIndex === targetName) {
          
            if (this.options && this.options.length >= 1) {
              //Manda el tab al anterior
              this.$store.commit('set_active_index', this.options[this.options.length-1].route);
              this.$router.push({path: this.activeIndex});
            } else {
              this.$router.push({path: '/'});
            }
        }
    }


  }
};
</script>



<style lang="scss">
html, body {
  /*height: 100%;*/
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  .app-header {
    color: #fff;
    flex: 0 0 60px;
    background: #324057;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    .title {
      font-size: 24px;
    }
  }
  .app-content {
    flex: 1;
    display: flex;
    flex-flow: row;
    .app-nav {
      flex: 0 0 300px;
      background: #eff2f7;
    }
    .app-wrap {
      flex: 1;
      padding: 10px 20px;
      overflow: auto;
      .content-wrap {
        border: 1px solid #d1dbe5;
        border-top: none;
        padding: 0 20px;
      }
    }
  }
}
</style>