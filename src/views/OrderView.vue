<template>
  <div class="container my-5">
    <div class="row my-5">
      <form v-on:submit.prevent="submitOrder">
        <div class="mb-3">
          <select class="form-select" aria-label="Default select example" @change="onChangeForProduct($event)">
            <option
              v-for="product in products"
              v-bind:key="product.id"
              value="{{
                product.title
              }}"
            >
              {{ product.title }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">title</label>
          <input type="text" class="form-control"  v-model="title"/>
        </div>
        <div class="mb-3">
          <label class="form-label">Adress</label>
          <input type="text" class="form-control"  v-model="adress"/>
        </div>

        <div class="mb-3">
          <label class="form-label">Quantity</label>
          <input type="number" id="typeNumber" class="form-control" min="1" v-model="quantity" />
        </div>
        <div class="mb-3">
          <label for="start">Start date:</label>

          <input type="date" id="start" name="trip-start" v-model="startDate" />
        </div>

        <div class="mb-3">
          <label for="start">End date:</label>

          <input type="date" id="start" name="trip-start" v-model="endDate" />
        </div>
        <div class="text-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>

        <button type="submit" class="btn btn-primary">Rent</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OrderView",
  data() {
    return {
      products: [],
      title:'',
      adress:'',
      quantity:'',
      startDate:'',
      endDate:'',
      drone:'',
      errors: [],
    };
  },
  mounted() {
    console.log("mounted");

    axios.get("/api/myapp/main/drones/").then((response) => {
      console.log(response.data);

      this.products = response.data;
    });
  },
  

  methods: {
    

    onChangeForProduct(event) {
      

      this.drone =
        event.target.options[event.target.options.selectedIndex].text;

      console.log(this.drone);

      
    },

    

    submitOrder() {
      console.log("createForm");

      if (this.title === "") {
        this.errors.push("The title  Name is blank!");
      }
      if (this.adress === "") {
        this.errors.push("The address is blank!");
      }
      if (this.quantity === "") {
        this.errors.push("The quantity is blank!");
      }

      if (!this.errors.length) {
        const formData = {
          title: this.title,
          adress: this.adress,
          quantity: this.quantity,
          start_date : this.startDate,
          end_date:this.endDate,
          drone:this.drone
        };

        console.log(formData);

        axios
          .post("/api/myapp/main/createorder/", formData)
          .then((response) => {
            this.$router.push("/myorders");
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