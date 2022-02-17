import http from "./http-secondaryUser";

class SecondaryUserDataService {
  createSecondaryUser(data) {
    return http.post("/", data);
  }
}

export default SecondaryUserDataService;
