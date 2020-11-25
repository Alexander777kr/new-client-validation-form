<template>
  <div class="button-container">
    <button :type="type" :style="successButton">
      {{ success ? "Всё хорошо!" : buttonValue }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttonValue: {
      type: String,
      default: "Send",
    },
    type: {
      type: String,
      default: "button",
    },
    success: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    successButton() {
      if (this.success) {
        return {
          background: "linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
          backgroundColor: "#A9C9FF",
          color: "rgb(151, 45, 147)",
          border: "3px solid blue",
        };
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
.button-container {
  display: flex;
  margin: auto;
  padding-bottom: 20px;
  padding-top: 40px;
}

button {
  margin: auto;
  padding: 10px 30px;
  background-color: white;
  border: 3px solid rgb(119, 25, 119);
  border-radius: 10px;
  outline: 0;
  font-size: 18px;
  font-weight: bold;
}

button:hover {
  border: 3px solid lightgreen;
}
</style>