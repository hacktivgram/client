<template>
  <div>
      <div class="container-fluid bg-3 text-center">
            <div class="row">
                <div v-for="photo in photos" :key="photo" class="col-sm-3"><p>Some text..</p>
                <img :src="photo.image" class="img-responsive" style="width:100%" alt="Image">
                </div>
            </div>
      </div><br><br>
  </div>
</template>

<script>
export default {
  name: 'photo-list',
  props: ['photos']
}
</script>

<style>

</style>
