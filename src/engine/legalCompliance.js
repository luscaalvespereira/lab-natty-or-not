/**
 * Motor Jurídico, Regulatório e de Auditoria de Equidade Algorítmica.
 * Cobre LGPD (Lei 13.709/2018), Marco Legal da IA (PL 2338/2023),
 * EU AI Act (Reg. UE 2024/1689), GDPR, Código Penal (Art. 171 §2º-A),
 * CPP (Arts. 158-A a 158-F), Fairness (Regra dos 80%) e Pegada Material.
 */

const SECTOR_PROFILES = {
  hospital: {
    label: 'Saúde / Hospital & Clínicas com IA',
    pl2338Tier: 'ALTO_RISCO',
    euAiActTier: 'HIGH_RISK_ANEXO_III',
    baseGaps: [
      'Uso informal de LLMs públicos por profissionais (Shadow AI) com colagem de prontuários e exames fora de contrato BAA/DPA.',
      'Ausência de responsabilidade objetiva clara quando uma alucinação clínica da IA induz erro de triagem ou prescrição.',
      'Redes hospitalares legadas conectadas a APIs de IA ampliam superfície para ransomware e sequestro de dados sensíveis de saúde.',
    ],
  },
  hr: {
    label: 'Recursos Humanos / Triagem de Candidatos',
    pl2338Tier: 'ALTO_RISCO',
    euAiActTier: 'HIGH_RISK_ANEXO_III',
    baseGaps: [
      'Modelos treinados em históricos assimétricos reproduzem discriminação indireta por CEP, instituição de ensino ou gênero.',
      'Dificuldade de cumprir na prática a explicabilidade e revisão humana efetiva do Art. 20 da LGPD diante de modelos proprietários caixa-preta.',
    ],
  },
  finance: {
    label: 'Crédito, Bancos & Análise Antifraude',
    pl2338Tier: 'ALTO_RISCO',
    euAiActTier: 'HIGH_RISK_ANEXO_III',
    baseGaps: [
      'Variáveis proxy de localização geográfica perpetuam exclusão financeira sem transparência de pesos.',
      'Fraudes com clonagem de voz e deepfake superam validações biométricas vocais legadas, gerando disputa de responsabilidade civil.',
    ],
  },
  chatbot: {
    label: 'Atendimento Corporativo / Chatbot com RAG',
    pl2338Tier: 'RISCO_MODERADO',
    euAiActTier: 'LIMITED_RISK_ART_50',
    baseGaps: [
      'Prompt Injection indireto via documentos anexados pode vazar contexto de outros clientes quando falta isolamento por tenant no banco vetorial.',
      'Consumidores assumem como vinculante resposta alucinada de preço/prazo emitida pelo bot sem aviso claro de limitação.',
    ],
  },
  media: {
    label: 'Mídia Sintética, Voz & Conteúdo Generativo',
    pl2338Tier: 'OBRIGACAO_ROTULAGEM',
    euAiActTier: 'TRANSPARENCY_ART_50',
    baseGaps: [
      'Falta obrigatoriedade técnica interoperável (ex.: assinatura C2PA nativa) em redes sociais, telefonia e mensageria contra golpes de voz clonada.',
      'Direito autoral e uso de voz/imagem sem consentimento ainda dependem de litigância lenta após o dano já consumado.',
    ],
  },
};

const PROXY_CATALOG = {
  cep: 'Proxy de segregação espacial, renda e raça (discriminação indireta por território).',
  bairro: 'Proxy socioeconômico e histórico de infraestrutura urbana.',
  localidade: 'Proxy territorial com correlação demográfica sensível.',
  escola: 'Proxy de classe social e capital socioeconômico.',
  nome: 'Proxy de gênero e origem étnico-racial por marcadores linguísticos.',
  score: 'Proxy de histórico prévio de exclusão financeira.',
  cid: 'Dado sensível direto de saúde (LGPD Art. 5º II / Art. 11).',
  prontuario: 'Dado clínico sensível protegido por sigilo profissional e LGPD Art. 11.',
  genero: 'Atributo protegido direto — exige vedação contra discriminação ilícita.',
  raca: 'Atributo protegido direto — exige vedação contra discriminação ilícita.',
};

