/**
 * Matriz de Superfície de Ataque em Sistemas com IA (Empresas, Hospitais e Sociedade).
 * Relaciona a porta/superfície aberta, o mecanismo de ataque, a defesa Blue Team,
 * a referência OWASP LLM/Agentic e o passivo jurídico associado.
 */

export const ATTACK_SURFACE_MATRIX = [
  {
    id: 'surf-01',
    sector: 'hospital',
    portOrSurface: 'Gateway / API LLM Interna sem Autenticação mTLS ou Rate Limit',
    attackMechanism:
      'Atacante na rede ou via endpoint exposto enumera a API de inferência, extrai contexto armazenado em cache ou provoca negação de serviço (Denial of Wallet).',
    blueTeamDefense:
      'Zero Trust na borda, mTLS/OAuth2 por serviço, limitação de taxa por token e isolamento de VLAN clínica.',
    owaspId: 'OWASP LLM10 / API2:2023',
    legalImpact: 'LGPD Art. 46 (dever de segurança) e Art. 48 (incidente com dados de saúde).',
  },
  {
    id: 'surf-02',
    sector: 'hospital',
    portOrSurface: 'Shadow AI (Colagem manual de prontuários em chats públicos)',
    attackMechanism:
      'Equipes sem ferramenta homologada colam CPF, CID e evolução clínica em serviços externos cujos logs podem reter ou treinar novos modelos.',
    blueTeamDefense:
      'Proxy DLP corporativo interceptando CPF/prontuário no navegador + oferta de modelo local ou homologado com retenção zero.',
    owaspId: 'OWASP LLM02 (Sensitive Info Disclosure)',
    legalImpact: 'LGPD Art. 11 (violação de dados sensíveis) e responsabilidade civil hospitalar.',
  },
  {
    id: 'surf-03',
    sector: 'hospital',
    portOrSurface: 'Banco Vetorial (RAG) Único sem Controle de Acesso (RBAC)',
    attackMechanism:
      'Prompt Injection pede ao assistente para resumir "todos os laudos semelhantes" e o RAG recupera trechos de outros pacientes por falta de filtro por tenant/perfil.',
    blueTeamDefense:
      'Filtragem obrigatória de metadados por perfil/paciente ANTES da busca vetorial e segregação de índices.',
    owaspId: 'OWASP LLM01 + ASI06 (Memory/RAG Poisoning)',
    legalImpact: 'Quebra de sigilo médico e incidente notificável à ANPD (LGPD Art. 48).',
  },
  {
    id: 'surf-04',
    sector: 'enterprise',
    portOrSurface: 'Prompt Injection Indireto via Upload de PDF, Currículo ou E-mail',
    attackMechanism:
      'Candidato ou atacante embute texto oculto (fonte branca ou Unicode zero-width) ordenando à IA de triagem aprovar o perfil ou exfiltrar prompt interno.',
    blueTeamDefense:
      'Sanitização Unicode, extração de texto puro em sandbox, delimitação por Nonce aleatório e verificação de saída com Canary Token.',
    owaspId: 'OWASP LLM01 / ASI01 (Goal Hijack)',
    legalImpact: 'LGPD Art. 20 (decisão automatizada viciada) e falha de governança (PL 2338/2023).',
  },
  {
    id: 'surf-05',
    sector: 'enterprise',
    portOrSurface: 'Agentes com Acesso Direto a Shell, SQL ou APIs de Escrita',
    attackMechanism:
      'Entrada manipulada induz o agente a gerar e executar comandos destrutivos (DROP TABLE, remoção de arquivos ou transferência não autorizada).',
    blueTeamDefense:
      'Menor privilégio absoluto, Denylist/Bloom Filter antes do parser, execução somente via funções estritamente tipadas e aprovação humana em mutações.',
    owaspId: 'OWASP LLM06 / ASI02 / ASI05',
    legalImpact: 'Indisponibilidade operacional e perda de integridade de registros (LGPD Art. 46).',
  },
  {
    id: 'surf-06',
    sector: 'enterprise',
    portOrSurface: 'Dependências e Plugins/MCP de Terceiros sem Assinatura',
    attackMechanism:
      'Conector ou pacote comprometido na cadeia de suprimentos (Supply Chain) injeta instruções ocultas no contexto do agente corporativo.',
    blueTeamDefense:
      'Fixação de versões por hash SHA-256, revisão estática de conectores e princípio de isolamento de rede egressiva.',
    owaspId: 'OWASP LLM03 / ASI04 (Agentic Supply Chain)',
    legalImpact: 'Responsabilidade solidária na cadeia de tratamento de dados (LGPD Art. 42).',
  },
  {
    id: 'surf-07',
    sector: 'social',
    portOrSurface: 'Telefonia e Áudios de WhatsApp (Clonagem de Voz / Vishing)',
    attackMechanism:
      'Golpistas capturam poucos segundos de voz pública e simulam chamadas de falso sequestro ou autorização financeira urgente.',
    blueTeamDefense:
      'Bloqueio de autorização financeira apenas por voz, callback em número confiável pré-cadastrado e palavra-chave offline.',
    owaspId: 'Identity Spoofing / Deepfake Fraud',
    legalImpact: 'Estelionato / fraude eletrônica (CP Art. 171 §2º-A) e exigência de rotulagem (EU AI Act Art. 50).',
  },
  {
    id: 'surf-08',
    sector: 'social',
    portOrSurface: 'Ausência de Registro de Logs Criptográficos (Cadeia de Custódia Quebrada)',
    attackMechanism:
      'Diante de alucinação prejudicial ou ataque, empresa não consegue provar qual prompt, modelo, versão ou resposta originou o dano.',
    blueTeamDefense:
      'Logs auditáveis com hash SHA-256 de requisição/resposta, carimbo temporal e política de retenção compatível com perícia.',
    owaspId: 'OWASP LLM09 + Forensics Readiness',
    legalImpact: 'Inviabilização de defesa técnica e violação aos critérios dos arts. 158-A a 158-F do CPP.',
  },
];
