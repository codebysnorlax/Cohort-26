import { useState } from 'react'

export default function QuoteCard({ quote }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="card">
      <div className="quote-mark">"</div>
      <p className="quote-text">{quote.content}</p>
      <div className="quote-author">— {quote.author}</div>
      <div className="quote-footer">
        <div className="tags">
          {quote.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
