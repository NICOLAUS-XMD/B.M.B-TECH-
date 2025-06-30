const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0xaVDIxbjZqNEZGL09XRzlnYjd0NmRqTTNIQm5GckRYMmdDc2czeEZuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JDZWlPbDNuYnkxakpCZDJ3cWp2UGdEaWFMTFAvOXpYSENLNG5jMVh3MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0UFpwMzVtRW5vbXdVeG9qWTJQMjhSNGl5d3dQUnZwSG14SUMwUjU5d1VrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0aUNvelhZRFZvU0FsVkIyK1crT1hSVDZEYkFMZWhpSTJDL3dnZ1N2TmxvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFPSmdOUWU5VWF6RGpuODZ3L0NTemZnUTdDNHZwZ1F3WGZBMnVjaVV6bGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InAweDY4NnVJK2dWMkJOa0JYVFhXTVhjNkNPSzliWVZZbWlhSFRhK2d3akE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUNoR3pESE1iQnArcllUZzBKclRhaGVNbk85Z1Z5bW11WUF0MDNveFcyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTlkL2NZazlIdnNGUktzTUtkS2JlaWdzZk9NMGJadXVJZFk3N3d5UnNCMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko5RDJiMzhYbW9nVERITXoxSXc3TERPV0tUV012T1NFODh5WCtDM0d4M2pQUDBxUUpyeEFiSFpvbDVJeTd0UmdvZVU4R25EaDM0UktqdXVvTEdCT2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcwLCJhZHZTZWNyZXRLZXkiOiJOanZtYWtsQWhWTkx4UFc4emFXUmVkSDdDWjgyOEl4WUVwMDlBMWVlQ0hNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0QzQ5QTRDN0REM0JFQURDMjMwMDNBMzkzQ0YyQjlDMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMjY5NjMyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NTIzOTg2MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0JEODU1RkQ0MjQ2Njg4MThDNzBBQUJGRTFENEMzRkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTI2OTYzMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNTJFU0Q3RzkiLCJtZSI6eyJpZCI6IjI1NTY1MjM5ODYxNDo4OEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwNTI1MzA4OTMzMzI3NTo4OEBsaWQiLCJuYW1lIjoiTmljb2xhdXMgRGFuaWVsIDIg8J+YiPCfmIjwn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNV1hscWtERU1pQmljTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkajFoK1VNdzZhNzhlNlEzVnpuR1U0Q2t2RnpQWkVLVmVnOTVLRnlpZGdvPSIsImFjY291bnRTaWduYXR1cmUiOiIyTVcrRWhyYVFCMDEvalFZZ1FCWG9qdG5LNnVjMXNyanpGRHlBMmlFREk3T3BYK0hOZjZ4eTZBeTVacGF1amphd0Vpc0JQUzUxY1VsK3lXR1ZhbHBDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWjk1UnlNekpobkVkR0lBbXZhSmxROTg5d2N5WDlPUmFRaU96ckVZeDVIanhOOU1wUHpxTCtESkRoblB2REU4UnhNb3JCQ0dvRUdYbVhyelpZUitRaUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2NTIzOTg2MTQ6ODhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFk5WWZsRE1PbXUvSHVrTjFjNXhsT0FwTHhjejJSQ2xYb1BlU2hjb25ZSyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxMjY5NTkwLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo4MiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

