<template>
  <v-navigation-drawer permanent :rail="minimize" rail-width="150" width="300">
    <template #prepend>
      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="minimize ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          @click="minimize = !minimize"
        ></v-list-item>
      </v-list>
    </template>
    <v-container fluid class="pa-0 ma-0">
      <v-row no-gutters>
        <v-col :cols="6" v-if="!minimize" v-for="section in sections">
          <v-list-item
            :title="section.name"
            :subtitle="'Posts: ' + section.posts.length"
            :value="section"
            @click="switchSection(section)"
            :active="selected.name === section.name"
          ></v-list-item>
        </v-col>
        <v-divider></v-divider>
        <v-col :cols="12">
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
        title: "What is Tauri",
        date: new Date("03 Mar 2023 00:00:00 UTC"),
        read: false,
        to: "blog-tauri-2023-03-03-what-is-tauri",
      },
      {
        title: "Hello World",
        date: new Date("02 Mar 2023 00:00:00 UTC"),
        read: false,
        to: "blog-tauri-2023-03-02-hello-world",
      },
      {
        title: "Window styling",
        date: new Date("02 Mar 2023 00:00:00 UTC"),
        read: false,
        to: "blog-tauri-2023-03-02-window-styling",
      },
      {
        title: "Limitations",
        date: new Date("02 Mar 2023 00:00:00 UTC"),
        read: false,
        to: "blog-tauri-2023-03-03-limitations",
      },
    ],
  },
  {
    name: "Rust",
    posts: [
      {
        title: "What is Rust",
        date: new Date("03 Mar 2023 00:00:00 UTC"),
        read: false,
        to: "blog-rust-2023-03-03-what-is-rust",
      },
    ],
  },
  {
    name: "Python",
    posts: [],
  },
  {
    name: "Typescript",
    posts: [],
  },
  {
    name: "Helm",
    posts: [],
  },
  {
    name: "Kubernetes",
    posts: [],
  },
  {
    name: "VSCode",
    posts: [],
  },
  {
    name: "Nuxt",
    posts: [],
  },
  {
    name: "Svelte",
    posts: [],
  },
  {
    name: "Ansible",
    posts: [],
  },
  {
    name: "Terraform",
    posts: [],
  },
  {
    name: "Programming",
    posts: [],
  },
  {
    name: "Security",
    posts: [],
  },
  {
    name: "Git",
    posts: [],
  },
  {
    name: "SQL",
    posts: [],
  },
  {
    name: "DevOps",
    posts: [],
  },
  {
    name: "Blender",
    posts: [],
  },
  {
    name: "Inkscape",
    posts: [],
  },
  {
    name: "Gimp",
    posts: [],
  },
  {
    name: "Bash",
    posts: [],
  },
  {
    name: "Docker",
    posts: [],
  },
  {
    name: "Kali",
    posts: [],
  },
  {
    name: "Flux",
    posts: [],
  },
  {
    name: "Tech stacks",
    posts: [],
  },
  {
    name: "GCP",
    posts: [],
  },
  {
    name: "Github",
    posts: [],
  },
  {
    name: "Management",
    posts: [],
  },
  {
    name: "Babylon.js",
    posts: [],
  },
].sort((a: any, b: any) => {
  if (a.posts.length < b.posts.length) return 1;
  if (a.posts.length > b.posts.length) return -1;
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});
export default {
  data() {
    return {
      minimize: false,
      checkmark: "✅",
      selected: sections[0],
      sections: sections,
    };
  },
  mounted() {
    const self = this;
    const selected = self.$route.name?.split("-")[1];
    if (selected) {
      self.selected = self.sections.find(
        (val) => val.name.toLowerCase() === selected
      );
    } else {
      self.$router.push(self.localePath(self.selected.posts[0].to));
    }
  },
  methods: {
    switchSection(section: any) {
      const self = this;
      self.selected = section;
      self.$router.push(self.localePath(self.selected.posts[0].to));
      console.log("WTF", self.selected);
    },
  },
};
</script>
