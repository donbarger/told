import React from 'react';
import { STORIES } from '../stories/index.js';

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Choose a story',
    body: 'Eleven parables. Pick the one that pulls you in. You can come back for the rest.',
  },
  {
    n: '02',
    title: 'Step inside it',
    body: 'You\'re not watching from a pew. You are the younger son. The Samaritan. The rich ruler. The widow with two coins.',
  },
  {
    n: '03',
    title: 'Make a choice',
    body: 'Each scene is a card. Swipe left or right. Some scenes are written; most are written for you, by AI, based on where you\'ve been.',
  },
  {
    n: '04',
    title: 'Live the consequences',
    body: 'Three things shift inside your character with every choice. The arc of the story is fixed. The texture of your journey is yours.',
  },
];

export default function LandingScreen({ onLogin, blocked }) {
  return (
    <div className="told-landing">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="told-hero">
        <div className="told-hero-inner">
          <img
            src="/imb-innovation-logo-white.png"
            alt="IMB Innovation"
            className="told-brand-lockup"
          />
          <p className="told-eyebrow">An interactive parables project</p>
          <h1 className="told-wordmark">Told.</h1>
          <p className="told-tagline">
            The stories Jesus told, stepped into — one choice at a time.
          </p>

          <blockquote className="told-epigraph">
            <em>"He told them many things in parables."</em>
            <span className="told-epigraph-ref">Matthew 13 : 3</span>
          </blockquote>

          <div className="told-cta-row">
            {blocked ? (
              <div className="told-blocked">
                <p>This account has been blocked.</p>
                <small>If you believe this is a mistake, contact the administrator.</small>
              </div>
            ) : (
              <>
                <button className="told-google-btn" onClick={onLogin}>
                  <svg className="told-google-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google to begin
                </button>
              </>
            )}
          </div>
        </div>

        <div className="told-hero-fade" aria-hidden="true" />
      </section>

      {/* ── What Told is ──────────────────────────────────────────────────── */}
      <section className="told-section told-section--what">
        <div className="told-section-inner">
          <p className="told-section-label">What Told is</p>
          <h2 className="told-section-heading">
            Ancient stories. Your choices. An ending you have to sit with.
          </h2>
          <div className="told-what-body">
            <p>
              Jesus told parables in dusty towns to ordinary people — fishermen,
              tax collectors, widows, rich men, the sick, the searching. The
              details were different. The situations were not.
            </p>
            <p>
              Told puts you inside them. Not as a hearer. As the one the story
              is about. You make the choices the character had to make, and you
              live with what happens next.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="told-section told-section--how">
        <div className="told-section-inner">
          <p className="told-section-label">How it works</p>
          <div className="told-steps">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.n} className="told-step">
                <span className="told-step-num">{step.n}</span>
                <h3 className="told-step-title">{step.title}</h3>
                <p className="told-step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story lineup ──────────────────────────────────────────────────── */}
      <section className="told-section told-section--lineup">
        <div className="told-section-inner">
          <p className="told-section-label">The stories</p>
          <h2 className="told-section-heading">Eleven parables. Step into any one.</h2>
          <ul className="told-lineup">
            {STORIES.map((s) => (
              <li key={s.id} className="told-lineup-item">
                <span className="told-lineup-accent" style={{ background: s.accentColor }} />
                <div className="told-lineup-text">
                  <span className="told-lineup-title">{s.title}</span>
                  <span className="told-lineup-sub">{s.scripture}</span>
                </div>
                <span className="told-lineup-tagline">{s.tagline}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="told-section told-section--final">
        <div className="told-section-inner told-final-inner">
          <p className="told-final-kicker">Ready?</p>
          <h2 className="told-final-heading">These stories were told for you.</h2>
          <p className="told-final-sub">
            Sign in and step inside the first one.
          </p>
          {!blocked && (
            <button className="told-google-btn" onClick={onLogin}>
              <svg className="told-google-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          )}
          <p className="told-footer">
            <span>Told</span>
            <span className="told-footer-dot">•</span>
            <span>The parables, firsthand</span>
          </p>

          <nav className="told-legal">
            <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>
            <span className="told-legal-dot">·</span>
            <a href="/terms.html" target="_blank" rel="noopener">Terms of Use</a>
            <span className="told-legal-dot">·</span>
            <a
              href="https://www.imb.org/give/project/innovation-ministry/?projectCodePreselect=LMC300001697&designation="
              target="_blank"
              rel="noopener"
              className="told-legal-support"
            >
              Support This Ministry
            </a>
          </nav>
        </div>
      </section>
    </div>
  );
}
