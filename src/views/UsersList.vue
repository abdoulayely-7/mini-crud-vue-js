<template>
  <div class="container">
    <h1>Users List</h1>

    <button @click="loadUsers" class="btn-refresh">
      Refresh
    </button>

    <div v-if="loading" class="loading">
      Loading users...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <table v-if="users.length > 0" class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="deleteUser(user.id)" class="btn-delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="no-users">
      No users found
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllUsers, deleteUser as deleteUserApi } from "../services/userService";

const users = ref([]);
const loading = ref(false);
const error = ref("");

const loadUsers = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await getAllUsers();
    users.value = response.data.data || [];
  } catch (err) {
    error.value = "Failed to load users";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await deleteUserApi(id);
      users.value = users.value.filter(user => user.id !== id);
      alert("User deleted successfully");
    } catch (err) {
      error.value = "Failed to delete user";
      console.error(err);
    }
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.btn-refresh {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn-refresh:hover {
  background-color: #0056b3;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error {
  padding: 20px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  margin-bottom: 20px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.users-table tr:hover {
  background-color: #f9f9f9;
}

.btn-delete {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #c82333;
}

.no-users {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
