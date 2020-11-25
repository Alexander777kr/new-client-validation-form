<template>
  <div class="container header">
    <div class="header-styling" :style="HeaderStyledAfterSubmitForm">
      <h1>
        {{ submitStatus === "OK" ? "Клиент создан!" : "Новый клиент" }}
      </h1>
    </div>
  </div>
  <div class="container bordered" :style="containerFormStyles">
    <form @submit.prevent="submitForm">
      <div class="block-maininfo">
        <h2>Основная информация</h2>
      </div>
      <div>
        <div class="block-info">
          <input-text
            visibleName="Фамилия"
            v-model="surname"
            name="surname"
            :v="$v.surname"
          ></input-text>
          <input-text
            visibleName="Имя"
            v-model="name"
            name="name"
            :v="$v.name"
          ></input-text>
          <input-text
            visibleName="Отчество"
            v-model="patronymic"
            name="patronymic"
          ></input-text>
          <input-text
            visibleName="Дата рождения"
            v-model="date"
            name="date"
            :v="$v.date"
            inputType="date"
          ></input-text>
          <input-text
            visibleName="Номер телефона"
            v-model="tel"
            name="tel"
            :v="$v.tel"
          ></input-text>
          <radio-buttons
            visibleName="Пол"
            v-model="maleFemale"
            name="MaleFemale"
            :values="maleFemaleValues"
          ></radio-buttons>
        </div>
        <div class="block-info">
          <selector-multiple
            name="clientGroup"
            visibleName="Группа клиентов"
            v-model="groupOfClients"
            :v="$v.groupOfClients"
            :values="groupOfClientsValues"
          ></selector-multiple>
          <selector-option
            name="doctor"
            visibleName="Лечащий врач"
            v-model="doctor"
            :values="doctorValues"
          >
          </selector-option>
          <input-checkboxes
            visibleName="Не отправлять СМС"
            v-model="dontSendSMS"
            name="dontSendSMS"
            :value="dontSendSMSValue"
            :showHeader="false"
          ></input-checkboxes>
        </div>
      </div>
      <div class="block-maininfo">
        <h2>Адрес</h2>
      </div>
      <div>
        <div class="block-info">
          <input-text
            visibleName="Индекс"
            v-model="cityIndex"
            name="cityIndex"
            :v="$v.cityIndex"
          ></input-text>
          <input-text
            visibleName="Страна"
            v-model="country"
            name="country"
          ></input-text>
          <input-text
            visibleName="Область"
            v-model="region"
            name="region"
          ></input-text>
        </div>
        <div class="block-info">
          <input-text
            visibleName="Город"
            v-model="city"
            name="city"
            :v="$v.city"
          ></input-text>
          <input-text
            visibleName="Улица"
            v-model="street"
            name="street"
          ></input-text>
          <input-text
            visibleName="Дом"
            v-model="houseNumber"
            name="houseNumber"
          ></input-text>
        </div>
      </div>
      <div class="block-maininfo">
        <h2>Паспорт</h2>
      </div>
      <div>
        <div class="block-info">
          <selector-option
            name="identityCard"
            visibleName="Тип документа"
            v-model="identityCard"
            :values="identityCardValues"
            :v="$v.identityCard"
          ></selector-option>
          <input-text
            visibleName="Серия"
            v-model="passportSeries"
            name="passportSeries"
            :v="$v.passportSeries"
          ></input-text>
          <input-text
            visibleName="Номер"
            v-model="passportID"
            name="passportID"
            :v="$v.passportID"
          ></input-text>
        </div>
        <div class="block-info">
          <input-text
            visibleName="Кем выдан"
            v-model="passportIssuedBy"
            name="passportIssuedBy"
          ></input-text>
          <input-text
            visibleName="Дата выдачи"
            v-model="dateOfIssue"
            name="dateOfIssue"
            inputType="date"
            :v="$v.dateOfIssue"
          ></input-text>
        </div>
      </div>

      <div class="block-otherinfo">
        <p v-if="submitStatus === 'OK'" class="submit submit-success">
          Новый клиент успешно создан.
        </p>
        <p v-if="submitStatus === 'ERROR'" class="submit submit-error">
          Пожалуйста, заполните все необходимые поля формы.
        </p>
      </div>

      <input-button
        type="submit"
        buttonValue="Создать клиента"
        :success="submitStatus === 'OK'"
      ></input-button>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";

