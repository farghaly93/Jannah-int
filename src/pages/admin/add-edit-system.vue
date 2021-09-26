<template>
    <div>
        <div class="container-fluid py-5 px-2 bg-light">
            <div class="row mt-4">
                <div class="col-md-12">
                    <h3 class="text-center">{{id? 'Edit system': 'Add new system'}}</h3>
                </div>
            </div>
            <hr>
            <div class="row justify-content-between">
                <div class="col-md-4">
                    <img width="100%" height="100%" src="https://image.freepik.com/free-vector/queue-immigrants-standing-holding-luggage-waiting-departure-airport-group-tourists-with-globe-map-pointers-destination-line-background-travel-immigration-concept_74855-10142.jpg" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-12 field">
                            <div class="form-group">
                                <label>Category</label>
                                <select class="form-control" v-model="system.category">
                                    <option v-for="option in categories" :key="option.number" :value="option.number">{{option.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12 field">
                            <div class="form-group">
                                <label>System name</label>
                                <input class="form-control" v-model="system.title" placeholder="اسم النظام">
                            </div>
                        </div>
                        <div class="col-md-12 field">
                            <div class="form-group">
                                <label>Subtitle</label>
                                <input class="form-control" v-model="system.subtitle" placeholder="العنوان الفرعي">
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="sections">
                        <h3 class="text-center">Sections</h3>
                        <div v-for="(sec, i) in system.sections" :key="i" class="section">
                            <div @click="removeSection(i)" class="remove">
                                <i class="fa fa-times"></i>
                            </div>
                            <h4 class="text-center">section ({{i+1}})</h4>
                            <hr>
                            <div class="row">
                                <div class="col-md-12 field">
                                    <div class="form-group">
                                        <label>Section title</label>
                                        <input class="form-control" v-model="system.sections[i].title" placeholder="عنوان الفقرة">
                                    </div>
                                </div>
                                <div class="col-md-12 field">
                                    <div class="form-group">
                                        <label>Section text</label>
                                        <textarea class="form-control" v-model="system.sections[i].text" placeholder="نص الفقرة"/>
                                    </div>
                                </div>
                                <div class="col-md-12 field">
                                    <div class="form-group">
                                        <label>Related link</label>
                                        <input class="form-control" v-model="system.sections[i].link" placeholder="الرابط المتعلق بهده الفقرة">
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <button @click="increaseOneSection" class="btn btn-link">Add one more section</button>
                    </div>
                    <hr>
                    <div class="center">
                        <loading v-if="loading"/>
                    </div>
                    <div class="center">
                        <button @click="submit" class="btn btn-primary">Add system description</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
  export default {
      created() {
          this.id = this.$route.params.id;
          if(this.id) {
              axios.get("/getSystemData/" + this.id).then(res => {
                  this.system = {...res.data.system};
              })
          }
      },
      data() {
          return {
            id: null,
            loading: false,
            system: {
                category: 1,
                title: null,
                subtitle: null,
                sections: [{title: "", text: "", link: ""}]
            }
          }
      },
      computed: {
        categories() {
            return this.$store.getters.categories;
        }
      },
      methods: {
          increaseOneSection() {
              this.system.sections.push({title: "", text: "", link: ""});
              console.log([...this.sections]);
          },
          removeSection(i) {
              this.system.sections.splice(i, 1);
          },
          submit() {
              this.loading = true;
              const method = this.id? "/editSystem/" + this.id: "addSystem";
              axios.post(method, this.system).then(res => {
                  this.loading = false;
                  if(res.data.done) {
                      this.$store.dispatch("showMessage", "System added successfully");
                  } else {
                      this.$store.dispatch("showMessage", "Problem adding the system");
                  }
              })
          }
      }
  }
</script>
<style scoped lang="scss">
    .field {
        margin: 14px 0;
    }

     .section {
         margin-top: 22px;
         position: relative;
         padding: 14px;
         border: 3px solid rgba(102, 102, 102, 0.19);
         .remove {
             position: absolute;
             top: 0;
             right: 0;
             i {
                //  color: #fff;
                 font-size: 2rem;
             }
         }
     }

     label {
         color: rgba(0, 0, 0, 0.388);
         font-size: 1rem;
         padding: 1px 3px;
         font-weight: 600;
     }

     input, select, textarea {
         border: 4px solid rgba(46, 71, 80, 0.231);
         border-radius: 12px;
         height: 53px;
     }
</style>