<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <h1 class="font-display text-5xl text-gray-100 mb-8">Les couteaux de Nono</h1>
    <div class="hero w-3/4 mx-auto">
      <g-image src="~/assets/fire2.jpg" fit="contain" immediate="true"></g-image>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Accueil"
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
