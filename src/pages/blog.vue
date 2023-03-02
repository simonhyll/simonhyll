<template>
  <v-navigation-drawer permanent :rail="minimize" width="300">
    <template #prepend>
      <v-list density="compact" nav style="padding-bottom: 0">
        <v-list-item
          :prepend-icon="minimize ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          @click="minimize = !minimize"
        ></v-list-item>
      </v-list>
    </template>
    <v-container fluid class="pa-0 ma-0">
      <v-row no-gutters>
        <v-col :cols="minimize ? 12 : 4" v-if="!minimize">
          <v-list density="compact" nav color="primary">
            <v-list-item
              v-for="section in sections"
              :title="section.name"
              :value="section"
              @click="selected = section"
              :active="selected.name === section.name"
            ></v-list-item>
          </v-list>
        </v-col>
        <v-col :cols="minimize ? 12 : 8">
          <v-list density="compact" nav color="primary">
            <v-list-item
              v-for="post in selected.posts"
              :title="post.read ? checkmark + ' ' + post.title : post.title"
              :subtitle="post.date.toLocaleDateString()"
              :value="
                selected.name + post.title + post.date.toLocaleDateString()
              "
              :to="localePath(post.to)"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
  <NuxtPage></NuxtPage>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<script lang="ts">
const sections = [
  {
    name: "Tauri",
    posts: [
      {
        title: "Hello World",
        date: new Date(),
        read: false,
        to: "blog-tauri-2023-03-02-hello-world",
      },
    ],
  },
].sort();
export default {
  data() {
    return {
      minimize: false,
      checkmark: "✅",
      selected: sections[0],
      sections: sections,
    };
  },
};
</script>
