const fs = require('fs');
const path = require('path');

function copyFilesSync(source, target) {
  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyFilesSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

copyFilesSync(srcDir, distDir);
