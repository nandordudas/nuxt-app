# Application `ACME`

> [!NOTE]
> :construction: development in progress
> check [setup](#setup) for more information
>
> ```bash
> pnpm dlx nuxi@latest init --packageManager pnpm --gitInit --shell && code . --new-window
> ```

## Development

Create local environment variables file:

```bash
cp .env.example .env.local
```

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `https://localhost:3000`:

```bash
pnpm run dev
```

<!-- ## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
``` -->

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Setup

Install `nvm` and `Node.js` then install global dependencies:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
[ -n "$BASH_VERSION" ] && source ~/.bashrc || [ -n "$ZSH_VERSION" ] && source ~/.zshrc
nvm install node
# Update nvm and keep dependencies
nvm install node --reinstall-packages-from=node
```

## Recommended

### Node.js dependencies

```bash
npm install --global @antfu/ni eslint npkill npm@latest pnpm@latest port-kill taze
```

### Local development certificates

After installing [mkcert] run the following commands and copy the certificate and key to `./tmp/` folder.

```bash
mkcert -install
mkcert localhost 127.0.0.1 ::1
```

## Nuxt 3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

[mkcert]: https://github.com/FiloSottile/mkcert
