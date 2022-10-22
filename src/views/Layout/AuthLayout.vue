<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        rounded
        elevation="7"
    >
      <v-img
          height="50"
          :src="require('@/assets/take-it.png')"
          contain/>

      <v-tabs
          centered
          color="grey darken-1"
      >
        <v-tab
            v-for="(link, i) in links"
            :key="i"
            v-on:click="goLink(link[1])"
        >
          {{ link[0] }}
        </v-tab>
      </v-tabs>
      <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
  data: () => ({
    links: [
      ['로그인', '/login'],
      ['프로필', '/login'],
      ['회원가입', '/register'],
    ],
  }),
  methods: {
    goLink: function (url) {
      this.$router.push(url);
    },
  }
}
</script>
