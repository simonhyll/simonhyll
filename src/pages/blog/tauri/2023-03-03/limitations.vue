<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Limitations</h1>
        <h2>The IPC is slow</h2>
        <p>
          Currently the IPC uses JSON objects to communicate. This along with
          the fact that (at least as far as I can tell) those objects aren't
          communicated using sockets, but rather function calls back and forth,
          means that you can't easily transmit large amounts of data back and
          forth.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
