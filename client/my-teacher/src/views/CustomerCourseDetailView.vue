<script>

import Navbar from '../components/Navbar.vue'
import { mapActions,mapState } from 'pinia'
import { useCourseCustomerStore } from '../stores/courseCustomer'


export default {
  components: {
    Navbar
  },
  data() {
    return {
      videoSrc: ""
    }
  },
  methods: {
    ...mapActions(useCourseCustomerStore, ['getDetailCourse'])
  },
  computed: {
    ...mapState(useCourseCustomerStore, ['course'])
  },
  created(){
    // this.videoSrc = "//embed.api.video/vod/"+ this.course.Course.videoId
    this.getDetailCourse(this.$route.params.id)
  },
  watch: {
    // whenever question changes, this function will run
    course(newCourse, oldCourse) {
      this.videoSrc  = "//embed.api.video/vod/" + newCourse.Course.videoId
     console.log(newCourse);
    }
  },

}
</script>

<template>
  <Navbar/>
  <div class="row px-3">
    <h1 class="text-center text-bold">{{ course.Course.title }}</h1>
    <div class="container shadow p-3 mb-5 bg-body-tertiary rounded me-3 ">
      <div class="">
        <div class="row ">
          <div class="col-12 mb-2">
            <iframe :src="videoSrc" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>
