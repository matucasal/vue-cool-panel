<template>
  <!-- <v-navigation-drawer id="app-drawer" app dark floating persistent mobile-break-point="991" width="300"> -->
    <v-navigation-drawer
    id="app-drawer"
    width = "300"
    dark floating persistent mobile-break-point="991"
    >
    <v-list dense >
  
      <router-link class="toolbar-items" to="/">
      <v-list-item>
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
      </router-link>

      <v-list-group
        v-for="item in activeModules" :key="item.title"  v-model="item.active"  
        no-action
        
        value="true"
        :prepend-icon="item.action"
      >
            <template v-slot:activator>
              <!-- si no es modulo, le agrego el link -->
              <v-list-item-title @click="!item.isModule ? handle_function_redirect(item.path) : null ">{{  item.title}}</v-list-item-title>
              
              <!-- si es modulo le pongo la flecha para abajo -->
              <v-list-item-icon v-if="item.isModule">
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-item-icon>
            </template>
       
            <v-list-item
                v-for="subItem in item.children" :key="subItem.title"
                link
                @click="subItem.path ? handle_function_redirect(subItem.path) : null "
              >
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
                <v-list-item-icon>
                  <v-icon v-text="subItem.action"></v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list-group>
        <v-divider/>
    </v-list>
  
  
  </v-navigation-drawer>

</template>
<script src="./menu.js"></script>

