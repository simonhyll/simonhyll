<template>
  <v-container fluid class="pa-0 my-full-width">
    <v-row no-gutters>
      <v-col>
        <v-parallax
          :src="fjallvattnet"
          style="min-height: 100vh; max-height: 100vh"
        >
          <div
            class="d-flex flex-column fill-height justify-center align-end text-white"
          >
            <div
              style="
                background: rgba(20, 26, 33, 0.8);
                padding: 1cm;
                height: 100%;
                width: 100%;
                min-width: 10cm;
                max-width: 35vw;
              "
            >
              <h1 class="mb-4">Simon Hyll</h1>

              <p>Discord</p>
              <p>Github</p>
            </div>
          </div>
        </v-parallax>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fjallvattnet from "~/assets/images/fjallvattnet.jpg";
import zelda from "~/assets/images/zelda.jpg";
import scotland from "~/assets/images/skottland.jpg";
export default {
  data() {
    return {
      zelda,
      scotland,
      fjallvattnet,
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
