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
        <h2>You (almost) can't use Python or other languages in general</h2>
        <p>
          So this is for me not just obvious that it's the case, entirely
          understandable, and desireable. However, I figured I'd point it out
          anyway since I've seen far too many people wishing to use Python and
          Node.js in their Tauri app, and if you ask me, they simply don't
          belong anywhere near your Tauri app.
        </p>
        <p>
          One user recently wanted to use Flask (a Python framework) in Tauri.
          While Tauri doesn't care how you develop your frontend, it's still the
          case that Tauri when you create a released version wants you to supply
          a statically built website. For this reason it simply isn't viable to
          use Flask unless you find a way to turn it into SSG/SPA. The same goes
          for any language and framework you can find. Just because you can
          technically bundle a python executable with your app doesn't mean you
          should. You can technically develop a Flask server, bundle python and
          your scripts with your app, and run it. But you're going to be using
          worse web tech for the purpose (just because you like Flask doesn't
          mean it's good or recommended), not to mention the fact that the setup
          itself is prone to issues and will cause you a much larger headache
          down the line.
        </p>
        <p>
          Your frontend HAS to use javascript, because your frontend is ran in a
          webview, so however you get there, whatever you program in, the final
          product has to be a folder containing javascript.
        </p>
        <p>
          Your backend SHOULD use Rust, because while you can sidecar python or
          nodejs with it, it's a much worse solution than learning Rust.
        </p>
        <p>
          The only semi valid reason for wanting another backend language is
          that you already have an app that you want to convert to a Tauri app,
          and you've made it in another language. If I worked at a corporation
          that wanted to perform this I would basically demand that we convert
          everything to Rust, because it just isn't a good idea to use another
          language in the backend when you make a Tauri app. There are other
          frameworks out there that let you use other languages, I would never
          want to be in charge of porting an Electron app to Tauri if the idea
          is to keep the Node.js backend code, I would demand redeveloping it in
          Rust.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
