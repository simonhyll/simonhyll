<template>
  <v-app-bar ref="bar" data-tauri-drag-region :height="$vuetify.display.mobile ? 150 : 75">
    <v-row data-tauri-drag-region align="center" justify="center" no-gutters>
      <v-col align="center" data-tauri-drag-region cols="6" sm="3">
        <v-btn :to="localePath('index')" prepend-icon="mdi-home" width="100%" stacked>Home</v-btn>
      </v-col>
      <v-col align="center" data-tauri-drag-region cols="6" sm="3">
        <v-btn :to="localePath('cv')" prepend-icon="mdi-timeline-text" width="100%" stacked>CV</v-btn>
      </v-col>
      <v-col align="center" data-tauri-drag-region cols="6" sm=3>
        <v-btn :to="localePath('portfolio')" prepend-icon="mdi-briefcase" width="100%" stacked>Portfolio</v-btn>
      </v-col>
      <v-col align="center" data-tauri-drag-region cols="6" sm=3>
        <v-btn :to="localePath('blog')" prepend-icon="mdi-file-multiple" width="100%" stacked>Blog</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        {
          title: "blog",
          icon: "mdi-post",
          to: "blog",
        },
        {
          title: "portfolio",
          icon: "mdi-briefcase",
          to: "portfolio",
        },
        {
          title: "cv",
          icon: "mdi-text-box",
          to: "cv",
        },
      ],
    };
  },
  mounted() {
    const self = this;
    const ref: any = self.$refs.bar;
    for (const element of ref.$el.nextElementSibling.children)
      element.setAttribute("data-tauri-drag-region", "true");
  },
};
</script>

<style>
.my-navbar .v-list--nav {
  background: transparent !important;
}

.my-navbar {
  background: rgba(20, 26, 33, 0.8) !important;
  position: absolute;
  left: 0;
}

.my-navbar-base {
  transition: all 0.5s;
  transition-duration: 0.5s;
}
</style>
