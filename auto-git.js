import chokidar from 'chokidar';
import { execSync } from 'child_process';

let timer = null;

const options = {
  stdio: 'pipe',
  shell: true,
  windowsHide: true  // ← This hides the CMD window
};

function commitAndPush() {
  try {
    execSync('git add .', options);
    const date = new Date().toLocaleString();
    execSync(`git commit -m "Auto commit: ${date}"`, options);
    execSync('git push', options);
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