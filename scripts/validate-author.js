import { execSync } from "child_process";
import { readFileSync } from "fs";
import { parse } from "yaml";

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

function getFilesFromDiff(base, head) {
  const output = execSync(`git diff --name-only ${base}...${head}`, {
    encoding: "utf8"
  });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { files: null, diffBase: null, diffHead: null };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--files") {
      result.files = args.slice(i + 1);
      break;
    }
    if (arg === "--diff-base") {
      result.diffBase = args[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--diff-head") {
      result.diffHead = args[i + 1];
      i += 1;
    }
  }

  return result;
}

function normalizeFiles(files) {
  return files.filter((file) => file.startsWith("posts/") && file.endsWith(".md"));
}

function validateAuthor(file, expected) {
  const content = readFileSync(file, "utf8");
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    return [`${file}: missing frontmatter`];
  }

  let data;
  try {
    data = parse(frontmatter);
  } catch (error) {
    return [`${file}: YAML parse error (${error.message})`];
  }

  if (!data || typeof data.author !== "string") {
    return [`${file}: author field missing or not a string`];
  }

  if (data.author !== expected) {
    return [`${file}: author "${data.author}" does not match "${expected}"`];
  }

  return [];
}

function main() {
  const expected = process.env.EXPECTED_AUTHOR;
  if (!expected) {
    console.error("ERROR: EXPECTED_AUTHOR is not set");
    process.exit(1);
  }

  const { files, diffBase, diffHead } = parseArgs(process.argv);
  let targetFiles = [];

  if (files) {
    targetFiles = files;
  } else if (diffBase && diffHead) {
    targetFiles = getFilesFromDiff(diffBase, diffHead);
  } else if (process.env.DIFF_BASE && process.env.DIFF_HEAD) {
    targetFiles = getFilesFromDiff(process.env.DIFF_BASE, process.env.DIFF_HEAD);
  }

  const filesToCheck = normalizeFiles(targetFiles);
  if (filesToCheck.length === 0) {
    console.log("No post files to validate for author matching.");
    process.exit(0);
  }

  const errors = [];
  for (const file of filesToCheck) {
    errors.push(...validateAuthor(file, expected));
  }

  if (errors.length > 0) {
    errors.forEach((error) => console.error(`ERROR: ${error}`));
    process.exit(1);
  }

  console.log(`Author check passed for ${filesToCheck.length} file(s).`);
}

main();
