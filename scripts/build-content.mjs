import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const output = path.join(contentDir, '_generated', 'content-manifest.js');
const allowedRelationTypes = new Set(['related','extends','derived-from','applies-to','references','contrasts','continues','precedes','implemented-by','see-also','inspires','becomes-practice','produces-work','verified-by','observed-through']);
const listFields = new Set(['ingredients','tools','steps','benefits','cautions','meta','harvestMeta','tags','related','references']);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function scalar(value='') {
  const v = value.trim();
  if (!v) return '';
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1,-1);
  if (v.startsWith('[') && v.endsWith(']')) return v.slice(1,-1).split(',').map(x=>scalar(x));
  return v;
}

function parseFrontmatter(source, file) {
  if (!source.startsWith('---')) throw new Error(`Frontmatter tidak ditemukan: ${file}`);
  const end = source.indexOf('\n---', 3);
  if (end < 0) throw new Error(`Frontmatter tidak ditutup: ${file}`);
  const lines = source.slice(4, end).replace(/\r/g,'').split('\n');
  const data = {}; let section = null; let relation = null;
  for (const raw of lines) {
    if (!raw.trim() || raw.trimStart().startsWith('#')) continue;
    const indent = raw.match(/^\s*/)[0].length;
    const line = raw.trim();
    if (indent === 0) {
      relation = null;
      const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/); if (!m) continue;
      const [, key, value] = m;
      if (!value) { data[key] = (key === 'relations' || listFields.has(key)) ? [] : {}; section = key; }
      else { data[key] = scalar(value); section = null; }
      continue;
    }
    if (section === 'tags') {
      const group = line.match(/^(primary|secondary):\s*$/);
      if (group) { if(Array.isArray(data.tags)) data.tags={primary:[],secondary:[]}; data.tags[group[1]] = []; relation = group[1]; continue; }
      const item = line.match(/^[-]\s+(.+)$/);
      if (item) {
        if(relation && !Array.isArray(data.tags)) data.tags[relation].push(scalar(item[1]));
        else if(Array.isArray(data.tags)) data.tags.push(scalar(item[1]));
      }
      continue;
    }
    if (section === 'relations') {
      const start = line.match(/^[-]\s+id:\s*(.+)$/);
      if (start) { relation = {id: scalar(start[1]), type:'related'}; data.relations.push(relation); continue; }
      const prop = line.match(/^(id|type|label):\s*(.+)$/);
      if (prop && relation) relation[prop[1]] = scalar(prop[2]);
      continue;
    }
    if (Array.isArray(data[section])) {
      const item = line.match(/^[-]\s+(.+)$/); if (item) data[section].push(scalar(item[1]));
    } else if (section && typeof data[section] === 'object') {
      const prop = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/); if (prop) data[section][prop[1]] = scalar(prop[2]);
    }
  }
  return {data, body: source.slice(end + 4).trim()};
}

