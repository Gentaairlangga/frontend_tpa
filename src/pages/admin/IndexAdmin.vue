<template>
  <q-page padding>
    <div class="row q-mt-md q-col-gutter-sm">
      <div class="col-md-4 col-xs-12" v-for="(d, i) in listTpa" :key="i">
        <q-card flat>
          <q-card-section class="text-h6"> {{ d.nama }} </q-card-section>
          <q-card-section>
            <div class="q-mb-sm">
              <div class="text-caption">Ketua TPA</div>
              <div>{{ d.ketuaTpa }}</div>
            </div>
            <div class="q-mb-sm">
              <div class="text-caption">Alamat</div>
              <div>{{ d.alamat }}</div>
            </div>
            <div class="q-mb-sm">
              <div class="text-caption">Deskripsi</div>
              <div>{{ d.deskripsi }}</div>
            </div>
            <div class="q-mb-sm">
              <div class="text-caption">No Telp</div>
              <div>{{ d.nomorTelphone }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      listTpa: [],
      keyword: null,
    };
  },
  created() {
    this.getTpa();
  },
  methods: {
    getTpa() {
      this.$axios
        .get(`tpa/getalltpa?${this.keyword ? `nama=${this.keyword}` : ""}`)
        .then((res) => {
          this.listTpa = res.data.data;
        });
    },
  },
};
</script>
