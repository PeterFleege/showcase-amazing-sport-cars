# Amazing Sports Cars

A dark, gold-accented luxury landing page for a fictional super car brand.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · PostgreSQL.

## Getting started

```bash
npm install

# 1. Create a local database
createdb amazing_sports_cars

# 2. Configure the connection
cp .env.example .env        # edit DATABASE_URL if your credentials differ

# 3. Create tables and seed the cars
npm run db:setup

# 4. Run
npm run dev                 # http://localhost:3000
```

The page also works **without** a database: it falls back to the static data in
`src/db/data/cars-data.ts`. The private-viewing form, however, needs Postgres to save inquiries.

View saved inquiries:

```bash
psql amazing_sports_cars -c "SELECT * FROM inquiries ORDER BY created_at DESC;"
```

## Adding your photography

The design is built around large, high-quality images. Until you add them, each slot shows a
gold-tinted gradient with a car silhouette. Drop files into `public/images/`:

| File                       | Used for                               | Suggested min size         |
| -------------------------- | -------------------------------------- | -------------------------- |
| `cars/vanta-gt.jpg`        | Hero slide 1, collection card, gallery | 960x720+, landscape        |
| `cars/solare-spyder.jpg`   | Hero slide 2, collection card, gallery | 960x720+, landscape        |
| `cars/noctis-r.jpg`        | Hero slide 3, collection card, gallery | 960x720+, landscape        |
| `cars/ember-coupe.jpg`     | Hero slide 4, collection card, gallery | 960x720+, landscape        |
| `experience.jpg`           | Parallax "Experience" background       | 1280x720, dark/detail shot |
| `heritage.jpg`             | Sticky image in Heritage section       | 960x1280, portrait         |
| `contact.jpg`              | Background behind the contact form     | 2400×1400, dark            |
| `gallery/mysterious.jpg`   | Extra gallery tile                     | 800x800                    |
| `gallery/eye-catching.jpg` | Extra gallery tile                     | 800x800                    |
| `gallery/interior.jpg`     | Extra gallery tile                     | 800x800                    |
| `gallery/top-view.jpg`     | Extra gallery tile                     | 800x800                    |

Tips: dark, moody shots with low-key lighting suit the theme best. Use only images you have the
rights to (your own photos, or licensed/free-licence sources such as Unsplash or Pexels).
To rename files or change which car uses which image, edit `src/db/data/cars-data.ts` and re-run
`npm run db:setup`.

## Project structure

```

src/
  app/
    api/inquiries/      POST endpoint for the contact form
    layout.tsx          Fonts (self-hosted), metadata
    page.tsx            Composes the homepage
    globals.css         Theme tokens, gold utilities, animations
  components/
    content-sections/
      Hero.tsx          Fullscreen slider (autoplay, swipe, keyboard, progress)
      Intro.tsx         Marquee + brand statement
      Collection.tsx    Staggered cards with hover reveal
      Experience.tsx    Parallax section
      Performance.tsx   Count-up stats + power bars
      Heritage.tsx      Sticky image + scroll-drawn timeline
      Gallery.tsx       Grid + lightbox (keyboard accessible)
      Contact.tsx       Floating-label form
      Footer.tsx
    navigation/
      Navbar.tsx        Hides on scroll down, blurs on scroll, mobile menu
    ui/                 CarImage, Reveal, SectionHeading, ScrollProgress
  db/
    data/
      cars-data.ts      Seed + fallback data
    schemas/
      schema.sql        Tables: cars, inquiries
    db.ts               postgres.js client
    setup.ts            Applies schema + seeds cars (npm run db:setup)
  lib/
    constants/          Constant values consumed by components
      experiences.ts
      footer-columns.ts
      heritage.ts
      intro-words.ts
      nav-links.ts
    queries/            getFeaturedCars (with fallback), saveInquiry
      cars.ts
      inquiry.ts
    types/              Interfaces for all components
      car-image.ts
      car.ts
      inquiry-input.ts
      reveal-props.ts
      section-heading.ts
```

## Customising the theme

Colours and fonts live in `@theme` at the top of `src/app/globals.css`
(`gold-300…700`, `ink`, `coal`, `bone`, …). Change the gold scale there and the whole site follows.
