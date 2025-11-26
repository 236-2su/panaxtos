---
description: Set up front and backend folders for Panaxtos project
---

# Project Re‑organization Workflow

## Goal
- Move the existing Next.js front‑end into a **`front`** directory.
- Create a **`backend`** directory containing a minimal Spring Boot application that will be deployed on Cloudflare (using Cloudflare Workers with Java support via the **`wrangler`** plugin).
- Provide placeholders for UI/UX redesign and for scraped content from the live site.

## Prerequisites
- Node.js (already installed for the front‑end).
- Java 17+ and Maven installed on your machine.
- Cloudflare account with access to **Pages** (for the front‑end) and **Workers** (for the Java backend).

## Steps
1. **Create `front` folder**
   ```bash
   mkdir front
   ```
2. **Move all existing project files into `front`**
   ```bash
   # From the project root (panaxtos)
   mv .git .next app components next-env.d.ts next.config.ts node_modules package-lock.json package.json postcss.config.mjs public tsconfig.json README.md front/
   ```
   > *Note*: If you prefer to keep a copy, you can duplicate instead of moving.
3. **Create `backend` folder**
   ```bash
   mkdir backend
   cd backend
   ```
4. **Initialize a Spring Boot project** (use Spring Initializr via curl)
   ```bash
   curl https://start.spring.io/starter.zip \
        -d dependencies=web \
        -d language=java \
        -d type=maven-project \
        -d baseDir=backend \
        -d bootVersion=3.2.5 \
        -d javaVersion=17 \
        -o backend.zip && unzip backend.zip && rm backend.zip
   ```
   This will generate `pom.xml` and the default package `com.example.demo`.
5. **Add a simple controller** (`src/main/java/com/example/demo/controller/InfoController.java`)
   ```java
   package com.example.demo.controller;

   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RestController;

   @RestController
   public class InfoController {
       @GetMapping("/api/info")
       public String getInfo() {
           // Placeholder – you can later replace this with data scraped from https://www.panaxtos.com/
           return "Panaxtos backend is alive";
       }
   }
   ```
6. **Configure Cloudflare Workers for Java**
   - Install the Cloudflare Wrangler plugin for Java:
     ```bash
     npm install -g @cloudflare/wrangler
     wrangler init backend --type=java
     ```
   - Edit `wrangler.toml` (generated inside `backend`) to point to the built JAR:
     ```toml
     name = "panaxtos-backend"
     main = "target/panaxtos-backend-0.0.1-SNAPSHOT.jar"
     compatibility_date = "2024-09-01"
     ```
   - Build the Spring Boot JAR:
     ```bash
     ./mvnw clean package -DskipTests
     ```
   - Deploy to Cloudflare Workers (free tier):
     ```bash
     wrangler deploy
     ```
7. **Deploy the front‑end to Cloudflare Pages**
   - In the Cloudflare dashboard, create a new Pages project pointing to the **`front`** directory of this repo.
   - Set **Build command** to `npm install && npm run build`.
   - Set **Output directory** to `.next` (SSR) or `out` if you switch to `next export` for a fully static site.
   - Add any required environment variables (e.g., MAP API keys, backend URL).
8. **UI/UX Redesign**
   - Create a new design system under `front/styles/` (e.g., custom colors, dark mode, micro‑animations).
   - Update components in `front/components/` to use the new design.
   - Optionally, generate mock‑up images with the `generate_image` tool for stakeholder review.
9. **Scrape required content from the live site**
   - Use a simple script (Node or Python) to fetch HTML from `https://www.panaxtos.com/` and extract static text/images you need for the new UI.
   - Store the scraped JSON in `front/public/data/` or expose it via the Spring Boot API.
10. **Verification**
    - Run the front‑end locally: `cd front && npm run dev`.
    - Run the backend locally: `cd backend && ./mvnw spring-boot:run`.
    - Ensure the front‑end can call the backend endpoint (`/api/info`).
    - Deploy both and test the live URLs.

---

**What you should do next**
- Execute the steps above in your terminal.
- Replace the placeholder controller with real data once you have scraped the content.
- Adjust the front‑end design as desired.

If you need any of the files generated (e.g., `InfoController.java` or a sample `wrangler.toml`), let me know and I can create them for you.
