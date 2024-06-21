import express, { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import "dotenv/config";

const app = express();
const port = 4000;

const spotifyWebApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

app.get("/login", (req: Request, res: Response) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
  ];
  const state = Math.random().toString(36).substring(7);
  const showDialog = false;

  const authorizeURL = spotifyWebApi.createAuthorizeURL(
    scopes,
    state,
    showDialog
  );
  res.redirect(authorizeURL);
});

app.get("/callback", (req: Request, res: Response) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.log("Error:", error);
    res.send(`Error: ${error}`);
    return;
  }

  spotifyWebApi
    .authorizationCodeGrant(code as string)
    .then((data: any) => {
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];

      spotifyWebApi.setAccessToken(accessToken);
      spotifyWebApi.setRefreshToken(refreshToken);

      console.log(accessToken, refreshToken, expiresIn);
      res.redirect("http://localhost:3000");
    })
    .catch((error: string) => {
      console.log("Error:", error);
      res.send("Error getting token");
    });
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  spotifyWebApi
    .searchTracks(q as string)
    .then((searchData: any) => {
      const trackUri = searchData.body.tracks?.items[0].uri;
      res.send({ uri: trackUri });
    })
    .catch((error: any) => {
      res.send(`Error search ${error}`);
    });
});

app.get("/play", (req, res) => {
  const { uri } = req.query;
  spotifyWebApi
    .play({ uris: [uri as any] })
    .then(() => {
      res.send("play started");
    })
    .catch((error: string) => {
      res.send(`Error playing ${error}`);
    });
});

app.get("/pause", (req, res) => {
  spotifyWebApi
    .pause()
    .then(() => console.log("pause"))
    .catch((err) => console.log(`Error:${err}`));
});

app.get("/aboutMe", (req, res) => {
  spotifyWebApi.getMe().then(
    function (data) {
      console.log("Some information about the authenticated user", data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

app.listen(port, () => {
  console.log(`Listen at Http://localhost:${port}`);
});
