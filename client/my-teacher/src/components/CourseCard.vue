<script>
import { mapActions } from 'pinia'
import { useCourseStore } from '../stores/course'

export default {
  props:['course'],
  methods: {
    ...mapActions(useCourseStore, ['buyCourse']),
    buyCourseHandler(){

      if(!localStorage.access_token){
        this.$router.push("/login")
      }else{
        this.buyCourse(this.course.id)
      }
    }
  }
}
</script>
<template>
    <div class="shadow p-3 mb-5 bg-body-tertiary rounded me-3">
      <video width="360" height="205" class="me-5 mt-5" :poster="course.thumbnail" controls>
        <object  width="470" height="255">
          <embed src="video.swf" width="470" height="255">
          </object>
        </video>
        <h1 class="text-bold text-primery">{{ course.title }}</h1>
        <h2 class="text-bold text-secondary">Rp. 100,000</h2>
        <button class="btn btn-warning text-bold text-primery" @click="buyCourseHandler">Buy Course</button>
      </div>
</template>
