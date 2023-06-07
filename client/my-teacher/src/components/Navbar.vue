<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useAuthenticationStore } from '../stores/authentication'


export default {
  data(){
    return{
      isLogin:localStorage.access_token 
    }
  },
  methods: {
    ...mapActions(useAuthenticationStore, ['logout']),
    logoutHandler(){
      this.isLogin= false
      this.logout()
    }
  }
}
</script>
<template>
   <nav
    class="navbar navbar-expand-lg bg-light shadow-lg p-3 mb-5 bg-body rounded"
  >
    <div class="container-fluid">
      <img src="@/assets/icons/logo-teacher.jpg" width="30"   />
      <span class="text-bold text-primery"> Teacher</span>
      <div class="collapse navbar-collapse ms-5" >
        <div class="ms-auto">
          <div class="navbar-nav " id="nav">
            <a id="nav-dashboard" class="nav-link active  text-bold" aria-current="page" href="#"> <RouterLink to="/"><i class="bi bi-house-add-fill"></i> Home</RouterLink></a
            >
            <a id="nav-dashboard" class="nav-link active  text-bold" aria-current="page" href="#" v-if="isLogin"> <RouterLink to="/customer-course"><i class="bi bi-book-half"></i> My Course</RouterLink></a
            >
            <a id="nav-dashboard" class="nav-link active  text-bold" aria-current="page" href="#" v-if="!isLogin"> <RouterLink class="text-success" to="/login"><i class="bi bi-box-arrow-left"></i> Login</RouterLink></a
            >
            <a id="nav-dashboard" class="nav-link active  text-danger" aria-current="page" href="#" @click.prevent="logoutHandler" v-if="isLogin"> <i class="bi bi-box-arrow-right"></i>Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
