import React, { useState, useCallback } from 'react';
import styles from './ApiCodeToggler.module.css';

const RECIPIENTS = ["23320*******", "23320*******"];
const MESSAGE = "Hello to the entire group!";
const SENDER = "Esoko";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const URL = "https://messaging-api.esoko.com/api/v1/sms/send-to-group";

type Language = 'curl' | 'python' | 'node' | 'php';

interface CodeSnippet {
    [key: string]: [number | null, string][];
}

const snippets: CodeSnippet = {
    curl: [
        [null, `<span class="${styles.kw}">curl</span> <span class="${styles.flag}">-X</span> POST <span class="${styles.url}">${URL}</span> \\`],
        [null, `  <span class="${styles.flag}">-H</span> <span class="${styles.str}">"Authorization: Bearer ${TOKEN}"</span> \\`],
        [null, `  <span class="${styles.flag}">-H</span> <span class="${styles.str}">"Content-Type: application/json"</span> \\`],
        [null, `  <span class="${styles.flag}">-H</span> <span class="${styles.str}">"Accept: application/json"</span> \\`],
        [null, `  <span class="${styles.flag}">-d</span> <span class="${styles.str}">'{`],
        [null, `    <span class="${styles.str}">"recipients"</span>: <span class="${styles.str}">["${RECIPIENTS[0]}", "${RECIPIENTS[1]}"]</span>,`],
        [null, `    <span class="${styles.str}">"message"</span>: <span class="${styles.str}">"${MESSAGE}"</span>,`],
        [null, `    <span class="${styles.str}">"sender"</span>: <span class="${styles.str}">"${SENDER}"</span>`],
        [null, `  <span class="${styles.str}">}'`],
    ],
    python: [
        [null, `<span class="${styles.kw}">import</span> requests`],
        [null, ``],
        [null, `<span class="${styles.var}">url</span> = <span class="${styles.str}">"${URL}"</span>`],
        [null, `<span class="${styles.var}">headers</span> = {`],
        [null, `    <span class="${styles.str}">"Authorization"</span>: <span class="${styles.str}">"Bearer ${TOKEN}"</span>,`],
        [null, `    <span class="${styles.str}">"Content-Type"</span>: <span class="${styles.str}">"application/json"</span>`],
        [null, `}`],
        [null, `<span class="${styles.var}">payload</span> = {`],
        [null, `    <span class="${styles.str}">"recipients"</span>: [<span class="${styles.str}">"${RECIPIENTS[0]}"</span>, <span class="${styles.str}">"${RECIPIENTS[1]}"</span>],`],
        [null, `    <span class="${styles.str}">"message"</span>: <span class="${styles.str}">"${MESSAGE}"</span>,`],
        [null, `    <span class="${styles.str}">"sender"</span>: <span class="${styles.str}">"${SENDER}"</span>`],
        [null, `}`],
        [null, ``],
        [null, `<span class="${styles.var}">response</span> = requests.<span class="${styles.fn}">post</span>(<span class="${styles.var}">url</span>, headers=<span class="${styles.var}">headers</span>, json=<span class="${styles.var}">payload</span>)`],
        [null, `<span class="${styles.fn}">print</span>(<span class="${styles.var}">response</span>.<span class="${styles.fn}">json</span>())`],
    ],
    node: [
        [null, `<span class="${styles.kw}">const</span> <span class="${styles.var}">response</span> = <span class="${styles.kw}">await</span> <span class="${styles.fn}">fetch</span>(`],
        [null, `  <span class="${styles.str}">"${URL}"</span>,`],
        [null, `  {`],
        [null, `    <span class="${styles.var}">method</span>: <span class="${styles.str}">"POST"</span>,`],
        [null, `    <span class="${styles.var}">headers</span>: {`],
        [null, `      <span class="${styles.str}">"Authorization"</span>: <span class="${styles.str}">\`Bearer ${TOKEN}\`</span>,`],
        [null, `      <span class="${styles.str}">"Content-Type"</span>: <span class="${styles.str}">"application/json"</span>`],
        [null, `    },`],
        [null, `    <span class="${styles.var}">body</span>: <span class="${styles.var}">JSON</span>.<span class="${styles.fn}">stringify</span>({`],
        [null, `      <span class="${styles.var}">recipients</span>: [<span class="${styles.str}">"${RECIPIENTS[0]}"</span>, <span class="${styles.str}">"${RECIPIENTS[1]}"</span>],`],
        [null, `      <span class="${styles.var}">message</span>: <span class="${styles.str}">"${MESSAGE}"</span>,`],
        [null, `      <span class="${styles.var}">sender</span>: <span class="${styles.str}">"${SENDER}"</span>`],
        [null, `    })`],
        [null, `  }`],
        [null, `);`],
        [null, ``],
        [null, `<span class="${styles.kw}">const</span> <span class="${styles.var}">data</span> = <span class="${styles.kw}">await</span> <span class="${styles.var}">response</span>.<span class="${styles.fn}">json</span>();`],
        [null, `<span class="${styles.var}">console</span>.<span class="${styles.fn}">log</span>(<span class="${styles.var}">data</span>);`],
    ],
    php: [
        [null, `<span class="${styles.kw}">&lt;?php</span>`],
        [null, ``],
        [null, `<span class="${styles.var}">$ch</span> = <span class="${styles.fn}">curl_init</span>();`],
        [null, ``],
        [null, `<span class="${styles.fn}">curl_setopt_array</span>(<span class="${styles.var}">$ch</span>, [`],
        [null, `  CURLOPT_URL =&gt; <span class="${styles.str}">"${URL}"</span>,`],
        [null, `  CURLOPT_RETURNTRANSFER =&gt; <span class="${styles.kw}">true</span>,`],
        [null, `  CURLOPT_POST =&gt; <span class="${styles.kw}">true</span>,`],
        [null, `  CURLOPT_HTTPHEADER =&gt; [`],
        [null, `    <span class="${styles.str}">"Authorization: Bearer ${TOKEN}"</span>,`],
        [null, `    <span class="${styles.str}">"Content-Type: application/json"</span>`],
        [null, `  ],`],
        [null, `  CURLOPT_POSTFIELDS =&gt; <span class="${styles.fn}">json_encode</span>([`],
        [null, `    <span class="${styles.str}">"recipients"</span> =&gt; [<span class="${styles.str}">"${RECIPIENTS[0]}"</span>, <span class="${styles.str}">"${RECIPIENTS[1]}"</span>],`],
        [null, `    <span class="${styles.str}">"message"</span>   =&gt; <span class="${styles.str}">"${MESSAGE}"</span>,`],
        [null, `    <span class="${styles.str}">"sender"</span>    =&gt; <span class="${styles.str}">"${SENDER}"</span>`],
        [null, `  ])`],
        [null, `]);`],
        [null, ``],
        [null, `<span class="${styles.var}">$result</span> = <span class="${styles.fn}">curl_exec</span>(<span class="${styles.var}">$ch</span>);`],
        [null, `<span class="${styles.fn}">curl_close</span>(<span class="${styles.var}">$ch</span>);`],
        [null, `<span class="${styles.fn}">echo</span> <span class="${styles.var}">$result</span>;`],
    ]
};

