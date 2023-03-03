<template>
  <v-container fluid class="pa-0 my-full-width">
    <template v-for="i in 5">
      <v-row no-gutters>
        <v-col>
          <v-parallax :src="zelda" style="max-height: 100vh">
            <div
              class="d-flex flex-column fill-height justify-center align-center text-white"
            >
              <h1 class="text-h4 font-weight-thin mb-4">Under construction!</h1>
            </div>
          </v-parallax>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-parallax :src="scotland" style="max-height: 100vh">
            <div
              class="d-flex flex-column fill-height justify-center align-center text-white"
            >
              <h1 class="text-h4 font-weight-thin mb-4">Under construction!</h1>
            </div>
          </v-parallax>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import zelda from "~/assets/images/zelda.jpg";
import scotland from "~/assets/images/skottland.jpg";
export default {
  data() {
    return {
      zelda,
      scotland,
    };
  },
  mounted() {
    const self = this;
  },
};
</script>

<style>
.my-full-width {
  position: absolute;
  left: 0;
}
</style>
