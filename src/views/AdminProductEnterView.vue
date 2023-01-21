<template>
  <div class="container my-5">
    <div class="row">
      <form v-on:submit.prevent="submitCategory">
        <div class="mb-3">
          <label class="form-label">Category Name</label>
          <input type="text" class="form-control" v-model="title" />
        </div>
        <div class="text-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>

        <button type="submit" class="btn btn-primary">Save Category</button>
      </form>
    </div>
    <div class="row my-5">
      <form v-on:submit.prevent="submitProduct">
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            @change="onChangeForProduct($event)"
          >
            <option
              v-for="category in categories"
              v-bind:key="category.id"
              value="{{ category.title }}"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Brand Name</label>
          <input type="text" class="form-control" v-model="brandName" />
        </div>
        <div class="mb-3">
          <label class="form-label">Model Name</label>
          <input type="text" class="form-control" v-model="modelName" />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <input type="text" class="form-control" v-model="description" />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Image</label>
          <input class="form-control" type="file" id="formFile" @change="uploadImage"/>
        </div>
        <div class="mb-3">
          <label class="form-label">Quantity</label>
          <input
            type="number"
            id="typeNumber"
            class="form-control"
            min="1"
            v-model="quantity"
          />
        </div>
        <div class="text-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>

        <button type="submit" class="btn btn-primary">Save Product</button>
      </form>
    </div>

    <div class="row my-5">
      <form v-on:submit.prevent="submitFeature">
        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            @change="onChangeForFeature($event)"
          >
            <option
              v-for="product in products"
              v-bind:key="product.id"
              value="{{ product.title }}"
            >
              {{ product.title }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Feature Name</label>
          <input type="text" class="form-control" v-model="featureName" />
        </div>
        <div class="mb-3">
          <label class="form-label">Fetature Text</label>
          <input type="text" class="form-control" v-model="featureText" />
        </div>
        <div class="text-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>

        <button type="submit" class="btn btn-primary">Save Feature</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminProductEnterView",
  data() {
    return {
      title: "",
      categories: [],
      products: [],

      brandName: "",
      modelName: "",
      quantity: "",
      description: "",
      droneProduct: "",
      image:null,

      featureDrone: "",
      featureName: "",
      featureText: "",

      errors: [],
    };
  },
  mounted() {
    console.log("mounted");

    axios.get("/api/myapp/main/categories/").then((response) => {
      console.log(response.data);

      this.categories = response.data;
    });

    axios.get("/api/myapp/main/drones/").then((response) => {
      console.log(response.data);

      this.products = response.data;
    });
  },

  methods: {
    submitCategory() {
      console.log("createForm");

      if (this.title === "") {
        this.errors.push("The Category Name is blank!");
      }

      if (!this.errors.length) {
        const formData = {
          title: this.title,
        };

        console.log(formData);

        axios
          .post("/api/myapp/main/createcategory/", formData)
          .then((response) => {
            this.$router.push("/productenter");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },
    uploadImage (e) {
      this.image = e.target.files[0]
      console.log(this.image);
    },

    onChangeForProduct(event) {
      this.droneProduct =
        event.target.options[event.target.options.selectedIndex].text;

      console.log(this.droneProduct);
    },

    onChangeForFeature(event) {
      this.featureDrone =
        event.target.options[event.target.options.selectedIndex].text;

      console.log(this.featureDrone);
    },

    submitProduct() {
      console.log("createForm");

      if (this.brandName === "") {
        this.errors.push("The brand name Name is blank!");
      }

      if (this.modelName === "") {
        this.errors.push("The Model name Name is blank!");
      }
      if (this.description === "") {
        this.errors.push("The Model name Name is blank!");
      }
      if (this.quantity === "") {
        this.errors.push("The Model name Name is blank!");
      }

      if (!this.errors.length) {
        const formData = {
          brand: this.brandName,
          title: this.modelName,
          quantity: this.quantity,
          description: this.description,
          categories: this.droneProduct,
          image:this.image,
        };

        console.log(formData);

        axios
          .post("/api/myapp/main/createdrone/", formData)
          .then((response) => {
            this.$router.push("/productenter");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },

    submitFeature() {
      console.log("createForm");

      if (this.featureName === "") {
        this.errors.push("The feature name Name is blank!");
      }

      if (this.featureText === "") {
        this.errors.push("The feature text Name is blank!");
      }

      if (!this.errors.length) {
        const formData = {
          title: this.featureName,
          drone: this.featureDrone,
          description: this.featureText,
        };

        console.log(formData);

        axios
          .post("/api/myapp/main/createfeature/", formData)
          .then((response) => {
            this.$router.push("/productenter");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>

<style>
</style>