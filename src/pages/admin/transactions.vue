<template>
  <div class="bg-light p-2">
    <h2 class="text-center mt-5">Transactions</h2>
    <hr />
    <div class="row p-3">
      <div class="col-md-4">
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>
    <v-data-table v-bind="bindings" class="elevation-1" :search="searchQuery" :loading="loading">
      <template v-slot:item.controls="row">
        <div class="controls">
            <button @click="check(row.item.chargeId)">
              <i class="fa fa-check"></i>
            </button>
            <button @click="remove(row.item._id)">
              <i class="fa fa-trash"></i>
            </button>
        </div>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import axios from "axios";
import moment from "moment"
export default {
  created() {
    this.getTransactions();
  },
  data() {
    return {
      transactions: [],
      filtered: [],
      searchQuery: "",
      loading: false
    };
  },
  computed: {
    bindings() {
        return {
            headers: [
                {value: "name", text: "Name", searchable: true, sortable: true, align: "start"}, 
                {value: "email", text: "Email", searchable: true, sortable: true, align: "start"}, 
                {value: "country", text: "Country", searchable: true, sortable: true, align: "start"}, 
                {value: "phone", text: "Phone", searchable: true, sortable: true, align: "start"}, 
                {value: "amount", text: "Amount", sortable: true, align: "start"}, 
                {value: "date", text: "Date", sortable: true, align: "start"},
                {value: "controls", text: "Controls", sortable: true, align: "start"},
            ],
            items: this.filtered,
        }
    }
  },
  methods: {
    getTransactions(type) {
      this.type = type;
      this.loading = true;
      axios.get("/getTransactions").then((res) => {
        this.loading = false;
          console.log(res.data)
        const transactions = [...res.data.transactions];
        this.transactions = transactions;
        this.filtered = transactions.map(tran => ({...tran, amount: (tran.amount / 100), date: moment(tran.date).format("DD/MM/YYYY")}));
        // this.filterTransactions();
      });
    },
    remove(id) {
      const confirmed = confirm("المسح  نهائيا؟");
      if (!confirmed) return;
      axios.get("/deleteTransaction/" + id).then(() => {
        const index = this.transactions.findIndex((fu) => {
          return fu._id === id;
        });
        this.transactions.splice(index, 1);
        this.filtered = this.transactions;
      });
    },
    check(id) {
      console.log(id)
      this.$router.push("/complete/" + id);
    }
  },
};
</script>

<style lang="scss" scoped>
// @import "../../assets/styles/table.scss";
.search {
  margin: 15px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  width: 40%;
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
  i {
    position: absolute;
    right: 2%;
  }
}
.controls {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-content: center;
  button {
    margin: 2px;
    padding: 12px;
  }
  i {
    color: #000;
  }
  .input {
    // box-shadow: rgb(71, 71, 71) 1px 1px 1px 1px;
    background-color: rgb(226, 224, 224);
    text-align: center;
    border: 1px #555 solid;
    border-radius: 20px;
  }
}

</style>
