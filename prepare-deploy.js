const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

// Create deploy directory
const deployDir = path.join(__dirname, 'deploy');
fs.removeSync(deployDir);
fs.mkdirSync(deployDir);

// Create a file to stream archive data to.
const output = fs.createWriteStream(path.join(deployDir, 'wigiart.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Archiver has been finalized and the output file descriptor has been closed.');
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add the build directory
archive.directory('.next/', '.next');
archive.directory('public/', 'public');
archive.directory('node_modules/', 'node_modules');

// Add individual files
const filesToInclude = [
  'package.json',
  'package-lock.json',
  'next.config.js'
];

filesToInclude.forEach(file => {
  archive.file(file, { name: file });
});

// Finalize the archive
archive.finalize();
