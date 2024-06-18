import { RESTDataSource, RequestOptions } from "@apollo/datasource-rest";

class TokenAPI extends RESTDataSource {
  override baseURL = "http://localhost:3001/";

  async getToken(code: string) {
    const body = { code };
    const options: RequestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return this.post("token", options as any);
  }
}

export default TokenAPI;
