<template>
  <v-container fluid class="contact-dialog">
    <v-row justify="end">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-5 mt-5"
            fab
            v-bind="attrs"
            v-on="on"
            x-large
            color="#fda051"
            ><v-icon>mdi-email-outline</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title class="text-h3 justify-center font-gloria text-fire"
            >Contact</v-card-title
          >
          <form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <v-card-text>
              <v-form>
                <input type="hidden" name="form-name" value="contact" />
                <v-text-field
                  ref="email"
                  title="E-mail"
                  label="E-mail*"
                  v-model="email"
                  :rules="[() => !!email || 'Champ requis']"
                  required
                ></v-text-field>
                <v-textarea
                  ref="message"
                  title="Message"
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
              <v-btn @click="send">Envoyer</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </v-row>
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
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    send() {
      const data = this.encode({
        "form-name": "contact",
        email: this.email,
        message: this.message,
      });

      fetch("/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        referrerPolicy: "no-referrer",
        body: data,
      })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      this.resetForm();
      this.dialog = false;
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