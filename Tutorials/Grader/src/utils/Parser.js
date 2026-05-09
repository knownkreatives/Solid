function ParseCSV(csv, height) {
    const lines = csv.trim().split('\n');
    const headers = lines.slice(0, height)[0].split(',');
    const rows = lines.slice(1, 1 + height).map(line => line.split(','));
    return { headers, rows };
}

// CommonJS export for Node.js environments
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { parseCSV: ParseCSV };
} else {
    window.parseCSV = ParseCSV;
}