/**
 * Genera el video de bienvenida Karol Kitty y el código QR que abre ese video.
 * Uso: node scripts/generate-welcome-assets.mjs
 *      BASE_URL=https://tudominio.com node scripts/generate-welcome-assets.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import ffmpegPath from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const videoDir = path.join(publicDir, 'videos');
const qrDir = path.join(publicDir, 'qr');

const baseUrl = (process.env.BASE_URL || 'https://karolkitty.com').replace(/\/$/, '');
const videoDeepLink = `${baseUrl}/?video=play`;

const captions = [
  { start: 0, end: 3, line1: '¡Hola, Kitty Amiga!', line2: 'Bienvenida a Karol Kitty' },
  { start: 3, end: 7, line1: 'Peluches, bolsos y papelería', line2: 'con estilo kawaii único' },
  { start: 7, end: 11, line1: 'Cada artículo elegido', line2: 'con amor para alegrar tu día' },
  { start: 11, end: 14, line1: 'Únete al Kitty Club', line2: 'y vive la magia con nosotros' },
  { start: 14, end: 16, line1: '¡Gracias por visitarnos!', line2: 'Karol Kitty te espera' },
];

function assTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}

function buildAssSubtitles() {
  const events = captions
    .map(
      (c) =>
        `Dialogue: 0,${assTime(c.start)},${assTime(c.end)},Default,,0,0,0,,{\\an8}${c.line1}\\N${c.line2}`
    )
    .join('\n');

  return `[Script Info]
Title: Karol Kitty Bienvenida
ScriptType: v4.00+
PlayResX: 1280
PlayResY: 720
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,52,&H005E5578,&H000000FF,&H00FFFFFF,&H64000000,-1,0,0,0,100,100,0,0,1,3,1,8,80,80,120,1
Style: Brand,Arial,36,&H005E5578,&H000000FF,&H00FFFFFF,&H32000000,0,0,0,0,100,100,0,0,1,2,0,8,80,80,200,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:16.00,Brand,,0,0,0,,{\\an8}Karol Kitty\\N{\\fs28}Tu rincón más cute del mundo
${events}
`;
}

function runFfmpeg(args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: 'inherit', ...options });
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg salió con código ${code}`));
    });
  });
}

async function generateVideo() {
  const assPath = path.join(videoDir, 'bienvenida.ass');
  const assContent = buildAssSubtitles();
  await writeFile(assPath, assContent, 'utf8');

  const outputPath = path.join(videoDir, 'karol-kitty-bienvenida.mp4');

  await runFfmpeg([
    '-y',
    '-f',
    'lavfi',
    '-i',
    'color=c=0xFFF8F8:s=1280x720:d=16',
    '-vf',
    'drawbox=x=0:y=0:w=iw:h=18:color=0x78555e:t=fill,drawbox=x=0:y=ih-18:w=iw:h=18:color=0xFFD1DC:t=fill,ass=bienvenida.ass',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-t',
    '16',
    'karol-kitty-bienvenida.mp4',
  ], { cwd: videoDir });

  console.log(`Video generado: ${outputPath}`);
}

async function generateQr() {
  const qrPath = path.join(qrDir, 'karol-kitty-video-bienvenida.png');
  await QRCode.toFile(qrPath, videoDeepLink, {
    type: 'png',
    width: 400,
    margin: 2,
    color: {
      dark: '#78555e',
      light: '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
  console.log(`QR generado: ${qrPath}`);
  console.log(`Enlace del QR: ${videoDeepLink}`);
}

async function main() {
  if (!ffmpegPath) {
    throw new Error('ffmpeg-static no encontró un binario para esta plataforma.');
  }

  await mkdir(videoDir, { recursive: true });
  await mkdir(qrDir, { recursive: true });

  await generateQr();
  await generateVideo();

  const manifest = {
    videoPath: '/videos/karol-kitty-bienvenida.mp4',
    qrPath: '/qr/karol-kitty-video-bienvenida.png',
    deepLink: videoDeepLink,
    generatedAt: new Date().toISOString(),
  };
  await writeFile(
    path.join(publicDir, 'welcome-assets.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log('Listo: video y QR de bienvenida Karol Kitty.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
