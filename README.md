# amir.saboury.net

Static Next.js site. `npm run build` writes the deployable site to `out/`.

## Local development

```sh
npm ci
npm run dev
```

## Manual deployment

Commit and push the exact revision you want to deploy on the `preview-migration` branch, then run from that clean branch:

```sh
npm run deploy
```

The command confirms that local `HEAD` equals `origin/preview-migration`, then sends its full commit hash to the trusted deployer on `143.110.220.15`. The server fetches and builds that revision, checks the preview, and keeps the previous release for rollback. During this pilot, inspect [preview.amir.saboury.net](https://preview.amir.saboury.net); production DNS remains on Coolify.

For SSH configuration or testing, set `PET_PROJECT_DEPLOY_HOST` (default `pet-deploy@143.110.220.15`) or `PET_PROJECT_DEPLOY_COMMAND` (default `/usr/local/bin/pet-project-deploy`). `PET_PROJECT_DEPLOY_BRANCH` changes the required branch for future workflows. CI can call the same server command with the exact pushed commit hash after its own checkout and verification. Server setup, deployment implementation, and rollback instructions live in [pet-project-infra](https://github.com/amir-s/pet-project-infra).
