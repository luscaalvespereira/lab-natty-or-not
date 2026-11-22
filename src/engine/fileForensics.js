/**
 * Motor de Forense de Arquivos, Hash SHA-256 e Cadeia de Custódia Digital.
 * Inspeciona bytes localmente no navegador (Web Crypto API) sem upload externo.
 */

const GENERATOR_SIGNATURES = [
  { key: 'c2pa', label: 'Credencial C2PA / Content Credentials', kind: 'PROVENANCE' },
  { key: 'jumb', label: 'Container JUMBF (C2PA)', kind: 'PROVENANCE' },
  { key: 'trainedalgorithmicmedia', label: 'Tag DigitalSourceType: trainedAlgorithmicMedia', kind: 'AI_DECLARED' },
  { key: 'midjourney', label: 'Assinatura textual Midjourney', kind: 'AI_GENERATOR' },
  { key: 'dall-e', label: 'Assinatura textual DALL-E', kind: 'AI_GENERATOR' },
  { key: 'stable diffusion', label: 'Assinatura textual Stable Diffusion', kind: 'AI_GENERATOR' },
  { key: 'comfyui', label: 'Assinatura de grafo ComfyUI', kind: 'AI_GENERATOR' },
  { key: 'automatic1111', label: 'Assinatura AUTOMATIC1111', kind: 'AI_GENERATOR' },
  { key: 'adobe firefly', label: 'Assinatura Adobe Firefly', kind: 'AI_GENERATOR' },
  { key: 'imagen', label: 'Referência Google Imagen', kind: 'AI_GENERATOR' },
  { key: 'veritasnatty', label: 'Ativo marcado VeritasNatty', kind: 'PROVENANCE' },
];

const CAMERA_METADATA_SIGNATURES = [
  { key: 'exif', label: 'Bloco EXIF (Câmera / Dispositivo)', kind: 'CAMERA_META' },
  { key: 'http://ns.adobe.com/xap', label: 'Pacote XMP (Adobe/Edição)', kind: 'EDIT_META' },
  { key: 'icc_profile', label: 'Perfil de Cor ICC', kind: 'COLOR_META' },
  { key: 'iptc', label: 'Metadado editorial IPTC', kind: 'EDITORIAL_META' },
];

/**
 * Calcula digest SHA-256 em hexadecimal minúsculo usando Web Crypto API.
 * @param {Uint8Array} bytes
 * @returns {Promise<string>}
 */
export async function sha256Hex(bytes) {
  const input = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', input);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Detecta o formato real pelos magic bytes (não confia apenas na extensão do nome).
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export function detectMagicFormat(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.length === 0) return 'EMPTY';

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return 'PNG';
  }

  // JPEG: FF D8 FF
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'JPEG';
  }

  // GIF87a / GIF89a
  if (
    bytes.length >= 6 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38 &&
    (bytes[4] === 0x37 || bytes[4] === 0x39) &&
    bytes[5] === 0x61
  ) {
    return 'GIF';
  }

  // WEBP: RIFF....WEBP
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'WEBP';
  }

  // PDF: %PDF-
  if (
    bytes.length >= 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  ) {
    return 'PDF';
  }

  // Verifica se a amostra inicial é texto UTF-8/ASCII imprimível
  const sampleLen = Math.min(bytes.length, 512);
  let nonText = 0;
  for (let i = 0; i < sampleLen; i++) {
    const b = bytes[i];
    if (b === 0 || (b < 0x09) || (b > 0x0d && b < 0x20)) {
      nonText++;
    }
  }
  return nonText === 0 ? 'TEXT' : 'UNKNOWN_BINARY';
}

function bytesToLowerAsciiWindow(bytes) {
  const headLen = Math.min(bytes.length, 524288);
  const tailStart = bytes.length > 524288 ? Math.max(headLen, bytes.length - 65536) : bytes.length;

  let text = '';
  for (let i = 0; i < headLen; i++) {
    const c = bytes[i];
    text += c >= 32 && c <= 126 ? String.fromCharCode(c).toLowerCase() : ' ';
  }
  if (tailStart < bytes.length) {
    text += ' ';
    for (let i = tailStart; i < bytes.length; i++) {
      const c = bytes[i];
      text += c >= 32 && c <= 126 ? String.fromCharCode(c).toLowerCase() : ' ';
    }
  }
  return text;
}

