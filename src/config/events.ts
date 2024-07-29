export const eventConfig: {
  [key: string]: {
    color: number;
    description: string;
    getDetails: (payload: any) => any;
  };
} = {
  push: {
    color: 0x00ff00,
    description: "A push event occurred.",
    getDetails: (payload) => ({
      title: `New Push to ${payload.repository?.full_name}`,
      fields: [
        { name: "Branch", value: payload.ref, inline: true },
        {
          name: "Commits",
          value: payload.commits.length.toString(),
          inline: true,
        },
      ],
      url: payload.compare,
    }),
  },
  pull_request: {
    color: 0x0000ff,
    description: "A pull request event occurred.",
    getDetails: (payload) => ({
      title: `Pull Request ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Title", value: payload.pull_request?.title, inline: true },
        { name: "State", value: payload.pull_request?.state, inline: true },
      ],
      url: payload.pull_request?.html_url,
    }),
  },
  issues: {
    color: 0xffa500,
    description: "An issue event occurred.",
    getDetails: (payload) => ({
      title: `Issue ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Title", value: payload.issue?.title, inline: true },
        { name: "State", value: payload.issue?.state, inline: true },
      ],
      url: payload.issue?.html_url,
    }),
  },
};
