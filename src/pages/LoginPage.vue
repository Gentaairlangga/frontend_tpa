<template>
  <q-layout>
    <q-page-container class="bg-grey-3">
      <q-page padding>
        <div class="row">
          <div class="col-md-5 col-lg-4 col-xs-12 fixed-center q-pa-md">
            <q-card flat>
              <q-card-section>
                <div class="row items-center justify-center">
                  <q-img src="img/TPA KU.png" width="140px" />
                </div>
                <br />
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input
                    filled
                    v-model="username"
                    label="Username"
                    hint="masukan username *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'silahkan masukan username',
                    ]"
                  />

                  <q-input
                    filled
                    type="password"
                    v-model="password"
                    label="masukan password"
                    hint="masukan password *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'silahkan masukan password',
                    ]"
                  />

                  <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                  <div>
                    <q-btn
                      label="Login"
                      class="full-width"
                      unelevetad
                      type="submit"
                      color="primary"
                    />
                    <q-btn
                      label="Registrasi"
                      :to="{ name: 'halamanRegistrasi' }"
                      color="primary"
                      flat
                      class="q-ml-sm full-width q-mt-sm"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,

      accept: false,
    };
  },

  methods: {
    onSubmit() {
      this.$axios
        .post("user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data.sukses) {
            const user = res.data.data;
            if (user.level === 1) {
              this.$q.localStorage.set("user", user);
              this.$router.push({
                name: "indexAdmin",
              });
            } else if (user.level === 2) {
              this.$q.localStorage.set("user", user);
              this.$router.push({
                name: "indexMurid",
              });
            } else {
              this.$q.notify({
                color: "negative",
                textColor: "white",
                message: "Halaman Tidak Tersedia",
              });
            }
          } else {
            this.$q.notify({
              color: "negative",
              textColor: "white",
              message: res.data.pesan,
            });
          }
        });
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
  },
};
</script>
