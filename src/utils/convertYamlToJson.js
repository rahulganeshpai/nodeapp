const fs = require('fs').promises;
const path = require('path');
const yaml = require('yaml');

const inputDir = path.resolve(__dirname, "../../static/compositions"); // Adjust as needed
const outputDir = path.resolve(__dirname, "../../static/build/compositions"); // Adjust as needed

async function removeDirectory(dir) {
  try {
    await fs.rm(dir, { recursive: true, force: true });
    console.log(`Removed directory: ${dir}`);
  } catch (err) {
    console.error(`Error removing directory ${dir}:`, err);
  }
}

async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory ${dir}:`, err);
  }
}

// Async function to process a single file or directory
async function processFileOrDir(inputFilePath, outputFilePath, stat) {
  if (stat.isDirectory()) {
    await ensureDirectoryExists(outputFilePath);
    await convertYamlToJsonRecursively(inputFilePath, outputFilePath);
  } else if (stat.isFile() && (inputFilePath.endsWith('.yaml') || inputFilePath.endsWith('.yml'))) {
    try {
      const data = await fs.readFile(inputFilePath, 'utf8');
      const jsonData = yaml.parse(data);
      await fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2));
      console.log(`Converted ${inputFilePath} to JSON at ${outputFilePath}`);
    } catch (err) {
      console.error(`Error processing file ${inputFilePath}:`, err);
    }
  }
}

async function convertYamlToJsonRecursively(inputPath, outputPath) {
  try {
    const files = await fs.readdir(inputPath, { withFileTypes: true });
    
    const tasks = files.map(async (file) => {
      const inputFilePath = path.join(inputPath, file.name);
      const outputFilePath = path.join(outputPath, file.name.replace(/\.[^/.]+$/, '.json'));
      
      const stat = await fs.stat(inputFilePath);
      await processFileOrDir(inputFilePath, outputFilePath, stat);
    });
    
    await Promise.all(tasks); // Run tasks concurrently
  } catch (err) {
    console.error(`Error reading directory ${inputPath}:`, err);
  }
}

(async () => {
  try {
    // Remove the output directory if it exists
    await removeDirectory(outputDir);

    // Ensure the output directory exists before starting the conversion
    await ensureDirectoryExists(outputDir);

    // Begin the recursive conversion process from the input directory
    await convertYamlToJsonRecursively(inputDir, outputDir);
  } catch (err) {
    console.error('An error occurred during the conversion process:', err);
  }
})();