<template>
  <q-layout>
    <q-page-container class="bg-grey-3">
      <q-page padding>
        <div class="row justify-center">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-card flat>
              <q-card-section>
                <div class="text-h10 q-mb-lg">Registrasi</div>
                <div class="row items-center justify-center">
                  <q-img src="img/TPA KU.png" width="100px" />
                </div>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <q-input
                    filled
                    v-model="form.username"
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
                    v-model="form.password"
                    label="masukan password"
                    hint="masukan password *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'silahkan masukan password',
                    ]"
                  />

                  <q-select
                    :options="['Laki-Laki', 'Perempuan']"
                    v-model="form.jenisKelamin"
                    filled
                    label="Jenis Kelamin"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'silahkan pilih Jenis Kelamin',
                    ]"
                  />

                  <q-input
                    filled
                    v-model="form.nomorHandphone"
                    label="Nomor Handphone"
                    hint="masukan Handphone *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'silahkan masukan Handphone',
                    ]"
                  />

                  <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                  <div>
                    <q-btn label="Registrasi" type="submit" color="primary" />
                    <q-btn
                      label="Login"
                      :to="{ name: 'halamanLogin' }"
                      flat
                      color="primary"
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
      form: {
        username: null,
        password: null,
        jenisKelamin: null,
        nomorHandphone: null,
      },
    };
  },

  methods: {
    onSubmit() {
      this.$axios.post("user/register", this.form).then((res) => {
        if (res.data.sukses) {
          this.$q.notify({
            color: "positive",
            textColor: "white",
            message: res.data.pesan,
          });
          this.$router.push({
            name: "halamanLogin",
          });
        } else {
          this.$q.notify({
            color: "negative",
            textColor: "white",
            message: res.data.pesan,
          });
        }
      });
    },
  },
};
</script>
