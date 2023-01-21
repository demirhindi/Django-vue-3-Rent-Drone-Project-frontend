<template>
  <div class="container">
    <div id="content">
      <div class="bg-light p-2 px-md-4 px-3 shadow-sm">
        <div class="d-flex align-items-center">
          <div class="user-select-none">Drones List</div>
          <div class="fas fa-angle-right px-2"></div>
          <div id="navigator" class="text-primary"></div>
        </div>
      </div>

      <div class="d-sm-flex">
        <div class="me-sm-2">
          <div id="filter" class="p-2 bg-light ms-md-4 ms-sm-2 border">
            <div class="border-bottom h5 text-uppercase">Filter By</div>
            <form class="d-flex" v-on:submit.prevent="searchForm">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="searchElement"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div class="box border-bottom">
              <div class="box-label text-uppercase d-flex align-items-center">
                Category
                <button
                  class="btn ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#inner-box"
                  aria-expanded="false"
                  aria-controls="inner-box"
                >
                  <span class="fas fa-plus"></span>
                </button>
              </div>
              <div
                id="inner-box"
                class="collapse show"
                v-for="element in categories"
                v-bind:key="element.id"
              >
                <div class="my-1">
                  <label class="tick"
                    >{{ element.title }}
                    <input type="checkbox" />
                    <span class="check"></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="box border-bottom">
              <div class="box-label text-uppercase d-flex align-items-center">
                Drone Model
                <button
                  class="btn ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#amenities"
                  aria-expanded="false"
                  aria-controls="amenities"
                >
                  <span class="fas fa-plus"></span>
                </button>
              </div>
              <div
                id="amenities"
                class="collapse show"
                v-for="element in drones"
                v-bind:key="element.id"
              >
                <div class="my-1">
                  <label class="tick"
                    >{{ element.title }} <input type="checkbox" />
                    <span class="check"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="box border-bottom">
              <div class="box-label text-uppercase d-flex align-items-center">
                Drone Brand
                <button
                  class="btn ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#amenities"
                  aria-expanded="false"
                  aria-controls="amenities"
                >
                  <span class="fas fa-plus"></span>
                </button>
              </div>
              <div
                id="amenities"
                class="collapse show"
                v-for="element in drones"
                v-bind:key="element.id"
              >
                <div class="my-1">
                  <label class="tick"
                    >{{ element.brand }} <input type="checkbox" />
                    <span class="check"></span>
                  </label>
                </div>
              </div>
            </div>

            <button class="btn btn-success" @click="filterProducts()">
              Filter
            </button>
          </div>
        </div>
        <div class="bg-white p-2 border" id="hotels">
          <div
            class="hotel py-2 px-2 pb-4 border-bottom"
            v-for="element in drones"
            v-bind:key="element.id"
          >
            <div class="row">
              <div class="col-lg-3">
                <img :src="`${element.image}`" alt="" class="hotel-img" />
              </div>
              <div class="col-lg-9">
                <div class="d-md-flex align-items-md-center">
                  <div class="name">
                    <router-link
                      :to="{
                        name: 'productdetail',
                        params: { slug: element.slug },
                      }"
                      >{{ element.title }}</router-link
                    >
                    <span class="city">İstanbul, Turkiye</span>
                  </div>
                  <div class="ms-auto code text-uppercase">
                    Quantity: {{ element.quantity }}
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end mt-1">
              <a href="/order">
                <div class="btn btn-primary text-uppercase">Rent Now</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      drones: [],
      categories: [],
      searchElement: "",
      selectCategory: [],
      errors: [],
      features: [],
    };
  },
  mounted() {
    console.log("mounted");

    axios.get("/api/myapp/main/search/").then((response) => {
      console.log(response.data);

      this.drones = response.data;
    });

    axios.get("/api/myapp/main/categories/").then((response) => {
      console.log(response.data);

      this.categories = response.data;
    });
  },
  methods: {
    searchForm() {
      console.log(this.searchElement);
      axios
        .get(`api/myapp/main/search/?search=${this.searchElement}`)
        .then((response) => {
          console.log(response.data);

          this.drones = response.data;
        });
    },
    filterProducts() {
      console.log(this.selectCategory);
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  min-height: 800px;
  overflow-y: auto;
}

.container::-webkit-scrollbar {
  width: 6px;
  border-radius: 3px;
}

.container::-webkit-scrollbar-thumb {
  background-color: #ffa500;
  border-radius: 3px;
}

.container.bg-sec-light {
  background-color: #e7e7e7;
}

#navbar-toggler-icon {
  left: 7%;
  height: 40px;
  width: 40px;
  text-align: center;
  background: #1b1b1b;
  border-radius: 3px;
  cursor: pointer;
  z-index: 5;
  transition: left 0.4s ease;
}

