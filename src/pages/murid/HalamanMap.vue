<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div>TPA HAVERSINE</div>
      </q-card-section>
      <q-card-section>
        <div style="height: 400px">
          <l-map :zoom="zoom" :center="center" v-if="loaded">
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker
              :lat-lng="[d.latitude, d.longitude]"
              v-for="(d, i) in listTpa"
              :key="i"
            >
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="/img/mosque.png"
              />
              <l-popup>
                <div>{{ d.nama }}</div>
                <div>
                  Jarak : {{ Number(d.jarak).toFixed(2) }} {{ d.satuan }}
                </div>
              </l-popup>
            </l-marker>
            <l-marker :lat-lng="[lat, lng]">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="/img/placeholder.png"
              />
              <l-popup>Lokasi Anda</l-popup>
            </l-marker>
          </l-map>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },
  data() {
    return {
      iconSize: 32,
      icon: L.icon({
        iconUrl: "static/images/baseball-marker.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      listTpa: [],
      keyword: null,
      loaded: false,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "Maps TPA",
      zoom: 12,
      center: L.latLng([-5.4170269, 105.2689625]),
      markerLatLng: [-5.4170269, 105.2689625],
      lat: 0,
      lng: 0,
    };
  },
  created() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.getTpa();
    });
  },
  methods: {
    getTpa() {
      this.loaded = false;
      console.log(this.lat, this.lng);
      // this.$axios.get(`tpa/gethaversine/${lat}/${lng}`).then((res) => {
      //   this.listTpa = res.data.data;
      //   this.loaded = true;
      // });
      this.$axios
        .post(`tpa/gethaversine`, {
          lat: this.lat,
          lng: this.lng,
        })
        .then((res) => {
          this.listTpa = res.data.data;
          this.loaded = true;
        });
    },
  },
};
</script>
