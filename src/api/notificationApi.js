import axios from "axios";

export default {
  requestNotification() {
    return axios.get("/notification-service/notifications");
  },
  patchNotification(id, isRead) {
    const body = {
      read: isRead
    }
    return axios.patch("/notification-service/notification/" + id, body)
  },
  countNotifications() {
    return axios.get("/notification-service/api/notification/counts");
  }
}
