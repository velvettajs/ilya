import { VercelRequest, VercelResponse } from "@vercel/node";
import { eventConfig } from "../config/events";
import { GiphyFetch } from "@giphy/js-fetch-api";
import axios from "axios";

const GIPHY_API_KEY: string = process.env.GIPHY_API_KEY as string;
const gf = new GiphyFetch(GIPHY_API_KEY);
const webhookUrl: string = process.env.WEBHOOK_URL as string;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const githubEvent = req.headers["x-github-event"] as string;
  const payload = req.body;
  const authorName = payload.sender?.login;
  const authorAvatarUrl = payload.sender?.avatar_url;
  const repoName = payload.repo?.name;
  const eventDetails = eventConfig[githubEvent] || {
    color: 0x808080,
    description: "An unknown event occurred.",
    getDetails: (payload) => ({
      title: `Event in ${repoName}`,
      fields: [],
      url: payload.repository?.html_url,
    }),
  };
  const { data: gifs } = await gf.search("cats coding");
  const gif = gifs[Math.floor(Math.random() * gifs.length)];
  const { title, description, fields, url } = eventDetails.getDetails(payload);
  const embed = {
    author: {
      name: authorName,
      icon_url: authorAvatarUrl,
    },
    title,
    description,
    color: Math.floor(Math.random() * 16777215).toString(16),
    fields,
    url,
    timestamp: new Date().toISOString(),
    footer: {
      text: `Event type: ${githubEvent}`,
    },
    thumbnail_url: gif.url,
  };
  const message = {
    username: "ilya",
    embeds: [embed],
  };
  try {
    await axios.post(webhookUrl, message);
    res.status(200).send("Notification sent to Discord");
  } catch (e) {
    console.log("Error sending notification to Discord", e);
    res.status(500).send("Error sending notification to Discord");
  }
  res.status(200).send("Here's where velvettajs deploys code!");
}
