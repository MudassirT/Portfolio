import chokidar from 'chokidar';
import { execSync } from 'child_process';

let timer = null;

function commitAndPush() {
  try {
    execSync('git add .');
    const date = new Date().toLocaleString();
    execSync(`git commit -m "Auto commit: ${date}"`, { stdio: 'pipe' });
    execSync('git push', { stdio: 'pipe' });
    console.log(`✅ Pushed at ${date}`);
  } catch (err) {
    console.log('⚠️ Nothing new to commit or already up to date.');
  }
}

chokidar.watch('.', {
  ignored: /(^|[\/\\])(\..)|node_modules|auto-git/,
  persistent: true
}).on('change', (filePath) => {
  console.log(`📝 File changed: ${filePath}`);
  clearTimeout(timer);
  timer = setTimeout(commitAndPush, 5000);
});

console.log('👀 Watching for changes... (Press Ctrl+C to stop)');