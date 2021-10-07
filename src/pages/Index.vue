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
                width="300"
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
        <template v-for="(photo, index) in $page.photos.edges">
          <g-image class="ma-2" :src="photo.node.image" :key="index"></g-image>
        </template>
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
 photos: allPhoto {
    edges {
      node {
        id
        image(width: 300, height: 300, quality: 70, fit: contain)
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
    this.cardsActive = new Array(this.$page.photos.edges.length).fill(false);
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
