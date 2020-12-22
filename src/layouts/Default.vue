<template>
  <v-app>
    <!-- <v-navigation-drawer class="hidden-sm-and-up" v-model="sidebar" app>
      <v-list>
        <v-list-item>
          <v-btn to="/">Accueil</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/mes-couteaux">Mes couteaux</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/a-propos">À propos</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>Les couteaux de Nono</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-btn to="/" class="mx-1">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn to="/a-propos" class="mx-1">À propos</v-btn>
      </div>
    </v-app-bar>-->
    <v-main>
      <slot />
    </v-main>
    <v-footer>
      <v-container>
        <v-row justify="center">
          <v-col class="text-center">
            <p>Les couteaux de Nono © {{ new Date().getFullYear() }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      sidebar: false,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
</style>