function inline(text) { return esc(text).replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" loading="lazy">').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>'); }
function markdown(md) {
  const lines=md.replace(/\r/g,'').split('\n'); const out=[]; let para=[]; let list=null;
  const fp=()=>{if(para.length){out.push(`<p>${inline(para.join(' '))}</p>`);para=[];}}; const fl=()=>{if(list){out.push(`</${list}>`);list=null;}};
  for(const line of lines){
    if(line.trim().startsWith('<')){fp();fl();out.push(line);continue;} if(!line.trim()){fp();fl();continue;}
    const h=line.match(/^(#{1,4})\s+(.+)$/); if(h){fp();fl();const n=h[1].length+1;out.push(`<h${n}>${inline(h[2])}</h${n}>`);continue;}
    const li=line.match(/^[-*]\s+(.+)$/); if(li){fp();if(list!=='ul'){fl();out.push('<ul>');list='ul';}out.push(`<li>${inline(li[1])}</li>`);continue;}
    const ol=line.match(/^\d+\.\s+(.+)$/); if(ol){fp();if(list!=='ol'){fl();out.push('<ol>');list='ol';}out.push(`<li>${inline(ol[1])}</li>`);continue;}
    const q=line.match(/^>\s?(.+)$/); if(q){fp();fl();out.push(`<blockquote>${inline(q[1])}</blockquote>`);continue;} para.push(line.trim());
  } fp();fl();return out.join('\n');
}

function walk(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    if(e.name.startsWith('_')||e.name==='content.js') return []; const p=path.join(dir,e.name);
    return e.isDirectory()?walk(p):(e.name.endsWith('.md')?[p]:[]);
  });
}

const ids = new Set();
const items = walk(contentDir).map(file=>{
  const {data,body}=parseFrontmatter(fs.readFileSync(file,'utf8'),file);
  const rel=path.relative(contentDir,file).split(path.sep); const section=data.section||data.room||rel[0]; const filename=path.basename(file,'.md');
  const slug=data.slug || (filename==='index'?path.basename(path.dirname(file)):filename);
  data.id=data.id||slug; data.status=data.status||'published'; data.summary=data.summary||data.deck||''; data.author=data.author||'Anonim';
  for(const key of ['id','title','date','type','status']) if(!data[key]) throw new Error(`${key} wajib di ${file}`);
  if(ids.has(data.id)) throw new Error(`ID ganda: ${data.id}`); ids.add(data.id);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) throw new Error(`Tanggal harus YYYY-MM-DD di ${file}`);
  const tags = data.tags && !Array.isArray(data.tags) ? data.tags : {primary:Array.isArray(data.tags)?data.tags:[],secondary:[]};
  const simpleRelated=Array.isArray(data.related)?data.related.filter(Boolean).map(id=>({id,type:'related'})):[];
  data.relations=[...(data.relations||[]),...simpleRelated.filter(r=>!(data.relations||[]).some(x=>x.id===r.id))];
  if((tags.primary||[]).length>8) throw new Error(`Tag maksimal 8 di ${file}`);
  for(const r of (data.relations||[])) if(!allowedRelationTypes.has(r.type)) throw new Error(`Relasi tidak valid '${r.type}' di ${file}`);
  return {id:data.id,slug,route:data.route||`konten/${slug}`,section,title:data.title,summary:data.summary,deck:data.deck||data.summary,author:data.author,date:data.date,
    tags:{primary:tags.primary||[],secondary:tags.secondary||[]},allTags:[...(tags.primary||[]),...(tags.secondary||[])],relations:data.relations||[],type:data.type,status:data.status,
    featured:Boolean(data.featured),language:data.language||'id',youtube:data.youtube||'',hero:data.hero||'',cover:data.cover||data.hero||'',label:data.label||data.type,subtitle:data.subtitle||'',thumbnail:data.thumbnail||data.cover||data.hero||'',download:data.download||'',
    harvestType:data.harvestType||data.contentType||'',harvestTarget:data.harvestTarget||data.target||'',harvestAction:data.harvestAction||'',harvestLabel:data.harvestLabel||'',
    meta:Array.isArray(data.meta)?data.meta:[],harvestSummary:data.harvestSummary||data.summary,harvestMeta:Array.isArray(data.harvestMeta)?data.harvestMeta:[],
    ingredients:Array.isArray(data.ingredients)?data.ingredients:[],tools:Array.isArray(data.tools)?data.tools:[],steps:Array.isArray(data.steps)?data.steps:[],
    duration:data.duration||'',benefits:Array.isArray(data.benefits)?data.benefits:[],cautions:Array.isArray(data.cautions)?data.cautions:[],
    body:markdown(body),plainText:body.replace(/<[^>]+>/g,' ').replace(/[#*_>`\[\]()]/g,' ').replace(/\s+/g,' ').trim()};
}).sort((a,b)=>(b.date||'').localeCompare(a.date||''));

for(const item of items) for(const r of item.relations) if(!ids.has(r.id)) console.warn(`Peringatan: relasi ${item.id} -> ${r.id} belum memiliki node tujuan.`);
const manifest={version:'0.9-batch-3',generatedAt:new Date().toISOString(),relationTypes:[...allowedRelationTypes],items};
fs.mkdirSync(path.dirname(output),{recursive:true}); fs.writeFileSync(output,`window.BW_CONTENT_V08 = ${JSON.stringify(manifest,null,2)};\n`);
console.log(`Generated ${items.length} knowledge nodes -> ${path.relative(root,output)}`);
