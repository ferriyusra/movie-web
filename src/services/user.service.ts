import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const userServices = {
  getUsers: () => instance.get(`${endpoint.ADMIN}/users`),

  promoteUser: (id: string) =>
    instance.patch(`${endpoint.ADMIN}/users/${id}/promote`),
};

export default userServices;
