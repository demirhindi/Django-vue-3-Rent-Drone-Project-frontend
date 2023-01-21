<template>
  <div class="container my-5">
    <div class="row my-5" >
      <form v-on:submit.prevent="editProduct">
        <div class="mb-3">
          <select class="form-select" aria-label="Default select example" @change="onChangeForCategory($event)">
            <option
              v-for="category in categories"
              v-bind:key="category.id"
              value="{{
                category.title
              }}"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
        <div class="mb-3" v-for="drone in drones" v-bind:key="drone.id">
          <label class="form-label">title</label>
          <h5>{{drone.title}}</h5>
          <input type="text" class="form-control"  v-model="title"  />
        </div>
        <div class="mb-3" v-for="drone in drones" v-bind:key="drone.id">
          <label class="form-label">Brand</label>
          <h5>{{ drone.brand }}</h5>
          <input type="text" class="form-control"  v-model="brandName" />
        </div>

        <div class="mb-3" v-for="drone in drones" v-bind:key="drone.id">
          <label class="form-label">Quantity</label>
          <h5>{{ drone.quantity }}</h5>
          <input type="number" id="typeNumber" class="form-control" min="1" v-model="quantity"  />
        </div>
        <div class="mb-3" v-for="drone in drones" v-bind:key="drone.id">
          <label class="form-label">Description</label>
          <h5>{{ drone.description }}</h5>
          <input type="text" class="form-control" v-model="description" />
        </div>
        <div class="text-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>


        <button type="submit" class="btn btn-primary">Edit Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminProductEdit",
  data() {
    return {
      categories: [],
      drones: [],
      
      title: "",      
      category:'',
      brandName:'',
      quantity:'',
      description:'',

      errors: [],
    };
  },

  mounted() {
    console.log("mounted");

    axios.get("/api/myapp/main/categories/").then((response) => {
      console.log(response.data);

      this.categories = response.data;
    });

    console.log("mounted");
    const slug = this.$route.params.slug;

    axios.get(`api/myapp/main/drone/${slug}`).then((response) => {
      console.log(response.data);

      this.drones = response.data.drone;
    });
  },

  methods: {
    editProduct() {
      console.log("createForm");

      if (this.title === "") {
        this.errors.push("The Model Name is blank!");
      }
      if (this.brandName === "") {
        this.errors.push("The Brand Name is blank!");
      }
      if (this.quantity === "") {
        this.errors.push("The quantity is blank!");
      }
      if (this.description === "") {
        this.errors.push("The description is blank!");
      }


      if (!this.errors.length) {
        const formData = {
          title: this.title,
          categories: this.category,
          brand: this.brandName,
          quantity: this.quantity,
          description: this.description,
        };

        console.log(formData);
        const slug = this.$route.params.slug;
        axios
          .post(`api/myapp/main/updatedrone/${slug}/`, formData)
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

    onChangeForCategory(event) {
      this.category =
        event.target.options[event.target.options.selectedIndex].text;

      console.log(this.category);
    },
  },
};
</script>

<style>
</style>