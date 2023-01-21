<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="order in allorders" v-bind:key="order.id">
          <div class="card shadow-sm">
            <h4 class="description">{{ order.adress }}</h4>

            <div class="card-body">
              <p class="card-text mytitle">User ID:{{ order.user }}</p>
              <p class="card-text mytitle">Order Status:{{ order.status }}</p>

              <div
                class="d-flex justify-content-between align-items-center p-5"
              >
                <p class="card-text mysubtitle">Start {{ order.start_date }}</p>
                <p class="card-text mysubtitle">Finish {{ order.end_date }}</p>
                <p class="card-text mysubtitle">
                  Drone Model {{ order.drone }}
                </p>
                <p class="card-text mysubtitle">
                  Quantity {{ order.quantity }}
                </p>

                <small class="text-muted">9 mins</small>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <div class="text-right">
                    <button
                      type="button"
                      class="btn btn-sm btn-success"
                      @click="putStatusApprove(order.id)"
                    >
                      Approve
                    </button>

                    
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        @click="putStatusDenied(order.id)"
                      >
                        Denied
                      </button>
                    
                  </div>
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
  name: "OrderControlView",
  data() {
    return {
      allorders: [],
    };
  },
  mounted() {
    console.log("mounted");

    axios.get("/api/myapp/main/orders/").then((response) => {
      console.log(response.data);

      this.allorders = response.data;
    });
  },

  methods: {
    putStatusApprove(id) {
      axios
        .put(`/api/myapp/main/postorderstatus/${id}/`, {
          status: true,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    putStatusDenied(id) {
      axios
        .put(`/api/myapp/main/postorderstatus/${id}/`, {
          status: false,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.mytitle {
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 15px;
}

.mysubtitle {
  text-align: center;
  text-transform: capitalize;

  letter-spacing: 2px;
  font-size: 14px;
}

.description {
  text-align: justify;
  text-transform: capitalize;
  letter-spacing: 1px;
  font-size: 13px;
}
</style>