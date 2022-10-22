<template>
  <!-- <v-navigation-drawer v-model="drawer" app> -->
  <v-navigation-drawer
      v-model="drawer_sidebar"
      app>
    <v-list>
      <v-list-item v-for="(link,index) in links" :key="link.icon" link @click="clickRoute(index, link.url)">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      drawer_sidebar: null,
      links: [
        {name: "메인페이지", url: "/dashboard", icon: "mdi-monitor-dashboard"},
        {name: "주문 일별 조회", url: "/order", icon: "mdi-order-numeric-ascending"},
        {name: "주문 기간 조회", url: "/prev-order", icon: "mdi-clipboard-check-outline"},
        {name: "메뉴 관리", url: "/menu", icon: "mdi-cog-outline"},
        {name: "음료 카테고리", url: "/category", icon: "mdi-shape-outline"},
        {name: "알림", url: "/notification", icon: "mdi-bell-outline"},
      ],
    };
  },
  watch: {
    drawer() {
      this.drawer_sidebar = !this.drawer_sidebar
    },
  },
  mounted() {
    const path = this.$route.path
    this.links.forEach((link, idx) => {
      if (link.url === path) {
        this.value = idx
      }
    })
  },
  methods: {
    clickRoute: function (idx, url) {
      this.value = idx;
      this.$router.push(url);
    }
  }
};
</script>
