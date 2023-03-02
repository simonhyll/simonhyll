<template>
  <v-navigation-drawer ref="navigation" permanent rail data-tauri-drag-region>
    <v-list
      density="compact"
      nav
      data-tauri-drag-region
      aria-label="Main Menu"
      color="primary"
    >
      <v-tooltip :text="$t('profile')" aria-label="Tooltip">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :to="localePath('index')" role="option">
            <template #prepend>
              <img style="width: 25px; margin: 0; padding: 0" src="/icon.png" />
            </template>
            {{ $t("profile") }}</v-list-item
          >
        </template>
      </v-tooltip>
      <template v-for="item in items">
        <v-tooltip :text="item.title" aria-label="Tooltip">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :to="localePath(item.to)"
              :prepend-icon="item.icon"
              role="option"
            >
              {{ $t(item.title) }}</v-list-item
            >
          </template>
        </v-tooltip>
      </template>
    </v-list>
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
          title: "cv",
          icon: "mdi-text-box",
          to: "cv",
        },
        {
          title: "portfolio",
          icon: "mdi-briefcase",
          to: "portfolio",
        },
        {
          title: "blog",
          icon: "mdi-post",
          to: "blog",
        },
      ],
    };
  },
  mounted() {
    const ref: any = this.$refs.navigation;
    for (const element of ref.$el.nextElementSibling.children)
      element.setAttribute("data-tauri-drag-region", "true");
  },
};
</script>
