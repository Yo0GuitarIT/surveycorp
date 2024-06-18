import { RESTDataSource } from "@apollo/datasource-rest";

class UsersAPI extends RESTDataSource {
  override baseURL = "http://localhost:3001/";
  async getUsers(): Promise<{ id: number; name: string; email: string }[]> {
    return this.get("users");
  }
}

export default UsersAPI;
