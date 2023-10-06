# Github reposotiry commit activity monitor.

Allows you to search Github repositories by name and compare their last year's commit activity. Useful to evaluate the "vital signs" of libraries and frameworks.

Uses Next, redux, tailwind, MUI X's LineGraph components.

## To run in development

**Install dependencies**

```bash
npm install
```

or

```bash
pnpm install
```

**Add a github token**

To contact the github API, a github token is needed. 

The server expects it to be set at the environment variable `GITHUB_TOKEN`.

You can get a token following [this manual](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

After getting your token, create an `.env` file at the root of this project like:

```bash
GITHUB_TOKEN=YOUR_TOKEN_HERE
```

**Run local server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

