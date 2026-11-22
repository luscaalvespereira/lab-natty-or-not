# Registro Transparente de Engenharia de Prompts (v1 → v2 → v3)

Este documento registra os prompts usados para construir os ativos sintéticos do laboratório, os erros observados na saída bruta dos modelos e as correções humanas aplicadas.

---

## 1. Evolução Visual: Prompt Ingênuo (v1) vs. Prompt Dirigido (v2)

| Ativo | Versão do Prompt | Prompt Utilizado | Comportamento / Artefatos Observados |
| :--- | :--- | :--- | :--- |
| `assets/images/case-social-eng-v1.png` | **v1 (Ingênuo)** | *"Overly polished corporate tech executive portrait in a glowing glass office, hyper-smooth skin, symmetrical studio lighting, holding a tablet."* | Produziu o visual típico "Fake Natty": pele excessivamente lisa, simetria artificial e tensão anatômica sutil nas mãos/reflexos. |
| `assets/images/case-social-eng-v2.png` | **v2 (Dirigido)** | *"Candid documentary-style 35mm photograph of a fictional cybersecurity researcher checking an anonymous lanyard badge in a dimly lit conference corridor, natural film grain, asymmetrical shadows, authentic fabric wrinkles, shallow depth of field."* | Eliminou a estética plástica de estúdio e introduziu ruído fotográfico realista — provando que a inspeção visual pura perde eficácia e exige validação de proveniência (`SHA-256` / `C2PA`). |
| `assets/images/case-hospital-ai.png` | **Cenário Clínico** | *"Editorial photorealistic 16:9 shot of a modern hospital nursing workstation late at night, monitor displaying an abstract stylized AI triage interface with subtle garbled pseudo-text and unnatural chart symmetry, cool blue clinical lighting."* | Demonstra como telas médicas geradas por difusão exibem pseudo-texto ilegível quando inspecionadas de perto, ilustrando riscos de alucinação e confiança cega em dashboards. |

---

## 2. Evolução de Prompt de Sistema: Prompt Cru (v1) vs. Prompt Blindado (v3)

### Versão v1 (Vulnerável — encontrada em protótipos inseguros)
```text
Você é o assistente médico. Paciente: ${nome}, CPF: ${cpf}. Responda: ${mensagem}
```
- **Falhas identificadas:** mistura instruções do sistema com entrada do usuário (`OWASP LLM01`), envia CPF sem mascaramento para API externa (`LGPD Art. 11`, `OWASP LLM02`) e abre brecha para sequestro de contexto.

### Versão v3 (Blindada pelo motor `hardenPrompt` em `src/engine/securityEngine.js`)
1. **Sanitização Unicode:** remove caracteres invisíveis (`\u200B-\u200F`, `\u202A-\u202E`, `\uFEFF`).
2. **Triagem Bloom + Regex DLP/OWASP:** intercepta comandos destrutivos (`DROP TABLE`, `rm -rf`), tentativas de override e exposição de CPF/prontuário antes da chamada ao modelo.
3. **Delimitação Criptográfica com Nonce Dinâmico:** isola dados não confiáveis dentro de `<user_data_<nonce>>...</user_data_<nonce>>` com escapamento de delimitadores angulares.
4. **Token Canário de Saída:** inclui identificador secreto no bloco de sistema para detectar eventual vazamento de instruções na resposta (*egress DLP*).
