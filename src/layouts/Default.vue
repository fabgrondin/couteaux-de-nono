<template>
  <div class="w-screen h-screen bg-black text-white">
    <div class="container mx-auto">
      <header class="flex justify-end items-center mb-4 h-20 px-2">
        <nav class="nav">
          <g-link class="ml-6" to="/">Accueil</g-link>
          <g-link class="ml-6" to="/mes-couteaux">Mes couteaux</g-link>
          <g-link class="ml-6" to="/a-propos/">À propos</g-link>
        </nav>
      </header>
      <slot />
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
</style>
