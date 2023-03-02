<template>
  <h1>TEMPLATE</h1>

  <v-navigation-drawer permanent :rail="minimize" width="300">
    <template #prepend>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-chevron-left"
          @click="minimize = !minimize"
        ></v-list-item>
      </v-list>
    </template>
    <v-container fluid class="pa-0 ma-0" v-if="!minimize">
      <v-row no-gutters>
        <v-col cols="4">
          <v-list density="compact" nav v-model="selected">
            <v-list-item
              v-for="section in sections"
              :title="section.name"
              :value="section"
              @click="selected = section"
              :active="selected.name === section.name"
            ></v-list-item>
          </v-list>
        </v-col>
        <v-col cols="8">
          <v-list density="compact" nav>
            <v-list-item
              v-for="post in selected.posts"
              :title="post.title"
              subtitle="2023-03-03"
              value="home"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
const sections = [
  {
    name: "Tauri",
    posts: [
      {
        title: "Hello Worldz",
        date: new Date(),
      },
    ],
  },
  {
    name: "Rust",
    posts: [
      {
        title: "Hello World",
        date: new Date(),
      },
    ],
  },
].sort();
export default {
  data() {
    return {
      minimize: false,
      selected: sections[0],
      sections: sections,
    };
  },
};
</script>
