<template>
  <v-content>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-10">
          <v-toolbar color="grey">
            <v-toolbar-title>로그인</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                  v-model="email"
                  :rules="[v => /.+@.+\..+/.test(v) || 'E-mail must be valid', v => !!v || '이메일은 필수 값입니다']"
                  v-on:keydown.enter="login"
                  name="이메일"
                  label="이메일"
                  type="text"
                  prepend-icon="mdi-account-box"
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  :rules="[v => !!v || '비밀번호는 필수 값입니다']"
                  v-on:keydown.enter="login"
                  name="비밀번호"
                  label="비밀번호"
                  type="password"
                  prepend-icon="mdi-lock"
                  append-icon="mdi-eye-off"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="white" v-on:click="login">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import userApi from '../api/userApi.js'
import jwt from "@/common/jwt";

export default {
  name: "LoginUserView",
  data() {
    return {
      email: 'owner@gmail.com',
      password: '1234'
    };
  },
  mounted() {
    if (false === jwt.isExpired()) {
      this.$router.push('/');
    }
  },
  methods: {
    links: function (url) {
      this.$router.push(url);
    },
    login: async function () {
      if (!this.$refs.form.validate()) {
        return;
      }
      const flag = await userApi.requestLoginUser(this.email, this.password);

      if (flag) {
        await this.$router.push('/');
      }
    }
  }
}
</script>
