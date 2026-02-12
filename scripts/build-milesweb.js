const { rmSync } = require("node:fs");
const { spawnSync } = require("node:child_process");

const allowedNodeEnv = new Set(["development", "production", "test"]);
const currentNodeEnv = process.env.NODE_ENV;

if (!allowedNodeEnv.has(currentNodeEnv)) {
  console.warn(
    `Non-standard NODE_ENV "${currentNodeEnv ?? "(unset)"}" detected. Overriding to "production" for MilesWeb build.`,
  );
}

rmSync(".next", { recursive: true, force: true });

const buildEnv = {
  ...process.env,
  NODE_ENV: "production",
  NEXT_DISABLE_SWC_WASM: "1",
  RAYON_NUM_THREADS: "1",
  NEXT_PRIVATE_BUILD_WORKER: "1",
};

const run = spawnSync("npx", ["next", "build", "--webpack"], {
  stdio: "inherit",
  env: buildEnv,
  shell: process.platform === "win32",
});

if (run.status !== 0) {
  process.exit(run.status ?? 1);
}
