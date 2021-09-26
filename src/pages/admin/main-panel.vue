<template>
  <div>
      <div class="container-fluid p-0">
          <div class="card p-0">
              <h1 class="text-center">Statistics</h1>
              <div class="chart" v-if="ready">
                  <line-chart :chart-data="dataCollection" :options="{responsive: true, maintainAspectRatio: false}"></line-chart>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  import LineChart from "../../components/chart.js"
  import axios from "axios"
  export default {
      components: {
          LineChart
      },
      created() {
          axios.get("/getTransactions").then((res) => {
               const trans = res.data.transactions;
                trans.forEach((tran) => {
                    this.dataCollection.datasets[1].data[new Date(+tran.date).getMonth() - 1] += 1;
                });
            });

          axios.get("/getVisits").then(res => {
            const visits = res.data.visits;
            visits.forEach((v) => {
                this.dataCollection.datasets[0].data[+v.month - 1] = v.visitors;
            });
            this.ready = true;
          })
      },
      data() {
          return {
            ready: false,
            dataCollection: {
                dashData: {},
                labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                ],
                datasets: [
                    {
                        label: "Visits",
                        backgroundColor: "#ccc",
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        label: "Transactions",
                        backgroundColor: "blue",
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ],
            },
          }
      }
  }
</script>
<style scoped lang="scss">
     
</style>