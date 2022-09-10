<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="q-mb-md">
          Mohon Isi Form Berikut Ini Untuk Menambahkan TPA !!
        </div>
        <q-form @submit="onSubmit">
          <q-input
            v-model="form.nama"
            label="Masukan Nama TPA"
            filled
            :rules="[
              (val) => (val !== null && val !== '') || 'Mohon isi nama tpa',
            ]"
          />
          <q-input
            v-model="form.alamat"
            label="Masukan Alamat TPA"
            filled
            :rules="[
              (val) => (val !== null && val !== '') || 'Mohon isi nama tpa',
            ]"
          />
          <q-input
            v-model="form.ketuaTpa"
            label="Masukan Ketua TPA"
            filled
            :rules="[
              (val) => (val !== null && val !== '') || 'Mohon isi KetuaTpa',
            ]"
          />
          <q-input
            v-model="form.nomorTelphone"
            label="Masukan nomorTelphone"
            filled
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Mohon isi nomorTelphone',
            ]"
          />
          <q-input
            v-model="form.email"
            label="Masukan email"
            filled
            :rules="[
              (val) => (val !== null && val !== '') || 'Mohon isi email',
            ]"
          />
          <q-input
            v-model="form.latitude"
            label="Masukan latitude"
            filled
            :rules="[(val) => (val !== null && val !== '') || 'Mohon isi ']"
          />
          <q-input
            v-model="form.longitude"
            label="Masukan longitude"
            filled
            :rules="[(val) => (val !== null && val !== '') || 'Mohon isi ']"
          />
          <q-input
            v-model="form.deskripsi"
            label="Masukan deskripsi"
            filled
            :rules="[
              (val) => (val !== null && val !== '') || 'Mohon isi Deskripsi ',
            ]"
          />
          <q-btn label="Simpan Data" unelevated type="submit" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      form: {
        nama: null,
        alamat: null,
        ketuaTpa: null,
        nomorTelphone: null,
        email: null,
        latitude: null,
        longitude: null,
        deskripsi: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios.post("tpa/input", this.form).then((res) => {
        if (res.data.sukses) {
          this.$q.notify({
            color: "positive",
            textColor: "white",
            message: res.data.pesan,
          });
          this.$router.push({
            name: "dataTpaAdmin",
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
