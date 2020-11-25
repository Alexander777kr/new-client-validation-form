<template>
  <div class="input-container">
    <input
      :type="inputType"
      v-model="settedName"
      :name="name"
      @input="v ? v.$touch : ''"
      :style="inlineStyles"
      @focus="getFocused"
      @blur="focused = false"
    />
    <label :class="{ visited: focused === false }" :style="labelStyles">{{
      visibleName
    }}</label>
    <div v-if="v && v.required && v.required.$invalid" class="show-error">
      Поле является обязательным.
    </div>
    <div v-if="v && v.numeric && v.numeric.$invalid" class="show-error">
      Поле должно содержать только числа.
    </div>
    <div v-if="v && v.minLength && v.minLength.$invalid" class="show-error">
      Поле должно содержать минимум {{ v.minLength.$params.min }} цифр.
    </div>
    <div v-if="v && v.maxLength && v.maxLength.$invalid" class="show-error">
      Поле должно содержать максимум {{ v.maxLength.$params.max }} цифр.
    </div>
    <div
      v-if="v && v.ifBeginsWithSeven && v.ifBeginsWithSeven.$invalid"
      class="show-error"
    >
      Поле должно начинаться с цифры 7.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focused: null,
    };
  },
  props: {
    visibleName: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    v: {
      type: Object,
      default: function () {},
    },
    inputType: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    getFocused() {
      this.focused = true;
      if (this.v && typeof this.v.$touch === "function") {
        this.v.$touch();
      }
    },
  },
  computed: {
    settedName: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    inlineStyles() {
      if (this.v && this.v.$error) {
        return { borderBottom: "2px solid red" };
      } else if (this.focused === false) {
        return { borderBottom: "2px solid blue" };
      } else {
        return {};
      }
    },
    labelStyles() {
      if (this.inputType === "date" && this.focused === false) {
        return { fontSize: "10px", position: "static", display: "block" };
      } else if (this.inputType === "date") {
        return { position: "relative", display: "block" };
      } else {
        return {};
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  position: relative;
  margin-bottom: 20px;
  margin-top: 20px;
}

.input-container label {
  position: absolute;
  top: 0px;
  left: 10px;
  font-size: 16px;
  transition: all 0.5s ease-in-out;
}

input[type="text"] {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border: 0;
  border-bottom: 2px solid #555;
  outline: none;
}

@media screen and (max-width: 300px) {
  input[type="date"] {
    font-size: 10px;
  }

  .input-container label {
    font-size: 14px;
  }
}

@media screen and (max-width: 250px) {
  input[type="date"] {
    font-size: 8px;
  }

  .input-container label {
    font-size: 12px;
  }
}

input[type="text"]:focus {
  border-bottom: 2px solid lightgreen;
}

input[type="text"]:focus ~ label,
input[type="text"] ~ label.visited {
  top: -12px;
  font-size: 12px;
}

.show-error {
  font-size: 12px;
  color: red;
}
</style>