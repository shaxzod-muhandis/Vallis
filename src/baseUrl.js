import axios from "axios";
const instance = axios.create({
  // baseURL: "http://159.65.233.187/",
  baseURL: "https://backend.classo.uz/a1/",
  // baseURL: "https://vallisbackend.backoffice.uz/a1/",
  // baseURL: "http://zarbonbackend.backoffice.uz/api/",
});

instance.interceptors.request.use(
  (configs) => {
    const token2 = sessionStorage.getItem("accessToken");
    // console.log(token2,token);
    configs.headers.Authorization = token2 ? `Token ${token2}` : "";
    return configs;
  },
  (err) => {
    console.log(err.response);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err.response);
    if (err.response.status === 500) {
      // alert("Serverda hatolik qayta yuklang!");
    //  return window.location.replace("/");
      
    } else if (err.response.status === 400 && err.response.data.error) {
      alert(err.response.data.error);
    } else if (err.response.status === 400 && err.response.data.password) {
      alert("Parol noto'g'ri");
    } else if (err.response.status === 400 && err.response.data.username) {
      alert("Foydalanuvchi nomi noto'g'ri");
    } else if (err.response.status === 400 && err.response.data.name) {
      alert("Nomini kiriting");
    } else if (err.response.status === 400 && err.response.data.type) {
      alert("Narx turini kiriting");
    } else if (
      (err.response.status === 400 && err.response.data.price) ||
      err.response.data.product ||
      err.response.data.client ||
      err.response.data.discount ||
      err.response.data.status ||
      err.response.data.percent ||
      err.response.data.user ||
      err.response.data.end_cursor ||
      err.response.data.model ||
      err.response.data.number ||
      err.response.data.start_cursor ||
      err.response.data.work_day
    ) {
      alert("Malumotlarni hammasini kiriting");
    } else if (
      (err.response.status === 400 && err.response.data.salary) ||
      err.response.data.role
    ) {
      alert("Malumotlarni hammasini to`g`ri kiriting kiriting");
    }

    return Promise.reject(err);
  }
);

export default instance;
