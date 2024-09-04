FROM mcr.microsoft.com/playwright:v1.46.1-focal AS base
COPY package*.json ./
RUN npm install

FROM base as test
COPY playwright.config.ts ./
ENV CI=true
