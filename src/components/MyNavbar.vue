<template>
  <v-navigation-drawer ref="navigation" permanent rail data-tauri-drag-region class="my-navbar-base my-navbar">
    <v-list density="compact" nav data-tauri-drag-region aria-label="Main Menu" color="warning">
      <v-tooltip :text="$t('profile')" aria-label="Tooltip">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :to="localePath('index')" role="option">
            <template #prepend>
              <img style="width: 25px; margin: 0; padding: 0" src="/icon.png" />
            </template>
            {{ $t("profile") }}</v-list-item>
        </template>
      </v-tooltip>
      <template v-for="item in items">
        <v-tooltip :text="item.title" aria-label="Tooltip">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :to="localePath(item.to)" :prepend-icon="item.icon" role="option">
              {{ $t(item.title) }}</v-list-item>
          </template>
        </v-tooltip>
      </template>
    </v-list>
    <template #append>
      <v-list nav density="compact" color="pink">
        <v-tooltip :text="$t('sponsor')" aria-label="Tooltip">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-heart" style="color: pink"
              href="https://github.com/sponsors/simonhyll" target="_blank">{{ $t("sponsor") }}</v-list-item>
          </template>
        </v-tooltip>
      </v-list>
    </template>
  </v-navigation-drawer>
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
    const ref: any = self.$refs.navigation;
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
