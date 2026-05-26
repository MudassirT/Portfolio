const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

const projectFolder = '.'; // watches current folder

let timer = null;

function commitAndPush() {
  try {
    execSync('git add .');
    const date = new Date().toLocaleString();
    execSync(`git commit -m "Auto commit: ${date}"`);
    execSync('git push');
    console.log(`✅ Pushed at ${date}`);
  } catch (err) {
    console.log('⚠️ Nothing new to commit or push failed.');
  }
}

// Wait 5 seconds after last change before committing
chokidar.watch(projectFolder, {
  ignored: /(^|[\/\\])\..|(node_modules)/,
  persistent: true
}).on('change', (filePath) => {
  console.log(`📝 File changed: ${filePath}`);
  clearTimeout(timer);
  timer = setTimeout(commitAndPush, 5000); // 5 second delay
});

console.log('👀 Watching for changes... (Press Ctrl+C to stop)');