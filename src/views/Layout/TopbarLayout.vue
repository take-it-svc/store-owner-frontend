<template>
  <v-app-bar
      app elevation="7"
      rounded color="white">
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"/>
    <v-img
        height="50"
        :src="require('@/assets/take-it.png')"
        contain
        @click="links('/dashboard')"
    />
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
            style="cursor: pointer"
            v-bind="attrs"
            v-on="on"
        >
          <v-btn @click="links('/notification')"
                 elevation="0"
                 color="white"
          >
            <v-badge :content="notificationCounts"
                     :value="notificationCounts"
                     color="red" offset-y="10" offset-x="10">
              <v-icon>mdi-alarm-light</v-icon>
            </v-badge>
          </v-btn>
        </span>
      </template>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <span
            style="cursor: pointer"
            v-bind="attrs"
            v-on="on">
          <v-chip link>
              <v-avatar>
                <v-icon>mdi-account-box</v-icon>
              </v-avatar>
            <span class="ml-2">{{ userInfo.name }}</span>
          </v-chip>
        </span>
      </template>
      <v-list width="200" class="py-0">
        <v-list-item two-line link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import authApi from "../../api/authApi";

export default {
  props: ["notificationCounts", "userInfo"],
  methods: {
    logout: async function () {
      await authApi.logout();
    },
    links: function (url) {
      this.$router.push(url);
    },
  }
};
</script>
