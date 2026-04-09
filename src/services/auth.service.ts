import axios from "axios";
import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRegister, ILogin } from "@/types/Auth";
import { environment } from "@/config/environment";

// Auth endpoints that collide with NextAuth's /api/auth/* catch-all
// are routed through /api/proxy/* to avoid the conflict.
// Server-side calls (NextAuth authorize) use the backend URL directly.
const proxyAuth = axios.create({
  baseURL: typeof window !== "undefined" ? "/api/proxy" : environment.API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 60 * 1000,
});

const authServices = {
  register: (payload: IRegister) =>
    proxyAuth.post(`${endpoint.AUTH}/register`, payload),

  login: (payload: ILogin) =>
    proxyAuth.post(`${endpoint.AUTH}/login`, payload),

  getProfileWithToken: (token: string) =>
    proxyAuth.get(`${endpoint.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getProfile: () => instance.get(`${endpoint.AUTH}/me`),

  refreshToken: (refreshToken: string) =>
    proxyAuth.post(`${endpoint.AUTH}/refresh`, { refreshToken }),

  logout: () => instance.post(`${endpoint.AUTH}/logout`),
};

export default authServices;
