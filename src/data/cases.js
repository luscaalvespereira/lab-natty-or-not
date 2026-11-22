/**
 * Base de casos reais/didáticos da Arena Forense "Natural ou Fake Natty?".
 * Cada caso responde explicitamente: Sim/Não (Fake Natty ou Natural), Como, Por Quê e Como se Proteger.
 */

export const ARENA_CASES = [
  {
    id: 'case-01-vishing-voice-clone',
    category: 'Cibersegurança & Golpes (Vishing)',
    title: 'Áudio urgente de "falso sequestro / aprovação financeira" por clonagem de voz',
    type: 'transcript',
    expectedIsFake: true,
    expectedLabel: 'FAKE NATTY (Voz Clonada / Engenharia Social)',
    imagePath: null,
    assetKey: 'src/data/cases.js',
    content: [
      'Transcrição da chamada (00:38, número desconhecido):',
      '"Pai/Diretor, meu celular caiu e estou ligando de outro aparelho. Sofri um problema grave na rua agora, preciso que transfira R$ 4.800 via Pix neste CPF de terceiro em 5 minutos antes que bloqueiem tudo. Não ligue pro meu número porque está sem sinal, confia na minha voz, sou eu mesmo!"',
    ].join('\n'),
    promptUsed:
      'Cenário simulado de clonagem neural de voz zero-shot (treinada com 6 segundos de áudio público em rede social + script de urgência emocional).',
    verdictSummary:
      'SIM — Alto risco de golpe com voz clonada (Fake Natty). Áudio sozinho deixou de ser prova de identidade.',
    howDetected: [
      'Pressão temporal extrema ("em 5 minutos") combinada com proibição explícita de validar no número oficial.',
      'Pedido de transferência para conta de terceiro (laranja) fora do canal usual.',
      'Artefatos típicos em clonagem em tempo real: latência de 1–2s antes de responder perguntas inesperadas, respiração cortada e entonação plana sob ruído de fundo artificial.',
    ],
    whyItMatters:
      'Golpes antigos de falso sequestro hoje usam 5–10 segundos de áudio extraídos de WhatsApp, Instagram ou vídeos públicos para sintetizar a voz exata de familiares e executivos.',
    howToProtect: [
      'Regra do Canal Independente (Out-of-Band): desligue e ligue você mesmo para o número salvo anteriormente ou acione outro familiar/colega antes de qualquer pagamento.',
      'Palavra-chave familiar/corporativa offline: combine uma senha verbal simples fora da internet para emergências reais.',
      'Faça uma pergunta fora do roteiro (algo privado recente que não existe em redes sociais) para quebrar scripts automatizados.',
      'Em caso de fraude, preserve gravações/registros com hash SHA-256 (CPP arts. 158-A–F) e tipifique conforme CP Art. 171 §2º-A.',
    ],
    legalRefs: ['CP Art. 171 §2º-A (Fraude Eletrônica)', 'CPP Arts. 158-A a 158-F', 'EU AI Act Art. 50'],
    cyberRefs: ['Engenharia Social / Vishing', 'Zero-Trust Identity Verification'],
  },
  {
    id: 'case-02-hospital-ai-leak',
    category: 'Saúde, LGPD & Alucinação Clínica',
    title: 'Estação hospitalar com dashboard de IA exibindo dados ilegíveis e erro de posologia',
    type: 'image_and_text',
    expectedIsFake: true,
    expectedLabel: 'FAKE NATTY (Imagem IA + Alucinação Clínica)',
    imagePath: './assets/images/case-hospital-ai.png',
    assetKey: 'assets/images/case-hospital-ai.png',
    content: [
      'Trecho gerado por assistente sem validação clínica após colagem de prontuário:',
      '"Paciente João Silva (CPF 123.456.789-00) apresenta quadro compatível; recomenda-se dose inicial de 950 mg IV a cada 4h conforme Protocolo Fictício XYZ-2026."',
    ].join('\n'),
    promptUsed:
      'Prompt visual (imagem): "Editorial photorealistic 16:9 shot of a modern hospital nursing workstation at night, monitor displaying an abstract stylized AI triage interface with subtle garbled pseudo-text and unnatural chart symmetry, cool blue clinical lighting."',
    verdictSummary:
      'SIM — Conteúdo sintético com duplo risco crítico: alucinação clínica + violação grave da LGPD (Art. 11).',
    howDetected: [
      'Na imagem: rótulos do monitor apresentam caracteres distorcidos (pseudo-texto típico de modelos de difusão) e simetria artificial nos gráficos.',
      'No texto: modelo cita protocolo inexistente com tom autoritativo ("Protocolo Fictício XYZ-2026") e expõe CPF/nome em prompt externo.',
      'Ausência de metadados de câmera real e inclusão no Manifesto SHA-256 como ativo gerado por IA.',
    ],
    whyItMatters:
      'Conectar IAs em hospitais sem segmentação, sem DLP e sem revisão médica transforma dados sensíveis de saúde em alvo prioritário de vazamentos e ransomware.',
    howToProtect: [
      'Nunca colar nome, CPF ou prontuário em chats de IA públicos (combater Shadow AI com bloqueio DLP).',
      'Exigir Human-in-the-Loop médico obrigatório: IA nunca prescreve nem decide sozinha.',
      'Segmentar redes médicas, aplicar Zero Trust nas APIs internas e exigir contrato com retenção zero de dados (LGPD Arts. 11 e 46).',
    ],
    legalRefs: ['LGPD Art. 5º II e Art. 11 (Saúde)', 'LGPD Art. 46 e 48', 'PL 2338/2023 (Alto Risco)'],
    cyberRefs: ['OWASP LLM02 (Sensitive Info Disclosure)', 'OWASP LLM09 (Misinformation)', 'Shadow AI DLP'],
  },
  {
    id: 'case-03-portrait-naive-v1',
    category: 'Engenharia de Prompts (v1 Ingênuo)',
    title: 'Retrato corporativo de suposto executivo para perfil falso (LinkedIn / Phishing)',
    type: 'image',
    expectedIsFake: true,
    expectedLabel: 'FAKE NATTY (Prompt v1 com artefatos visuais)',
    imagePath: './assets/images/case-social-eng-v1.png',
    assetKey: 'assets/images/case-social-eng-v1.png',
    content:
      'Avatar utilizado em campanha de spear-phishing corporativo simulando recrutador ou consultor de tecnologia.',
    promptUsed:
      'Prompt v1 (ingênuo): "Overly polished corporate tech executive portrait in a glowing glass office, hyper-smooth skin, symmetrical studio lighting, holding a tablet."',
    verdictSummary:
      'SIM — Fake Natty clássico de geração visual com prompt genérico (v1).',
    howDetected: [
      'Textura de pele excessivamente lisa ("efeito plástico") sem poros naturais compatíveis com a nitidez do fundo.',
      'Iluminação e composição simétricas demais, típicas de prompts sem direção fotográfica real.',
      'Anatomia de mãos/dedos e reflexos de vidro ao fundo com incoerência geométrica sutil.',
    ],
    whyItMatters:
      'Perfis falsos em redes profissionais usam retratos sintéticos para ganhar confiança de colaboradores e coletar credenciais ou códigos internos.',
    howToProtect: [
      'Auditar além da foto: checar histórico profissional consistente, domínio oficial do e-mail corporativo e vídeo ao vivo antes de compartilhar dados.',
      'Em apps que aceitam upload de documentos/selfies, exigir prova de vida (liveness) resistente a injeção de câmera virtual.',
    ],
    legalRefs: ['CP Art. 307 / Art. 171 §2º-A', 'EU AI Act Art. 50'],
    cyberRefs: ['Spear Phishing', 'Identity Spoofing'],
  },
  {
    id: 'case-04-documentary-directed-v2',
    category: 'Engenharia de Prompts (v2 Dirigido)',
    title: 'Foto espontânea de palestrante em corredor de conferência de cibersegurança',
    type: 'image',
    expectedIsFake: true,
    expectedLabel: 'FAKE NATTY (Prompt v2 de alto realismo)',
    imagePath: './assets/images/case-social-eng-v2.png',
    assetKey: 'assets/images/case-social-eng-v2.png',
    content:
      'Registro fotográfico aparentemente documental ("35mm, grão natural, sombras assimétricas") criado inteiramente por IA Generativa.',
    promptUsed:
      'Prompt v2 (dirigido): "Candid documentary-style 35mm photograph of a fictional cybersecurity researcher checking an anonymous lanyard badge in a dimly lit conference corridor, natural film grain, asymmetrical shadows, authentic fabric wrinkles, shallow depth of field."',
    verdictSummary:
      'SIM — Também é Fake Natty! Mostra por que "olhômetro" falha diante de engenharia de prompts bem feita.',
    howDetected: [
      'A inspeção visual simples falha porque o prompt v2 adicionou intencionalmente imperfeições fotográficas reais (grão 35mm, foco curto, dobra de tecido).',
      'A detecção confiável desloca-se da aparência para a PROVENIÊNCIA: ausência de assinatura criptográfica de câmera (C2PA) + registro explícito de geração no manifesto SHA-256.',
    ],
    whyItMatters:
      'Comparar o Caso 3 (v1) com o Caso 4 (v2) prova o ponto central do projeto: depender apenas do olho humano é estratégia perdida. A defesa moderna exige cadeia de custódia e credenciais criptográficas.',
    howToProtect: [
      'Adotar verificação de proveniência (C2PA / hashes de coleta) em vez de confiar só em "parece natural".',
      'Cruzar a imagem com busca reversa e fontes independentes antes de publicar ou tomar decisão.',
    ],
    legalRefs: ['CPP Arts. 158-A a 158-F (Vestígio Digital)', 'PL 2338/2023 (Rotulagem de Conteúdo)'],
    cyberRefs: ['C2PA Provenance', 'Adversarial Realism'],
  },
  {
    id: 'case-05-natural-legal-note',
    category: 'Escrita Autoral & Fundamentos',
    title: 'Nota técnica humana sobre revisão de decisões automatizadas e custódia digital',
    type: 'document',
    expectedIsFake: false,
    expectedLabel: 'NATURAL (Autoria Humana Fundamentada)',
    imagePath: null,
    assetKey: 'src/data/cases.js',
    content: [
      'A simples inserção de um modelo generativo no fluxo decisório não transfere responsabilidade jurídica para o algoritmo.',
      'No Brasil, quando o tratamento impacta interesses do titular unicamente por via automatizada, incide o direito à revisão previsto no art. 20 da Lei 13.709/2018 (LGPD). Em litígios envolvendo fraudes por mídia sintética, a validade da prova depende ainda da integridade da coleta — cálculo de hash e registro de origem conforme os arts. 158-A a 158-F do CPP — porque impressões de tela isoladas podem ser forjadas em segundos.',
      'Logo? Sem engenharia de controle e trilha auditável, a tecnologia acelera o passivo em vez de reduzi-lo.',
    ].join(' '),
    promptUsed: 'Redação autoral humana (sem geração automática por LLM).',
    verdictSummary:
      'NÃO é Fake Natty — texto Natural autoral com variação rítmica e fundamentação verificável.',
    howDetected: [
      'Alta variação no tamanho das sentenças (burstiness: uma frase curta de 22 palavras, um período analítico longo de 69 palavras e um fechamento curto com pergunta retórica).',
      'Citações normativas exatas e verificáveis (Lei 13.709/2018 art. 20; CPP arts. 158-A a 158-F) sem generalidades vazias.',
      'Ausência de fórmulas de encerramento mecânicas ("em resumo", "diante do exposto").',
    ],
    whyItMatters:
      'Mostra que detectar "Natural vs. Fake" também exige não acusar falsamente um texto humano bem escrito — todo detector probabilístico tem taxa de falso positivo.',
    howToProtect: [
      'Nunca punir ou desclassificar autor com base exclusiva em "detector de IA" comercial.',
      'Exigir verificação substantiva: as normas, dados e citações existem de fato na fonte primária?',
    ],
    legalRefs: ['LGPD Art. 20', 'CPP Arts. 158-A a 158-F'],
    cyberRefs: ['False Positive Awareness', 'Source Verification'],
  },
  {
    id: 'case-06-vulnerable-ai-integration',
    category: 'Segurança de Apps com IA (Código)',
    title: 'Trecho de API hospitalar concatenando entrada bruta e CPF direto no prompt',
    type: 'code',
    expectedIsFake: true,
    expectedLabel: 'ARMADILHA CRÍTICA (Vulnerável a Prompt Injection + Vazamento LGPD)',
    imagePath: null,
    assetKey: 'src/engine/securityEngine.js',
    content: [
      '// CÓDIGO VULNERÁVEL (NÃO USAR EM PRODUÇÃO):',
      'const prompt = `Você é o assistente médico. Paciente: ${req.body.nome}, CPF: ${req.body.cpf}. Responda: ${req.body.mensagem}`;',
      'const resposta = await llmExterno.generate(prompt);',
      'db.execRaw(resposta.sqlSugerido); // RCE / SQL destrutivo sem validação!',
    ].join('\n'),
    promptUsed:
      'Padrão real encontrado em protótipos gerados por "vibe coding" sem revisão de AppSec ou LGPD.',
    verdictSummary:
      'SIM — Armadilha clássica de código gerado por IA sem auditoria ("Fake Natty de Engenharia").',
    howDetected: [
      'Concatenação direta de entrada não confiável (${req.body.mensagem}) no mesmo canal de instruções do sistema (OWASP LLM01).',
      'Envio de CPF e dados de paciente em texto claro para API externa sem mascaramento nem base legal (OWASP LLM02 / LGPD Art. 11).',
      'Execução direta de saída não confiável do LLM em banco de dados (OWASP LLM06 / ASI05).',
    ],
    whyItMatters:
      'Gerar apps inteiros copiando código da IA sem fundamentos de segurança abre portas imediatas para exfiltração de prontuários e destruição de dados.',
    howToProtect: [
      'Isolar entrada de usuário com delimitador Nonce dinâmico e sanitização Unicode (use a aba Lab Cibersegurança para gerar o modelo blindado).',
      'Aplicar DLP/anonimização (tokenizar CPF/nome) antes de sair da rede interna.',
      'Substituir execução dinâmica por queries parametrizadas com permissão mínima e confirmação determinística.',
    ],
    legalRefs: ['LGPD Art. 11 e Art. 46', 'PL 2338/2023 (Governança Técnica)'],
    cyberRefs: ['OWASP LLM01', 'OWASP LLM02', 'OWASP LLM06 / ASI05'],
  },
];
