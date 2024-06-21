import { RESTDataSource, RequestOptions } from "@apollo/datasource-rest";
import * as dotenv from "dotenv";
import { getCode } from "./codeStorage";

dotenv.config();

class SpotifyTokenAPI extends RESTDataSource {
  override baseURL = "https://accounts.spotify.com/api/";

  async getSpotifyToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const code = getCode();
    const redirectUrl = "http://localhost:3000/callback";

    const options: RequestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}`,
    };
    return this.post("token", options as any);
  }
}

export default SpotifyTokenAPI;
