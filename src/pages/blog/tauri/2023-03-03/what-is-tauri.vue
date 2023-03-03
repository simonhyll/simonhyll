<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>What is Tauri</h1>
        <h2>Disclaimer!!</h2>
        <p>
          While I am a part of the Working Group in Tauri, that doesn't mean
          that any of my posts represent the opinions or recommendations of the
          Tauri organization. This is my personal website and my personal
          opinions, I'm just sharing my knowledge.
        </p>
        <h2>Recommendations</h2>
        <p>
          While you CAN technically develop a Tauri app without ever touching a
          single line of Rust yourself, I wouldn't recommend it unless your app
          is going to be entirely frontend based only using relatively basic
          functionalities accessible through the Tauri JS API.
        </p>
        <p>
          The way you should, in my opinion, look at Tauri is as a way of
          developing a frontend for a Rust program. Tauri isn't a backend for an
          app, the app is a frontend for a Rust based backend.
        </p>
        <p>
          As such I highly recommend learning Rust before you learn Tauri, at
          least the basics. Get a good grip on the ownership system and
          asynchronous programming at least, they tend to be what new developers
          struggle with the most because they skipped Rust and went straight for
          Tauri.
        </p>
        <p>
          Learn the basics of Rust first, then learn Tauri. I would recommend
          making a simple Actix Web based REST API before you make a Tauri app,
          it gets you familiar with Tokio and the ownership system nicely.
        </p>
        <h2>The basics</h2>
        <p>
          Tauri is an app framework that leverages web technologies to develop
          modern looking apps.
        </p>
        <p>
          Tauri is frontend agnostic in the sense that it doesn't care about
          which web based UI framework you decide to use, as long as doesn't use
          SSR, only SSG/SPA, and its output is some form of HTML/JS/CSS (maybe
          some WASM, some fonts, images, you get it). When you make a frontend
          for a Tauri app you're literally developing a website, and as long as
          your frontend is a static hosting friendly website you can choose
          whatever framework you want to develop it.
        </p>
        <p>
          Open your browser. Remove the menubar and all window decorations from
          it so all that remains is the actual area where a website is rendered.
          What you have there is a WebView, and it's what Tauri puts into a
          window in order to perform rendering.
        </p>
        <p>
          Unlike Electron, Tauri leverages system installed webviews on all
          platforms. This means there are considerations to be made when
          developing your frontend, the same ones you'd have if you were
          developing just a website. For some people, this is a massive pain
          since they feel they shouldn't need to worry about it. For others,
          like me, who plan on making their app also function as a web based PWA
          app, you'd need to take this into consideration anyway, so it changes
          nothing. What I can say in Tauri's defense over this choice to all you
          who wish Tauri had just gone with the integrated Chromium browser like
          Electron does, that's not always an alternative. For example iOS
          doesn't allow you to use any other webview than their Safari variant.
          And it has gotten difficult to pull off on Android as well. And, the
          benefit of relying on a system installed variant other than that, is
          that for you as a user you'll know that Tauri hasn't mixed with the
          webview itself to e.g. steal your passwords and such. The app
          developer might have, but Tauri hasn't. So if you have a reasonably
          new version of your system webview, you're somewhat protected by that
          fact. Furthermore it decreases the apps size considerably, making
          installations and updates faster.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
