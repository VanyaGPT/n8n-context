#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

class ContextBuilder {
  constructor() {
    this.baseDir = path.dirname(__dirname);
  }

  buildContext(workflowCount, includeSteps, pattern) {
    let context = '';

    // 1. Architectural patterns (construction rules)
    context += this.readFile('context/arch-patterns.md');
    context += '\n\n---\n\n';

    // 2. Architectural AI patterns (construction rules)
    context += this.readFile('context/ai-workflow-rules.md');
    context += '\n\n---\n\n';

    // 3. JSON Snippets
    context += '# JSON Snippets\n\n';
    context += this.getSnippets();
    context += '\n---\n\n';

    // 4. Workflow examples
    context += '# Workflow Examples\n\n';
    context += this.getWorkflowExamples(workflowCount, pattern);

    return context;
  }

  getSnippets() {
    const snippetsDir = path.join(this.baseDir, 'snippets');
    if (!fs.existsSync(snippetsDir)) return '';

    let snippets = '';
    const files = fs.readdirSync(snippetsDir)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .slice(0, 6); // Key snippets

    files.forEach(file => {
      const content = this.readFile(`snippets/${file}`);
      if (content && !content.startsWith('//')) {
        snippets += `## ${file.replace('.md', '')}\n\n${content}\n\n`;
      }
    });

    return snippets;
  }

  getWorkflowExamples(count, pattern) {
    const workflowsDir = path.join(this.baseDir, 'workflows');
    if (!fs.existsSync(workflowsDir)) return '';

    let examples = '';
    const files = fs.readdirSync(workflowsDir)
      .filter(file => file !== 'README.md' && file.includes(pattern))
      .slice(0, count);

    files.forEach(file => {
      const content = this.readFile(`workflows/${file}`);
      if (content) {
        examples += `## ${file}\n\n\`\`\`json\n${content}\n\`\`\`\n\n`;
      }
    });

    return examples;
  }

  readFile(relativePath) {
    const fullPath = path.join(this.baseDir, relativePath);

    try {
      return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      console.warn(`Warning: Could not read ${relativePath}`);
      return '';
    }
  }

  saveContext(context, filename = 'full-context.md') {
    const distDir = path.join(this.baseDir, '../dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    const outputPath = path.join(distDir, filename);
    fs.writeFileSync(outputPath, context);
    console.log(`Context saved to ${outputPath}`);
  }
}

// CLI usage
if (require.main === module) {
  const builder = new ContextBuilder();

  // Parse arguments
  let workflowCount = 2;
  let includeSteps = false;
  let filename = 'full-context.md';
  let pattern = '';

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === '--steps') {
      includeSteps = true;
    } else if (arg === '--filename' && process.argv[i + 1]) {
      filename = process.argv[i + 1];
      i++; // Skip next argument
    } else if (arg === '--pattern' && process.argv[i + 1]) {
      pattern = process.argv[i + 1];
      i++; // Skip next argument
    } else if (!isNaN(parseInt(arg))) {
      workflowCount = parseInt(arg);
    }
  }

  const context = builder.buildContext(workflowCount, includeSteps, pattern);
  builder.saveContext(context, filename);

  console.log(`Built context with ${workflowCount} workflow examples (no context7)`);
  if (includeSteps) console.log('Included step-by-step instructions');
}

module.exports = ContextBuilder;
