# Indus Automation Labs Website

Production-ready lightweight SaaS/company website for Indus Automation Labs and its first product, AutoChat.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- CSS-only animated night-sky background
- Static policy pages for payment processor readiness
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
youtubeTutorial: "https://www.youtube.com/",
youtubeAd: "https://www.youtube.com/"
```

with the final tutorial and product ad URLs.

## Update the AutoChat GitHub release link

Edit:

```text
lib/site.ts
```

Change:

```ts
githubRelease: "https://github.com/hamzah105/AutoChat-PK-Releases"
```

to the final release or repository URL if it changes.

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
- Pricing is informational only and no payment checkout is active.
- Legal pages are practical placeholders and should be reviewed by a qualified professional before high-volume commercial launch.
