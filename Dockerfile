# Stage 1: Builder - install the deps and build the app
FROM node:22-slim AS builder

# Set the location of the working directory for all subsequent layers
WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Use node corepack  as standard practice for pnpm within docker.
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy deps into the container. We only focus on the deps file so that if the source code changes later, this layer is cached and doesn't need to update, making the image build a bit faster.
COPY package.json pnpm-lock.yaml ./

# copy node modules from local
COPY node_modules ./node_modules

# copy the rest of the application source code into the image, the source is the build context root (first . : current pwd where build command is ran) to the destination (which is /app thanks to the WORKDIR layer)
COPY . .

# set CI to true for pnpm to not purge the modules.
ENV CI=true

# run the builder using the pnpm package manager we activated in the node corepack section above
RUN pnpm prisma generate && pnpm build

# Stage 2: Runner - a minimal image to run the built app
FROM node:22-slim AS runner

# set the working directory
WORKDIR /app

# copy the folders/files that are needed to "run" the app. We are copying from the builder stage above. We need to specify the source location (/app) and the destination (which translates to /app from WORKDIR)

# the build next project
COPY --from=builder /app/.next ./.next
# the static files used in the application
COPY --from=builder /app/public ./public
# for scripts and metadata
COPY --from=builder /app/package.json ./package.json
# the runtime deps
COPY --from=builder /app/node_modules ./node_modules

# set the environment to production so that next is optimized for production
ENV NODE_ENV=production

# expose the next.js default port
EXPOSE 3000

# start up the next js app using pnpm
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]