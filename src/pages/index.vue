<template>
  <v-container fluid class="pa-0 my-full-width my-fill-height" justify="center" align="center">
    <v-row no-gutters justify="center" align="center" class="my-fill-height my-background">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-img style="z-index: 2" :src="mig" class="my-portrait">
        </v-img>
        <!--<div class="my-glow"></div>-->
      </v-col>
      <v-col cols="12" sm="3" md="4" lg="3" align="center" justify="center">
        <h1 style="z-index: 2;text-align:center">Simon Hyll</h1>
        <h2 style="z-index: 2;text-align: center;">Software developer</h2>
        <v-row style="padding: 1cm">
          <v-col cols="6" sm="12" md="6">
            <v-btn prepend-icon="mdi-linkedin" width="100%" stacked style="z-index:2" target="_blank"
              :href="links.linkedin" color="#0a66c2">LinkedIn</v-btn>
          </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-btn prepend-icon="mdi-youtube" width="100%" stacked style="z-index:2" target="_blank" :href="links.youtube"
              color="#f00">Youtube</v-btn>
          </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-btn prepend-icon="mdi-twitter" width="100%" stacked style="z-index:2" target="_blank" :href="links.twitter"
              color="#1d9bf0">Twitter</v-btn>
          </v-col>
          <v-col cols="6" sm="12" md="6">
            <v-btn prepend-icon="mdi-github" width="100%" stacked style="z-index:2" target="_blank" :href="links.github"
              color="#0d1117">Github</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="glowing-mouse"></div>
  </v-container>
</template>

<script lang="ts">
// @ts-ignore
import mig from "~/assets/images/mig.jpg";

export default {
  data() {
    return {
      mig,
      links: {
        linkedin: 'https://www.linkedin.com/in/simon-hyll/',
        youtube: 'https://youtube.com/@hyllsimon',
        twitter: 'https://twitter.com/simonhyll',
        github: 'https://github.com/simonhyll'
      }
    };
  },
  mounted() {
    const self = this;
    document.addEventListener('mousemove', self.mouseMove)
  },
  beforeUnmount() {
    const self = this;
    document.removeEventListener('mousemove', self.mouseMove)
  },
  methods: {
    mouseMove(e: MouseEvent) {
      const mouse: any = document.querySelector('.glowing-mouse');
      mouse.style.left = e.clientX - 35 + 'px';
      mouse.style.top = e.pageY - 35 + 'px';
    }
  }
};
</script>

<style>
.my-background {
  background-color: #000;
  background-size: 400px;
  box-shadow: inset 0 0 50px rgba(39, 130, 207, 0.3);
  position: relative;
  cursor: url('/ferris_tiny.png'), auto;
}

.glowing-mouse {
  height: 100px;
  width: 100px;
  z-index: 1;
  background: radial-gradient(circle, rgb(39, 130, 207) 0%, rgba(255, 255, 255, 0) 70%);
  opacity: 0.4;
  background-size: 90% 90%;
  background-repeat: no-repeat;
  background-position: center;
  animation: glowing 1s ease-in-out infinite;
  position: fixed;
  pointer-events: none;
}

@keyframes glowing {
  0% {
    background-size: 90% 90%;
  }

  50% {
    background-size: 100% 100%;
  }

  100% {
    background-size: 90% 90%;
  }
}

.my-full-width {
  position: absolute;
  left: 0;
}

.my-fill-height {
  height: calc(100vh - var(--v-layout-top))
}

.my-portrait {
  margin: 2cm;
  border-radius: 100%;
  box-shadow: 0px 0px 20px 0px #2782cf;
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-top: 5px;
}

.my-glow {
  content: '';
  display: inline-block;
  width: 5cm;
  height: 5cm;
  position: absolute;
  background: radial-gradient(circle, #2782cf 0%, rgba(255, 255, 255, 0) 70%);
  opacity: 0.4;
  left: calc(50% - 5cm);
  bottom: 0;
  transform: rotateX(70deg);
  animation: gloglo 3s ease-in-out infinite;
}

@keyframes gloglo {
  0% {
    width: 5cm;
    height: 5cm;
  }

  50% {
    width: 4.8cm;
    height: 4.8cm;
  }

  100% {
    width: 5cm;
    height: 5cm;
  }
}

@keyframes floating {
  0% {
    transform: translate(0, 0px);
    box-shadow: 0px 0px 20px 0px #2782cf;
  }

  50% {
    transform: translate(0, 5px);
    box-shadow: 0px 0px 20px 0px #fecb00;
  }

  100% {
    transform: translate(0, -0px);
    box-shadow: 0px 0px 20px 0px #2782cf;
  }
}
</style>