/**
 * Gera diagnóstico de conformidade e lacunas jurídicas (Brasil + UE) para cenários com IA.
 * @param {{
 *  sector?: 'hospital'|'hr'|'finance'|'chatbot'|'media',
 *  usesSensitiveData?: boolean,
 *  automatedDecision?: boolean,
 *  syntheticMediaOrVoice?: boolean,
 *  externalApiProvider?: boolean
 * }} [config]
 */
export function auditLegalCompliance(config = {}) {
  const sector = SECTOR_PROFILES[config.sector] ? config.sector : 'hospital';
  const profile = SECTOR_PROFILES[sector];
  const usesSensitiveData = Boolean(config.usesSensitiveData);
  const automatedDecision = Boolean(config.automatedDecision);
  const syntheticMediaOrVoice = Boolean(config.syntheticMediaOrVoice);
  const externalApiProvider = Boolean(config.externalApiProvider);

  const highRiskElevated =
    profile.pl2338Tier === 'ALTO_RISCO' || (usesSensitiveData && automatedDecision);

  const obligations = [
    {
      framework: 'LGPD (Lei 13.709/2018) — Art. 6º e Art. 46',
      requirement:
        'Minimização estrita de dados (enviar apenas o necessário) e medidas técnicas/administrativas de segurança desde a concepção (Privacy by Design).',
    },
    {
      framework: 'Marco Legal da IA (PL 2338/2023) — Gestão de Risco',
      requirement: highRiskElevated
        ? 'Sistema classificado como ALTO RISCO: exige Avaliação de Impacto Algorítmico (AIA), governança contínua, supervisão humana e trilha de auditoria.'
        : 'Sistema sujeito a deveres gerais de transparência, rastreabilidade e prevenção de danos.',
    },
  ];

  if (usesSensitiveData) {
    obligations.push({
      framework: 'LGPD — Art. 5º II, Art. 11 e Art. 48',
      requirement:
        'Tratamento de dado pessoal sensível (saúde, biometria, origem) exige base legal específica do Art. 11, segregação de acesso e comunicação obrigatória à ANPD/titulares em incidente.',
    });
  }

  if (automatedDecision) {
    obligations.push({
      framework: 'LGPD Art. 20 & GDPR Art. 22',
      requirement:
        'Garantir ao titular direito de solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado e informações claras sobre critérios utilizados.',
    });
  }

  if (syntheticMediaOrVoice) {
    obligations.push({
      framework: 'EU AI Act Art. 50 / CP Art. 171 §2º-A / CPP Arts. 158-A–F',
      requirement:
        'Rotulagem explícita e verificável de áudio/imagem/vídeo sintéticos; preservação de hash SHA-256 e logs para cadeia de custódia em casos de fraude por clonagem de voz.',
    });
  }

  if (externalApiProvider) {
    obligations.push({
      framework: 'LGPD Arts. 33–36 (Transferência Internacional & Suboperadores)',
      requirement:
        'Contrato com vedação de treinamento sobre dados do cliente (zero data retention), cláusulas-padrão contratuais e DLP bloqueando PII antes da chamada externa.',
    });
  }

  const gaps = [...profile.baseGaps];
  if (externalApiProvider) {
    gaps.push(
      'Lacuna de auditoria em APIs fechadas: o contratante responde solidariamente perante o titular (LGPD Art. 42), mas raramente tem visibilidade técnica dos pesos ou logs internos do provedor.'
    );
  }
  if (syntheticMediaOrVoice) {
    gaps.push(
      'Lacuna probatória em golpes de voz clonada: operadoras telefônicas e apps de mensagem ainda não validam origem criptográfica de voz em tempo real.'
    );
  }

  return {
    sector,
    sectorLabel: profile.label,
    riskClassification: highRiskElevated ? 'ALTO_RISCO' : profile.pl2338Tier,
    euAiActClassification: profile.euAiActTier,
    obligations,
    gaps,
    recommendedControls: [
      'Implementar gateway/firewall de prompt com scanner DLP antes de qualquer LLM externo.',
      'Registrar logs imutáveis (SHA-256 + timestamp) sem armazenar dados sensíveis em texto claro.',
      'Exigir verificação em canal independente (callback + palavra-chave) para autorizações financeiras ou médicas por voz/vídeo.',
    ],
  };
}

