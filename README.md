# Indus Automation Labs Website

Production-ready lightweight SaaS/company website for Indus Automation Labs and its first product, AutoChat.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- CSS-only animated night-sky background
- Static policy pages for pilot licensing and future payment-provider readiness
- No backend or database required

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Build for production:

```bash
npm run build
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the default framework setting as **Next.js**.
5. Use the default build command:

```bash
npm run build
```

6. Use the default output handled by Vercel for Next.js.
7. Deploy.

## Add the AutoChat prospectus PDF

Place the PDF here:

```text
public/AutoChat_Prospectus.pdf
```

It will be available at:

```text
/AutoChat_Prospectus.pdf
```

The website already links to that path from the hero, AutoChat page, and CTA sections.

## Replace YouTube links

Edit the placeholders in:

```text
lib/site.ts
```

Replace:

```ts
tutorialUrl: "https://www.youtube.com/",
adUrl: "https://www.youtube.com/"
```

with the final tutorial and product ad URLs.

## Update the AutoChat GitHub release link

Edit:

```text
lib/site.ts
```

Change:

```ts
releaseUrl: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/download/v1.0.0/AutoChat-Setup-v1.0.0.exe"
```

to the final release or repository URL if it changes.

Before public launch, confirm that the GitHub release includes a downloadable Windows installer asset, not only release notes.

## Connect indusautomationlabs.com from Namecheap to Vercel

1. In Vercel, open the deployed project.
2. Go to **Settings** -> **Domains**.
3. Add:

```text
indusautomationlabs.com
```

4. Add the `www` version too:

```text
www.indusautomationlabs.com
```

5. In Namecheap, open the domain DNS settings.
6. For the root domain, add or update this A record:

```text
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic
```

7. For the `www` subdomain, add or update this CNAME record:

```text
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

8. Return to Vercel and wait for DNS verification. DNS propagation can take a few minutes, but sometimes takes longer.
9. Choose the preferred primary domain in Vercel, usually `indusautomationlabs.com`, and redirect `www` to the root domain or the other way around.

## Important content notes

- AutoChat is intentionally described as a working desktop pilot, early pilot, or under active development.
- The site does not claim an official Meta/WhatsApp partnership.
- Public website checkout is not active yet, but AutoChat pilot licensing is available through the in-app License section and approved onboarding.
- Current pilot pricing should show PKR 20,000 regular price and PKR 10,000 with the NEWCOM voucher.
- Legal pages are practical placeholders and should be reviewed by a qualified professional before high-volume commercial launch.

## Pre-launch checklist

1. Confirm GitHub release has downloadable installer asset.
2. Replace YouTube placeholder tutorial/ad links.
3. Test support@indusautomationlabs.com mailto buttons.
4. Test site on mobile.
5. Test prospectus download at `/AutoChat_Prospectus.pdf`.
6. Confirm pricing shows PKR 20,000 regular and PKR 10,000 with NEWCOM.
7. Confirm wording says public website checkout is not active yet, but in-app licensing is available.
