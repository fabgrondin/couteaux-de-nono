<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <h1 class="bg-red-500">Hello, world!</h1>

    <ul>
      <li v-for="(post, index) in $page.posts.edges" :key="index">
        <img :src="post.node.thumbnail" alt width="135" />
        {{ post.node.title }}
      </li>
    </ul>

    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>
  </Layout>
</template>

<page-query>
query {
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
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
