/**
 * Motor de Ciência de Dados e Forense Estatística de Texto.
 * Implementa Entropia de Shannon, Estatística Descritiva + Outliers de Tukey (1.5x IQR),
 * Diversidade Lexical (TTR) e Similaridade TF-IDF com normalização L2.
 *
 * Compatível com navegador (ES Modules) e Node.js sem dependências externas.
 */

const STOPWORDS = new Set([
  'a', 'o', 'as', 'os', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'uns', 'umas', 'e', 'ou', 'que', 'se', 'por', 'com', 'para', 'como', 'ao',
  'aos', 'the', 'is', 'in', 'at', 'of', 'and', 'to', 'for', 'on', 'with', 'that', 'this',
  'el', 'la', 'los', 'las', 'un', 'una', 'y', 'en', 'con', 'por', 'para', 'del', 'al',
]);

const LLM_MARKERS = [
  'em resumo',
  'vale ressaltar',
  'cabe destacar',
  'diante do exposto',
  'nesse contexto',
  'em conclusao',
  'em conclusão',
  'alem disso',
  'além disso',
  'por outro lado',
  'e importante notar',
  'é importante notar',
  'em suma',
  'it is important to note',
  'in conclusion',
  'moreover',
  'furthermore',
  'delve into',
  'en resumen',
  'cabe senalar',
  'cabe señalar',
];

/**
 * Tokeniza texto em palavras normalizadas preservando letras Unicode e números.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenizeWords(text) {
  if (typeof text !== 'string' || !text.trim()) return [];
  const matches = text.toLowerCase().match(/[\p{L}\p{N}]+/gu);
  return matches ? matches : [];
}

/**
 * Divide texto em sentenças não vazias.
 * @param {string} text
 * @returns {string[]}
 */
export function splitSentences(text) {
  if (typeof text !== 'string' || !text.trim()) return [];
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Calcula Entropia de Shannon H(X) = -sum(p * log2(p)) e redundância informacional.
 * @param {string[]} items
 */
export function computeShannonEntropy(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      entropyBits: 0,
      maxEntropyBits: 0,
      redundancyPct: 0,
      distinctSymbols: 0,
      totalSymbols: 0,
    };
  }

  const freq = new Map();
  for (const item of items) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }

  const total = items.length;
  const distinct = freq.size;
  let entropy = 0;

  for (const count of freq.values()) {
    const p = count / total;
    entropy -= p * Math.log2(p);
  }

  const maxEntropy = distinct > 1 ? Math.log2(distinct) : 0;
  let redundancyPct = 0;
  if (maxEntropy > 0) {
    redundancyPct = (1 - entropy / maxEntropy) * 100;
  } else if (total > 1) {
    redundancyPct = 100;
  }

  return {
    entropyBits: Number(entropy.toFixed(4)),
    maxEntropyBits: Number(maxEntropy.toFixed(4)),
    redundancyPct: Number(Math.max(0, redundancyPct).toFixed(2)),
    distinctSymbols: distinct,
    totalSymbols: total,
  };
}

/**
 * Calcula estatística descritiva completa e detecção de outliers via regra de Tukey (1.5x IQR).
 * @param {number[]} values
 */
export function computeDescriptiveStats(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return {
      n: 0,
      min: 0,
      max: 0,
      mean: 0,
      median: 0,
      stdDev: 0,
      variance: 0,
      q1: 0,
      q3: 0,
      iqr: 0,
      tukeyLower: 0,
      tukeyUpper: 0,
      outliers: [],
    };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((acc, v) => acc + v, 0) / n;

  const percentile = (p) => {
    const idx = p * (n - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo];
    return sorted[lo] * (hi - idx) + sorted[hi] * (idx - lo);
  };

  const median = percentile(0.5);
  const q1 = percentile(0.25);
  const q3 = percentile(0.75);
  const iqr = q3 - q1;

  const variance =
    n > 1 ? sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1) : 0;
  const stdDev = Math.sqrt(variance);

  const tukeyLower = q1 - 1.5 * iqr;
  const tukeyUpper = q3 + 1.5 * iqr;
  const outliers = sorted.filter((x) => x < tukeyLower || x > tukeyUpper);

  return {
    n,
    min: sorted[0],
    max: sorted[n - 1],
    mean: Number(mean.toFixed(4)),
    median: Number(median.toFixed(4)),
    stdDev: Number(stdDev.toFixed(4)),
    variance: Number(variance.toFixed(4)),
    q1: Number(q1.toFixed(4)),
    q3: Number(q3.toFixed(4)),
    iqr: Number(iqr.toFixed(4)),
    tukeyLower: Number(tukeyLower.toFixed(4)),
    tukeyUpper: Number(tukeyUpper.toFixed(4)),
    outliers,
  };
}