#navbar-toggler-icon.click {
  position: absolute;
  left: 210px;
  top: 0;
  background-color: #747474;
}

#navbar-toggler-icon.click span:before {
  content: "\f00d";
}

.sidebar {
  position: absolute;
  width: 220px;
  height: 100%;
  background-color: #161616;
  color: #fff;
  transform: translateX(-100%) scale(0);
  left: 0;
  transition: transform 0.2s ease-in-out;
}

.sidebar.show {
  transform: translateX(0%) scale(1);
}

#side-nav {
  float: left;
  width: 18%;
}

#content {
  float: right;
  width: 82%;
}

a {
  text-decoration: none;
  color: #222;
}

#content .user-select-none {
  user-select: none;
}

nav ul .brand img {
  object-fit: contain;
  width: 100px;
  height: 70px;
}

nav ul {
  height: 100%;
  width: 100%;
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}

nav ul li {
  line-height: 50px;
}

nav ul li a {
  color: #e5e5e5;
  text-decoration: none;
  display: block;
  width: 100%;
  padding-left: 20px;
  border-left: 4px solid transparent;
}

nav ul li a:hover {
  color: #fff;
  background-color: #2e2e2e;
}

nav ul li.active a {
  color: #ffff;
  background-color: #747474;
  border-left: 4px solid #ffa500;
}

.fa-phone {
  transform: rotate(90deg);
}

.location input[type="text"] {
  max-width: 200px;
  border-radius: 0px;
  border: 1px solid #444;
}

.location input[type="text"]::placeholder {
  color: #444;
}

.location input[type="text"]:focus,
input[type="submit"]:focus {
  box-shadow: none;
}

input[type="submit"] {
  border-radius: 0;
  width: 120px;
}

.box {
  padding: 10px;
}

.btn:focus {
  box-shadow: none;
}

.box-label {
  color: #11698e;
  font-size: 0.9rem;
  font-weight: 800;
}

.box-label .btn {
  padding: 0;
  font-size: 0.8rem;
}

label {
  cursor: pointer;
}

.tick {
  display: block;
  position: relative;
  padding-left: 23px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 0;
}

.tick input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.check {
  position: absolute;
  top: 1px;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.tick:hover input ~ .check {
  background-color: #f3f3f3;
}

.tick input:checked ~ .check {
  background-color: #ffffff;
}

.check:after {
  content: "";
  position: absolute;
  display: none;
}

.tick input:checked ~ .check:after {
  display: block;
  transform: rotate(45deg) scale(1);
}

.tick .check:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid rgb(0, 0, 0);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg) scale(2);
}

.hotel .hotel-img {
  width: 200px;
  object-fit: contain;
}

.hotel .name {
  font-size: 1.2rem;
  font-weight: 700;
}

.hotel .name .city {
  font-weight: normal;
  font-size: 0.85rem;
}

#filter {
  width: 200px;
}

.hotel .fas,
.hotel .far {
  font-size: 0.8rem;
}

.hotel .fas.fa-star {
  color: #ffa500;
}

.hotel .tags {
  font-size: 0.8rem;
}

.hotel .btn {
  width: 150px;
  border-radius: 0;
}

.hotel .btn.enquiry {
  background-color: #ff761b;
  color: #fff;
}

.hotel .btn.enquiry:hover {
  background-color: #fc771fef;
}

#hotels {
  width: 100%;
}

@media (min-width: 1399.6px) {
  #navbar-toggler-icon {
    display: none;
  }
}

@media (max-width: 1399.5px) {
  #navbar-toggler-icon {
    display: block;
    z-index: 11;
  }

  #side-nav {
    float: none;
    width: 250px;
    background-color: #161616f5;
    z-index: 10;
  }

  #content {
    float: none;
    width: 100%;
  }
}

@media (max-width: 1199.5px) {
  .hotel .hotel-img {
    width: 170px;
  }

  #side-nav {
    height: initial;
  }
}

@media (max-width: 767.5px) {
  .hotel .city {
    display: block;
  }

  .hotel .btn {
    width: 120px;
    font-size: 0.85rem;
  }

  input[type="submit"] {
    width: 100px;
    font-size: 0.9rem;
    margin-right: 10px;
  }
}

@media (max-width: 575.5px) {
  #filter,
  #hotels {
    width: 95%;
    margin: 15px;
  }
}

@media (max-width: 410px) {
  #filter,
  #hotels {
    width: 93%;
    margin: 10px;
  }
}
</style>

