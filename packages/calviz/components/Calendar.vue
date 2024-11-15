<template>
  <div class="calendar-view">
    <div v-if="loading" class="loading">Loading events...</div>
    <div v-else class="year-circle">
      <div v-for="event in events" :key="event.id" :class="'event ' + getMonthClass(event.start)">
        <span>{{ event.subject }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define references
const events = ref([]);
const loading = ref(true);

// This should be your Tauri backend endpoint to get events from Microsoft Graph
const fetchCalendarEvents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/getCalendarEvents');
    events.value = response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
  } finally {
    loading.value = false;
  }
};

// Use the hook to get data after component mounts
onMounted(async () => {
  await fetchCalendarEvents();
});

// Utility function to get the CSS class based on the month of the event
const getMonthClass = (startDateTime) => {
  const monthIndex = new Date(startDateTime).getMonth();
  return `month-${monthIndex}`;
};
</script>

<style scoped>
.year-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 500px;
  height: 500px;
  position: relative;
  background: #f5f5f5;
}
.event {
  position: absolute;
  padding: 5px;
  border-radius: 5px;
  background: #007bff;
  color: white;
  font-size: 12px;
}
/* Example CSS classes for months */
.month-0 {
  transform: rotate(0deg) translate(200px);
}
.month-1 {
  transform: rotate(30deg) translate(200px);
}
.month-2 {
  transform: rotate(60deg) translate(200px);
}
.month-3 {
  transform: rotate(90deg) translate(200px);
}
.month-4 {
  transform: rotate(120deg) translate(200px);
}
.month-5 {
  transform: rotate(150deg) translate(200px);
}
.month-6 {
  transform: rotate(180deg) translate(200px);
}
.month-7 {
  transform: rotate(210deg) translate(200px);
}
.month-8 {
  transform: rotate(240deg) translate(200px);
}
.month-9 {
  transform: rotate(270deg) translate(200px);
}
.month-10 {
  transform: rotate(300deg) translate(200px);
}
.month-11 {
  transform: rotate(330deg) translate(200px);
}
.loading {
  font-size: 18px;
  color: #333;
}
</style>
