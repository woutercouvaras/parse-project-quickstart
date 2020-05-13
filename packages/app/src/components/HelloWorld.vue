<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Parse from "parse";

export default {
  name: "HelloWorld",
  data: () => {
    return {
      msg: "Hello!  Looking for Cloud..."
    };
  },
  async created() {
    try {
      const response = await Parse.Cloud.run("helloFromTheCloud");
      this.msg = response.data;
    } catch (e) {
      this.msg = "Hello, the cloud seems to be offline";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
