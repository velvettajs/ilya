"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventConfig = void 0;
exports.eventConfig = {
    push: {
        color: 0x00ff00,
        description: "A push event occurred.",
        getDetails: (payload) => {
            var _a;
            return ({
                title: `New Push to ${(_a = payload.repository) === null || _a === void 0 ? void 0 : _a.full_name}`,
                fields: [
                    { name: "Branch", value: payload.ref, inline: true },
                    {
                        name: "Commits",
                        value: payload.commits.length.toString(),
                        inline: true,
                    },
                ],
                url: payload.compare,
            });
        },
    },
    pull_request: {
        color: 0x0000ff,
        description: "A pull request event occurred.",
        getDetails: (payload) => {
            var _a, _b, _c, _d;
            return ({
                title: `Pull Request ${payload.action} in ${(_a = payload.repository) === null || _a === void 0 ? void 0 : _a.full_name}`,
                fields: [
                    { name: "Title", value: (_b = payload.pull_request) === null || _b === void 0 ? void 0 : _b.title, inline: true },
                    { name: "State", value: (_c = payload.pull_request) === null || _c === void 0 ? void 0 : _c.state, inline: true },
                ],
                url: (_d = payload.pull_request) === null || _d === void 0 ? void 0 : _d.html_url,
            });
        },
    },
    issues: {
        color: 0xffa500,
        description: "An issue event occurred.",
        getDetails: (payload) => {
            var _a, _b, _c, _d;
            return ({
                title: `Issue ${payload.action} in ${(_a = payload.repository) === null || _a === void 0 ? void 0 : _a.full_name}`,
                fields: [
                    { name: "Title", value: (_b = payload.issue) === null || _b === void 0 ? void 0 : _b.title, inline: true },
                    { name: "State", value: (_c = payload.issue) === null || _c === void 0 ? void 0 : _c.state, inline: true },
                ],
                url: (_d = payload.issue) === null || _d === void 0 ? void 0 : _d.html_url,
            });
        },
    },
};
