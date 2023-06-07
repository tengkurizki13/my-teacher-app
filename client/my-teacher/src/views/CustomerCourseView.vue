<script>

import CourseCustomerCard from '../components/CourseCustomerCard.vue'
import Navbar from '../components/Navbar.vue'
import { mapActions,mapState } from 'pinia'
import { useCourseCustomerStore } from '../stores/courseCustomer'


export default {
  components: {
    CourseCustomerCard,
    Navbar
  },
  data() {
    return {
      currentPagination: 0,
      filter: ""
    }
  },
  methods: {
    ...mapActions(useCourseCustomerStore, ['getAllCourseCustomer'])
  },
  computed: {
    ...mapState(useCourseCustomerStore, ['courses'])
  },
  created(){
    this.getAllCourseCustomer()
  }
}
</script>

<template>
  <Navbar/>
  <div class="container">
    <div class="">
      <div class="row ">
        <div class="col-12 d-flex flex-wrap">
          <CourseCustomerCard  v-for="course in courses" :key="course.id" :course="course"/>
          <div class="row mb-5" v-if="courses.length === 0">
            <div class="col-12">
              <h1 class="text-bold">Your Course Not Yet</h1>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>
