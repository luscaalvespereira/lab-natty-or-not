#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VeritasNatty — Terminal Forensic CLI & Data Science Engine.
Módulo CLI multiplataforma para auditoria forense local, integridade SHA-256 e detecção de ataques em IA Generativa.
Autor: Lucas Alves Pereira
Licença: MIT
"""

import sys
import os
import math
import hashlib
import json
import re
from collections import Counter

def calculate_shannon_entropy(text: str) -> float:
    """Calcula a entropia da teoria da informação de Claude Shannon (bits por símbolo)."""
    if not text:
        return 0.0
    length = len(text)
    counts = Counter(text)
    return -sum((c / length) * math.log2(c / length) for c in counts.values())

def calculate_sha256(filepath: str) -> str:
    """Gera hash SHA-256 criptográfico para verificação de cadeia de custódia (CPP Art. 158-A)."""
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def scan_prompt_injection(payload: str) -> dict:
    """Varre payload contra vetores OWASP LLM01 e injeções heurísticas."""
    signatures = [
        (r"ignore\s+(all\s+)?(previous|prior)\s+instructions", "OWASP LLM01: System Prompt Override"),
        (r"you\s+are\s+now\s+(unrestricted|dan|jailbreak)", "OWASP LLM01: Persona Switch / Jailbreak"),
        (r"reveal\s+(system\s+prompt|credentials|api\s*key)", "OWASP LLM06: Sensitive Information Disclosure"),
        (r"(rm\s+-rf|drop\s+table|exec\s*\()", "OWASP LLM02: Destructive Execution Vector")
    ]
    detected = []
    for pattern, label in signatures:
        if re.search(pattern, payload, re.IGNORECASE):
            detected.append(label)
    return {
        "is_safe": len(detected) == 0,
        "matches": detected,
        "risk_level": "HIGH" if detected else "LOW"
    }

def verify_manifest(manifest_path: str) -> dict:
    """Audita a integridade de todos os ativos do manifesto criptográfico de proveniência."""
    if not os.path.exists(manifest_path):
        return {"error": f"Manifesto não encontrado em {manifest_path}"}
    
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    results = []
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for item in manifest.get("files", []):
        full_path = os.path.join(base_dir, item["path"].replace("/", os.sep))
        if os.path.exists(full_path):
            computed = calculate_sha256(full_path)
            matches = computed.lower() == item["sha256"].lower()
            results.append({"path": item["path"], "status": "VERIFIED" if matches else "CORRUPTED"})
        else:
            results.append({"path": item["path"], "status": "MISSING"})
    return {"total": len(results), "items": results}

def main():
    print("=" * 65)
    print("VeritasNatty — Terminal Forensic CLI & Data Science Suite")
    print("Autor: Lucas Alves Pereira | Licença MIT")
    print("=" * 65)

    if len(sys.argv) < 2:
        print("\nUso do utilitário:")
        print("  python forensic_cli.py --verify-manifest")
        print("  python forensic_cli.py --audit-text \"Seu texto para análise...\"")
        print("  python forensic_cli.py --hash <caminho_do_arquivo>")
        return

    cmd = sys.argv[1]
    if cmd == "--verify-manifest":
        manifest_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "provenance-manifest.json")
        res = verify_manifest(manifest_file)
        print(json.dumps(res, indent=2, ensure_ascii=False))
    elif cmd == "--audit-text" and len(sys.argv) > 2:
        text = sys.argv[2]
        entropy = calculate_shannon_entropy(text)
        injection = scan_prompt_injection(text)
        print(json.dumps({
            "length_chars": len(text),
            "shannon_entropy_bits": round(entropy, 4),
            "injection_audit": injection
        }, indent=2, ensure_ascii=False))
    elif cmd == "--hash" and len(sys.argv) > 2:
        path = sys.argv[2]
        if os.path.exists(path):
            print(f"Arquivo: {path}")
            print(f"SHA-256: {calculate_sha256(path)}")
        else:
            print(f"Erro: Arquivo '{path}' não encontrado.")

if __name__ == "__main__":
    main()
