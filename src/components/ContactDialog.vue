<template>
  <v-container fluid class="contact-dialog">
    <v-row justify="end">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-5 mt-1 btn-fire"
            fab
            v-bind="attrs"
            v-on="on"
            :x-large="$vuetify.breakpoint.mdAndUp ? true : false"
            ><v-icon>mdi-email-outline</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title class="text-h3 justify-center font-gloria text-fire"
            >Contact</v-card-title
          >
          <form name="contact" @submit="handleSubmit">
            <input type="hidden" name="foldername" />
            <v-card-text>
              <v-form>
                <v-text-field
                  ref="email"
                  title="E-mail"
                  name="email"
                  label="E-mail*"
                  v-model="email"
                  :rules="[() => !!email || 'Champ requis']"
                  required
                ></v-text-field>
                <v-textarea
                  ref="message"
                  title="Message"
                  name="message"
                  label="Message*"
                  v-model="message"
                  :rules="[() => !!message || 'Champ requis']"
                  required
                ></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="
                  resetForm();
                  dialog = false;
                "
                >Fermer</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn :loading="loading" @click="handleSubmit">Envoyer</v-btn>
            </v-card-actions>
          </form>
        </v-card>
        <v-snackbar v-model="snackbarError" color="red" centered
          >Une erreur s'est produite</v-snackbar
        >
      </v-dialog>
    </v-row>
    <v-snackbar v-model="snackbarSuccess" color="green" centered
      >Votre message a été envoyé</v-snackbar
    >
  </v-container>
</template>

<script>
export default {
  name: "ContactDialog",
  data() {
    return {
      dialog: false,
      email: "",
      message: "",
      loading: false,
      snackbarError: false,
      snackbarSuccess: false,
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    submitToServer() {
      return new Promise((resolve, reject) => {
        fetch(`${process.env.GRIDSOME_FUNCTIONS_URL}/mail`, {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            message: this.message,
          }),
        })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    submitToNetlify() {
      return new Promise((resolve, reject) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({
            "form-name": "contact",
            email: this.email,
            message: this.message,
          }),
        })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    handleSubmit() {
      this.loading = true;
      this.submitToNetlify()
        .then((response) => {
          if (Number(response.status) !== 200) {
            this.snackbarError = true;
          } else {
            this.snackbarSuccess = true;
            this.resetForm();
            this.dialog = false;
          }
        })
        .catch((err) => {
          this.snackbarError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.email = "";
      this.message = "";
      this.$refs.email.reset();
      this.$refs.message.reset();
    },
  },
};
</script>

<style scoped>
.contact-dialog {
  position: sticky;
  top: 20px;
  z-index: 999;
}
</style>