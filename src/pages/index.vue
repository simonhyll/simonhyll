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
                height: 100%;
                width: 100%;
                min-width: 10cm;
                max-width: 30vw;
              "
            >
              <v-img :src="mig"></v-img>
              <div style="padding: 1cm">
                <h1 class="mb-4">Simon Hyll</h1>

                <p>Discord</p>
                <p>Github</p>
              </div>
            </div>
          </div>
        </v-parallax>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fjallvattnet from "~/assets/images/fjallvattnet.jpg";
import mig from "~/assets/images/mig.jpg";
export default {
  data() {
    return {
      fjallvattnet,
      mig,
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
