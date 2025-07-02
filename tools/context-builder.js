#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

class ContextBuilder {
  constructor() {
    this.baseDir = path.dirname(__dirname);
  }

  buildContext(workflowCount = 2, includeSteps = false) {
    let context = '';

    // 1. Базовый промпт (основы n8n)
    context += this.readFile('context/base-prompt.md');
    context += '\n\n---\n\n';

    // 2. Актуальный контекст
    context += '# Актуальный контекст n8n\n\n';
    context += this.readFile('context/context7.md');
    context += '\n\n---\n\n';

    // 3. Архитектурные паттерны (правила построения)
    context += this.readFile('context/arch-patterns.md');
    context += '\n\n---\n\n';

    // 4. Пошаговые инструкции (опционально)
    if (includeSteps) {
      context += this.readFile('context/step-by-step.md');
      context += '\n\n---\n\n';
    }

    // 5. JSON Snippets
    context += '# JSON Snippets\n\n';
    context += this.getSnippets();
    context += '\n---\n\n';

    // 6. Примеры workflow
    context += '# Примеры workflow\n\n';
    context += this.getWorkflowExamples(workflowCount);

    return context;
  }

  getSnippets() {
    const snippetsDir = path.join(this.baseDir, 'snippets');
    if (!fs.existsSync(snippetsDir)) return '';

    let snippets = '';
    const files = fs.readdirSync(snippetsDir)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .slice(0, 6); // Ключевые snippets

    files.forEach(file => {
      const content = this.readFile(`snippets/${file}`);
      if (content && !content.startsWith('//')) {
        snippets += `## ${file.replace('.md', '')}\n\n${content}\n\n`;
      }
    });

    return snippets;
  }

  getWorkflowExamples(count) {
    const workflowsDir = path.join(this.baseDir, 'workflows');
    if (!fs.existsSync(workflowsDir)) return '';

    let examples = '';
    const files = fs.readdirSync(workflowsDir)
      .filter(file => file.endsWith('.json'))
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
    const outputPath = path.join(this.baseDir, filename);
    fs.writeFileSync(outputPath, context);
    console.log(`Context saved to ${outputPath}`);
  }
}

// CLI usage
if (require.main === module) {
  const builder = new ContextBuilder();
  const workflowCount = process.argv[2] ? parseInt(process.argv[2]) : 2;
  const includeSteps = process.argv.includes('--steps');

  const context = builder.buildContext(workflowCount, includeSteps);
  builder.saveContext(context);

  console.log(`Built context with ${workflowCount} workflow examples`);
  if (includeSteps) console.log('Included step-by-step instructions');
}

module.exports = ContextBuilder;
