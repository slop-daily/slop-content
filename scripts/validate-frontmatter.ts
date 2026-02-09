import { parse } from "yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { glob } from "glob";
import { readFileSync } from "fs";

const schema = JSON.parse(readFileSync("schemas/frontmatter.schema.json", "utf8"));
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function extractFrontmatter(content: string): string | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

function validateFile(file: string): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const content = readFileSync(file, "utf8");

  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    return { errors: ["No frontmatter found (missing --- delimiters)"], warnings: [] };
  }

  let data: Record<string, unknown>;
  try {
    data = parse(frontmatter) as Record<string, unknown>;
  } catch (e) {
    return { errors: [`YAML parse error: ${(e as Error).message}`], warnings: [] };
  }

  if (!validate(data)) {
    errors.push(...(validate.errors?.map((e) => `${e.instancePath} ${e.message}`) || []));
  }

  const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "");
  if (body.trim().length === 0) warnings.push("Post has no content after frontmatter");

  const dateMatch = file.match(/posts\/(\d{4})\/(\d{2})\//);
  if (dateMatch && typeof data.date === "string" && !data.date.startsWith(`${dateMatch[1]}-${dateMatch[2]}`)) {
    warnings.push(`Date ${data.date} doesn't match path ${dateMatch[1]}/${dateMatch[2]}`);
  }

  return { errors, warnings };
}

async function main() {
  const files = await glob("posts/**/*.md");
  if (files.length === 0) {
    console.log("No markdown files found in posts/");
    process.exit(0);
  }

  let hasErrors = false;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const { errors, warnings } = validateFile(file);
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`\n${file}`);
      errors.forEach((e) => console.log(`  ERROR: ${e}`));
      warnings.forEach((w) => console.log(`  WARN: ${w}`));
    }
    if (errors.length > 0) hasErrors = true;
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  }

  console.log(`\n${files.length} files, ${totalErrors} errors, ${totalWarnings} warnings`);
  process.exit(hasErrors ? 1 : 0);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
