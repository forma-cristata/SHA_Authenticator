<script>
export default {
  name: "UsernameInput.vue"
}



document.addEventListener('DOMContentLoaded', () => {

  const termLengthInSeconds = new Date(Date.now() +24*60*60*7*14*1000).toUTCString();

  const form = document.getElementById('container');
  const usernameInput = document.getElementById('username');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let username = usernameInput.value.trim();
    console.log(username);
    document.cookie = `username=${username}; expires=${termLengthInSeconds}`;
  });
});
</script>

<template>
<form id="container">
  <div class="m-auto" id="username-div">
    <h3 class="fw-normal">Enter your GitHub Username</h3>
    <div class="form-floating">
      <input class="form-control" id="username" required />
      <label for="username">GitHub Username</label>
    </div>

    <button type="submit" class="btn btn-primary w-100 my-3 py-2">Continue</button>
  </div>
</form>



</template>

<style scoped>
#container{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>