import InputText from "./components/InputTextAndDate";
import Radio from "./components/Radio";
import Multiselector from "./components/Multiselector.vue";
import Selector from "./components/Selector";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button";

const ifBeginsWithSeven = (value) => value.search(/^7/) !== -1;

export default {
  components: {
    "input-text": InputText,
    "radio-buttons": Radio,
    "selector-multiple": Multiselector,
    "input-button": Button,
    "selector-option": Selector,
    "input-checkboxes": Checkbox,
  },
  data() {
    return {
      surname: "",
      name: "",
      patronymic: "",
      date: "",
      tel: "",
      maleFemale: "",
      maleFemaleValues: ["Мужской", "Женский"],
      groupOfClients: [],
      groupOfClientsValues: ["VIP", "Проблемные", "ОМС"],
      doctor: "",
      doctorValues: ["Иванов", "Захаров", "Чернышева"],
      dontSendSMS: "",
      dontSendSMSValue: "Не отправлять СМС",
      cityIndex: "",
      country: "",
      region: "",
      city: "",
      street: "",
      houseNumber: "",
      identityCard: "",
      identityCardValues: [
        "Паспорт",
        "Свидетельство о рождении",
        "Вод. удостоверение",
      ],
      passportSeries: "",
      passportID: "",
      passportIssuedBy: "",
      dateOfIssue: "",
      submitStatus: null,
    };
  },
  computed: {
    containerFormStyles() {
      if (this.submitStatus === "OK") {
        return { border: "3px solid blue" };
      } else {
        return "";
      }
    },

    HeaderStyledAfterSubmitForm() {
      if (this.submitStatus === "OK") {
        return {
          background: "linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
          backgroundColor: "#A9C9FF",
        };
      } else {
        return "";
      }
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$error) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "OK";
      }
    },
  },
  validations() {
    return {
      surname: { required },
      name: { required },
      date: { required },
      tel: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11),
        numeric,
        ifBeginsWithSeven,
      },
      groupOfClients: { required },
      cityIndex: { numeric },
      city: { required },
      identityCard: { required },
      passportSeries: { numeric },
      passportID: { numeric },
      dateOfIssue: { required },
    };
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  margin-bottom: 40px;
}

.bordered {
  border: 3px solid black;
  border-radius: 10px;
}

.header-styling {
  background-image: linear-gradient(109.5deg, lightgray 11.2%, black 91.1%);
  clip-path: polygon(
    0% 15%,
    15% 15%,
    15% 0%,
    85% 0%,
    85% 15%,
    100% 15%,
    100% 85%,
    85% 85%,
    85% 100%,
    15% 100%,
    15% 85%,
    0% 85%
  );
  /* transform-origin: top left; */
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
  font-size: 34px;
  color: white;

  letter-spacing: 10px;
}

h2 {
  text-align: center;
}

form > div:not(.block-maininfo):not(.block-otherinfo) {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.block-info,
.block-maininfo,
.block-otherinfo {
  margin-left: 20px;
  margin-right: 20px;
}

.block-info {
  flex-basis: 30%;
  /* background: gray; */
  padding: 20px 20px 0 20px;
}

.submit {
  font-size: 18px;
  text-align: center;
}

.submit-error {
  color: red;
}

.submit-success {
  color: blue;
}

@media screen and (max-width: 820px) {
  .block-info {
    flex-basis: 100%;
  }

  h1 {
    font-size: 20px;
  }

  .description {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 16px;
  }
}

@media screen and (max-width: 300px) {
  h1 {
    font-size: 14px;
  }
  h2 {
    font-size: 16px;
  }
}
</style>