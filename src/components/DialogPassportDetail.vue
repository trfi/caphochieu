<template>
  <v-dialog v-model="dialog" max-width="650">
    <template v-slot:activator="{ on }">
      <v-btn 
        icon x-small fab color="primary" v-on="on"
        v-tooltip="{ content: 'Chi tiết' }"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto pa-5">
      <v-row v-for="(value, key) in passport" v-bind:key="key">
        <v-col>
          <div class="caption grey--text">{{key}}</div>
          <v-card-text>{{ value }}</v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      passport: {},
      predicate: cmnd => cmnd > 1
    },
    computed: {
      itemsWithPower: () => {
        const result = Object.keys(this.passport)
          .filter( key => this.passport() )
          .reduce( (res, key) => (res[key] = this.passport[key], res), {} )
        return result
      }
    }
  }
</script>