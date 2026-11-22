/**
 * VeritasNatty — Single Page Application (SPA) Root Template
 * Renderizado dinamicamente pelo motor JavaScript no cliente.
 */

export const APP_TEMPLATE = `
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand-block">
        <div class="brand-eyebrow">
          <span class="pill pill-privacy" data-i18n="privacyPill">Privacy by Design · 100% Client-Side</span>
          <span class="pill pill-dio">DIO Lab · #LabDIONattyOrNot</span>
        </div>
        <h1 class="brand-title">VeritasNatty — Audit &amp; Shield</h1>
        <p class="brand-subtitle" data-i18n="subtitle">
          Laboratório Forense, Estatístico, Jurídico e de Cibersegurança: Defesa contra Conteúdo Sintético, Ataques e Lacunas de Compliance em IA Generativa
        </p>
        <p class="brand-slogan" data-i18n="slogan">
          Real ou Fake Natty? Não confie na aparência — audite os dados, blinde o código e feche a lacuna jurídica.
        </p>
      </div>
      <div class="header-controls">
        <div class="lang-switch" role="group" aria-label="Language selector">
          <button type="button" class="lang-btn is-active" data-lang="pt" aria-pressed="true">PT</button>
          <button type="button" class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
          <button type="button" class="lang-btn" data-lang="es" aria-pressed="false">ES</button>
        </div>
        <div class="banner-preview">
          <img src="./assets/veritasnatty-banner.gif" alt="VeritasNatty — Audit & Shield Animated Banner" class="banner-img">
        </div>
      </div>
    </div>
  </header>

  <nav class="tab-nav" aria-label="Módulos principais">
    <div class="container tab-list" role="tablist">
      <button type="button" role="tab" class="tab-btn is-active" id="tab-btn-arena" data-tab="arena" aria-selected="true" aria-controls="panel-arena" data-i18n="tabArena">
        1. Arena Forense
      </button>
      <button type="button" role="tab" class="tab-btn" id="tab-btn-auditor" data-tab="auditor" aria-selected="false" aria-controls="panel-auditor" data-i18n="tabAuditor">
        2. Auditor Real vs. Fake
      </button>
      <button type="button" role="tab" class="tab-btn" id="tab-btn-cyber" data-tab="cyber" aria-selected="false" aria-controls="panel-cyber" data-i18n="tabCyber">
        3. Lab Cibersegurança
      </button>
      <button type="button" role="tab" class="tab-btn" id="tab-btn-legal" data-tab="legal" aria-selected="false" aria-controls="panel-legal" data-i18n="tabLegal">
        4. Auditor Jurídico &amp; Lacunas
      </button>
    </div>
  </nav>

  <main class="container main-content">
    <!-- TAB 1: ARENA FORENSE -->
    <section id="panel-arena" class="tab-panel is-active" role="tabpanel" aria-labelledby="tab-btn-arena">
      <div class="section-head">
        <div>
          <h2 data-i18n="arenaHeading">Arena Forense: Natural ou Fake Natty?</h2>
          <p class="muted" data-i18n="arenaIntro">
            Avalie 6 casos reais do cotidiano, hospitais e segurança de apps. Cada escolha abre o laudo completo respondendo Sim/Não, Como, Por Quê e Como se Proteger.
          </p>
        </div>
        <button type="button" id="btn-shuffle-arena" class="btn btn-secondary" data-i18n="btnShuffle">
          Embaralhar (Fisher-Yates O(n))
        </button>
      </div>

      <div id="arena-summary" class="card summary-card" aria-live="polite"></div>
      <div id="arena-grid" class="cases-grid"></div>
    </section>

    <!-- TAB 2: AUDITOR REAL VS. FAKE -->
    <section id="panel-auditor" class="tab-panel" role="tabpanel" aria-labelledby="tab-btn-auditor" hidden>
      <div class="section-head">
        <div>
          <h2 data-i18n="auditorHeading">Auditor Estatístico &amp; Forense de Arquivos</h2>
          <p class="muted" data-i18n="auditorIntro">
            Análise em tempo real no navegador: Ciência de Dados aplicada a texto (Shannon, Tukey IQR, TF-IDF) e inspeção binária local (SHA-256, Magic Bytes, EXIF/C2PA).
          </p>
        </div>
      </div>

      <div class="two-col-grid">
        <article class="card">
          <h3 data-i18n="textAuditorTitle">A. Motor Estatístico de Texto</h3>
          <div class="btn-row">
            <button type="button" id="btn-sample-llm" class="btn btn-ghost" data-i18n="btnSampleLlm">Exemplo LLM Cru (Fake Natty)</button>
            <button type="button" id="btn-sample-human" class="btn btn-ghost" data-i18n="btnSampleHuman">Exemplo Autoral (Natural)</button>
            <button type="button" id="btn-clear-text" class="btn btn-ghost" data-i18n="btnClear">Limpar</button>
          </div>
          <label class="field-label" for="input-text-audit" data-i18n="labelTargetText">Texto para auditoria</label>
          <textarea id="input-text-audit" class="text-area" rows="6" placeholder="Cole aqui um texto, e-mail suspeito, resumo clínico ou parecer..."></textarea>

          <label class="field-label" for="input-text-ref" data-i18n="labelRefText">Texto de referência opcional (para Similaridade TF-IDF / Cosseno L2)</label>
          <textarea id="input-text-ref" class="text-area" rows="3" placeholder="Opcional: cole uma versão original para medir similaridade semântica léxica..."></textarea>

          <button type="button" id="btn-run-text-audit" class="btn btn-primary" data-i18n="btnAuditText">Auditar Texto</button>
          <div id="text-audit-result" class="result-box" aria-live="polite"></div>
        </article>

        <article class="card">
          <h3 data-i18n="fileAuditorTitle">B. Inspetor Forense de Arquivos &amp; SHA-256</h3>
          <p class="muted small" data-i18n="fileAuditorHint">
            Nenhum arquivo sai do seu computador. O cálculo SHA-256 e a varredura de cabeçalhos ocorrem na memória local.
          </p>
          <div id="file-dropzone" class="dropzone" tabindex="0">
            <input type="file" id="input-file-audit" class="file-input" aria-label="Selecionar arquivo local">
            <p data-i18n="dropzoneLabel">Arraste uma imagem/PDF/arquivo aqui ou clique para selecionar</p>
          </div>
          <div class="btn-row">
            <button type="button" id="btn-inspect-asset-hospital" class="btn btn-ghost">Testar ativo local: Hospital IA (PNG)</button>
            <button type="button" id="btn-inspect-asset-banner" class="btn btn-ghost">Testar ativo local: Banner (GIF)</button>
          </div>
          <div id="file-audit-result" class="result-box" aria-live="polite"></div>
        </article>
      </div>
    </section>

    <!-- TAB 3: LAB CIBERSEGURANÇA -->
    <section id="panel-cyber" class="tab-panel" role="tabpanel" aria-labelledby="tab-btn-cyber" hidden>
      <div class="section-head">
        <div>
          <h2 data-i18n="cyberHeading">Lab de Cibersegurança Defensiva (Blue Team &amp; OWASP LLM)</h2>
          <p class="muted" data-i18n="cyberIntro">
            Detecte tentativas de Prompt Injection, comandos destrutivos e vazamento de dados sensíveis (CPF/Saúde) antes de enviar dados a modelos externos.
          </p>
        </div>
      </div>

      <article class="card">
        <h3 data-i18n="scannerTitle">A. Scanner DLP/OWASP (Filtro de Bloom) &amp; Gerador de Prompt Blindado</h3>
        <div class="btn-row">
          <button type="button" id="btn-sample-injection" class="btn btn-ghost">Simular Prompt Injection</button>
          <button type="button" id="btn-sample-pii" class="btn btn-ghost">Simular Vazamento Hospitalar (LGPD)</button>
          <button type="button" id="btn-sample-destructive" class="btn btn-ghost">Simular Comando Destrutivo (RCE/SQL)</button>
          <button type="button" id="btn-sample-safe" class="btn btn-ghost">Entrada Segura</button>
        </div>

        <label class="field-label" for="input-system-role" data-i18n="labelSystemRole">Papel autorizado do Sistema (System Role)</label>
        <input type="text" id="input-system-role" class="text-input" value="Assistente de triagem documental proibido de expor PII ou executar comandos externos.">

        <label class="field-label" for="input-security-payload" data-i18n="labelUserPayload">Entrada não confiável do usuário / documento externo</label>
        <textarea id="input-security-payload" class="text-area" rows="4" placeholder="Digite ou carregue uma simulação de ataque / dado sensível..."></textarea>

        <button type="button" id="btn-run-security-audit" class="btn btn-primary" data-i18n="btnAuditSecurity">Auditar &amp; Blindar Prompt</button>
        <div id="security-audit-result" class="result-box" aria-live="polite"></div>
      </article>

      <article class="card mt-lg">
        <div class="section-head compact">
          <div>
            <h3 data-i18n="surfaceTitle">B. Mapa de Superfície de Ataque: Hospitais, Empresas e Sociedade</h3>
            <p class="muted small">Portas abertas pela adoção apressada de IA, mecanismos de exploração e contramedidas.</p>
          </div>
          <div class="btn-row" role="group" aria-label="Filtro por setor">
            <button type="button" class="btn btn-ghost filter-btn is-active" data-sector="all">Todos</button>
            <button type="button" class="btn btn-ghost filter-btn" data-sector="hospital">Hospitais</button>
            <button type="button" class="btn btn-ghost filter-btn" data-sector="enterprise">Empresas</button>
            <button type="button" class="btn btn-ghost filter-btn" data-sector="social">Sociedade / Golpes</button>
          </div>
        </div>
        <div id="attack-surface-list" class="surface-grid"></div>
      </article>
    </section>

    <!-- TAB 4: AUDITOR JURÍDICO & LACUNAS -->
    <section id="panel-legal" class="tab-panel" role="tabpanel" aria-labelledby="tab-btn-legal" hidden>
      <div class="section-head">
        <div>
          <h2 data-i18n="legalHeading">Auditor de Lacunas Jurídicas, Equidade &amp; Impacto</h2>
          <p class="muted" data-i18n="legalIntro">
            Mapeia obrigações da LGPD, Marco Legal da IA (PL 2338/2023), EU AI Act, Código Penal/CPP e mede viés algorítmico (Regra dos 80%).
          </p>
        </div>
      </div>

      <div class="two-col-grid">
        <article class="card">
          <h3 data-i18n="legalDiagnosticTitle">A. Diagnóstico de Conformidade &amp; Lacunas</h3>
          <label class="field-label" for="select-legal-sector">Setor do produto / sistema com IA</label>
          <select id="select-legal-sector" class="text-input">
            <option value="hospital">Saúde / Hospital &amp; Clínicas com IA</option>
            <option value="hr">Recursos Humanos / Triagem de Candidatos</option>
            <option value="finance">Crédito, Bancos &amp; Análise Antifraude</option>
            <option value="chatbot">Atendimento Corporativo / Chatbot com RAG</option>
            <option value="media">Mídia Sintética, Voz &amp; Conteúdo Generativo</option>
          </select>

          <div class="checkbox-stack">
            <label class="check-item"><input type="checkbox" id="chk-sensitive" checked> Trata dados pessoais sensíveis (saúde, biometria, origem — LGPD Art. 11)</label>
            <label class="check-item"><input type="checkbox" id="chk-automated" checked> Apoia ou toma decisão automatizada (LGPD Art. 20 / GDPR Art. 22)</label>
            <label class="check-item"><input type="checkbox" id="chk-synthetic" checked> Gera ou processa voz, imagem ou vídeo sintético (EU AI Act Art. 50)</label>
            <label class="check-item"><input type="checkbox" id="chk-external" checked> Envia dados para API externa de terceiros (LGPD Arts. 33–36)</label>
          </div>

          <button type="button" id="btn-run-legal" class="btn btn-primary" data-i18n="btnRunLegal">Gerar Relatório Jurídico</button>
          <div id="legal-audit-result" class="result-box" aria-live="polite"></div>
        </article>

        <div class="stack-col">
          <article class="card">
            <h3 data-i18n="fairnessTitle">B. Auditoria de Viés Algorítmico (Disparate Impact)</h3>
            <div class="mini-form-grid">
              <div>
                <label class="field-label" for="inp-prot-app">Grupo Protegido: Aprovados</label>
                <input type="number" id="inp-prot-app" class="text-input" value="120" min="0">
              </div>
              <div>
                <label class="field-label" for="inp-prot-tot">Grupo Protegido: Total</label>
                <input type="number" id="inp-prot-tot" class="text-input" value="300" min="1">
              </div>
              <div>
                <label class="field-label" for="inp-ref-app">Grupo Referência: Aprovados</label>
                <input type="number" id="inp-ref-app" class="text-input" value="210" min="0">
              </div>
              <div>
                <label class="field-label" for="inp-ref-tot">Grupo Referência: Total</label>
                <input type="number" id="inp-ref-tot" class="text-input" value="300" min="1">
              </div>
            </div>
            <label class="field-label" for="inp-proxy-cols">Colunas do dataset (detecção de variáveis proxy)</label>
            <input type="text" id="inp-proxy-cols" class="text-input" value="id_usuario, cep_residencia, score_previo, cid_10, idade">
            <button type="button" id="btn-run-fairness" class="btn btn-secondary">Auditar Equidade (Regra 80%)</button>
            <div id="fairness-result" class="result-box" aria-live="polite"></div>
          </article>

          <article class="card">
            <h3 data-i18n="footprintTitle">C. Pegada Material Estimada (Tokens → Energia/Água/CO₂e)</h3>
            <div class="inline-form">
              <div class="flex-1">
                <label class="field-label" for="inp-tokens-m">Volume mensal (Milhões de tokens)</label>
                <input type="number" id="inp-tokens-m" class="text-input" value="50" min="0" step="1">
              </div>
              <button type="button" id="btn-run-footprint" class="btn btn-secondary">Estimar Pegada</button>
            </div>
            <div id="footprint-result" class="result-box" aria-live="polite"></div>
          </article>
        </div>
      </div>
    </section>

    <!-- PROVENANCE MANIFEST FOOTER PANEL -->
    <section class="card mt-xl" id="provenance-section">
      <div class="section-head compact">
        <div>
          <h2 data-i18n="provenanceHeading">Manifesto Criptográfico de Proveniência (SHA-256 Verificável)</h2>
          <p class="muted small" data-i18n="provenanceIntro">
            Separação transparente entre ativos gerados por IA (FAKE_NATTY) e código/documentação autoral (NATTY) em ./assets/provenance-manifest.json.
          </p>
        </div>
        <span id="manifest-badge" class="pill pill-cyan">SHA-256 Ledger</span>
      </div>
      <div class="table-wrap">
        <table class="manifest-table">
          <thead>
            <tr>
              <th>Arquivo</th>
              <th>Classificação</th>
              <th>Bytes</th>
              <th>SHA-256</th>
            </tr>
          </thead>
          <tbody id="manifest-tbody"></tbody>
        </table>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>
        <strong>VeritasNatty — Audit &amp; Shield</strong> · Desenvolvido por <strong>Lucas Alves Pereira</strong> (Jurista, Dev, Pesquisador em Cibersegurança &amp; Ciência de Dados) · Desafio DIO <code>lab-natty-or-not</code>.
      </p>
      <p class="muted small">
        Licença MIT · Processamento 100% local no navegador (zero telemetria, zero coleta de dados).
      </p>
    </div>
  </footer>
`;
