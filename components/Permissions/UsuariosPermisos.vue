<template>
  <!-- <v-container> -->
    <v-layout>
      <v-flex>
        <Card color="green" title="Roles por usuario" text="Listado de rol que tiene cada usuario."  >
          
          <!-- Roles -->
          <v-flex>
            <Card color="green" title="Usuarios" text="Lista de usuarios">
                <v-card-text >
                  
                  <!-- <v-autocomplete
                  v-model="model"
                  :hint="'Elegi el usuario'"
                  :items="usuarios"
                  item-text="name"
                  item-value="id"
                  :label="`Usuario`"
                  persistent-hint
                  prepend-icon="mdi-city"
                  return-object
                  v-on:change="getRolesPorUsuario"
                  >
                  </v-autocomplete>
                  -->
                  

                <v-autocomplete
                v-model="model"
                :items="usuarios"
                :loading="isLoading"
                :search-input.sync="search"
                color="white"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="id"
                :hint="'Elegi el usuario'"
                placeholder="Escribir para buscar usuarios"
                prepend-icon="mdi-database-search"
                v-on:change="getRolesPorUsuario"
                return-object
                ></v-autocomplete>

                </v-card-text>
            </Card>
          </v-flex>

          <!-- Permisos -->
          <v-flex >
            <Card  color="green" title="Roles" text="Lista de roles por usuario">
                <!-- <v-card-title class="headline font-weight-regular blue-grey white--text">Permisos</v-card-title> -->
                <v-card-text >
                  <!-- <v-subheader class="pa-0">Lista de permisos por rol</v-subheader> -->
                  <v-combobox
                  v-model="chips"
                  :items="items"
                  label="Roles por usuario"
                  item-text="name"
                  item-value="id"
                  chips
                  solo
                  multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(data.item)"
                      >
                        <strong>{{ data.item.name }}</strong>&nbsp;
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-card-text>
              <v-divider light></v-divider>
            </Card>
          </v-flex>
        </Card>
      </v-flex>
    </v-layout>
  <!-- </v-container> -->
</template>

<script src="./js/usuariospermisos.js">
import Card from './material/Card';
export default {

    components: {
      Card
    }
}
</script>
