<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Window styling</h1>
        <p>
          One of the first things I like to fix in my Tauri projects is the
          window styling. Not the frontend content itself, just the window.
        </p>
        <p>
          Since I'm on Windows and have a Ubuntu VM, but no Mac at my disposal,
          I'll only be styling this for my platforms. It's not that I don't care
          about Mac users (well, not only anyway), it's just that it's basically
          impossible to develop for and debug things related to Mac when you
          don't own one. Send me on and I'll happily add instructions for it! x)
        </p>
        <p>
          First we remove window decorations. This removes everything
          surrounding the window. Then we make it transparent which alleviates
          the white flash that can happen on startup. Then we add a window
          shadow to make it look really nice and native using a plugin and
          invoking a Tauri command when the app has been loaded (otherwise you
          get just a weird shadow border appearing while the page loads).
          Finally we apply <code>data-tauri-drag-region</code> to any elements
          that should be draggable.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
