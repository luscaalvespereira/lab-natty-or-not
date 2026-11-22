/**
 * Motor da Arena Forense ("Natural ou Fake Natty?"):
 * Implementa embaralhamento Fisher-Yates O(n) in-place e avaliação Bayesiana
 * inspirada no Jogo da Imitação (Turing, 1950) e no argumento de Searle (1980).
 */

/**
 * Embaralha uma cópia do vetor em complexidade temporal O(n) usando Fisher-Yates.
 * @template T
 * @param {T[]} items
 * @param {() => number} [rng=Math.random]
 * @returns {T[]}
 */
export function fisherYatesShuffle(items, rng = Math.random) {
  if (!Array.isArray(items)) return [];
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/**
 * Avalia desempenho de uma sessão da Arena sob ótica estatística e epistemológica.
 * @param {Array<{caseId: string, expectedIsFake: boolean, guessedIsFake: boolean}>} answers
 */
export function evaluateArenaSession(answers) {
  if (!Array.isArray(answers) || answers.length === 0) {
    return {
      total: 0,
      correct: 0,
      accuracy: 0,
      truePositives: 0,
      falseNegatives: 0,
      falsePositives: 0,
      trueNegatives: 0,
      turingIndistinguishabilityRate: 0,
      interpretation: 'Nenhuma rodada respondida ainda.',
    };
  }

  let correct = 0;
  let truePositives = 0;
  let falseNegatives = 0;
  let falsePositives = 0;
  let trueNegatives = 0;
  let fakeTotal = 0;

  for (const a of answers) {
    const exp = Boolean(a.expectedIsFake);
    const guess = Boolean(a.guessedIsFake);
    if (exp === guess) correct++;
    if (exp) {
      fakeTotal++;
      if (guess) truePositives++;
      else falseNegatives++;
    } else {
      if (guess) falsePositives++;
      else trueNegatives++;
    }
  }

  const total = answers.length;
  const accuracy = Number((correct / total).toFixed(4));
  const turingIndistinguishabilityRate =
    fakeTotal > 0 ? Number((falseNegatives / fakeTotal).toFixed(4)) : 0;

  let interpretation =
    'Desempenho próximo ao acaso (baseline 0,50): conteúdos sintéticos bem construídos atingiram indistinguibilidade comportamental (Turing, 1950). Nunca confie apenas na inspeção intuitiva.';
  if (accuracy >= 0.8) {
    interpretation =
      'Alta capacidade de triagem forense: você identificou a maioria dos artefatos sintéticos e armadilhas, mantendo foco nos limites entre sintaxe convincente e veracidade (Searle, 1980).';
  } else if (accuracy >= 0.55) {
    interpretation =
      'Triagem intermediária: você detectou sinais óbvios, mas caiu em peças de maior realismo ou engenharia social. Combine leitura crítica com verificação de hash e canal independente.';
  }

  return {
    total,
    correct,
    accuracy,
    truePositives,
    falseNegatives,
    falsePositives,
    trueNegatives,
    turingIndistinguishabilityRate,
    interpretation,
  };
}
