<template>
  <!--  userdata component -->
<UsersData :userList="usersData" @filterFun="filterData" @resetFilterFun="resetFilters"/>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      usersData: [],
    }
  },
  async asyncData({ store}) {
    try {
      //  fetching user data
      const rawData  = await fetch('http://localhost:8080/list').then(res => {
        return res.json()
      })
      if(rawData.statusCode == 200) {
        // setting up user data into store
        store.dispatch('storeUsers', rawData.data)
        return {usersData: rawData.data? rawData.data : []}
      }
    } catch (error) {}
  },
  mounted () {
  },
  methods: {
    //  filter  data for blood group and search
    async filterData(data) {
      try {
        if(data.bloodGroup === '1') data.bloodGroup = ''
        const filteredData = await this.$axios.post('http://localhost:8080/filtered', {searchText:data.searchText, bloodGroup: data.bloodGroup})
        if(filteredData && filteredData.data) {
          this.usersData = filteredData.data?.data
        }
      } catch (error) {}        
    }, 
    // reset filters and set daa from store
    resetFilters () {
      this.usersData = this.$store.state.users 
    } 
  }
 }
</script>
