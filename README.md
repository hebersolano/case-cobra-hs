<div align="center">
  <!-- Brief -->
  <h2>Cobra Case</h2>
  <p >
  Capture your favorite memories with your own, <strong >one-of-one</strong> phone case. CaseCobra allows you to protect your memories, not just your phone
  </p>

  <img src="public/snake-1.png" alt="logo" width="52px" height="auto">

  <br>
  
  <!-- Screenshot -->
  <a align="center" href="">
    <img src="" alt="preview"  width="60%" style="">
  </a>

  <h3>
    <a href="">
      <strong>Demo Website</strong>
    </a>
  </h3>

  <div>
    <a href="">View Demo</a>
    &emsp;•&emsp;
    <a href="">Report Bug</a>
   &emsp;•&emsp;
    <a href="">Request Feature</a>
  </div>

  <br>
  
  <img src="https://img.shields.io/badge/Status-In_progress-yellow?style=flat" alt="Status" />

  <hr>

</div>

## Table of contents

- [Build process and details: ](BUILD-PROCESS.md)
- [Installation](#installation)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

### Installation

This project use `pnpm` package manager, if you want to use `npm` follow this instructions:

1. Delete `node_modules` folder if already exists.
2. Delete `pnpm_lock.yaml` file (this will be replaced by `package-lock.json`).
3. Replace all pnpm calls to npm in `package.json`
4. Run `npm install`

- Clone this repo:

```sh
git clone https://github.com/hebersolano/case-cobra-hs.git
```

- Install dependencies:

```sh
pnpm install
```

- Create a dev.local file with this variables:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_DEV_URL=http://localhost:3000

KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/success

KINDE_DOMAIN=
KINDE_MANAGEMENT_CLIENT_ID=
KINDE_MANAGEMENT_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
# in production replace with actual url
UPLOADTHING_URL=http://localhost:3000

# postgresql database
DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

RESEND_API_KEY=
```

- Live server:

```sh
npm run dev
```

- Build command:

```sh
npm run build
```

### Author

<b>👤 Heber Solano</b>

<!-- Badges -->
<div>
<ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem">
  <li>
    <a href='https://github.com/hebersolano/' target="_blank"><img alt='Github' src='https://img.shields.io/badge/@hebersolano-100000?style=for-the-badge&logo=Github&logoColor=000&labelColor=fff&color=000'/></a>
  </li>
  <li>
    <a href='https://www.linkedin.com/in/heber-solano/' target="_blank"><img alt='LinkedIn' src='https://img.shields.io/badge/@hebersolano-100000?style=for-the-badge&logo=LinkedIn&logoColor=00a0dc&labelColor=2F2F2F&color=0077b5'/></a>
  </li>
</div>

Feel free to contact me with any questions or feedback!

### Acknowledgments

This app was developed as part of the [Build a Complete E-Commerce Shop with Next.js 14, Tailwind, React | Full Course 2024](https://youtu.be/SG82Aqcaaa0?si=k6pEPV9ZSFVsRsIR). Special thanks to Josh for his exceptional teaching and guidance during the course.