/**
 * Varre cabeçalhos binários em busca de blocos EXIF, XMP, C2PA e assinaturas de geradores.
 * @param {Uint8Array} bytes
 */
export function scanMetadataMarkers(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.length === 0) return [];
  const hay = bytesToLowerAsciiWindow(bytes);
  const found = [];

  for (const sig of [...GENERATOR_SIGNATURES, ...CAMERA_METADATA_SIGNATURES]) {
    if (hay.includes(sig.key)) {
      found.push({ key: sig.key, label: sig.label, kind: sig.kind });
    }
  }
  return found;
}

/**
 * Executa auditoria forense local completa de um arquivo (Privacy by Design: zero envio externo).
 * @param {string} fileName
 * @param {Uint8Array} bytes
 */
export async function auditFileBytes(fileName, bytes) {
  const safeBytes = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const [sha256, detectedFormat] = await Promise.all([
    sha256Hex(safeBytes),
    Promise.resolve(detectMagicFormat(safeBytes)),
  ]);
  const markers = scanMetadataMarkers(safeBytes);

  const hasAiSig = markers.some((m) => m.kind === 'AI_GENERATOR' || m.kind === 'AI_DECLARED');
  const hasC2pa = markers.some((m) => m.kind === 'PROVENANCE');
  const hasCameraMeta = markers.some((m) => m.kind === 'CAMERA_META');

  const ext = (fileName.split('.').pop() || '').toUpperCase();
  const normalizedExt = ext === 'JPG' ? 'JPEG' : ext;
  const formatMismatch =
    normalizedExt &&
    detectedFormat !== 'UNKNOWN_BINARY' &&
    detectedFormat !== 'TEXT' &&
    normalizedExt !== detectedFormat;

  const how = [
    `Formato real por magic bytes: ${detectedFormat}${formatMismatch ? ` (atenção: extensão declarada .${ext} diverge!)` : ''}.`,
    `Impressão digital SHA-256 calculada localmente: ${sha256}.`,
    markers.length > 0
      ? `Marcadores encontrados no binário: ${markers.map((m) => m.label).join('; ')}.`
      : 'Nenhum bloco EXIF, XMP ou credencial C2PA legível localizado nos cabeçalhos do arquivo.',
  ];

  let verdict = 'SEM_METADADOS_CONCLUIR_COM_CAUTELA';
  let why =
    'A ausência de metadados EXIF/C2PA impede confirmar origem de câmera, mas NÃO prova geração por IA — aplicativos como WhatsApp, Instagram e ferramentas de compressão removem metadados por padrão.';

  if (hasAiSig) {
    verdict = 'SINAIS_SINTETICOS_DETECTADOS';
    why =
      'Foram encontradas assinaturas textuais ou declarações explícitas de mídia algorítmica nos metadados do arquivo.';
  } else if (hasC2pa) {
    verdict = 'CREDENCIAL_C2PA_DETECTADA';
    why =
      'O arquivo contém contêiner compatível com Content Credentials (C2PA); valide a cadeia de assinatura criptográfica em verificador oficial.';
  } else if (hasCameraMeta) {
    verdict = 'METADADOS_CAPTURA_PRESENTES';
    why =
      'O arquivo preserva metadados técnicos de dispositivo/edição (EXIF/XMP), que elevam rastreabilidade mas ainda podem ser manipulados sem assinatura criptográfica.';
  }

  return {
    fileName,
    sizeBytes: safeBytes.length,
    detectedFormat,
    formatMismatch,
    sha256,
    markers,
    verdict,
    how,
    why,
    custodyNote:
      'Cadeia de Custódia Digital (CPP, arts. 158-A a 158-F): o hash SHA-256 imutável garante que o vestígio analisado não foi alterado após a coleta, embora não ateste sozinho a autoria original sem metadado assinado.',
  };
}
