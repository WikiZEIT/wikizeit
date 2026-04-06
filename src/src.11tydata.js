import { execSync } from 'child_process';

function gitDate(inputPath) {
    try {
        const result = execSync(
            `git log -1 --format=%ai -- "${inputPath}"`,
            { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
        ).trim();
        return result ? new Date(result) : null;
    } catch {
        return null;
    }
}

function newerDate(a, b) {
    const da = a ? new Date(a) : null;
    const db = b ? new Date(b) : null;
    if (!da && !db) return null;
    if (!da) return db;
    if (!db) return da;
    return da > db ? da : db;
}

export default {
    eleventyComputed: {
        modified(data) {
            const pageMod = data.modified
                ? new Date(data.modified)
                : gitDate(data.page.inputPath);
            const globalMod = data.site?.lastmod
                ? new Date(data.site.lastmod)
                : null;
            return newerDate(pageMod, globalMod);
        }
    }
};
