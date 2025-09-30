# Bilemo Frontend

Stack
------------

- [mkcert][1]
- [tailwind][2]
- [pnpm][3]
- [nuxt][4]
- [typescript][5]
- [cypress][6]
- [orval][7]

Requirements
------------

- [mkcert][1]
- [pnpm][3]

Installation
------------

Install mkcert certificates:

```bash
mkcert -install
mkdir -p certs
mkcert -key-file certs/nuxt-full-demo.key.pem -cert-file certs/nuxt-full-demo.crt.pem localhost
```

Install JavaScript dependencies:

```bash
$ pnpm install
```

Usage
------------

Start the dev server:

```bash
$ pnpm dev --https --ssl-cert certs/nuxt-full-demo.crt.pem --ssl-key certs/nuxt-full-demo.key.pem &
```

By default, the web server runs on `[https://localhost:3000][8]`.

Production
------------

Build the application for production:

```bash
$ pnpm build
```

Locally preview production build:

```bash
$ pnpm preview
```

Tests
------------

Install Cypress:
```bash
$ pnpm cypress install
```


Execute this command to run tests:
```bash
$ pnpm cypress run
```

[1]: https://github.com/FiloSottile/mkcert
[2]: https://tailwindcss.com/
[3]: https://pnpm.io/installation
[4]: https://nuxt.com/docs/getting-started/introduction
[5]: https://www.typescriptlang.org/docs/
[6]: https://docs.cypress.io/app/get-started/why-cypress
[7]: https://orval.dev/
[8]: https://localhost:3000
