<template>
  <Layout>
    <v-parallax :src="$page.background.image.src" style="height: 90vh">
      <v-row align-content="start">
        <v-col>
          <h1
            class="text-center font-gloria text-fire text-display"
            :class="$vuetify.breakpoint.smAndDown ? 'sm' : ''"
          >
            Les couteaux de Nono
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <contact-dialog></contact-dialog>
    <v-container fluid>
      <v-row justify="center" class="mb-4">
        <v-col cols="12" lg="10">
          <div
            class="font-gloria text-fire text-h2 text-lg-h1 word-break-normal justify-center"
          >
            Arnaud Calligher
          </div>
          <v-row>
            <v-col>
              <g-image
                src="@/assets/profil.jpg"
                width="400"
                contain
                class="float-left ma-4"
                immediate
              ></g-image>
              <div class="text-h6 text-lg-h4 pa-4">
                Forgeron coutelier amateur, voici quelques photos de mes
                réalisations, n'hésitez pas à me contacter pour plus de détails.
                <br />
                Arnaud
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-lazy
          min-width="100%"
          v-for="(post, index) in $page.posts.edges"
          :key="index"
          v-model="cardsActive[index]"
        >
          <v-card
            min-width="100%"
            :class="index === 0 ? 'mb-6 mb-md-12' : 'my-6 my-md-12'"
          >
            <!-- <v-card-title
              v-if="post.node.title"
              class="font-gloria text-fire text-h2 text-lg-h1 word-break-normal justify-center"
              :class="index % 2 === 0 ? 'justify-xl-start' : 'justify-xl-end'"
              >{{ post.node.title }}</v-card-title
            > -->
            <v-row
              align-content="center"
              :class="index % 2 === 0 ? '' : 'flex-row-reverse'"
            >
              <v-col cols="12" :lg="post.node.content ? 6 : 12">
                <g-image
                  :src="post.node.thumbnail"
                  style="width: 100%"
                  immediate
                ></g-image>
              </v-col>
              <v-col
                v-if="post.node.content"
                cols="12"
                lg="6"
                class="d-flex flex-column justify-lg-center"
              >
                <v-card-text
                  class="text-h6 text-lg-h4 text-center"
                  :class="index % 2 === 0 ? 'text-lg-left' : 'text-lg-right'"
                  v-html="post.node.content"
                ></v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-lazy>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>
query {
  background:backgrounds(id: 2) {
    id
    image(height: 800, quality: 70)
  },
 posts: allPost(sortBy: "order", order: ASC) {
    edges {
      node {
        id
        title
        thumbnail(width: 700, quality: 70)
        content
      }
    }
  }
}
</page-query>

<script>
import ContactDialog from "@/components/ContactDialog";

export default {
  metaInfo: {
    title: "Accueil",
  },
  components: { ContactDialog },
  data() {
    return {
      cardsActive: [],
    };
  },
  created() {
    this.cardsActive = new Array(this.$page.posts.edges.length).fill(false);
  },
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";

.home-links a {
  margin-right: 1rem;
}

.word-break-normal {
  word-break: normal;
}

.text-display {
  font-size: 108px;
  letter-spacing: 0.2em;
  &.sm {
    font-size: 60px;
  }
}

.font-gloria {
  font-family: "Gloria Hallelujah", cursive !important;
}

.text-fire {
  color: #fda051;
  text-shadow: 0px -2px 4px #fff, 0px -2px 10px #ff3, 0px -10px 20px #f90,
    0px -20px 40px #c33;
}

.btn-fire {
  background-color: #fda051 !important;
  box-shadow: 0px 0px 4px #fff, 0px 0px 10px #ff3, 0px 0px 20px #f90,
    0px 0px 40px #c33 !important;
}
</style>
