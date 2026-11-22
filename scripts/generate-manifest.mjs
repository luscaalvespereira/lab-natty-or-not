import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'assets', 'provenance-manifest.json');

const RUNTIME_FILES = [
  { path: 'index.html', classification: 'NATTY', note: 'Interface principal escrita e estruturada manualmente' },
  { path: 'vercel.json', classification: 'NATTY', note: 'Configuração e Security Headers HTTP de produção' },
  { path: 'styles/main.css', classification: 'NATTY', note: 'Folha de estilos responsiva autoral' },
  { path: 'src/ui/i18n.js', classification: 'NATTY', note: 'Dicionário multilíngue PT/EN/ES' },
  { path: 'src/ui/app.js', classification: 'NATTY', note: 'Controlador DOM seguro (zero HTML bruto não sanitizado)' },
  { path: 'src/engine/textForensics.js', classification: 'NATTY', note: 'Motor estatístico (Shannon, Tukey IQR, TF-IDF/Cosseno)' },
  { path: 'src/engine/fileForensics.js', classification: 'NATTY', note: 'Inspetor SHA-256, Magic Bytes e metadados locais' },
  { path: 'src/engine/securityEngine.js', classification: 'NATTY', note: 'Filtro de Bloom, scanner OWASP/DLP e Nonce Hardening' },
  { path: 'src/engine/legalCompliance.js', classification: 'NATTY', note: 'Motor LGPD, PL 2338/2023, EU AI Act, Fairness e Pegada' },
  { path: 'src/engine/arenaEngine.js', classification: 'NATTY', note: 'Embaralhamento Fisher-Yates O(n) e avaliação Turing' },
  { path: 'src/data/cases.js', classification: 'NATTY', note: 'Curadoria e laudos forenses dos 6 casos (contém cenários sintéticos documentados)' },
  { path: 'src/data/attackSurface.js', classification: 'NATTY', note: 'Matriz de superfície de ataque em hospitais, empresas e sociedade' },
  { path: 'assets/veritasnatty-banner.gif', classification: 'NATTY', note: 'GIF89a animado gerado deterministicamente via algoritmo próprio em Node.js' },
  { path: 'assets/images/case-hospital-ai.png', classification: 'FAKE_NATTY', note: 'Imagem sintética gerada por IA Generativa (cenário estação hospitalar)' },
  { path: 'assets/images/case-social-eng-v1.png', classification: 'FAKE_NATTY', note: 'Imagem sintética gerada por IA Generativa (prompt ingênuo v1)' },
  { path: 'assets/images/case-social-eng-v2.png', classification: 'FAKE_NATTY', note: 'Imagem sintética gerada por IA Generativa (prompt dirigido v2)' },
];

function computeSha256(absPath) {
  const buf = fs.readFileSync(absPath);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  return { bytes: buf.length, sha256 };
}

function generateManifest() {
  const files = RUNTIME_FILES.map((item) => {
    const abs = path.join(ROOT, item.path);
    if (!fs.existsSync(abs)) {
      throw new Error(`Arquivo ausente para manifesto: ${item.path}`);
    }
    const { bytes, sha256 } = computeSha256(abs);
    return {
      path: item.path,
      classification: item.classification,
      bytes,
      sha256,
      note: item.note,
    };
  });

  const payload = {
    project: 'VeritasNatty — Audit & Shield',
    schemaVersion: '1.0.0',
    hashAlgorithm: 'SHA-256',
    generatedAtUtc: new Date().toISOString(),
    totalTrackedFiles: files.length,
    files,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`Manifest generated: ${MANIFEST_PATH} (${files.length} files hashed)`);
}

function verifyManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`Manifesto não encontrado em ${MANIFEST_PATH}`);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const entries = manifest.files || [];
  let mismatches = 0;

  for (const entry of entries) {
    const abs = path.join(ROOT, entry.path);
    if (!fs.existsSync(abs)) {
      console.error(`MISSING: ${entry.path}`);
      mismatches++;
      continue;
    }
    const current = computeSha256(abs);
    if (current.sha256 !== entry.sha256 || current.bytes !== entry.bytes) {
      console.error(`MISMATCH: ${entry.path} (expected ${entry.sha256}, got ${current.sha256})`);
      mismatches++;
    }
  }

  if (mismatches > 0) {
    console.error(`Verification failed with ${mismatches} error(s).`);
    process.exit(1);
  }
  console.log(`SHA-256 verification passed: ${entries.length}/${entries.length} files verified.`);
}

const isVerify = process.argv.includes('--verify');
if (isVerify) {
  verifyManifest();
} else {
  generateManifest();
}
