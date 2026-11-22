#!/usr/bin/env bash
# VeritasNatty — Script de Automação CI e Verificação de Integridade Local
# Autor: Lucas Alves Pereira

set -euo pipefail

echo "=========================================================="
echo " VeritasNatty — Verificador de Integridade & Ambiente CI "
echo "=========================================================="

echo "[1/3] Verificando versão do Node.js..."
node --version

echo "[2/3] Executando suíte de testes unitários automatizados..."
node --test tests/engine.test.mjs

echo "[3/3] Validando integridade SHA-256 do manifesto..."
node scripts/generate-manifest.mjs --verify

echo "==> [OK] Todos os módulos forenses e de segurança validados com sucesso!"
