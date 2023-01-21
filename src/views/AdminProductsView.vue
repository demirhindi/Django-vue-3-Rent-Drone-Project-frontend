<template>
  <section class="intro m-5">
    <div class="bg-image h-100">
      <div class="mask d-flex align-items-center h-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card">
                <div class="card-body p-0">
                  <div
                    class="table-responsive table-scroll"
                    data-mdb-perfect-scrollbar="true"
                    style="position: relative; height: 700px"
                  >
                    <table class="table table-striped mb-0">
                      <thead style="background-color: #002d72">
                        <tr>
                          <th scope="col">Drone Model</th>
                          <th scope="col">Category</th>
                          <th scope="col">Brand Name</th>

                          <th scope="col">Quantity</th>
                          <th scope="col">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="drone in products" v-bind:key="drone.id">
                          <td>{{ drone.brand }}</td>
                          <td>{{ drone.categories }}</td>
                          <td>{{ drone.title }}</td>

                          <td>{{ drone.quantity }}</td>
                          <td>
                            <router-link
                              :to="{
                                name: 'productedit',
                                params: { slug: drone.slug },
                              }"
                            >
                              <button class="bg-info">
                                Edit
                              </button></router-link
                            >

                            <button
                              class="bg-danger"
                              @click="deleteDrone(drone.slug)"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminProductView",
  data() {
    return {
      products: [],
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
    deleteDrone(slug) {
      axios.delete(`api/myapp/main/deletedrone/${slug}/`);
    },
  },
};
</script>

<style scoped>
table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

thead th {
  color: #fff;
}

.card {
  border-radius: 0.5rem;
}

.table-scroll {
  border-radius: 0.5rem;
}

.table-scroll table thead th {
  font-size: 1.25rem;
}
thead {
  top: 0;
  position: sticky;
}
</style>