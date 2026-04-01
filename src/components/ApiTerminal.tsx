import React, { useState, useCallback, useMemo } from 'react';
import styles from './ApiCodeToggler.module.css';
import { highlight, TerminalLanguage } from '../utils/highlighter';

interface ApiTerminalProps {
    code: string;
    language: TerminalLanguage;
    title?: string;
}

export default function ApiTerminal({
    code,
    language = 'text',
    title = 'TERMINAL'
}: ApiTerminalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [code]);

    const renderedLines = useMemo(() => {
        return code.trim().split('\n').map((line, i) => ({
            num: i + 1,
            html: highlight(line, language)
        }));
    }, [code, language]);

    return (
        <div className={styles.wrap}>
            <div className={styles.panel}>
                <div className={styles.topbar}>
                    <span className={styles.label}>{title}</span>
                    <div className={styles.controls}>
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
                        {renderedLines.map((line) => (
                            <div key={line.num} className={styles.codeLine}>
                                <span className={styles.lineNum}>{line.num}</span>
                                <span
                                    className={styles.lineCode}
                                    dangerouslySetInnerHTML={{ __html: line.html }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
