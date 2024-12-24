import axios from "axios";

export const api= axios.create({
    baseURL:'http://192.168.0.107:1080/api/v1/center/',
    headers: {
        "Content-Type": "application/json",
      },
})
/*http://192.168.14.27:1080/api/v1/center/',*/