/**
 * Calcula similaridade de cosseno via TF-IDF normalizado em norma L2 entre dois textos.
 * @param {string} textA
 * @param {string} textB
 */
export function computeTfIdfCosine(textA, textB) {
  const filterTokens = (t) =>
    tokenizeWords(t).filter((w) => !STOPWORDS.has(w) && !/^\d+$/.test(w));

  const tokensA = filterTokens(textA);
  const tokensB = filterTokens(textB);

  if (tokensA.length === 0 || tokensB.length === 0) {
    return { cosineSimilarity: 0, vocabularySize: 0, topSharedTerms: [] };
  }

  const docs = [tokensA, tokensB];
  const vocab = Array.from(new Set([...tokensA, ...tokensB]));
  const nDocs = 2;

  const vectors = docs.map((docTokens) => {
    const tf = new Map();
    for (const w of docTokens) tf.set(w, (tf.get(w) || 0) + 1);

    const vec = new Map();
    let normSq = 0;
    for (const term of vocab) {
      const df = (tokensA.includes(term) ? 1 : 0) + (tokensB.includes(term) ? 1 : 0);
      const idf = Math.log((1 + nDocs) / (1 + df)) + 1;
      const raw = ((tf.get(term) || 0) / docTokens.length) * idf;
      vec.set(term, raw);
      normSq += raw * raw;
    }

    const norm = Math.sqrt(normSq) || 1;
    for (const term of vocab) {
      vec.set(term, vec.get(term) / norm);
    }
    return vec;
  });

  let dot = 0;
  const shared = [];
  for (const term of vocab) {
    const prod = (vectors[0].get(term) || 0) * (vectors[1].get(term) || 0);
    dot += prod;
    if (prod > 0) {
      shared.push({ term, weight: Number(prod.toFixed(4)) });
    }
  }

  shared.sort((a, b) => b.weight - a.weight);

  return {
    cosineSimilarity: Number(Math.min(1, Math.max(0, dot)).toFixed(4)),
    vocabularySize: vocab.length,
    topSharedTerms: shared.slice(0, 6),
  };
}

/**
 * Executa auditoria estatística completa de texto respondendo Sim/Não (risco), Como e Por Quê.
 * @param {string} text
 * @param {string} [referenceText]
 */
