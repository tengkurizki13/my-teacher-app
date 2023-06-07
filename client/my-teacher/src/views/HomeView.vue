<script>

import CourseCard from '../components/CourseCard.vue'
import Navbar from '../components/Navbar.vue'
import { mapActions,mapState } from 'pinia'
import { useCourseStore } from '../stores/course'


export default {
  components: {
    CourseCard,
    Navbar
  },
  data() {
    return {
      currentPagination: 0,
      filter: ""
    }
  },
  methods: {
    ...mapActions(useCourseStore, ['getAllCourse'])
  },
  computed: {
    ...mapState(useCourseStore, ['courses'])
  },
  created(){
    this.getAllCourse()
  }
}
</script>

<template>
  <Navbar/>
  <div class="container">
    <div class="row mb-5">
      <div class="col-5"> 
        <form class="d-flex" role="search" @submit.prevent="changePaginationAndFilter()">
        <input v-model="filter" class="form-control me-2" type="search" placeholder="filter by name" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
       </form>
      </div>
    </div>
    <div class="">
      <div class="row ">
        <div class="col-12 d-flex flex-wrap ">
          <CourseCard v-for="course in courses" :key="course.id" :course="course"/>
          <div class="row mb-5" v-if="courses.length === 0">
            <div class="col-12">
              <h1 class="text-bold" >DATA NOT FOUND</h1>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>
