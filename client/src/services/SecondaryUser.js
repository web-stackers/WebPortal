import http from "./http-secondaryUser";

class SecondaryUserDataService {
  createSecondaryUser(data) {
    return http.post("/secondaryUser", data);
  }
}

export default new SecondaryUserDataService();
