<template>
  <div class="cats p-1 p-md-4">
    <div dir="ltr">
      <h3 class="title text-center">Categories({{ categories.length }})</h3>
      <hr />
      <div v-if="categories.length < 1" class="no-exams">
        <h3 class="text-center">No categories</h3>
      </div>
      <div class="scrollable p-3 my-4">
        <hr>
        <div v-for="cat in categories" :key="cat._id" class="exam row px-3">
          <div class="col-md-4">
            <span>Category number</span>
            <p> ({{ cat.number }})</p>
          </div>
          <div class="col-md-7">
            <p>{{ cat.name }}</p>
          </div>
          <div class="col-md-1">
            <i class="fa fa-trash" @click="remove(cat._id)"></i>
          </div>
        </div>
      </div>
      <hr />
    </div>

    <div class="add-exam my-4 mx-2" dir="ltr">
      <h3 class="text-medium text-center subhead py-4">Add new Category</h3>
      <div class="bg-dark py-4 px-0 px-0 row g-3">
        <div class="col-md-3">
          <div class="form-group">
            <label>category number</label>
            <input min="1" max="20" type="number" class="form-control" v-model="number" placeholder="Number">
          </div>
        </div>
        <div class="col-md-6">
          <label>Category name</label>
          <input v-model="name" type="text" class="form-control" placeholder="category name"/>
        </div>
        <div class="col-md-3 d-flex justify-content-center align-items-end">
          <div class="center">
            <loading v-if="loading"/>
          </div>
          <button
            :disabled="!number || !name"
            @click="addCategory"
            class="btn btn-primary"
            style="width: 90%"
          >
            Add category
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { formatDate } from "../functions";
import axios from "axios";
export default {
  created() {
    this.getCategories()
  },
  data() {
    return {
      name: null,
      number: null,
      loading: false
      // categories: []
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
  methods: {
    addCategory() {
      if (!this.number || !this.name) return;
      this.loading = true;
      axios
        .post("/addCategory", { number: this.number, name: this.name })
        .then((res) => {
          this.loading = false;
          if(res.data.done) {
              this.categories.push(res.data.category);
              this.$store.dispatch("getCategories");
          } else {
            if(res.data.error.code == 11000) {
              this.$store.dispatch("showMessage", "this number already exists");
            }
          }
        });
    },
    remove(id) {
      const confirmed = confirm("مسح الامتحان نهائيا...");
      if (!confirmed) return;
      axios.delete("/removeCategory/" + id).then((res) => {
        if (res.data.done) {
          this.categories.splice(
            this.categories.findIndex((fe) => fe._id === id),
            1
          );
           this.$store.dispatch("getCategories");
        }
      });
    },
    getCategories() {
      this.$store.dispatch("getCategories");
    },
  },
};
</script>
<style scoped lang="scss">
.cats {
  background: rgba(255, 255, 255, 0.762);
}
label {
  color: #fff;
}
.exam {
  div {
    margin: 5px 0;
    p {
      font-weight: 700;
      display: inline;
    }
  }
}
.exam {
  padding: 4px 0;
  cursor: pointer;
  &:nth-child(odd) {
    background: rgb(179, 177, 177);
  }
}
.student {
  background: rgba(42, 88, 110, 0.844);
  color: #fff;
  margin: 5px 0;
  padding: 2px;
}
</style>
