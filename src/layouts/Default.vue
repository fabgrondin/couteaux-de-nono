<template>
  <div class="bg-black text-gray-100">
    <div class="container min-h-screen flex flex-col mx-auto px-2 lg:px-0">
      <header class="flex justify-center md:justify-end items-center h-20 px-2">
        <nav class="nav">
          <g-link
            class="px-2 border-2 border-transparent rounded-md transition-colors duration-500 hover:bg-gray-900"
            exact-active-class="border-gray-100"
            to="/"
          >Accueil</g-link>
          <g-link
            class="ml-6 px-2 border-2 border-transparent rounded-md transition-colors duration-500 hover:bg-gray-900"
            exact-active-class="border-gray-100"
            to="/mes-couteaux"
          >Mes couteaux</g-link>
          <g-link
            class="ml-6 px-2 border-2 border-transparent rounded-md transition-colors duration-500 hover:bg-gray-900"
            exact-active-class="border-gray-100"
            to="/a-propos"
          >À propos</g-link>
        </nav>
      </header>
      <main class="flex-grow">
        <slot />
      </main>
      <footer class="flex justify-center mb-2">
        <p>Les couteaux de Nono © {{ (new Date()).getFullYear() }}</p>
      </footer>
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
