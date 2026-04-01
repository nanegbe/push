import styles from '../components/ApiCodeToggler.module.css';

export type TerminalLanguage = 'curl' | 'python' | 'node' | 'php' | 'json' | 'bash' | 'markdown' | 'text';

export const highlight = (code: string, lang: TerminalLanguage): string => {
    let h = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Strings
    h = h.replace(/("(?:\\"|[^"])*")/g, `<span class="${styles.str}">$1</span>`);
    h = h.replace(/('(?:\\'|[^'])*')/g, `<span class="${styles.str}">$1</span>`);
    h = h.replace(/(\`(?:\\\`|[^\`])*\`)/g, `<span class="${styles.str}">$1</span>`);

    // Keywords
    const keywords = (lang === 'curl' || lang === 'bash')
        ? ['curl']
        : ['import', 'const', 'await', 'let', 'var', 'async', 'function', 'return', 'if', 'else', 'for', 'while', 'new', 'try', 'catch', 'finally', 'true', 'false', 'null', 'undefined'];

    if (lang === 'php') {
        keywords.push('&lt;?php', 'echo', 'true', 'false');
    }

    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        h = h.replace(regex, `<span class="${styles.kw}">${kw}</span>`);
    });

    // Flags (cURL/bash)
    if (lang === 'curl' || lang === 'bash') {
        h = h.replace(/(\s)(-[A-Za-z0-9]+)(\s)/g, `$1<span class="${styles.flag}">$2</span>$3`);
    }

    // URLs
    h = h.replace(/(https?:\/\/[^\s"']+)/g, `<span class="${styles.url}">$1</span>`);

    // Functions
    if (lang !== 'curl' && lang !== 'bash' && lang !== 'json') {
        h = h.replace(/\b([a-z_][a-z0-9_]*)\(/gi, `<span class="${styles.fn}">$1</span>(`);
    }

    // JSON keys (special handling for JSON)
    if (lang === 'json') {
        h = h.replace(/"([^"]+)":/g, `<span class="${styles.var}">"$1"</span>:`);
    } else if (lang === 'python' || lang === 'php' || lang === 'node') {
        // Variables (basic)
        h = h.replace(/(\$?[a-z_][a-z0-9_]*)\s*=/gi, `<span class="${styles.var}">$1</span> =`);
    }

    // Numbers
    h = h.replace(/\b(\d+)\b/g, `<span class="${styles.num}">$1</span>`);

    // Comments
    if (lang === 'php' || lang === 'node' || lang === 'json') {
        h = h.replace(/(\/\/.*)/g, `<span class="${styles.cmt}">$1</span>`);
    } else if (lang === 'python' || lang === 'bash' || lang === 'curl') {
        h = h.replace(/(#.*)/g, `<span class="${styles.cmt}">$1</span>`);
    }

    return h;
};
