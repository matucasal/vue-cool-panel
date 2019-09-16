<template>
  <div> 
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";
 
export default {
  props : ['contentprop'],
  components: {
    VueEditor
  },
  data() {
    return { 
      content : '' ,
      contentToSave : ''
    }
  }
  ,
  methods:{
    returnData: function () {
        this.$emit(this.data)
    }

  },

  watch: {
    content(){
      console.log(this.content)
    }
  }
  
};
</script>