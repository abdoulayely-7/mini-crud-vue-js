<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-container">
        <h2 class="logo">User Manager</h2>
        <ul class="nav-menu">
          <li>
            <button 
              @click="currentView = 'create'" 
              :class="{ active: currentView === 'create' }"
              class="nav-button"
            >
              Create User
            </button>
          </li>
          <li>
            <button 
              @click="currentView = 'list'" 
              :class="{ active: currentView === 'list' }"
              class="nav-button"
            >
              Users List
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <UserView v-if="currentView === 'create'" />
      <UsersList v-if="currentView === 'list'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserView from "./views/UserView.vue";
import UsersList from "./views/UsersList.vue";

const currentView = ref("create");
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.navbar {
  background-color: #333;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  color: white;
  font-size: 24px;
  margin: 0;
  padding: 15px 0;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.nav-button {
  padding: 10px 20px;
  background-color: transparent;
  color: white;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-button.active {
  background-color: #007bff;
  border-color: #007bff;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
