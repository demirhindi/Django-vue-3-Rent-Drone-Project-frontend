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
                          <th scope="col">Status</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" v-bind:key="order.id">
                          <td>{{ order.drone }}</td>
                          <td>{{ order.status }}</td>
                          <td>{{ order.start_date }}</td>
                          <td>{{ order.end_date }}</td>
                          <td>{{ order.quantity }}</td>
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
  name: "MyOrdersView",
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    console.log("mounted");
    

    axios.get("/api/myapp/main/ordersuser/").then((response) => {
      console.log(response.data);

      this.orders = response.data.userOrders;
    });
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