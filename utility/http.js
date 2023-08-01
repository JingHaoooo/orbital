import axios from 'axios';

const BACKEND_URL = 'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/';

export async function storeSlots(slotsData) {
  const response = await axios.post(`${BACKEND_URL}/slots.json`, slotsData);
  console.log(response);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/slots.json`);

  const slots = [];

  for (const key in response.data) {
    const slotObj = {
      id: key,
      dateTime: new Date(response.data[key].dateTime),
      duration: response.data[key].duration,
    };
    slots.push(slotObj);
  }

  return slots;
}