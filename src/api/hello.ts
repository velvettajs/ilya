import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).send("Here's where velvettajs deploys code!");
}
