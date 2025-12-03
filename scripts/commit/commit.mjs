import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Commit types are currently aligned with https://github.com/commitizen/conventional-commit-types
const commitTypes = [
  { value: 'feat', name: 'feat: A new feature' },
  { value: 'fix', name: 'fix: A bug fix' },
  { value: 'docs', name: 'docs: Documentation only changes' },
  { value: 'style', name: 'style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)' },
  { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
  { value: 'perf', name: 'perf: A code change that improves performance' },
  { value: 'test', name: 'test: Adding missing tests or correcting existing tests' },
  { value: 'build', name: 'build: Changes that affect the build system or external dependencies' },
  { value: 'ci', name: 'ci: Changes to CI configuration files and scripts' },
  { value: 'chore', name: 'chore: Other changes that don\'t modify src or test files' },
  { value: 'revert', name: 'revert: Reverts a previous commit' },
];

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Select the type of change that you\'re committing:',
    choices: commitTypes,
  },
  {
    type: 'input',
    name: 'scope',
    message: 'What is the scope of this change? (optional):',
  },
  {
    type: 'input',
    name: 'title',
    message: 'Commit title (max 72 characters):',
    validate: (input) => {
      if (input.length === 0) {
        return 'Title cannot be empty';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a longer description of the changes (optional if not fixing an issue):',
  },
  {
    type: 'input',
    name: 'issueNumber',
    message: 'Issue number to fix (optional, will be formatted as "fix #123"):',
    validate: (input) => {
      if (input === '') return true;
      if (!/^\d/.test(input)) {
        return 'Issue number must start with a number';
      }
      if (!/^\d+$/.test(input)) {
        return 'Issue number must contain only numbers';
      }
      return true;
    },
  },
  {
    type: 'confirm',
    name: 'isBreaking',
    message: 'Are there any breaking changes?',
    default: false,
  },
  {
    type: 'input',
    name: 'breakingChange',
    message: 'Describe the breaking change:',
    when: (answers) => answers.isBreaking,
    validate: (input) => input.length > 0 ? true : 'Breaking change description cannot be empty',
  },
];

// Format text with word wrapping at 100 characters
function wrapText(text, lineLength = 100) {
  const lines = text.split('\n');
  
  return lines.map(line => {
    if (line.length <= lineLength) {
      return line;
    }
    
    const words = line.split(' ');
    const wrappedLines = [];
    let currentLine = '';
    
    words.forEach(word => {
      // If a single word is longer than lineLength, break it up
      if (word.length > lineLength) {
        if (currentLine) wrappedLines.push(currentLine);
        for (let i = 0; i < word.length; i += lineLength) {
          wrappedLines.push(word.substring(i, i + lineLength));
        }
        currentLine = '';
      } else if ((currentLine + (currentLine ? ' ' : '') + word).length <= lineLength) {
        currentLine = currentLine ? `${currentLine} ${word}` : word;
      } else {
        if (currentLine) wrappedLines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) wrappedLines.push(currentLine);
    return wrappedLines.join('\n');
  }).join('\n');
}

async function buildCommit() {
  let answers = await inquirer.prompt(questions);

  // Validate title length with commit type and scope included in the final check
  while (true) {
    let totalLength = answers.type.length + 2 + answers.title.length; 
    if (answers.scope) {
      totalLength += answers.scope.length + 3;
    }
    
    if (totalLength > 72) {
      console.error(`\n❌ Commit message exceeds 72 characters (${totalLength} characters). Please shorten it.\n`);
      const titleAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Commit title (max 72 characters):',
          validate: (input) => input.length > 0 ? true : 'Title cannot be empty',
        },
      ]);
      answers.title = titleAnswer.title;
    } else {
      break;
    }
  }

  // If issue number is provided but description is empty, ask for description again
  while (answers.issueNumber && !answers.description) {
    console.error('\n❌ Description is required when fixing an issue\n');
    const descriptionAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Provide a longer description of the changes:',
        validate: (input) => input.length > 0 ? true : 'Description cannot be empty',
      },
    ]);
    answers.description = descriptionAnswer.description;
  }

  // Build final commit message
  let message = `${answers.type}`;
  if (answers.scope) {
    message += `(${answers.scope})`;
  }
  message += `: ${answers.title}`;

  if (answers.description) {
    // Ensure commit description wraps
    const wrappedDescription = wrapText(answers.description);
    message += `\n\n${wrappedDescription}`;
  }

  if (answers.issueNumber) {
    message += `\n\nfix #${answers.issueNumber}`;
  }

  if (answers.breakingChange) {
    // Ensure breaking change message wraps
    const breakingChangeHeader = `BREAKING CHANGE: ${answers.breakingChange}`;
    const wrappedBreakingChange = wrapText(breakingChangeHeader);
    message += `\n\n${wrappedBreakingChange}`;
  }

  return message;
}

async function commit() {
  let tempFile;
  try {
    const message = await buildCommit();
    console.log('\n📝 Commit message:\n');
    console.log(message);
    console.log('\n');

    // Final validation stage which previews commit message
    const confirmAnswer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Proceed with this commit?',
        default: true,
      },
    ]);

    if (!confirmAnswer.proceed) {
      console.log('\n❌ Commit abandoned.');
      process.exit(0);
    }

    // Create temp file for commit message
    tempFile = path.join(os.tmpdir(), `commit-msg-${Date.now()}.txt`);
    fs.writeFileSync(tempFile, message, 'utf8');

    // Validates with commitlint before committing
    try {
      execSync(`commitlint --edit "${tempFile}"`, { stdio: 'pipe' });
    } catch (error) {
      console.error('\n❌ Commit message failed commitlint validation:\n');
      console.error(error.stderr?.toString() || error.stdout?.toString() || error.message);
      process.exit(1);
    }

    execSync(`git commit -F "${tempFile}"`, { stdio: 'inherit' });
    console.log('\n✅ Commit successful!');
  } catch (error) {
    console.error('\n❌ Commit failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up temp file at the end
    if (tempFile && fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch (error) {
        console.error('\n❌ Clean up failed:', error.message);
      }
    }
  }
}

commit();