<template>
  <!-- <v-container> -->
    <v-layout>
      <v-flex>
        <Card color="green" title="Permisos por roles" text="Listado de permisos que tiene cada rol."  >
          
          <!-- Roles -->
          <v-flex>
            <Card color="green" title="Roles" text="Lista de roles">
                <v-card-text >
                  <v-autocomplete
                  v-model="model"
                  :hint="'Elegi el rol'"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  :label="`Rol`"
                  persistent-hint
                  prepend-icon="mdi-city"
                  return-object
                  v-on:change="getPermisosPorRole"
                  >
                  </v-autocomplete>
                </v-card-text>
            </Card>
          </v-flex>

          <!-- Permisos -->
          <v-flex >
            <Card  color="green" title="Permisos" text="Lista de permisos por rol">
                <!-- <v-card-title class="headline font-weight-regular blue-grey white--text">Permisos</v-card-title> -->
                <v-card-text >
                  <!-- <v-subheader class="pa-0">Lista de permisos por rol</v-subheader> -->
                  <v-combobox
                  v-model="chips"
                  :items="items"
                  label="Permisos por rol"
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

<script src="./js/roles.js">
import Card from './material/Card';
export default {

    components: {
      Card
    }
}
</script>
