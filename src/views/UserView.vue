<template>

  <div class="container">

    <h1>Create User</h1>

    <form @submit.prevent="handleSubmit">

      <input
          v-model="form.username"
          type="text"
          placeholder="Username"
      />

      <p v-if="errors.username">
        {{ errors.username }}
      </p>

      <input
          v-model="form.email"
          type="email"
          placeholder="Email"
      />

      <p v-if="errors.email">
        {{ errors.email }}
      </p>

      <input
          v-model="form.password"
          type="password"
          placeholder="Password"
      />

      <p v-if="errors.password">
        {{ errors.password }}
      </p>

      <button type="submit">
        Create User
      </button>

    </form>

  </div>

</template>

<script setup>

import { reactive } from "vue";
import { createUser } from "../services/userService";

const form = reactive({
  username: "",
  email: "",
  password: ""
});

const errors = reactive({
  username: "",
  email: "",
  password: ""
});

const resetErrors = () => {

  errors.username = "";
  errors.email = "";
  errors.password = "";
};

const handleSubmit = async () => {

  resetErrors();

  try {

    const response = await createUser(form);

    console.log(response.data);

    alert("User created successfully");

    form.username = "";
    form.email = "";
    form.password = "";

  } catch (error) {

    console.error(error.response?.data);
    const validationErrors = error.response?.data?.data;

    if (validationErrors) {

      Object.keys(validationErrors).forEach((field) => {

        errors[field] = validationErrors[field];

      });
    }
  }
};

</script>