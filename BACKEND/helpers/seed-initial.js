const fs = require('fs');
const isProd = process.argv.includes('--prod');
const dbDir = './BACKEND/DB';

const seedInitial = () => {
    try {
        fs.readFileSync(dbDir + '/users.json');
    } catch {
        fs.writeFileSync(dbDir + '/users.json', '[]');
    }
    
    if (isProd) {
        // running seed 
    }
};

module.exports = seedInitial;