/**
 * Dicionário multilíngue da interface (PT-BR, EN, ES).
 */

export const I18N = {
  pt: {
    privacyPill: 'Privacy by Design · 100% Client-Side',
    subtitle:
      'Laboratório Forense, Estatístico, Jurídico e de Cibersegurança: Defesa contra Conteúdo Sintético, Ataques e Lacunas de Compliance em IA Generativa',
    slogan:
      'Real ou Fake Natty? Não confie na aparência — audite os dados, blinde o código e feche a lacuna jurídica.',
    tabArena: '1. Arena Forense',
    tabAuditor: '2. Auditor Real vs. Fake',
    tabCyber: '3. Lab Cibersegurança',
    tabLegal: '4. Auditor Jurídico & Lacunas',
    arenaHeading: 'Arena Forense: Natural ou Fake Natty?',
    arenaIntro:
      'Avalie 6 casos reais do cotidiano, hospitais e segurança de apps. Cada escolha abre o laudo completo respondendo Sim/Não, Como, Por Quê e Como se Proteger.',
    btnShuffle: 'Embaralhar (Fisher-Yates O(n))',
    auditorHeading: 'Auditor Estatístico & Forense de Arquivos',
    auditorIntro:
      'Análise em tempo real no navegador: Ciência de Dados aplicada a texto (Shannon, Tukey IQR, TF-IDF) e inspeção binária local (SHA-256, Magic Bytes, EXIF/C2PA).',
    textAuditorTitle: 'A. Motor Estatístico de Texto',
    btnSampleLlm: 'Exemplo LLM Cru (Fake Natty)',
    btnSampleHuman: 'Exemplo Autoral (Natural)',
    btnClear: 'Limpar',
    labelTargetText: 'Texto para auditoria',
    labelRefText: 'Texto de referência opcional (para Similaridade TF-IDF / Cosseno L2)',
    btnAuditText: 'Auditar Texto',
    fileAuditorTitle: 'B. Inspetor Forense de Arquivos & SHA-256',
    fileAuditorHint:
      'Nenhum arquivo sai do seu computador. O cálculo SHA-256 e a varredura de cabeçalhos ocorrem na memória local.',
    dropzoneLabel: 'Arraste uma imagem/PDF/arquivo aqui ou clique para selecionar',
    cyberHeading: 'Lab de Cibersegurança Defensiva (Blue Team & OWASP LLM)',
    cyberIntro:
      'Detecte tentativas de Prompt Injection, comandos destrutivos e vazamento de dados sensíveis (CPF/Saúde) antes de enviar dados a modelos externos.',
    scannerTitle: 'A. Scanner DLP/OWASP (Filtro de Bloom) & Gerador de Prompt Blindado',
    labelSystemRole: 'Papel autorizado do Sistema (System Role)',
    labelUserPayload: 'Entrada não confiável do usuário / documento externo',
    btnAuditSecurity: 'Auditar & Blindar Prompt',
    surfaceTitle: 'B. Mapa de Superfície de Ataque: Hospitais, Empresas e Sociedade',
    legalHeading: 'Auditor de Lacunas Jurídicas, Equidade & Impacto',
    legalIntro:
      'Mapeia obrigações da LGPD, Marco Legal da IA (PL 2338/2023), EU AI Act, Código Penal/CPP e mede viés algorítmico (Regra dos 80%).',
    legalDiagnosticTitle: 'A. Diagnóstico de Conformidade & Lacunas',
    btnRunLegal: 'Gerar Relatório Jurídico',
    fairnessTitle: 'B. Auditoria de Viés Algorítmico (Disparate Impact)',
    footprintTitle: 'C. Pegada Material Estimada (Tokens → Energia/Água/CO₂e)',
    provenanceHeading: 'Manifesto Criptográfico de Proveniência (SHA-256 Verificável)',
    provenanceIntro:
      'Separação transparente entre ativos gerados por IA (FAKE_NATTY) e código/documentação autoral (NATTY) em ./assets/provenance-manifest.json.',
  },
  en: {
    privacyPill: 'Privacy by Design · 100% Client-Side',
    subtitle:
      'Forensic, Statistical, Legal & Cybersecurity Lab: Defense against Synthetic Media, AI Attacks and Compliance Gaps',
    slogan:
      "Natural or Fake Natty? Don't trust appearances — audit the data, harden the code, close the legal gap.",
    tabArena: '1. Forensic Arena',
    tabAuditor: '2. Real vs. Fake Auditor',
    tabCyber: '3. Cybersecurity Lab',
    tabLegal: '4. Legal & Gaps Auditor',
    arenaHeading: 'Forensic Arena: Natural or Fake Natty?',
    arenaIntro:
      'Evaluate 6 real-world scenarios across voice cloning scams, healthcare AI, generated visuals and app code. Each choice reveals How, Why, and How to Defend.',
    btnShuffle: 'Shuffle (Fisher-Yates O(n))',
    auditorHeading: 'Statistical Text & Local File Forensic Auditor',
    auditorIntro:
      'Real-time browser analysis: Data Science on text (Shannon Entropy, Tukey IQR, TF-IDF) and local binary inspection (SHA-256, Magic Bytes, EXIF/C2PA).',
    textAuditorTitle: 'A. Statistical Text Engine',
    btnSampleLlm: 'Load Raw LLM Sample (Fake Natty)',
    btnSampleHuman: 'Load Human Author Sample (Natural)',
    btnClear: 'Clear',
    labelTargetText: 'Text to audit',
    labelRefText: 'Optional reference text (for TF-IDF / L2 Cosine Similarity)',
    btnAuditText: 'Audit Text',
    fileAuditorTitle: 'B. Local File Forensics & SHA-256 Inspector',
    fileAuditorHint:
      'No file leaves your computer. SHA-256 hashing and header inspection run strictly in local memory.',
    dropzoneLabel: 'Drag an image/PDF/file here or click to browse',
    cyberHeading: 'Defensive Cybersecurity Lab (Blue Team & OWASP LLM)',
    cyberIntro:
      'Detect Prompt Injection, destructive commands and sensitive PII/Healthcare leaks before reaching external AI models.',
    scannerTitle: 'A. DLP/OWASP Scanner (Bloom Filter) & Nonce Prompt Hardener',
    labelSystemRole: 'Authorized System Role',
    labelUserPayload: 'Untrusted user input / external document payload',
    btnAuditSecurity: 'Audit & Harden Prompt',
    surfaceTitle: 'B. Attack Surface Matrix: Hospitals, Enterprises & Society',
    legalHeading: 'Legal Gaps, Algorithmic Fairness & Footprint Auditor',
    legalIntro:
      'Maps Brazilian LGPD, AI Bill (PL 2338/2023), EU AI Act, Criminal/Evidence rules and computes Disparate Impact (80% Rule).',
    legalDiagnosticTitle: 'A. Compliance & Regulatory Gaps Report',
    btnRunLegal: 'Generate Legal Report',
    fairnessTitle: 'B. Algorithmic Fairness Audit (Disparate Impact)',
    footprintTitle: 'C. Material Footprint Estimate (Tokens → Energy/Water/CO₂e)',
    provenanceHeading: 'Verifiable Cryptographic Provenance Manifest (SHA-256)',
    provenanceIntro:
      'Transparent separation between AI-generated assets (FAKE_NATTY) and human-authored code/docs (NATTY) in ./assets/provenance-manifest.json.',
  },
  es: {
    privacyPill: 'Privacy by Design · 100% Client-Side',
    subtitle:
      'Laboratorio Forense, Estadístico, Jurídico y de Ciberseguridad: Defensa contra Contenido Sintético, Ataques y Brechas de Cumplimiento en IA',
    slogan:
      '¿Natural o Fake Natty? No confíes en las apariencias — audita los datos, blinda el código y cierra la brecha jurídica.',
    tabArena: '1. Arena Forense',
    tabAuditor: '2. Auditor Real vs. Fake',
    tabCyber: '3. Lab Ciberseguridad',
    tabLegal: '4. Auditor Jurídico y Brechas',
    arenaHeading: 'Arena Forense: ¿Natural o Fake Natty?',
    arenaIntro:
      'Evalúa 6 casos reales sobre clonación de voz, salud con IA, imágenes generadas y código vulnerable. Cada respuesta abre el informe con Cómo, Por Qué y Defensa.',
    btnShuffle: 'Mezclar (Fisher-Yates O(n))',
    auditorHeading: 'Auditor Estadístico y Forense de Archivos',
    auditorIntro:
      'Análisis en tiempo real en el navegador: Ciencia de Datos aplicada al texto (Shannon, Tukey IQR, TF-IDF) e inspección binaria local (SHA-256, Magic Bytes, EXIF/C2PA).',
    textAuditorTitle: 'A. Motor Estadístico de Texto',
    btnSampleLlm: 'Ejemplo LLM Crudo (Fake Natty)',
    btnSampleHuman: 'Ejemplo Autoral (Natural)',
    btnClear: 'Limpiar',
    labelTargetText: 'Texto a auditar',
    labelRefText: 'Texto de referencia opcional (Similitud TF-IDF / Coseno L2)',
    btnAuditText: 'Auditar Texto',
    fileAuditorTitle: 'B. Inspector Forense Local & SHA-256',
    fileAuditorHint:
      'Ningún archivo sale de tu equipo. El cálculo SHA-256 y la lectura de cabeceras ocurren localmente.',
    dropzoneLabel: 'Arrastra una imagen/PDF/archivo aquí o haz clic para seleccionar',
    cyberHeading: 'Laboratorio de Ciberseguridad Defensiva (Blue Team & OWASP LLM)',
    cyberIntro:
      'Detecta intentos de Prompt Injection, comandos destructivos y fuga de datos sensibles (salud/PII) antes de llegar a modelos externos.',
    scannerTitle: 'A. Escáner DLP/OWASP (Filtro de Bloom) y Blindaje de Prompts',
    labelSystemRole: 'Rol autorizado del Sistema (System Role)',
    labelUserPayload: 'Entrada no confiable del usuario / documento externo',
    btnAuditSecurity: 'Auditar y Blindar Prompt',
    surfaceTitle: 'B. Mapa de Superficie de Ataque: Hospitales, Empresas y Sociedad',
    legalHeading: 'Auditor de Brechas Jurídicas, Equidad e Impacto Material',
    legalIntro:
      'Mapea LGPD, PL 2338/2023, EU AI Act, normas penales/probatorias y calcula sesgo algorítmico (Regla del 80%).',
    legalDiagnosticTitle: 'A. Diagnóstico de Cumplimiento y Brechas',
    btnRunLegal: 'Generar Informe Jurídico',
    fairnessTitle: 'B. Auditoría de Equidad Algorítmica (Disparate Impact)',
    footprintTitle: 'C. Huella Material Estimada (Tokens → Energía/Agua/CO₂e)',
    provenanceHeading: 'Manifiesto Criptográfico de Procedencia (SHA-256 Verificable)',
    provenanceIntro:
      'Separación transparente entre activos generados por IA (FAKE_NATTY) y código/documentación autoral (NATTY) en ./assets/provenance-manifest.json.',
  },
};
