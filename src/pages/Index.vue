<template>
  <Layout>
    <div>
      <div
        class="hero mx-auto h-screen bg-cover bg-center mb-12"
        :style="{'backgroundImage': `url(${$page.background.image.src})`}"
      >
        <h1 class="font-display text-5xl text-gray-100 mb-8">Les couteaux de Nono</h1>
      </div>
      <v-container class="mb-8">
        <v-card v-for="(post, index) in $page.posts.edges" :key="index">
          <g-image :src="post.node.thumbnail"></g-image>
          <v-card-title>{{ post.node.title }}</v-card-title>
        </v-card>
      </v-container>
    </div>
  </Layout>
</template>
<page-query>
query {
  background:backgrounds(id: 1) {
    id
    image
  },
 posts: allPost {
    edges {
      node {
        id,
        title,
        thumbnail
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Accueil",
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
