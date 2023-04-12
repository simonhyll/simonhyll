<template>
  <v-app-bar ref="bar" data-tauri-drag-region>
    <v-row data-tauri-drag-region>
      <v-col align="center" data-tauri-drag-region>
        <v-btn :to="localePath('index')">Home</v-btn>
        <v-btn :to="localePath('cv')">CV</v-btn>
        <v-btn :to="localePath('portfolio')">Portfolio</v-btn>
        <v-btn :to="localePath('blog')">Blog</v-btn>
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
