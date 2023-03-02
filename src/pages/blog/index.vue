<template>
  <h1>TEMPLATE</h1>

  <v-navigation-drawer permanent width="300">
    <v-container fluid class="pa-0 ma-0">
      <v-row no-gutters>
        <v-col cols="4">
          <v-list density="compact" nav>
            <v-list-item title="Tauri" value="home"></v-list-item>
            <v-list-item title="Rust" value="contacts"></v-list-item>
          </v-list>
        </v-col>
        <v-col cols="8">
          <v-list density="compact" nav>
            <v-list-item
              title="Tauri"
              subtitle="2023-03-02"
              value="home"
            ></v-list-item>

            <v-list-item title="Contacts" value="contacts"></v-list-item>

            <v-list-item title="Settings" value="settings"></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>
