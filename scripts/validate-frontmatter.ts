import { parse } from "yaml";
import { glob } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { basename, extname } from "path";

const REQUIRED_FIELDS = ["title", "date", "tags", "author", "excerpt", "tool"] as const;
const MAX_EXCERPT_LENGTH = 300;

interface Frontmatter {
  title?: string;
  date?: string;
  tags?: string[];
  author?: string;
  excerpt?: string;
  tool?: string;
  featured?: boolean;
  codeLanguage?: string;
  canonical?: string;
  originalSource?: string;
}

interface ValidationResult {
  file: string;
  errors: string[];
  warnings: string[];
}

function extractFrontmatter(content: string): { frontmatter: string; body: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  return { frontmatter: match[1], body: match[2] };
}

function validateYamlSyntax(frontmatter: string, file: string): string[] {
  const errors: string[] = [];
  try {
    parse(frontmatter);
  } catch (e) {
    const err = e as { message?: string; pos?: number };
    errors.push(`YAML syntax error: ${err.message || String(e)}`);
  }
  return errors;
}

function validateFrontmatter(fm: Frontmatter, file: string): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === "") {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (fm.date && !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) {
    errors.push(`Invalid date format: "${fm.date}" (expected YYYY-MM-DD)`);
  }

  if (fm.tags !== undefined) {
    if (!Array.isArray(fm.tags)) {
      errors.push(`"tags" must be an array, got ${typeof fm.tags}`);
    } else if (fm.tags.length === 0) {
      errors.push(`"tags" array must have at least one item`);
    }
  }

  if (fm.excerpt !== undefined) {
    if (typeof fm.excerpt !== "string") {
      errors.push(`"excerpt" must be a string, got ${typeof fm.excerpt}`);
    } else if (fm.excerpt.length > MAX_EXCERPT_LENGTH) {
      errors.push(`"excerpt" is ${fm.excerpt.length} characters (max ${MAX_EXCERPT_LENGTH})`);
    }
  }

  if (fm.featured !== undefined && typeof fm.featured !== "boolean") {
    errors.push(`"featured" must be a boolean, got ${typeof fm.featured}`);
  }

  const bodyMatch = extractFrontmatter(readFileSync(file, "utf8"));
  if (bodyMatch && bodyMatch.body.trim().length === 0) {
    warnings.push("Post has no content after frontmatter");
  }

  return { errors, warnings };
}

function validateFile(file: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const content = readFileSync(file, "utf8");
  const extracted = extractFrontmatter(content);

  if (!extracted) {
    return { file, errors: ["No valid frontmatter found (missing --- delimiters)"], warnings: [] };
  }

  const yamlErrors = validateYamlSyntax(extracted.frontmatter, file);
  errors.push(...yamlErrors);

  let fm: Frontmatter | null = null;
  if (yamlErrors.length === 0) {
    fm = parse(extracted.frontmatter) as Frontmatter;
    const result = validateFrontmatter(fm, file);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  const dateMatch = file.match(/posts\/(\d{4})\/(\d{2})\//);
  if (dateMatch && fm?.date) {
    const expectedPrefix = `${dateMatch[1]}-${dateMatch[2]}`;
    if (!fm.date.startsWith(expectedPrefix)) {
      warnings.push(`Date ${fm.date} doesn't match file path ${dateMatch[1]}/${dateMatch[2]}`);
    }
  }

  return { file, errors, warnings };
}

async function main() {
  const files = await glob("posts/**/*.md");
  if (files.length === 0) {
    console.log("No markdown files found in posts/");
    process.exit(0);
  }

  let hasErrors = false;
  const results: ValidationResult[] = [];

  for (const file of files) {
    const result = validateFile(file);
    results.push(result);
    if (result.errors.length > 0) hasErrors = true;
  }

  for (const result of results) {
    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.log(`\n${result.file}`);
      for (const err of result.errors) {
        console.log(`  ERROR: ${err}`);
      }
      for (const warn of result.warnings) {
        console.log(`  WARN: ${warn}`);
      }
    }
  }

  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  console.log(`\n${files.length} files checked, ${totalErrors} errors, ${totalWarnings} warnings`);

  process.exit(hasErrors ? 1 : 0);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
