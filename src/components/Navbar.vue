<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="nav-link active" to="/"
        ><a class="navbar-brand mx-4" href="#">BRAND LOGO</a></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/myorders">My Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/order">Order</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productsview">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productenter">Products Enter</router-link>
          </li>
          
          <li class="nav-item">
            <router-link class="nav-link" to="/ordercheck"
              >Order Check</router-link
            >
          </li>
          
        </ul>

        <div class="d-flex mx-3">
          <div class="d-flex" v-if="$store.state.user.isAuthenticated">
            <router-link to="/about"
              ><button
                @click="logout()"
                class="btn btn-danger mx-2"
                type="submit"
              >
                Logout
              </button></router-link
            >
          </div>
          <div class="d-flex mx-5" v-if="!$store.state.user.isAuthenticated">
            <router-link to="/login"
              ><button class="btn btn-success mx-2" type="submit">
                Login
              </button></router-link
            >
            <router-link to="/register"
              ><button class="btn btn-info mx-2" type="submit">
                Register
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",

  data() {
    return {
      searchElement: "",
      searchResult: "",

      errors: [],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    async logout() {
      console.log("logout");

      await axios
        .post("/api/myapp/token/logout/")
        .then((response) => {
          console.log("Logged out");
        })
        .catch((error) => {
          console.log(error);
        });

      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");

      this.$store.commit("removeToken");

      this.$router.push("/");
    },

    searchForm() {
      console.log(this.searchElement);
      axios
        .get(`api/myapp/main/search/?search=${this.searchElement}`)
        .then((response) => {
          console.log(response.data);

          this.searchResult = response.data;
        });
    },
  },
};
</script>

<style>
</style>