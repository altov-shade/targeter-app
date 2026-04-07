<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Alto Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(255, 122, 0, 0.10), transparent 28%),
        radial-gradient(circle at top right, rgba(194, 24, 91, 0.12), transparent 30%),
        linear-gradient(180deg, #08090c 0%, #101116 100%);
      color: white;
      min-height: 100vh;
    }

    a { text-decoration: none; color: inherit; }

    .wrapper {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 36px 28px 60px;
    }

    .hero {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 30px;
      padding: 34px 32px 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      backdrop-filter: blur(10px);
      margin-bottom: 28px;
    }

    .hero::after {
      content: "";
      position: absolute;
      right: -80px;
      top: -80px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(244,180,0,0.30), transparent 65%);
    }

    .eyebrow {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #f6c251;
      background: rgba(244, 180, 0, 0.10);
      border: 1px solid rgba(244, 180, 0, 0.20);
      padding: 10px 14px;
      border-radius: 999px;
      display: inline-block;
      margin-bottom: 18px;
    }

    h1 {
      margin: 0;
      font-size: 52px;
      letter-spacing: -0.03em;
    }

    .subtext {
      margin-top: 14px;
      color: rgba(255,255,255,0.72);
      font-size: 18px;
      max-width: 760px;
    }

    .hero-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 28px;
      flex-wrap: wrap;
    }

    .mini-stats { display: flex; gap: 14px; }

    .stat {
      background: rgba(0,0,0,0.28);
      border-radius: 20px;
      padding: 16px 18px;
      min-width: 140px;
    }

    .stat-label {
      font-size: 12px;
      color: rgba(255,255,255,0.48);
      text-transform: uppercase;
    }

    .stat-value {
      font-size: 26px;
      font-weight: 700;
    }

    .section-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
    }

    .section-title {
      font-size: 28px;
      font-weight: 700;
    }

    .section-pill {
      padding: 10px 16px;
      border-radius: 999px;
      background: rgba(255,255,255,0.06);
      font-size: 14px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .card-shell {
      border-radius: 28px;
      padding: 1px;
      transition: 0.25s;
    }

    .card-shell:hover {
      transform: translateY(-6px);
    }

    .card-inner {
      border-radius: 28px;
      background: rgba(18, 19, 24, 0.94);
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 220px;
    }

    .card-top {
      display: flex;
      justify-content: space-between;
    }

    .icon-box {
      width: 54px;
      height: 54px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.10);
    }

    .status {
      font-size: 11px;
      text-transform: uppercase;
      padding: 8px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
    }

    .card-title {
      font-size: 26px;
      font-weight: 700;
      margin-top: 18px;
    }

    .card-desc {
      font-size: 15px;
      color: rgba(255,255,255,0.68);
    }

    .card-action {
      margin-top: 20px;
      text-align: center;
      padding: 14px;
      border-radius: 18px;
      font-weight: 700;
    }

    .orange-shell { background: linear-gradient(135deg, orange, gold); }
    .gold-shell { background: linear-gradient(135deg, gold, yellow); }
    .rose-shell { background: linear-gradient(135deg, crimson, pink); }
    .gray-shell { background: linear-gradient(135deg, gray, lightgray); }

    .orange-btn { background: orange; color: black; }
    .gold-btn { background: gold; color: black; }
    .rose-btn { background: crimson; }
    .gray-btn { background: gray; }

    .footer-note {
      margin-top: 24px;
      padding: 20px;
      background: rgba(255,255,255,0.05);
      border-radius: 20px;
    }
  </style>
</head>

<body>
  <div class="wrapper">

    <section class="hero">
      <div class="eyebrow">Alto AI Workspace</div>
      <h1>Alto Dashboard</h1>

      <div class="subtext">
        Your central hub for AI tools, brand systems, visual assets, and buildouts.
      </div>

      <div class="hero-bottom">
        <div class="mini-stats">
          <div class="stat">
            <div class="stat-label">Projects</div>
            <div class="stat-value">4</div>
          </div>

          <div class="stat">
            <div class="stat-label">Status</div>
            <div class="stat-value">Live</div>
          </div>

          <div class="stat">
            <div class="stat-label">Focus</div>
            <div class="stat-value">Build</div>
          </div>
        </div>
      </div>
    </section>

    <div class="section-bar">
      <div class="section-title">Workspace</div>
      <div class="section-pill">Connected tools</div>
    </div>

    <div class="grid">

      <!-- TARGETER (UPDATED) -->
      <a href="https://targeter-app.vercel.app" target="_blank" class="card-shell orange-shell">
        <div class="card-inner">
          <div>
            <div class="card-top">
              <div class="icon-box">🎯</div>
              <div class="status">Live Tool</div>
            </div>

            <div class="card-title">Targeter</div>
            <div class="card-desc">
              Find strong brand matches, partnership targets, and aligned opportunities.
            </div>
          </div>

          <div class="card-action orange-btn">Open Tool</div>
        </div>
      </a>

      <!-- BRIEFS -->
      <div class="card-shell gold-shell">
        <div class="card-inner">
          <div>
            <div class="card-top">
              <div class="icon-box">📋</div>
              <div class="status">Coming Soon</div>
            </div>

            <div class="card-title">Briefs</div>
            <div class="card-desc">
              Build cleaner strategy briefs and planning docs.
            </div>
          </div>

          <div class="card-action gold-btn">Open Tool</div>
        </div>
      </div>

      <!-- BRAND -->
      <div class="card-shell rose-shell">
        <div class="card-inner">
          <div>
            <div class="card-top">
              <div class="icon-box">🖼️</div>
              <div class="status">Library</div>
            </div>

            <div class="card-title">Brand Assets</div>
            <div class="card-desc">
              Keep logos and creative materials together.
            </div>
          </div>

          <div class="card-action rose-btn">Open Library</div>
        </div>
      </div>

      <!-- V STUDIO -->
      <a href="https://altov-v-studio-1086023065223.europe-west1.run.app/" target="_blank" class="card-shell gray-shell">
        <div class="card-inner">
          <div>
            <div class="card-top">
              <div class="icon-box">🎬</div>
              <div class="status">Live Tool</div>
            </div>

            <div class="card-title">V Studio</div>
            <div class="card-desc">
              Create and generate visual concepts.
            </div>
          </div>

          <div class="card-action gray-btn">Open Studio</div>
        </div>
      </a>

    </div>

    <div class="footer-note">
      This is your control center for all tools.
    </div>

  </div>
</body>
</html>
