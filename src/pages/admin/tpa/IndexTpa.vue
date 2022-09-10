<template>
  <q-page padding>
    <q-table :columns="columns" :rows="rows" :loading="loading">
      <template v-slot:top>
        <div>Data TPA</div>
        <q-space></q-space>
        <q-input v-model="keyword" dense borderless label="Cari Nama TPA">
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template> </q-input
        ><q-btn
          label="TAMBAH TPA"
          :to="{ name: 'formInputTpa' }"
          color="primary"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="alamat" :props="props">
            {{ props.row.alamat }}
          </q-td>
          <q-td key="ketuaTpa" :props="props">
            {{ props.row.ketuaTpa }}
          </q-td>
          <q-td key="nomorTelphone" :props="props">
            {{ props.row.nomorTelphone }}
          </q-td>
          <q-td key="deskripsi" :props="props">
            {{ props.row.deskripsi }}
          </q-td>
          <q-td>
            <div class="justify-center q-gutter-x-xs">
              <q-btn
                label="Edit"
                color="warning"
                icon="edit"
                unelevated
                :to="{ name: 'formEditTpa', params: { id: props.row._id } }"
              />
              <q-btn
                label="Hapus"
                @click="deleteTpa(props.row._id)"
                color="negative"
                icon="delete"
                unelevated
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      rows: [],
      columns: [
        { name: "nama", field: "nama", label: "Nama", align: "left" },
        { name: "alamat", field: "alamat", label: "Alamat", align: "left" },
        {
          name: "ketuaTpa",
          field: "ketuaTpa",
          label: "Ketua TPA",
          align: "left",
        },
        {
          name: "nomorTelphone",
          field: "nomorTelphone",
          label: "No Telphone",
          align: "left",
        },
        {
          name: "deskripsi",
          field: "deskripsi",
          label: "Deskripsi",
          align: "left",
        },
        {
          name: "aksi",
          field: "aksi",
          label: "Aksi",
          align: "left",
        },
      ],
      keyword: null,
      loading: false,
    };
  },
  created() {
    this.getTpa();
  },
  methods: {
    getTpa() {
      this.loading = true;
      this.$axios.get("tpa/getalltpa").then((res) => {
        this.loading = false;
        if (res.data.sukses) {
          this.rows = res.data.data;
        } else {
          this.$q.notify({
            color: "negative",
            textColor: "white",
            message: res.data.pesan,
          });
        }
      });
    },
    deleteTpa(id) {
      this.$q
        .dialog({
          title: "Konfirmasi",
          message: "Yakin Hapus?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$axios.get(`tpa/hapus/${id}`).then((res) => {
            if (res.data.sukses) {
              this.$q.notify({
                color: "positive",
                textColor: "white",
                message: res.data.pesan,
              });
              this.getTpa();
            } else {
              this.$q.notify({
                color: "negative",
                textColor: "white",
                message: res.data.pesan,
              });
            }
          });
        });
    },
  },
};
</script>
