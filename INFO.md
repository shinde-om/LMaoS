# apps

## backend
- Framework: [NestJS](https://nestjs.com/)
- Database: `@workspace/db` (to be implemented)
- Authentication: `@workspace/auth` 

## web
- Framework: [Next.js](https://nextjs.org/)
- styling: `@workspace/ui`

***

# packages

## database (`@workspace/db`)
- ORM Library: [Prisma](https://www.prisma.io/)
- Database: [PostgreSQL](www.postgresql.org)

## ui (`@workspace/ui`)
- Library: [React](https://react.dev/)
- CSS Framework: [Tailwind](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- Component Library: [Lucide React](https://lucide.dev/guide/react/), [shadcn](https://ui.shadcn.com/)

## auth (`@workspace/auth`)
- Framework: [Better-Auth](https://better-auth.com/)
- Database: `@workspace/db`

## eslint-config (`@workspace/eslint-config`)
- Self explainator

## typescript-config (`@workspace/typescript-config`)
- Has tsconfig json

### for ui components
To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.
