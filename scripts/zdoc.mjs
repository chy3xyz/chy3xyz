#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { chmodSync, copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const VERSION = '0.17.0';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = join(root, 'site');
const outDir = join(root, 'dist');
const cacheDir = join(root, '.cache', 'zdoc');
const dev = process.argv.includes('--dev');
const portArg = process.argv.find((arg) => arg.startsWith('--port='));
const port = portArg ? portArg.split('=')[1] : undefined;

function assetName() {
  const { platform, arch } = process;
  if (platform === 'darwin') return arch === 'arm64' ? 'aarch64-macos.zip' : 'x86_64-macos.zip';
  if (platform === 'linux') return arch === 'arm64' ? 'aarch64-linux-musl.tar.xz' : 'x86_64-linux-musl.tar.xz';
  if (platform === 'win32') return arch === 'arm64' ? 'aarch64-windows.zip' : 'x86_64-windows.zip';
  throw new Error('Unsupported platform: ' + platform + ' ' + arch);
}

function archiveType(name) {
  if (name.endsWith('.zip')) return 'zip';
  if (name.endsWith('.tar.xz')) return 'tar';
  throw new Error('Unsupported archive: ' + name);
}

function extract(archive, kind, destination) {
  const commands =
    kind === 'zip'
      ? [
          ['unzip', ['-o', archive, '-d', destination]],
          ['tar', ['-xf', archive, '-C', destination]],
        ]
      : [['tar', ['-xJf', archive, '-C', destination]]];

  for (const [command, args] of commands) {
    const result = spawnSync(command, args, { stdio: 'inherit' });
    if (result.status === 0) return;
  }
  throw new Error('Could not extract ' + archive + '. Install unzip or tar and try again.');
}

async function download() {
  const name = assetName();
  const url = 'https://github.com/chy3xyz/zdoc/releases/download/v' + VERSION + '/' + name;
  const archive = join(cacheDir, name);
  mkdirSync(cacheDir, { recursive: true });
  console.log('Downloading zdoc v' + VERSION + ' (' + name + ')…');
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error('Download failed: ' + response.status + ' ' + url);
  writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
  const binDir = join(cacheDir, 'bin');
  rmSync(binDir, { recursive: true, force: true });
  mkdirSync(binDir, { recursive: true });
  extract(archive, archiveType(name), binDir);

  const candidates = [join(binDir, 'zdoc'), join(binDir, 'zdoc.exe')];
  const source = candidates.find((candidate) => existsSync(candidate));
  if (!source) throw new Error('The archive did not contain a zdoc binary.');
  const target = join(cacheDir, process.platform === 'win32' ? 'zdoc.exe' : 'zdoc');
  copyFileSync(source, target);
  if (process.platform !== 'win32') chmodSync(target, 0o755);
  rmSync(archive, { force: true });
  console.log('zdoc installed at ' + relative(root, target));
  return target;
}

function binaryVersion(binary) {
  if (!existsSync(binary)) return null;
  const result = spawnSync(binary, ['version'], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  const output = (result.stdout || '') + (result.stderr || '');
  const match = output.match(/zdoc\s+(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

function usable(binary) {
  return binaryVersion(binary) === VERSION;
}

function findBinary() {
  if (process.env.ZDOC_BIN) {
    if (!usable(process.env.ZDOC_BIN)) {
      console.error(
        'ZDOC_BIN must point to zdoc ' + VERSION + ' (found ' + (binaryVersion(process.env.ZDOC_BIN) || 'unknown') + '): ' + process.env.ZDOC_BIN
      );
      process.exit(1);
    }
    return process.env.ZDOC_BIN;
  }
  const cached = join(cacheDir, process.platform === 'win32' ? 'zdoc.exe' : 'zdoc');
  if (usable(cached)) return cached;
  const pathLookup = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['zdoc'], { encoding: 'utf8' });
  if (pathLookup.status === 0 && pathLookup.stdout.trim()) {
    const candidate = pathLookup.stdout.trim().split(/\r?\n/)[0];
    if (usable(candidate)) return candidate;
  }
  return null;
}

let binary = findBinary();
if (!binary) binary = await download();

if (!usable(binary)) {
  console.error('The zdoc binary at ' + binary + ' is not zdoc ' + VERSION + '.');
  process.exit(1);
}

if (!existsSync(join(siteDir, 'zine.ziggy'))) {
  console.error('Could not find site/zine.ziggy. Run this script from the repository.');
  process.exit(1);
}

if (dev) {
  const args = [];
  if (port) args.push('--port', port);
  const result = spawnSync(binary, args, { cwd: siteDir, stdio: 'inherit' });
  process.exit(result.status ?? 0);
}

rmSync(outDir, { recursive: true, force: true });
const result = spawnSync(binary, ['site', 'site', '--output', outDir, '--force'], {
  cwd: root,
  stdio: 'inherit',
});

if (result.status !== 0) {
  console.error('zdoc build failed.');
  process.exit(result.status ?? 1);
}

console.log('Built ' + relative(root, outDir) + '/');
