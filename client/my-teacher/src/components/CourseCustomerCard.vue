<script>
import { mapActions } from 'pinia'
import { useCourseCustomerStore } from '../stores/courseCustomer'

export default {
  props:['course'],
  data(){
    return{
      isLogin:localStorage.access_token,
      videoSrc : `https://embed.api.video/vod/${this.course.videoId}`
    }
  },
  methods: {
    ...mapActions(useCourseCustomerStore, ['']),
    goToDetailCourse(){
      this.$router.push(`/customer-course/` + this.course.id)
    },
  }
}
</script>
<template>
    <div class="my-5 text-primery text-bold shadow p-3 mb-5 bg-body-tertiary rounded me-3">
      <h1 >{{ course.Course.title }}</h1>
      <video width="370" height="205" class="me-5 mt-5" :poster="course.Course.thumbnail" controls>
        <object  width="470" height="255">
          <embed src="video.swf" width="470" height="255">
          </object>
        </video>
        <h1 class="text-bold text-primery">{{ course.title }}</h1>
        <button class="btn btn-success text-bold text-white" @click="goToDetailCourse">See Video</button>
      </div>
</template>
