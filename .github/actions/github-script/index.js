const [major, minor, patch] = process.versions.node.split('.').map(Number);

console.log('Node Version', { major, minor, patch });
