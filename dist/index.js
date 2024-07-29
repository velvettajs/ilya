"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const events_1 = require("./config/events");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const webhookUrl = process.env.WEBHOOK_URL;
app.use(body_parser_1.default.json());
app.post("/github-webhook", async (req, res) => {
    var _a, _b, _c;
    const githubEvent = req.headers["x-github-event"];
    const payload = req.body;
    const authorName = (_a = payload.sender) === null || _a === void 0 ? void 0 : _a.login;
    const authorAvatarUrl = (_b = payload.sender) === null || _b === void 0 ? void 0 : _b.avatar_url;
    const repoName = (_c = payload.repo) === null || _c === void 0 ? void 0 : _c.name;
    const eventDetails = events_1.eventConfig[githubEvent] || {
        color: 0x808080,
        description: "An unknown event occurred.",
        getDetails: (payload) => {
            var _a;
            return ({
                title: `Event in ${repoName}`,
                fields: [],
                url: (_a = payload.repository) === null || _a === void 0 ? void 0 : _a.html_url,
            });
        },
    };
    const { title, description, color, fields, url } = eventDetails.getDetails(payload);
    const embed = {
        author: {
            name: authorName,
            icon_url: authorAvatarUrl,
        },
        title,
        description,
        color,
        fields,
        url,
        timestamp: new Date().toISOString(),
        footer: {
            text: `Event type: ${githubEvent}`,
        },
    };
    const message = {
        username: "ilya - velvetta's informer",
        embeds: [embed],
    };
    try {
        await axios_1.default.post(webhookUrl, message);
        res.status(200).send("Notification sent to Discord");
    }
    catch (e) {
        console.log("Error sending notification to Discord", e);
        res.status(500).send("Error sending notification to Discord");
    }
});
app.listen(PORT, () => console.log("Server runnin on port:", PORT));
