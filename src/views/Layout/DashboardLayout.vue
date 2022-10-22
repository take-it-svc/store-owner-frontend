<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" @drawerEvent="drawer = !drawer" :userInfo="userInfo"/>
    <Topbar @drawerEvent="drawer = !drawer"
            :notificationCounts="notificationCounts"
            :userInfo="userInfo"
    />
    <v-main>
      <v-container class="px-5" fluid>
        <router-view
            v-on:plusCount="notificationCounts++"
            v-on:minusCount="notificationCounts--"
            :userInfo="userInfo"
        ></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './SidebarLayout.vue'
import Topbar from "./TopbarLayout.vue";
import notificationApi from "@/api/notificationApi";
import userApi from "@/api/userApi";

export default {
  components: {
    Sidebar, Topbar
  },
  data: function () {
    return {
      drawer: true,
      notificationCounts: 0,
      userInfo: {},
    }
  },
  async mounted() {
    await this.getNotificationCounts();
    this.userInfo = await this.getUserInfo();
  },
  methods: {
    getNotificationCounts: async function () {
      const response = await notificationApi.countNotifications();
      this.notificationCounts = response.data.data;
    },
    getUserInfo: async function () {
      const response = await userApi.requestUserInfo();
      return response.data.data;
    }
  }
}
</script>
