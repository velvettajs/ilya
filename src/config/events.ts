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
  create: {
    color: 0x00ffff,
    description: "A branch or tag was created.",
    getDetails: (payload) => ({
      title: `Created ${payload.ref_type} ${payload.ref} in ${payload.repository?.full_name}`,
      fields: [{ name: "Type", value: payload.ref_type, inline: true }],
      url: payload.repository?.html_url,
    }),
  },
  delete: {
    color: 0xff0000,
    description: "A branch or tag was deleted.",
    getDetails: (payload) => ({
      title: `Deleted ${payload.ref_type} ${payload.ref} from ${payload.repository?.full_name}`,
      fields: [{ name: "Type", value: payload.ref_type, inline: true }],
      url: payload.repository?.html_url,
    }),
  },
  collaborator: {
    color: 0x800080,
    description: "A collaborator was added, removed, or changed.",
    getDetails: (payload) => ({
      title: `Collaborator ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Collaborator", value: payload.member?.login, inline: true },
      ],
      url: payload.repository?.html_url,
    }),
  },
  commit_comment: {
    color: 0x000000,
    description: "A comment was added to a commit.",
    getDetails: (payload) => ({
      title: `Commit Comment ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Commit SHA", value: payload.comment?.commit_id, inline: true },
        { name: "Comment", value: payload.comment?.body, inline: false },
      ],
      url: payload.comment?.html_url,
    }),
  },
  discussion: {
    color: 0x00bfff,
    description: "A discussion was created or updated.",
    getDetails: (payload) => ({
      title: `Discussion ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Title", value: payload.discussion?.title, inline: true },
        { name: "Body", value: payload.discussion?.body, inline: false },
      ],
      url: payload.discussion?.html_url,
    }),
  },
  fork: {
    color: 0x00ff00,
    description: "A repository was forked.",
    getDetails: (payload) => ({
      title: `Forked Repository ${payload.repository?.full_name}`,
      fields: [
        { name: "Forked By", value: payload.forkee?.full_name, inline: true },
      ],
      url: payload.repository?.html_url,
    }),
  },
  discussion_comment: {
    color: 0xffa500,
    description: "A comment was added to a discussion.",
    getDetails: (payload) => ({
      title: `Discussion Comment ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Comment", value: payload.comment?.body, inline: false },
      ],
      url: payload.comment?.html_url,
    }),
  },
  issue_comment: {
    color: 0x8a2be2,
    description: "A comment was added to an issue.",
    getDetails: (payload) => ({
      title: `Issue Comment ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Issue Title", value: payload.issue?.title, inline: true },
        { name: "Comment", value: payload.comment?.body, inline: false },
      ],
      url: payload.comment?.html_url,
    }),
  },
  pull_request_review_comment: {
    color: 0xff4500,
    description: "A comment was added to a pull request review.",
    getDetails: (payload) => ({
      title: `Pull Request Review Comment ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        {
          name: "Pull Request Title",
          value: payload.pull_request?.title,
          inline: true,
        },
        { name: "Comment", value: payload.comment?.body, inline: false },
      ],
      url: payload.comment?.html_url,
    }),
  },
  pull_request_review_thread: {
    color: 0x4682b4,
    description: "A review thread was created or updated.",
    getDetails: (payload) => ({
      title: `Pull Request Review Thread ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        {
          name: "Thread Title",
          value: payload.pull_request_review?.body,
          inline: true,
        },
      ],
      url: payload.pull_request?.html_url,
    }),
  },
  pull_request_review: {
    color: 0x1e90ff,
    description: "A pull request review was created or updated.",
    getDetails: (payload) => ({
      title: `Pull Request Review ${payload.action} in ${payload.repository?.full_name}`,
      fields: [
        { name: "Review State", value: payload.review?.state, inline: true },
        { name: "Review Body", value: payload.review?.body, inline: false },
      ],
      url: payload.pull_request?.html_url,
    }),
  },
  repository: {
    color: 0x00bfff,
    description: "A repository was created, updated, or deleted.",
    getDetails: (payload) => ({
      title: `Repository ${payload.action} ${payload.repository?.full_name}`,
      fields: [
        {
          name: "Repository Name",
          value: payload.repository?.full_name,
          inline: true,
        },
      ],
      url: payload.repository?.html_url,
    }),
  },
  visibility_change: {
    color: 0x4b0082,
    description: "A repository visibility was changed.",
    getDetails: (payload) => ({
      title: `Visibility Change for ${payload.repository?.full_name}`,
      fields: [
        {
          name: "New Visibility",
          value: payload.repository?.visibility,
          inline: true,
        },
      ],
      url: payload.repository?.html_url,
    }),
  },
};