export function auditTextForensics(text, referenceText = '') {
  const clean = typeof text === 'string' ? text.trim() : '';
  const words = tokenizeWords(clean);
  const sentences = splitSentences(clean);

  if (words.length === 0) {
    return {
      score: 0,
      verdict: 'ENTRADA_VAZIA',
      lowSampleWarning: true,
      wordCount: 0,
      sentenceCount: 0,
      charEntropy: computeShannonEntropy([]),
      wordEntropy: computeShannonEntropy([]),
      sentenceStats: computeDescriptiveStats([]),
      burstinessCv: 0,
      ttr: 0,
      markerHits: [],
      comparison: null,
      how: ['Nenhum token textual informado para análise estatística.'],
      why: 'Insira ao menos uma sentença completa para calcular entropia e dispersão.',
      epistemicDisclaimer:
        'Análise estatística exige amostra textual não vazia e não substitui validação documental externa.',
    };
  }

  const chars = Array.from(clean.toLowerCase());
  const charEntropy = computeShannonEntropy(chars);
  const wordEntropy = computeShannonEntropy(words);
  const ttr = Number((wordEntropy.distinctSymbols / words.length).toFixed(4));

  const sentenceLengths = sentences.map((s) => Math.max(1, tokenizeWords(s).length));
  const sentenceStats = computeDescriptiveStats(sentenceLengths);
  const burstinessCv =
    sentenceStats.mean > 0
      ? Number((sentenceStats.stdDev / sentenceStats.mean).toFixed(4))
      : 0;

  const lower = clean.toLowerCase();
  const markerHits = LLM_MARKERS.filter((m) => lower.includes(m));

  const comparison =
    typeof referenceText === 'string' && referenceText.trim().length > 0
      ? computeTfIdfCosine(clean, referenceText)
      : null;

  // Pontuação heurística transparente (0 = variação natural alta, 100 = alta uniformidade/marcadores LLM)
  let score = 22;
  const how = [];
  const lowSampleWarning = words.length < 25 || sentences.length < 3;

  if (sentences.length >= 3) {
    if (burstinessCv < 0.22) {
      score += 28;
      how.push(
        `Cadência uniforme entre sentenças (CV = ${burstinessCv}, desvio padrão = ${sentenceStats.stdDev} palavras).`
      );
    } else if (burstinessCv < 0.35) {
      score += 14;
      how.push(`Variação moderada no tamanho das frases (CV = ${burstinessCv}).`);
    } else {
      score -= 8;
      how.push(`Alta variação rítmica de sentenças (burstiness CV = ${burstinessCv}), comum em escrita humana.`);
    }
  } else {
    how.push(
      `Amostra curta (${sentences.length} sentença(s), ${words.length} palavras): poder estatístico reduzido para inferência de ritmo.`
    );
  }

  if (wordEntropy.redundancyPct < 10 && words.length >= 30) {
    score += 12;
    how.push(
      `Baixa redundância lexical de Shannon (${wordEntropy.redundancyPct}%), indicando distribuição altamente regular.`
    );
  } else {
    how.push(
      `Entropia lexical H(X) = ${wordEntropy.entropyBits} bits (redundância de ${wordEntropy.redundancyPct}%).`
    );
  }

  if (words.length >= 40 && ttr < 0.58) {
    score += 12;
    how.push(`Diversidade lexical (TTR = ${ttr}) abaixo do esperado para textos densos editados.`);
  } else {
    how.push(`Diversidade lexical TTR = ${ttr} (${wordEntropy.distinctSymbols} termos únicos em ${words.length}).`);
  }

  if (markerHits.length >= 2) {
    score += 26;
    how.push(`Presença de ${markerHits.length} conectivos/frases-molde frequentes em LLM: ${markerHits.join(', ')}.`);
  } else if (markerHits.length === 1) {
    score += 12;
    how.push(`Presença de 1 marcador estrutural frequente em LLM: "${markerHits[0]}".`);
  }

  if (sentenceStats.outliers.length > 0) {
    score -= 6;
    how.push(
      `Detectado(s) ${sentenceStats.outliers.length} outlier(s) de comprimento via regra de Tukey (1.5x IQR).`
    );
  }

  if (comparison) {
    how.push(
      `Similaridade TF-IDF (Cosseno L2) com o texto de referência: ${(comparison.cosineSimilarity * 100).toFixed(1)}%.`
    );
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let verdict = 'PROVAVEL_NATURAL';
  let why =
    'O texto exibe variação irregular de sentenças e baixa incidência de conectivos padronizados de modelo generativo.';

  if (score >= 65) {
    verdict = 'ALTO_RISCO_SINTETICO';
    why =
      'Combinação de cadência altamente uniforme entre frases, previsibilidade distribucional e marcadores discursivos típicos de saída não revisada de LLM.';
  } else if (score >= 38) {
    verdict = 'SINAIS_MISTOS';
    why =
      'O texto apresenta traços intermediários (pode ser texto humano muito formal, texto híbrido revisado por humano ou amostra curta). Recomenda-se auditoria factual e de origem.';
  }

  return {
    score,
    verdict,
    lowSampleWarning,
    wordCount: words.length,
    sentenceCount: sentences.length,
    charEntropy,
    wordEntropy,
    sentenceStats,
    burstinessCv,
    ttr,
    markerHits,
    comparison,
    how,
    why,
    epistemicDisclaimer:
      'Limite científico explícito (Turing 1950 / Searle 1980): indicadores estatísticos não provam autoria com 100% de certeza. Textos jurídicos/técnicos humanos podem ter baixa variância e textos gerados por IA podem ser reescritos manualmente.',
  };
}
