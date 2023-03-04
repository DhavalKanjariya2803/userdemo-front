<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div>
    <div class="container">
        <div class="headerMenu">
          <div class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Users List</a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" v-model="searchedText" placeholder="Search User.." aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="searchData" >Search</button>
                <div class="bloodgroup-select">
                  Blood Group
                  <select class="custom-select " v-model="selectedBloodGroup" @change="filterWithBloodGroup">
                    <option selected value="1">filter by Blood Group</option>
                    <option v-for="b in bloodGroups" :key="b">{{ b }}</option>
                  </select>
                </div>
                <div>
                  <button style="margin-left: 20px; background-color: #dee2e6;" @click="resetFilters">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="userList">
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">City</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Blood Groop</th>
                    <th scope="col">Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user._id">
                    <th scope="row"></th>
                    <td>{{ user.name}}</td>
                    <td>{{ user.email  }}</td>
                    <td>{{ user.gender  }}</td>
                    <td>{{ user.city  }}</td>
                    <td>{{ user.contactNumber  }}</td>
                    <td>{{ user.bloodGroup  }}</td>
                    <td>{{ user.hobbies?.join(",")  }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="currentPage--" :disabled="currentPage === 1">Prev</button>
        Page: {{ currentPage }} / {{ totalPages }}
        <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>    
          <span>Total Records: <strong>{{ userList.length }}</strong></span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'UsersData',
  props: {
    userList: {required: true, type: Array}
  },
  data () {
    return {
      bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      perPage: 10,
      currentPage: 1,
      selectedBloodGroup: '1',
      searchedText: ''
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.userList.length / this.perPage);
    },
    paginatedUsers() {
      //  paginate data
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.userList.slice(startIndex, endIndex);
    }
  },
  methods: {
    //  filter for blood group
    filterWithBloodGroup() {
      this.$emit('filterFun', {searchText: this.searchedText, bloodGroup: this.selectedBloodGroup})
    },
    //  search data 
    searchData() {
      //  emitting event into parent 
      this.$emit('filterFun', {searchText: this.searchedText, bloodGroup: this.selectedBloodGroup})
    },
    resetFilters() {
      //  setting up default value for filters
      this.selectedBloodGroup = '1'
      this.searchedText = ''
      this.$emit('resetFilterFun')
    }
  },
}
</script>


<style scoped> 
    .headerMenu {
        margin-bottom: 30px
    }
    .bloodgroup-select {
      margin-left: 30px;
    }
</style>
