# Nota Técnica: Lacunas entre Direito, Cibersegurança e Ciência de Dados na Era das IAs Generativas

## 1. Premissa Fundamental
Modelos generativos funcionam por previsão estatística de sequências, não por compreensão semântica ou vínculo com a verdade factual. Confiar em saídas não auditadas — ou conectar LLMs diretamente a bases corporativas e hospitalares — cria um ponto cego simultâneo de **segurança da informação**, **qualidade estatística** e **responsabilidade jurídica**.

---

## 2. Cinco Lacunas Reais Mapeadas no Projeto

### Lacuna 1 — *Shadow AI* e Dados Sensíveis de Saúde (LGPD Art. 11)
- **Problema:** profissionais colam evolução clínica, exames ou CPFs em interfaces públicas de IA sem homologação, anulando controles perimetrais de rede.
- **Ponte Técnica + Jurídica:** a norma exige tutela reforçada (LGPD Arts. 11 e 46), mas sem gateway DLP e bloqueio no ponto de entrada o vazamento ocorre antes de qualquer revisão jurídica.

### Lacuna 2 — Alucinações Convincentes e Cadeia de Responsabilidade (PL 2338/2023)
- **Problema:** LLMs fabricam dosagens, normas e jurisprudências com sintaxe impecável.
- **Lacuna:** quando um produto incorpora API de terceiro, o controlador local responde perante o titular (LGPD Art. 42), mas raramente possui acesso aos pesos, dados de treino ou trilha de decisão do fornecedor caixa-preta.

### Lacuna 3 — Novas Portas de Ataque (*OWASP LLM & Agentic*)
- **Problema:** endpoints de inferência sem mTLS/rate-limit, bancos vetoriais (RAG) sem filtro de permissão por perfil e agentes com acesso a SQL/shell transformam entradas de texto comuns em vetores de exfiltração e execução remota (`OWASP LLM01`, `LLM02`, `LLM06`).
- **Contramedida implementada neste projeto:** Filtro de Bloom determinístico, sanitização Unicode, delimitador criptográfico com Nonce e Canary Token em `src/engine/securityEngine.js`.

### Lacuna 4 — Clonagem de Voz (*Vishing*) e Fraude Eletrônica (CP Art. 171 §2º-A / EU AI Act Art. 50)
- **Problema:** poucos segundos de áudio público permitem clonar vozes para golpes de falso sequestro e fraudes corporativas de aprovação de pagamentos.
- **Lacuna:** redes telefônicas e aplicativos de mensageria ainda carecem de autenticação criptográfica nativa em tempo real para áudio sintético; a defesa operacional exige validação em canal independente (*out-of-band*).

### Lacuna 5 — Cadeia de Custódia Digital e Limites de Detectores (CPP Arts. 158-A a 158-F)
- **Problema:** redes sociais removem metadados `EXIF` automaticamente, e detectores estatísticos de texto geram falsos positivos e falsos negativos.
- **Solução responsável:** jamais tratar detector estatístico como prova cabal isolada; combinar cálculo imediato de hash `SHA-256` na coleta (integridade do vestígio digital), inspeção de assinaturas `C2PA` e verificação externa dos fatos alegados.

---

## 3. Referências Normativas e Técnicas Utilizadas
- **Brasil:** Lei 13.709/2018 (LGPD); PL 2338/2023 (Marco Legal da IA); Código Penal (Art. 171 §2º-A); Código de Processo Penal (Arts. 158-A a 158-F).
- **União Europeia:** Regulamento (UE) 2024/1689 (EU AI Act — Art. 50 e Anexo III) e GDPR (Art. 22).
- **Segurança & Epistemologia:** OWASP Top 10 for LLM Applications; OWASP Agentic Security Risks (ASI01–ASI10); HackAPrompt (Schulhoff et al., EMNLP 2023); Alan Turing (1950); Claude Shannon (1948); John Searle (1980).
