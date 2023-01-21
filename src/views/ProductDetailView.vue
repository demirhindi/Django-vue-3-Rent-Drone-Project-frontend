<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="row" v-for="drone in drones" v-bind:key="drone.id">
            <div class="col-md-6">
              <div class="images p-3">
                <div class="text-center p-4">
                  <img
                    id="main-image"
                    :src="`http://localhost:8000${drone.image}`"
                    width="250"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="product p-4">
                <div class="mt-4 mb-3">
                  <span class="text-uppercase text-muted brand">{{
                    drone.brand
                  }}</span>
                  <h5 class="text-uppercase">{{ drone.title }}</h5>
                  <div class="price d-flex flex-row align-items-center">
                    <div class="act-price">Features</div>
                  </div>
                </div>
                <p class="about">
                  {{ drone.description }}
                </p>
                <ul
                  class="list-group"
                  v-for="feature in features"
                  v-bind:key="feature.id"
                >
                  <li class="list-group-item">
                    {{ feature.title }}: {{ feature.description }}
                  </li>
                </ul>
                <div class="sizes mt-5">
                  <h6 class="text-uppercase">Quantity:</h6>
                  <label class="radio">
                    <span>{{ drone.quantity }}</span>
                  </label>
                </div>
                <div class="cart mt-4 align-items-center">
                  <a href="/order">
                    <button class="btn btn-danger text-uppercase mr-2 px-4">
                      Rent Now
                    </button>
                  </a>
                  <i class="fa fa-heart text-muted"></i>
                  <i class="fa fa-share-alt text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductDetailView",
  data() {
    return {
      features: [],
      drones: [],
    };
  },
  mounted() {
    console.log("mounted");
    const slug = this.$route.params.slug;

    axios.get(`api/myapp/main/drone/${slug}/`).then((response) => {
      console.log(response.data);

      this.drones = response.data.drone;

      axios.get(`/api/myapp/main/feature/${slug}/`).then((response) => {
        console.log(response.data);

        this.features = response.data.feature;
      });
    });
  },
};
</script>

<style scoped>
.card {
  border: none;
}
.product {
  background-color: #eee;
}
.brand {
  font-size: 13px;
}
.act-price {
  color: rgb(0, 153, 255);
  font-weight: 700;
}
.dis-price {
  text-decoration: line-through;
}
.about {
  font-size: 14px;
}
.color {
  margin-bottom: 10px;
}
label.radio {
  cursor: pointer;
}
label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
label.radio span {
  padding: 2px 9px;

  display: inline-block;
  color: rgb(0, 153, 255);
  border-radius: 3px;
  text-transform: uppercase;
}
label.radio input:checked + span {
  border-color: rgb(0, 153, 255);
  background-color: rgb(0, 153, 255);
  color: #fff;
}
.btn-danger {
  background-color: rgb(0, 153, 255) !important;
  border-color: rgb(0, 153, 255) !important;
}
.btn-danger:hover {
  background-color: black !important;
  border-color: black !important;
}
.btn-danger:focus {
  box-shadow: none;
}
.cart i {
  margin-right: 10px;
}
</style>