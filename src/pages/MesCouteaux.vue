<template>
  <layout>
    <h1>Mes couteaux</h1>

    <ul>
      <li v-for="(post, index) in $page.posts.edges" :key="index">
        <img :src="post.node.thumbnail" alt width="135" />
        {{ post.node.title }}
      </li>
    </ul>
  </layout>
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
    title: "Mes couteaux"
  }
}
</script>