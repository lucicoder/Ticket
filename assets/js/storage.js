// assets/js/storage.js
// Stores and retrieves visitor registrations from localStorage.
// No backend needed (works on static hosting).

const STORAGE_KEY = "dmala_visitors_v1";
const CAPACITY_KEY = "dmala_slot_capacity_v1"; // per device/kiosk capacity tracking

export function loadVisitors() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function saveVisitor(record) {
  const list = loadVisitors();
  list.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return record;
}

export function updateVisitor(bookingId, patch) {
  const list = loadVisitors();
  const idx = list.findIndex(v => v.bookingId === bookingId);
  if (idx === -1) return null;

  list[idx] = { ...list[idx], ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list[idx];
}

export function findVisitor(bookingId) {
  return loadVisitors().find(v => v.bookingId === bookingId) || null;
}

export function clearVisitors() {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateBookingId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DM-${t}-${r}`;
}

/* ================= SLOT CAPACITY (per kiosk) =================
   NOTE: Without a backend, capacity is enforced per device.
   For real multi-counter capacity, connect to Google Sheets/Firebase later.
*/

function loadCapacityMap() {
  try {
    return JSON.parse(localStorage.getItem(CAPACITY_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveCapacityMap(map) {
  localStorage.setItem(CAPACITY_KEY, JSON.stringify(map));
}

export function getSlotKey(dateStr, slotStr) {
  return `${dateStr}__${slotStr}`;
}

export function getSlotUsed(dateStr, slotStr) {
  const map = loadCapacityMap();
  return Number(map[getSlotKey(dateStr, slotStr)] || 0);
}

export function addSlotUsed(dateStr, slotStr, qty) {
  const map = loadCapacityMap();
  const key = getSlotKey(dateStr, slotStr);
  map[key] = Number(map[key] || 0) + Number(qty || 0);
  if (map[key] < 0) map[key] = 0;
  saveCapacityMap(map);
  return map[key];
}

export function getAllSlotUsedForDate(dateStr, slotList) {
  const out = {};
  slotList.forEach(slot => out[slot] = getSlotUsed(dateStr, slot));
  return out;
}
