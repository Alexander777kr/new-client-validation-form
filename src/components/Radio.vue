<template>
  <p class="description" :style="radioStyled">
    {{ visibleName }} <span class="arrow">&#8595;</span>
  </p>
  <div class="radio-buttons">
    <label v-for="val in values" :key="val">
      <input
        type="radio"
        :name="name"
        :value="val"
        v-model="checkedRadio"
        :checked="val === checkedRadio"
        @change="$emit('update:modelValue', checkedRadio)"
      />
      {{ val }}
    </label>
  </div>
  <div v-if="v && v.required && v.required.$invalid" class="show-error">
    Поле является обязательным.
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedRadio: this.modelValue,
    };
  },
  props: {
    visibleName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    modelValue: {},
    v: {
      type: Object,
      default: function () {},
    },
  },
  computed: {
    radioStyled() {
      if (this.checkedRadio !== "") {
        return { color: "blue" };
      } else {
        return {};
      }
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.arrow {
  font-size: 22px;
}

@media screen and (max-width: 310px) {
  label {
    font-size: 13px;
  }
}

@media screen and (max-width: 275px) {
  p.description,
  label {
    font-size: 12px;
  }
}

@media screen and (max-width: 200px) {
  p.description,
  label {
    font-size: 10px;
  }
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  input[type="radio"] {
    --active: #275efe;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    --border-hover: #275efe;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    margin-right: 10px;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;

    &:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
        opacity var(--d-o, 0.2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }

  input[type="radio"] {
    border-radius: 50%;
    &:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, 0.7));
    }
    &:checked {
      --s: 0.5;
    }
  }

  .radio-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 800px) {
    .radio-buttons {
      flex-direction: column;
    }
    input[type="radio"] {
      margin-bottom: 20px;
    }
  }
}

.show-error {
  font-size: 12px;
  color: red;
}
</style>