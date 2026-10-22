import { spawnSync } from "node:child_process";

const project = "amir.saboury.net";
const host = process.env.PET_PROJECT_DEPLOY_HOST || "pet-deploy@143.110.220.15";
const command =
  process.env.PET_PROJECT_DEPLOY_COMMAND || "/usr/local/bin/pet-project-deploy";
const deployBranch = process.env.PET_PROJECT_DEPLOY_BRANCH || "preview-migration";

function fail(message) {
  console.error(`Deploy aborted: ${message}`);
  process.exit(1);
}

function git(...args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.error || result.status !== 0) {
    fail(result.stderr?.trim() || result.error?.message || `git ${args[0]} failed`);
  }
  return result.stdout.trim();
}

if (!/^[a-zA-Z0-9][a-zA-Z0-9._@:-]*$/.test(host)) {
  fail("PET_PROJECT_DEPLOY_HOST must be a single SSH destination");
}
if (!/^\/[a-zA-Z0-9/_.-]+$/.test(command)) {
  fail("PET_PROJECT_DEPLOY_COMMAND must be an absolute executable path");
}

if (git("status", "--porcelain=v1", "--untracked-files=normal")) {
  fail("commit all changes before deploying");
}

const branch = git("branch", "--show-current");
if (branch !== deployBranch) {
  fail(`check out ${deployBranch} before deploying`);
}

const sha = git("rev-parse", "--verify", "HEAD^{commit}");
const remoteRef = `refs/heads/${deployBranch}`;
const remoteLine = git("ls-remote", "origin", remoteRef)
  .split("\n")
  .find((line) => line.endsWith(`\t${remoteRef}`));
if (!remoteLine || remoteLine.split("\t")[0] !== sha) {
  fail(`push this exact commit to origin/${deployBranch} before deploying`);
}

console.log(`Deploying ${project}@${sha} to ${host}`);
const result = spawnSync(
  "ssh",
  [
    "-o",
    "BatchMode=yes",
    "-o",
    "StrictHostKeyChecking=yes",
    host,
    `${command} ${project} ${sha}`,
  ],
  { stdio: "inherit" },
);
if (result.error) fail(result.error.message);
process.exit(result.status ?? 1);
