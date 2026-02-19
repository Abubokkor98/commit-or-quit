# Contributing

Thanks for your interest in contributing to Commit or Quit. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@Abubokkor98](https://github.com/Abubokkor98).

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/commit-or-quit.git
```

### Navigate to project directory

```bash
cd commit-or-quit
```

### Create a new branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

## Structure

| Path          | Description                                |
| ------------- | ------------------------------------------ |
| `/app`        | Next.js App Router pages and layout        |
| `/components` | React components organized by feature      |
| `/hooks`      | Custom hooks (state management lives here) |
| `/lib`        | Utility functions and storage logic        |
| `/types`      | TypeScript interfaces and constants        |

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention `category: message` in your commit message while using one of the following categories:

- `feat`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation
- `chore`: all changes to the repository that do not fit into any of the above categories

e.g. `feat: add confidence picker to commit form`

## Requests for new features

If you have a request for a new feature, please open an issue on GitHub.
