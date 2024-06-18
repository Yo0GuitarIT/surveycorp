import { RESTDataSource, RequestOptions } from "@apollo/datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

class SpotifyTokenAPI extends RESTDataSource {
  override baseURL = "https://accounts.spotify.com/api/";

  async getSpotifyToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const options: RequestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    };
    return this.post("token", options as any);
  }
}

export default SpotifyTokenAPI;