/**
 * Calcula métricas formais de justiça algorítmica (Disparate Impact / Regra dos 80% e Statistical Parity)
 * além de identificar colunas atuando como variáveis proxy discriminatórias.
 */
export function calculateFairness(
  protApproved,
  protTotal,
  refApproved,
  refTotal,
  columnNames = []
) {
  if (protTotal <= 0 || refTotal <= 0 || protApproved < 0 || refApproved < 0) {
    return { error: 'Totais devem ser maiores que zero e aprovações não negativas.' };
  }
  if (protApproved > protTotal || refApproved > refTotal) {
    return { error: 'Aprovações não podem exceder o total de cada grupo.' };
  }

  const protRate = protApproved / protTotal;
  const refRate = refApproved / refTotal;
  const disparateImpactRatio = refRate > 0 ? protRate / refRate : 0;
  const statisticalParityDiff = protRate - refRate;
  const fourFifthsCompliant = disparateImpactRatio >= 0.8;

  const proxyFindings = [];
  for (const col of columnNames) {
    const low = String(col).toLowerCase().trim();
    if (!low) continue;
    for (const [key, risk] of Object.entries(PROXY_CATALOG)) {
      if (low.includes(key)) {
        proxyFindings.push({ column: col, proxyKey: key, risk });
      }
    }
  }

  return {
    protectedGroup: {
      approved: protApproved,
      total: protTotal,
      approvalRate: Number(protRate.toFixed(4)),
    },
    referenceGroup: {
      approved: refApproved,
      total: refTotal,
      approvalRate: Number(refRate.toFixed(4)),
    },
    disparateImpactRatio: Number(disparateImpactRatio.toFixed(4)),
    statisticalParityDiff: Number(statisticalParityDiff.toFixed(4)),
    fourFifthsCompliant,
    diagnosis: fourFifthsCompliant
      ? 'EQUIDADE ESTATÍSTICA DENTRO DO LIMIAR (>= 0.80)'
      : 'IMPACTO DESPROPORCIONAL DETECTADO (Regra dos 80% violada: DI < 0.80)',
    proxyFindings,
  };
}

/**
 * Estima ordem de grandeza do consumo material (energia, água de refrigeração e CO2e) de inferência LLM.
 * @param {number} millionsOfTokens
 */
export function estimateMaterialFootprint(millionsOfTokens) {
  const m = Number(millionsOfTokens);
  if (!Number.isFinite(m) || m < 0) {
    return { error: 'Informe um volume válido e não negativo de milhões de tokens.' };
  }

  const energyKwh = Number((m * 0.35).toFixed(2));
  const waterLiters = Number((m * 0.5).toFixed(2));
  const co2eKg = Number((energyKwh * 0.12).toFixed(2));

  return {
    millionsOfTokens: m,
    energyKwh,
    waterLiters,
    co2eKg,
    methodologyNote:
      'Estimativa paramétrica de ordem de grandeza (~0,35 kWh e ~0,50 L de água por 1M tokens em datacenter; ~0,12 kg CO2e/kWh na matriz elétrica média brasileira). Varia conforme hardware, tamanho do modelo e PUE.',
  };
}
