<script setup >
const { data: imgList } = await useFetch("/api/getPic");
const fileInput = ref(null);
const uploadImage = async () => {
  if (fileInput.value?.files.length > 0) {
    const formData = new FormData();
    formData.append("image", fileInput.value.files[0]);
    try {
      const { data } = await useFetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (data.value === "File uploaded successfully.") {
        alert(data.value);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading image.");
    }
  }
};
</script>
<template>
  <div>Index</div>
  <div>
    <h1>Image Uploadeiaps</h1>
    <form @submit.prevent="uploadImage">
      <input type="file" ref="fileInput" accept="image/*" required />
      <button type="submit">Upload Image</button>
    </form>
  </div>
  <!-- <p>{{ imgList }}</p> -->
  <div v-if="imgList.length != 0">
    <div v-for="img in imgList" :key="img">
      <!-- <p>url:{{ img.url }}</p> -->
      <img :src="`${img.url}`" alt="" />
    </div>
  </div>
</template>