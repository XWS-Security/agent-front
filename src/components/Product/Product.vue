<template>
  <div class="container">
    <div class="main-body">
      <div class="row">

        <div class="col-lg-4">

          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img class="item" v-bind:src="image"/>
                <div class="mt-3">
                  <h4>{{ this.product.name }}</h4>
                </div>
              </div>

              <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                <div class="dropbox">
                  <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                         @change="upload($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                         accept="image/*" class="input-file">
                  <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                  </p>
                </div>
              </form>
              <hr>
              <b-button @click="uploadContent()">Upload photo!</b-button>
            </div>
          </div>
        </div>

        <!--SUCCESS-->
        <div v-if="isSuccess">
          <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">Upload again</a>
          </p>
          <ul class="list-unstyled">
            <li v-for="item in uploadedFiles" v-bind:key="item">
              <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
            </li>
          </ul>
        </div>

        <!--FAILED-->
        <div v-if="isFailed">
          <h2>Uploaded failed.</h2>
          <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
          </p>
          <pre>{{ uploadError }}</pre>
        </div>

        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Name</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="product.name">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Price</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="product.price">
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Quantity</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="product.quantity">
                </div>
                <hr>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Update info" v-on:click="updateProductInfo">
                </div>
                <hr>
                <div class="col-sm-9 text-secondary">
                  <input type="button" class="btn btn-primary px-4" value="Delete" v-on:click="this.delete">
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
import {_arrayBufferToBase64} from "@/components/Product/HellperFunctions";
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
import {upload} from "@/components/ContentUpload/file-upload.service";
import {wait} from "@/components/ContentUpload/utils";

export default {
  name: "Product",

  data() {
    return {
      image: null,
      id: '',
      product: null,
      formData: null,
      uploadFieldName: 'photos',
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
    }
  },

  mounted() {
    this.reset()
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('id');
    this.getProductInfo();
  },

  methods: {
    getProductInfo() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'product/' + this.id)
          .then(response => {
            this.product = response.data
            this.getPicture(response.data.picture)
          })
    },

    getPicture(imageName) {
      console.log(imageName)
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'image/' + imageName, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            let type = Object.values(response.headers)[2];
            this.image = _arrayBufferToBase64(response.data, type)
          })
    },

    uploadContent() {

      let data = {'id': this.id}

      this.formData.append("obj", new Blob([JSON.stringify(data)], {
        type: "application/json"
      }));

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'product/updatePhoto', this.formData)
          .then(response => {
            console.log(response.data)
          })
    },

    updateProductInfo() {

      let data = {'id':this.product.id, 'name':this.product.name, 'price':this.product.price, 'quantity':this.product.quantity}

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'product/update', data)
          .then(response => {
            alert(response.data);
            this.$router.push('/')
          })
    },

    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },

    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      console.log(formData);
      upload(formData)
          .then(wait(1500)) // DEV ONLY: wait for 1.5s
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            this.formData = formData;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
    },

    upload(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

      // save it
      this.save(formData);
    },

    delete() {
      this.$http
          .delete(process.env.VUE_APP_BACKEND_URL + 'product/delete/' + this.id)
          .then(response => {
            alert(response.data);
            this.$router.push('/')
          })
    }

  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },

    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },

    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },

    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  }
}
</script>

<style scoped>

img {
  border-color: #e2e8f0;
  border-radius: 10%;
  width: 300px;
  height: 300px;
  margin: 3%;
  border-width: 44px;
}
</style>