const getPlainText = (lang: Language): string => {
    const map: Record<Language, string> = {
        curl: `curl -X POST ${URL} \\\n  -H "Authorization: Bearer ${TOKEN}" \\\n  -H "Content-Type: application/json" \\\n  -H "Accept: application/json" \\\n  -d '{\n    "recipients": ["${RECIPIENTS[0]}", "${RECIPIENTS[1]}"],\n    "message": "${MESSAGE}",\n    "sender": "${SENDER}"\n  }'`,
        python: `import requests\n\nurl = "${URL}"\nheaders = {\n    "Authorization": "Bearer ${TOKEN}",\n    "Content-Type": "application/json"\n}\npayload = {\n    "recipients": ["${RECIPIENTS[0]}", "${RECIPIENTS[1]}"],\n    "message": "${MESSAGE}",\n    "sender": "${SENDER}"\n}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())`,
        node: `const response = await fetch(\n  "${URL}",\n  {\n    method: "POST",\n    headers: {\n      "Authorization": \`Bearer ${TOKEN}\`,\n      "Content-Type": "application/json"\n    },\n    body: JSON.stringify({\n      recipients: ["${RECIPIENTS[0]}", "${RECIPIENTS[1]}"],\n      message: "${MESSAGE}",\n      sender: "${SENDER}"\n    })\n  }\n);\n\nconst data = await response.json();\nconsole.log(data);`,
        php: `<?php\n\n$ch = curl_init();\n\ncurl_setopt_array($ch, [\n  CURLOPT_URL => "${URL}",\n  CURLOPT_RETURNTRANSFER => true,\n  CURLOPT_POST => true,\n  CURLOPT_HTTPHEADER => [\n    "Authorization: Bearer ${TOKEN}",\n    "Content-Type: application/json"\n  ],\n  CURLOPT_POSTFIELDS => json_encode([\n    "recipients" => ["${RECIPIENTS[0]}", "${RECIPIENTS[1]}"],\n    "message"   => "${MESSAGE}",\n    "sender"    => "${SENDER}"\n  ])\n]);\n\n$result = curl_exec($ch);\ncurl_close($ch);\necho $result;`
    };
    return map[lang];
};

export default function ApiCodeToggler() {
    const [lang, setLang] = useState<Language>('curl');
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        const text = getPlainText(lang);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [lang]);

    return (
        <div className={styles.wrap}>
            <div className={styles.panel}>
                <div className={styles.topbar}>
                    <span className={styles.label}>AUTHENTICATED REQUEST</span>
                    <div className={styles.controls}>
                        <div className={styles.langSelect}>
                            <select
                                id="langSel"
                                value={lang}
                                onChange={(e) => setLang(e.target.value as Language)}
                            >
                                <option value="curl">cURL</option>
                                <option value="python">Python</option>
                                <option value="node">Node.js</option>
                                <option value="php">PHP</option>
                            </select>
                            <span className={styles.chevron}>&#8645;</span>
                        </div>
                        <button
                            className={`${styles.iconBtn} ${copied ? styles.copied : ''}`}
                            onClick={handleCopy}
                            title="Copy"
                        >
                            {copied ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={styles.codeBlock}>
                    <div className={styles.codeLines}>
                        {snippets[lang].map((line, i) => (
                            <div key={i} className={styles.codeLine}>
                                <span className={styles.lineNum}>{line[0] !== null ? line[0] : i + 1}</span>
                                <span
                                    className={styles.lineCode}
                                    dangerouslySetInnerHTML={{ __html: line[1] }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
