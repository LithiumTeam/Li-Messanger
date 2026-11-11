function bi(name, cls) {
  return '<i class="bi bi-' + name + (cls ? ' ' + cls : '') + '"></i>';
}
function esc(s) {
  const div = document.createElement('div');
  div.textContent = s == null ? '' : String(s);
  return div.innerHTML;
}
function fmtTime(iso) {
  if (!iso) return '';
  const d = new Date(iso.endsWith('Z') || iso.includes('+') ? iso : iso + 'Z');
  return d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
}
function fmtDay(iso) {
  if (!iso) return '';
  const d = new Date(iso.endsWith('Z') || iso.includes('+') ? iso : iso + 'Z');
  const now = new Date();
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  if (d.toDateString() === now.toDateString()) return 'امروز';
  if (d.toDateString() === yest.toDateString()) return 'دیروز';
  return d.toLocaleDateString('fa-IR');
}
function tickIcon(seen) {
  return bi(seen ? 'check2-all' : 'check');
}
function avatarHtml(name, avatar, online, size) {
  const cls = ('avatar' + (size ? ' ' + size : '')).trim();
  const initial = (name || '?').trim().charAt(0);
  const alt = esc(name || '').replace(/"/g, '&quot;');
  const url = esc(avatar || '').replace(/"/g, '&quot;');
  const dot = avatar ? '' : (online === undefined ? '' : '<i class="dot ' + (online ? 'on' : 'off') + '"></i>');
  const inner = avatar ? '<span class="av-init">' + esc(initial) + '</span><img src="' + url + '" alt="' + alt + '">' : esc(initial);
  return '<div class="' + cls + '">' + inner + dot + '</div>';
}
function avatarInner(name, avatar, online) {
  const initial = esc((name || '?').trim().charAt(0));
  const alt = esc(name || '').replace(/"/g, '&quot;');
  const url = esc(avatar || '').replace(/"/g, '&quot;');
  const dot = avatar ? '' : (online === undefined ? '' : '<i class="dot ' + (online ? 'on' : 'off') + '"></i>');
  return (avatar ? '<span class="av-init">' + initial + '</span><img src="' + url + '" alt="' + alt + '">' : initial) + dot;
}
function md(src) {
  if (src == null || src === '') return '';
  let s = esc(String(src));
  s = s.replace(/```([\s\S]*?)```/g, (m, code) => '<pre><code>' + code.replace(/^\n/, '') + '</code></pre>');
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/^(https?:\/\/\S+)$/gm, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\n/g, '<br>');
  return s;
}
function faNum(n) {
  return String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
}
function fmtSize(n) {
  if (!n && n !== 0) return '';
  const u = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return (i === 0 ? n : n.toFixed(1)) + ' ' + u[i];
}
function fileIcon(name) {
  const ext = (name || '').split('.').pop().toLowerCase();
  if (['zip', 'rar', '7z', 'tar', 'gz', 'tgz', 'bz2', 'xz'].includes(ext)) return 'file-earmark-zip';
  if (['pdf'].includes(ext)) return 'file-earmark-pdf';
  if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'file-earmark-word';
  if (['xls', 'xlsx', 'ods', 'csv'].includes(ext)) return 'file-earmark-excel';
  if (['ppt', 'pptx', 'odp'].includes(ext)) return 'file-earmark-ppt';
  if (['mp3', 'wav', 'ogg', 'oga', 'm4a', 'aac', 'flac', 'opus'].includes(ext)) return 'file-earmark-music';
  if (['mp4', 'mov', 'webm', 'mkv', 'avi', 'm4v', '3gp'].includes(ext)) return 'file-earmark-play';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'avif', 'heic'].includes(ext)) return 'file-earmark-image';
  if (['txt', 'md', 'log', 'json', 'xml', 'yml', 'yaml', 'ini', 'toml', 'cfg', 'conf'].includes(ext)) return 'file-earmark-text';
  const codeExt = ['py', 'pyw', 'js', 'mjs', 'cjs', 'ts', 'jsx', 'tsx', 'html', 'htm', 'css', 'scss', 'sass',
    'less', 'sh', 'bash', 'zsh', 'bat', 'ps1', 'c', 'cc', 'cpp', 'cxx', 'h', 'hpp', 'cs', 'java', 'kt', 'kts',
    'go', 'rs', 'rb', 'php', 'pl', 'lua', 'r', 'jl', 'swift', 'm', 'mm', 'dart', 'scala', 'sql', 'graphql',
    'proto', 'prisma', 'vue', 'svelte', 'astro', 'hs', 'erl', 'ex', 'exs', 'clj', 'lisp', 'asm', 'sol', 'tex',
    'ipynb', 'ino', 'qml', 'vala', 'hx', 'glsl', 'hlsl', 'wgsl', 'jsp', 'asp', 'aspx', 'ejs', 'hbs', 'pug',
    'jade', 'njk', 'liquid', 'twig', 'mustache', 'haml', 'slim', 'erb', 'v', 'd', 'nim', 'zig'];
  const codeNames = ['makefile', 'dockerfile', 'jenkinsfile', 'rakefile', 'gemfile', 'procfile', 'vagrantfile', 'cmakelists'];
  if (codeExt.includes(ext) || codeNames.includes((name || '').toLowerCase())) return 'file-earmark-code';
  return 'file-earmark';
}
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    ok ? resolve() : reject(new Error('copy failed'));
  });
}
function toast(type, title, message) {
  if (window.Eggy) {
    window.Eggy({ type: type || 'info', title: title || '', message: message || '' });
  }
}
let apiWarned = false;
function warnApiOnce() {
  if (apiWarned) return;
  apiWarned = true;
  toast('info', 'API چت', 'سرور چت هنوز آماده نیست؛ رابط کاربری تا وصل شدن بک‌اند آماده است');
}
async function api(path, opts) {
  opts = opts || {};
  let res;
  try {
    res = await fetch(API_BASE + path, Object.assign({ credentials: 'include' }, opts));
  } catch (e) {
    warnApiOnce();
    return { status: 0, data: null, network: true };
  }
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  if (res.status === 401) location.replace('/');
  else if (!res.ok && res.status !== 401) warnApiOnce();
  return { status: res.status, data };
}
async function apiPost(path, body) {
  return api(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}
function asList(data, key) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data[key])) return data[key];
  return [];
}
const CD = { chat: null, role: null, members: [], initialMessages: [] };
let currentChat = null;
let composerChatId = null;
let pendingFiles = [];
let _pfSeq = 0;
let lastMsgId = null;
let pollTimer = null;
let convTimer = null;
let convSeq = 0;
let sending = false;
function getMember(id) {
  if (CD.members && id !== undefined && id !== null) {
    const m = CD.members.find(x => x.id === id);
    if (m) return m;
  }
  return { display_name: 'کاربر', username: '', avatar: '', status: 'offline' };
}
function isPeer() {
  return CD.chat && CD.chat.chat_type === 'dm';
}
function peer() {
  return isPeer() && CD.chat.peer ? CD.chat.peer : null;
}
function setSideCollapsed(v) {
  const sideEl = document.querySelector('.sidebar');
  if (!sideEl) return;
  sideEl.classList.toggle('collapsed', v);
  const sideToggleBtn = document.getElementById('sideToggle');
  if (sideToggleBtn) sideToggleBtn.title = v ? 'باز کردن سایدبار' : 'جمع کردن سایدبار';
}
const sideToggleBtn = document.getElementById('sideToggle');
if (sideToggleBtn) {
  sideToggleBtn.onclick = e => {
    e.stopPropagation();
    setSideCollapsed(!document.querySelector('.sidebar').classList.contains('collapsed'));
  };
}
const sideSearchBtn = document.getElementById('sideSearchBtn');
if (sideSearchBtn) {
  sideSearchBtn.onclick = e => {
    e.stopPropagation();
    const open = document.querySelector('.sidebar').classList.toggle('search-open');
    if (open) {
      const inp = document.getElementById('searchInput');
      if (inp) inp.focus();
    }
  };
}
const sideProfileAv = document.getElementById('sideProfileAv');
function refreshSideAvatar() {
  if (!sideProfileAv) return;
  const me = window.ME || {};
  sideProfileAv.innerHTML = avatarInner(me.display_name || '', me.avatar, undefined);
}
function shortSnippet(m) {
  if (!m) return '';
  const t = m.msg_type;
  if (t === 'image') return 'تصویر';
  if (t === 'video') return 'ویدیو';
  if (t === 'audio') return 'پیام صوتی';
  if (t === 'file') return 'فایل';
  const text = (m.content || '').replace(/\n/g, ' ');
  return text.slice(0, 40) + (text.length > 40 ? '…' : '');
}
function updateConvPreview(m) {
  if (!m || !m.chat_id) return;
  const el = document.querySelector('.conv[data-chat-id="' + m.chat_id + '"]');
  if (!el) { refreshConvList(); return; }
  const sys = m.msg_type === 'system';
  const mine = m.sender_id === window.ME.id;
  let prefix = '';
  if (!sys && el.dataset.type !== 'dm') {
    if (mine) prefix = 'شما · ';
    else {
      const mm = (CD.members || []).find(x => x.id === m.sender_id);
      prefix = ((mm && mm.display_name) || 'کاربر') + ' · ';
    }
  }
  const row2 = el.querySelector('.row2 span');
  if (row2) row2.textContent = prefix + shortSnippet(m);
  const time = el.querySelector('time');
  if (time) time.textContent = fmtTime(m.created_at);
  const list = el.parentElement;
  if (list && list.firstElementChild !== el) list.insertBefore(el, list.firstElementChild);
}
function bumpUnread(chatId) {
  const el = document.querySelector('.conv[data-chat-id="' + chatId + '"]');
  if (!el) return;
  let pill = el.querySelector('.unread-pill');
  const n = parseInt(el.dataset.unread || '0', 10) + 1;
  el.dataset.unread = String(n);
  if (!pill) {
    const row2 = el.querySelector('.row2');
    if (!row2) return;
    pill = document.createElement('span');
    pill.className = 'unread-pill';
    row2.appendChild(pill);
  }
  pill.textContent = String(n);
}
function renderConvItem(it) {
  const c = it.chat || {};
  const p = it.peer || {};
  const type = c.chat_type || it.chat_type || 'dm';
  const chatId = c.id !== undefined ? c.id : it.chat_id;
  const name = c.name || p.display_name || (p.username ? '@' + p.username : 'کاربر');
  const avatar = c.avatar || p.avatar;
  const online = p.status === 'online';
  const lock = (type !== 'dm' && c.is_public === false) ? ' ' + bi('lock') : '';
  const av = type === 'dm'
    ? avatarHtml(name, avatar, online)
    : avatar
      ? '<div class="avatar conv-av"><span class="av-init">' + esc((name || '؟').charAt(0)) + '</span><img src="' + esc(avatar) + '" alt="' + esc(name || '') + '"></div>'
      : '<div class="avatar conv-av">' + esc((name || '؟').charAt(0)) + '</div>';
  const muteIco = (it.is_muted !== undefined ? it.is_muted : it.muted) ? '<span class="conv-mute" title="بی‌صدا">' + bi('bell-slash') + '</span>' : '';
  const lastMsg = it.last_message || null;
  const preview = lastMsg ? esc(shortSnippet(lastMsg)) : '<span class="conv-none">—</span>';
  const unread = it.unread || 0;
  const muted = it.is_muted !== undefined ? it.is_muted : it.muted;
  const archived = it.archived !== undefined ? it.archived : (c.archived !== undefined ? c.archived : false);
  return '    <div class="conv ' + (chatId === currentChat ? 'active' : '') + (muted ? ' muted' : '') + '" data-chat-id="' + chatId + '" data-type="' + type + '" data-name="' + esc(name || '') + '" data-peer="' + esc(p.username || '') + '" data-peer-id="' + (p.id || '') + '" data-muted="' + (muted ? 1 : 0) + '" data-archived="' + (archived ? 1 : 0) + '" data-unread="' + unread + '">'
    + '      ' + av
    + '      <div class="body">'
    + '        <div class="row1"><b>' + esc(name) + lock + '</b><span class="conv-meta">' + muteIco + '<time>' + fmtTime(lastMsg ? lastMsg.created_at : null) + '</time></span></div>'
    + '        <div class="row2"><span>' + preview + '</span>' + (unread ? '<span class="unread-pill">' + unread + '</span>' : '') + '</div>'
    + '      </div>'
    + '    </div>';
}
function loadConvList() {
  const seq = ++convSeq;
  return api('/api/conversations').then(r => {
    if (seq !== convSeq) return;
    if (!r.data) return;
    const byCat = { dm: [], group: [], channel: [], archive: [] };
    (asList(r.data, 'conversations')).forEach(it => {
      const c = it.chat || {};
      const archived = it.archived !== undefined ? it.archived : (c.archived !== undefined ? c.archived : false);
      if (archived) { byCat.archive.push(it); return; }
      const type = c.chat_type || it.chat_type || 'dm';
      byCat[type] = byCat[type] || [];
      byCat[type].push(it);
    });
    for (const cat of ['archive', 'dm', 'group', 'channel']) {
      const sec = document.getElementById(cat === 'archive' ? 'archiveSection' : 'convList' + cat.charAt(0).toUpperCase() + cat.slice(1));
      const list = sec;
      if (!list) continue;
      const items = byCat[cat] || [];
      list.innerHTML = items.map(renderConvItem).join('');
      const section = cat === 'archive' ? sec.parentElement : list.parentElement;
      if (section) section.style.display = items.length ? '' : 'none';
    }
    setActiveConv(currentChat);
  });
}
function refreshConvList() {
  clearTimeout(convTimer);
  convTimer = setTimeout(loadConvList, 120);
}
function clearUnread(id) {
  document.querySelectorAll('.conv[data-chat-id="' + id + '"] .unread-pill').forEach(el => el.remove());
}
function setActiveConv(id) {
  document.querySelectorAll('.conv').forEach(c => c.classList.toggle('active', String(c.dataset.chatId) === String(id)));
}
function setChatted(on) {
  document.querySelector('.chat-layout').classList.toggle('chatted', on);
}
document.addEventListener('click', e => {
  const conv = e.target.closest('.conv');
  if (conv) {
    conv.classList.remove('pulsing');
    void conv.offsetWidth;
    conv.classList.add('pulsing');
    openChat(conv.dataset.chatId);
    e.stopPropagation();
    return;
  }
  const head = e.target.closest('.conv-section-head');
  if (head) {
    head.parentElement.classList.toggle('collapsed');
    return;
  }
});
const searchInput = document.getElementById('searchInput');
let searchTimer = null;
searchInput.oninput = () => {
  clearTimeout(searchTimer);
  const q = searchInput.value.trim();
  const box = document.getElementById('searchResults');
  if (!q) { box.classList.remove('show'); return; }
  searchTimer = setTimeout(() => {
    api('/api/search?q=' + encodeURIComponent(q)).then(r => {
      const users = asList(r.data, 'matches').filter(u => u.id !== window.ME.id);
      let html = '';
      if (users.length) {
        html += '<h4>افراد</h4>' + users.map(u =>
          '<div class="sr-item" data-uid="' + u.id + '">'
          + avatarHtml(u.display_name, u.avatar, u.status === 'online')
          + '<div><b>' + esc(u.display_name) + '</b><small>@' + esc(u.username || '') + ' · ' + (u.status === 'online' ? 'آنلاین' : 'آفلاین') + '</small></div>'
          + '</div>').join('');
      }
      if (!html) html = '<small class="sr-none">چیزی پیدا نشد</small>';
      box.innerHTML = html;
      box.classList.add('show');
    });
  }, 250);
};
document.getElementById('searchResults').addEventListener('click', e => {
  const u = e.target.closest('[data-uid]');
  if (u) {
    openDmById(+u.dataset.uid);
    return;
  }
});
document.addEventListener('click', e => {
  if (!e.target.closest('.search-box')) document.getElementById('searchResults').classList.remove('show');
});
async function openDmById(userId) {
  const r = await apiPost('/api/dm', { user_id: userId });
  if (!r.data || !r.data.chat_id) return;
  document.getElementById('searchResults').classList.remove('show');
  searchInput.value = '';
  loadConvList();
  openChat(r.data.chat_id);
}
const fabMenu = document.getElementById('fabMenu');
const fabNew = document.getElementById('fabNew');
fabNew.onclick = e => {
  e.stopPropagation();
  const open = fabMenu.classList.toggle('show');
  fabNew.classList.toggle('open', open);
};
fabMenu.querySelectorAll('button[data-do]').forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.do === 'message') {
      const side = document.querySelector('.sidebar');
      side.classList.add('search-open');
      setTimeout(() => searchInput.focus(), 60);
    }
    fabMenu.classList.remove('show');
    fabNew.classList.remove('open');
  };
});
document.addEventListener('click', e => {
  if (!e.target.closest('#fabMenu') && !e.target.closest('#fabNew')) {
    fabMenu.classList.remove('show');
    fabNew.classList.remove('open');
  }
});

function registerMessage(m) {
  if (!CD.initialMessages.find(x => x.id === m.id)) CD.initialMessages.push(m);
}
function dayKey(iso) {
  if (!iso) return '';
  const d = new Date(iso.endsWith('Z') || iso.includes('+') ? iso : iso + 'Z');
  return d.toDateString();
}
function lastDayKey() {
  const seps = document.querySelectorAll('#msgsBody .day-sep');
  return seps.length ? seps[seps.length - 1].dataset.day : null;
}
function ensureDaySep(iso) {
  const raw = dayKey(iso);
  if (raw !== lastDayKey()) {
    const sep = document.createElement('div');
    sep.innerHTML = '<div class="day-sep" data-day="' + esc(raw) + '"><span>' + fmtDay(iso) + '</span></div>';
    document.getElementById('msgsBody').appendChild(sep.firstElementChild);
  }
}
function lastSenderOf(mid) {
  const msgs = (CD.initialMessages || []).filter(x => !x.deleted && x.msg_type !== 'system');
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].id === mid) return i > 0 ? msgs[i - 1].sender_id : null;
  }
  return null;
}
function nextSenderOf(mid) {
  const msgs = (CD.initialMessages || []).filter(x => !x.deleted && x.msg_type !== 'system');
  for (let i = 0; i < msgs.length; i++) {
    if (msgs[i].id === mid) return i < msgs.length - 1 ? msgs[i + 1].sender_id : null;
  }
  return null;
}
function renderMsg(m) {
  if (m.deleted) return '';
  if (m.msg_type === 'system') {
    if (m.sender_id) {
      return '<div class="sys-msg" data-mid="' + m.id + '"><span>' + esc(m.content) + '</span></div>';
    }
    return '<div class="sys-msg sys-app" data-mid="' + m.id + '"><span><i class="bi bi-rocket sys-app-ic"></i>پیام‌رسان ققنوس · ' + esc(m.content) + '</span></div>';
  }
  const url = esc(m.file_url || '');
  const fname = esc(m.file_name || '');
  let body = '';
  if (m.msg_type === 'image') {
    body = '<img class="img" src="' + url + '" alt="' + fname + '" loading="lazy" data-media="image" data-src="' + url + '" data-name="' + fname + '">';
    if (m.content) body += '<div class="txt">' + esc(m.content) + '</div>';
  } else if (m.msg_type === 'video') {
    body = '<div class="vid-wrap"><video class="vid" src="' + url + '" controls preload="metadata" playsinline></video>'
      + '<button class="vid-expand" title="نمایش بزرگ" data-media="video" data-src="' + url + '" data-name="' + fname + '">' + bi('arrows-angle-expand') + '</button></div>';
    if (m.content) body += '<div class="txt">' + esc(m.content) + '</div>';
  } else if (m.msg_type === 'file') {
    body = '<div class="file-card"><div class="fi">' + bi(fileIcon(m.file_name)) + '</div><div class="fc-meta"><b>' + fname + '</b><small>فایل</small></div></div>';
    if (m.file_url) {
      body += '<div class="file-actions"><a class="btn sm" href="' + url + '" download="' + fname + '">' + bi('download') + ' دریافت</a>'
        + '<a class="btn sm ghost" href="' + url + '" target="_blank" rel="noopener">' + bi('box-arrow-up-right') + ' باز کردن</a></div>';
    }
  } else {
    body = '<div class="txt md">' + md(m.content) + '</div>';
  }
  const sender = m.sender_id ? (m.sender || getMember(m.sender_id)) : { display_name: 'سیستم', avatar: '' };
  const mine = m.sender_id === window.ME.id;
  const hasImg = m.msg_type === 'image';
  const isMedia = hasImg || m.msg_type === 'video';
  const imgOnly = hasImg && !m.content;
  const seen = mine && Array.isArray(m.read_by) && m.read_by.some(id => String(id) !== String(window.ME.id));
  const newGroup = String(m.sender_id) !== String(lastSenderOf(m.id));
  const groupTail = String(nextSenderOf(m.id)) !== String(m.sender_id);
  const isDm = !!(CD.chat && CD.chat.chat_type === 'dm');
  const showSenderName = !mine && (isDm ? true : newGroup);
  const mineRow = mine;
  const senderLine = showSenderName
    ? '<div class="sender-line">' + esc((sender.display_name || 'کاربر')) + '</div>'
    : '';
  const html = '    <div class="mrow ' + (mineRow ? 'mine-row ' : '') + (newGroup ? 'who' : '') + '" data-mid="' + m.id + '">'
    + '      ' + ((!mine && !isDm && !groupTail) ? '<span class="av-click">' + avatarHtml(sender.display_name, sender.avatar, sender.status === 'online', 'sm') + '</span>' : ((!mine && !isDm) ? '<div class="avatar sm ghost"></div>' : ''))
    + '      <div class="bubble ' + (!isDm && mine ? 'me ' : '') + (isMedia ? 'has-img ' : '') + (imgOnly ? 'img-only ' : '') + ((!newGroup && !isDm) ? 'compact' : '') + '">'
    + senderLine
    + body
    + '        <div class="m-meta">'
    + '          <span>' + fmtTime(m.created_at) + '</span>'
    + '          ' + (m.is_edited ? '<span class="edited">ویرایش شده</span>' : '')
    + (mine ? '          <span class="ticks' + (seen ? ' seen' : '') + '" data-mid="' + m.id + '">' + tickIcon(seen) + '</span>' : '')
    + '        </div>'
    + '      </div>'
    + '    </div>';
  return html;
}
function renderAllMessages() {
  const body = document.getElementById('msgsBody');
  body.innerHTML = '';
  const msgs = (CD.initialMessages || []).filter(m => !m.deleted);
  lastMsgId = null;
  if (msgs.length) {
    let lastRaw = null;
    msgs.forEach(m => {
      if (typeof m.id === 'number' && (lastMsgId === null || m.id > lastMsgId)) lastMsgId = m.id;
      const raw = dayKey(m.created_at);
      if (raw !== lastRaw) {
        body.insertAdjacentHTML('beforeend',
          '<div class="day-sep" data-day="' + esc(raw) + '"><span>' + fmtDay(m.created_at) + '</span></div>');
        lastRaw = raw;
      }
      body.insertAdjacentHTML('beforeend', '<div id="m' + m.id + '">' + renderMsg(m) + '</div>');
    });
  } else if (currentChat) {
    body.innerHTML = '<div class="empty-msgs">اینجا جای پیام‌هاست. اولین پیام رو تو بفرست</div>';
  }
  scrollToBottom(true);
}
function nearBottom() {
  const el = document.getElementById('msgs');
  return el.scrollHeight - el.scrollTop - el.clientHeight < 140;
}
function scrollToBottom(force) {
  const el = document.getElementById('msgs');
  if (force || nearBottom()) {
    el.scrollTop = el.scrollHeight;
  }
  updateJumpBtns();
}
function updateJumpBtns() {
  const el = document.getElementById('msgs');
  const down = document.getElementById('btnJumpBottom');
  if (!el || !down) return;
  const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
  down.classList.toggle('show', !!currentChat && dist > 220);
}
function scrollMsgsToBottom() {
  const el = document.getElementById('msgs');
  el.scrollTop = el.scrollHeight;
  updateJumpBtns();
}
function flashMsg(row) {
  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  row.classList.add('flash');
  setTimeout(() => row.classList.remove('flash'), 1200);
}
function appendMsg(m) {
  if (typeof m.id === 'number' && (lastMsgId === null || m.id > lastMsgId)) lastMsgId = m.id;
  if (document.getElementById('m' + m.id)) { registerMessage(m); return; }
  registerMessage(m);
  ensureDaySep(m.created_at);
  const own = m.sender_id === window.ME.id;
  const frag = document.createElement('div');
  frag.innerHTML = '<div id="m' + m.id + '">' + renderMsg(m) + '</div>';
  const el = frag.firstElementChild;
  if (own) el.classList.add('pulsing');
  const bodyEl = document.getElementById('msgsBody');
  const emptyEl = bodyEl.querySelector('.empty-msgs');
  if (emptyEl) emptyEl.remove();
  bodyEl.appendChild(el);
  scrollToBottom(own);
  updateConvPreview(m);
}
function prependOlder(j) {
  const bodyEl = document.getElementById('msgsBody');
  const topEl = document.createElement('div');
  bodyEl.insertBefore(topEl, bodyEl.firstChild);
  j.messages.forEach(m => {
    if (!CD.initialMessages.find(x => x.id === m.id)) CD.initialMessages.unshift(m);
  });
  const existingSep = bodyEl.querySelector('.day-sep');
  const nextDay = existingSep ? existingSep.dataset.day : null;
  let lastRaw = null;
  j.messages.forEach((m, i) => {
    const raw = dayKey(m.created_at);
    if (raw !== lastRaw) {
      const isLastDay = i === j.messages.length - 1 || dayKey(j.messages[i + 1].created_at) !== raw;
      if (!(isLastDay && raw === nextDay)) {
        topEl.insertAdjacentHTML('beforeend',
          '<div class="day-sep" data-day="' + esc(raw) + '"><span>' + fmtDay(m.created_at) + '</span></div>');
      }
      lastRaw = raw;
    }
    topEl.insertAdjacentHTML('beforeend', '<div id="m' + m.id + '">' + renderMsg(m) + '</div>');
  });
}
let firstLoading = false;
async function jumpToFirst() {
  if (!currentChat || firstLoading) return;
  const el = document.getElementById('msgs');
  if (!el) return;
  firstLoading = true;
  try {
    const r = await api('/api/messages/' + currentChat + '?first=1');
    if (r.status === 200 && r.data && r.data.messages && r.data.messages.length) {
      r.data.messages = r.data.messages.filter(m => !document.getElementById('m' + m.id));
      if (r.data.messages.length) prependOlder(r.data);
      el.scrollTo({ top: 0, behavior: 'smooth' });
      const topRow = document.getElementById('msgsBody').querySelector('.mrow');
      if (topRow) flashMsg(topRow);
    }
  } catch (_) {}
  firstLoading = false;
}
function setHead() {
  const headAv = document.getElementById('chatHeadAvatar');
  const name = document.getElementById('chatHeadName');
  const sub = document.getElementById('chatHeadSub');
  if (!CD.chat) return;
  const c = CD.chat;
  let displayName, subText, av = '', subHtml = false;
  if (c.chat_type === 'dm') {
    const p = c.peer || {};
    displayName = p.display_name || p.username || c.name || 'کاربر';
    const status = p.status === 'online' ? 'آنلاین' : 'آفلاین';
    const narrow = window.innerWidth <= 480;
    subText = p.username ? (narrow ? status : ('@' + p.username + ' · ' + status)) : status;
    av = p.avatar || '';
  } else {
    displayName = c.name || (c.chat_type === 'channel' ? 'کانال' : 'گروه');
    const vis = c.is_public ? bi('globe') + ' عمومی' : bi('lock') + ' خصوصی';
    subText = (c.chat_type === 'channel' ? 'کانال' : 'گروه') + ' · ' + vis + ' · ' + faNum((c.members && c.members.length) || (CD.members || []).length || 0) + ' عضو';
    subHtml = true;
    av = c.avatar || '';
  }
  headAv.innerHTML = avatarInner(displayName, av);
  setAvatarData(headAv, av, displayName || '', c.chat_type === 'dm' ? 'user' : 'chat', c.chat_type === 'dm' ? (c.peer && c.peer.id) : c.id);
  name.textContent = displayName;
  if (subHtml) sub.innerHTML = subText;
  else sub.textContent = subText;
}
window.addEventListener('resize', () => {
  if (CD.chat) setHead();
});
function setAvatarData(el, src, name, ownerType, ownerId) {
  if (src) {
    el.dataset.media = 'image';
    el.dataset.src = src;
    el.dataset.name = name || '';
    if (ownerType && (ownerId || ownerId === 0)) {
      el.dataset.avatarType = ownerType;
      el.dataset.avatarId = String(ownerId);
    }
  } else {
    delete el.dataset.media;
    delete el.dataset.src;
    delete el.dataset.name;
  }
}
function closeChatPane() {
  currentChat = null;
  composerChatId = null;
  stopMsgPolling();
  document.getElementById('msgsPane').classList.remove('open');
  document.getElementById('mainEmpty').style.display = 'grid';
  document.querySelector('.chat-layout').classList.remove('chatted');
  document.querySelectorAll('.conv.active').forEach(c => c.classList.remove('active'));
  pendingFiles = [];
  renderAttachPreview();
  closeChatSearch();
}
document.getElementById('btnBackChat').onclick = () => closeChatPane();
async function openChat(id) {
  currentChat = +id;
  closeChatSearch();
  stopMsgPolling();
  const r = await api('/api/chat/' + id);
  if (currentChat !== +id) return;
  if (r.status === 403) {
    toast('error', 'خطا', 'دسترسی به این گپ نداری');
    closeChatPane();
    refreshConvList();
    return;
  }
  if (r.status !== 200 || !r.data || !r.data.chat) {
    CD.chat = null;
    CD.members = [];
    closeChatPane();
    return;
  }
  CD.chat = r.data.chat;
  CD.members = r.data.members || [];
  CD.role = r.data.role !== undefined ? r.data.role : null;
  const mr = await api('/api/messages/' + id + '?limit=50');
  if (currentChat !== +id) return;
  CD.initialMessages = mr.data ? asList(mr.data, 'messages') : [];
  setHead();
  document.getElementById('mainEmpty').style.display = 'none';
  document.getElementById('msgsPane').classList.add('open');
  setChatted(true);
  const input = document.getElementById('msgInput');
  input.value = '';
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 140) + 'px';
  updateComposerSlot();
  pendingFiles = [];
  renderAttachPreview();
  renderAllMessages();
  apiPost('/api/mark-read', { chat_id: currentChat });
  clearUnread(id);
  setActiveConv(id);
  startMsgPolling();
}
function startMsgPolling() {
  stopMsgPolling();
  pollTimer = setInterval(pollMsgs, 3000);
}
function stopMsgPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}
async function pollMsgs(force) {
  if (!currentChat) return;
  if (!force && document.hidden) return;
  const q = lastMsgId ? '?after=' + lastMsgId : '';
  const r = await api('/api/messages/' + currentChat + q);
  if (currentChat === null) return;
  if (r.status !== 200 || !r.data) return;
  const msgs = asList(r.data, 'messages');
  msgs.forEach(m => {
    appendMsg(m);
    if (m.sender_id !== window.ME.id) {
      apiPost('/api/mark-read', { chat_id: m.chat_id });
      clearUnread(m.chat_id);
    }
  });
}
window.addEventListener('focus', () => {
  refreshConvList();
  pollMsgs(true);
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  refreshConvList();
  pollMsgs(true);
});
setInterval(() => {
  refreshConvList();
  if (currentChat && !document.hidden) pollMsgs(false);
}, 15000);

const msgInput = document.getElementById('msgInput');
function updateComposerSlot() {
  const hasText = msgInput.value.trim().length > 0;
  const wrap = document.querySelector('.composer');
  wrap.classList.toggle('has-text', hasText || pendingFiles.length > 0);
  document.querySelector('.comp-clip').style.display = hasText ? 'none' : '';
  document.querySelector('.send-btn').style.display = hasText || pendingFiles.length ? '' : 'none';
  const sendBtn = document.getElementById('btnSend');
  if (pendingFiles.some(f => f.state === 'uploading')) sendBtn.classList.add('busy');
  else sendBtn.classList.remove('busy');
}
msgInput.addEventListener('input', () => {
  msgInput.style.height = 'auto';
  msgInput.style.height = Math.min(msgInput.scrollHeight, 140) + 'px';
  updateComposerSlot();
});
msgInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    doSend();
  }
});
document.getElementById('btnSend').onclick = () => doSend();
const attachMenu = document.getElementById('attachMenu');
const btnAttach = document.getElementById('btnAttach');
const fileInput = document.getElementById('fileInput');
let attachMode = 'media';
function openAttachMenu() {
  const btn = btnAttach.getBoundingClientRect();
  const menu = attachMenu;
  menu.classList.remove('show');
  void menu.offsetWidth;
  menu.style.bottom = (window.innerHeight - btn.bottom + 8) + 'px';
  menu.style.left = '';
  menu.style.right = '10px';
  menu.classList.add('show');
}
function closeAttachMenu() {
  attachMenu.classList.remove('show');
}
btnAttach.onclick = e => {
  e.stopPropagation();
  if (attachMenu.classList.contains('show')) closeAttachMenu();
  else openAttachMenu();
};
attachMenu.querySelectorAll('.am-item').forEach(item => {
  item.onclick = () => {
    attachMode = item.dataset.attach;
    closeAttachMenu();
    fileInput.click();
  };
});
document.addEventListener('click', e => {
  if (!e.target.closest('#attachMenu') && !e.target.closest('#btnAttach')) closeAttachMenu();
});
fileInput.onchange = () => {
  if (!fileInput.files || !fileInput.files.length) return;
  enqueueFiles(Array.from(fileInput.files));
  fileInput.value = '';
};
function enqueueFiles(files) {
  files.forEach(f => {
    if (f.size > 50 * 1024 * 1024) {
      toast('error', 'حجم فایل زیاد است', 'حجم هر فایل حداکثر ۵۰ مگابایت است');
      return;
    }
    const item = {
      seq: ++_pfSeq,
      file: f,
      state: 'queued',
      progress: 0,
      url: null,
      fileId: null,
      msgType: null,
      thumb: (f.type.startsWith('image/') || f.type.startsWith('video/')) ? URL.createObjectURL(f) : null
    };
    pendingFiles.push(item);
  });
  renderAttachPreview();
  pendingFiles.filter(i => i.state === 'queued').forEach(uploadPendingFile);
  updateComposerSlot();
}
function uploadPendingFile(item) {
  if (item.state !== 'queued') return;
  item.state = 'uploading';
  const fd = new FormData();
  fd.append('file', item.file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', API_BASE + '/api/upload');
  xhr.withCredentials = true;
  xhr.upload.onprogress = e => {
    if (e.lengthComputable) {
      item.progress = Math.round((e.loaded / e.total) * 100);
      updateAttachRow(item);
    }
  };
  xhr.onload = () => {
    let data = null;
    try { data = JSON.parse(xhr.responseText); } catch (_) { data = null; }
    if (xhr.status === 401) { location.replace('/'); return; }
    if (xhr.status === 200 && data && data.ok && data.file_id) {
      item.state = 'ready';
      item.fileId = data.file_id;
      item.url = data.file_url;
      item.msgType = data.msg_type;
      item.displayName = data.file_name || item.file.name;
      updateAttachRow(item);
      updateComposerSlot();
    } else {
      warnApiOnce();
      item.state = 'error';
      toast('error', 'خطا', 'آپلود ناموفق بود');
      updateAttachRow(item);
    }
  };
  xhr.onerror = () => {
    warnApiOnce();
    item.state = 'error';
    toast('error', 'خطا', 'آپلود ناموفق بود');
    updateAttachRow(item);
  };
  xhr.send(fd);
}
function cancelPendingFile(seq) {
  pendingFiles = pendingFiles.filter(i => i.seq !== seq);
  renderAttachPreview();
  updateComposerSlot();
}
function renderAttachPreview() {
  const wrap = document.getElementById('attachPreview');
  wrap.innerHTML = '';
  pendingFiles.forEach(item => {
    const row = document.createElement('div');
    row.className = 'ap-item ' + item.state;
    row.dataset.seq = item.seq;
    let thumb = '';
    if (item.thumb) {
      thumb = item.file.type.startsWith('video/')
        ? '<video class="ap-vid" src="' + item.thumb + '" muted></video>'
        : '<img class="ap-img" src="' + item.thumb + '" alt="">';
    } else {
      thumb = '<span class="ap-file">' + bi(fileIcon(item.file.name)) + '</span>';
    }
    row.innerHTML = thumb
      + '<div class="ap-meta"><b class="ap-name">' + esc(item.file.name) + '</b><small class="ap-size">' + fmtSize(item.file.size) + '</small></div>'
      + '<div class="ap-bar"><span style="width:' + item.progress + '%"></span></div>'
      + '<button class="ap-x" title="حذف">' + bi('x') + '</button>';
    row.querySelector('.ap-x').onclick = () => cancelPendingFile(item.seq);
    wrap.appendChild(row);
  });
}
function updateAttachRow(item) {
  renderAttachPreview();
}
async function doSend() {
  const text = msgInput.value.trim();
  if (sending) return;
  if (!composerChatId) {
    const target = currentChat;
    if (!target) return;
    composerChatId = target;
  }
  const readyFiles = pendingFiles.filter(i => i.state === 'ready');
  if (!text && !readyFiles.length) return;
  if (readyFiles.length && readyFiles.some(i => i.state === 'uploading')) return;
  sending = true;
  updateComposerSlot();
  const caption = text;
  let sent = false;
  for (const item of readyFiles) {
    const payload = {
      chat_id: composerChatId,
      file_id: item.fileId,
      content: caption
    };
    payload.msg_type = item.msgType || 'file';
    const optimistic = {
      id: 'o' + item.seq,
      chat_id: composerChatId,
      sender_id: window.ME.id,
      msg_type: item.msgType || 'file',
      content: caption,
      file_url: item.url || item.thumb,
      file_name: item.displayName || item.file.name,
      created_at: new Date().toISOString(),
      is_edited: false,
      read_by: [],
      deleted: false,
      sender: { display_name: window.ME.display_name, avatar: '' }
    };
    appendMsg(optimistic);
    const r = await apiPost('/api/message/send', payload);
    if (r.status === 200 && r.data && r.data.message) {
      const oldRow = document.getElementById('m' + optimistic.id);
      if (oldRow) oldRow.remove();
      appendMsg(r.data.message);
      registerMessage(r.data.message);
      if (typeof r.data.message.id === 'number') lastMsgId = r.data.message.id;
      sent = true;
      break;
    }
    const oldRow = document.getElementById('m' + optimistic.id);
    if (oldRow) oldRow.remove();
    toast('error', 'خطا', 'ارسال پیام ناموفق بود');
    break;
  }
  if (!sent && !readyFiles.length) {
    const optimistic = {
      id: 'o' + (++_pfSeq),
      chat_id: composerChatId,
      sender_id: window.ME.id,
      msg_type: 'text',
      content: caption,
      created_at: new Date().toISOString(),
      is_edited: false,
      read_by: [],
      deleted: false,
      sender: { display_name: window.ME.display_name, avatar: '' }
    };
    appendMsg(optimistic);
    const r = await apiPost('/api/message/send', { chat_id: composerChatId, content: caption, msg_type: 'text' });
    if (r.status === 200 && r.data && r.data.message) {
      const oldRow = document.getElementById('m' + optimistic.id);
      if (oldRow) oldRow.remove();
      appendMsg(r.data.message);
      registerMessage(r.data.message);
      if (typeof r.data.message.id === 'number') lastMsgId = r.data.message.id;
    } else {
      const oldRow = document.getElementById('m' + optimistic.id);
      if (oldRow) oldRow.remove();
      toast('error', 'خطا', 'ارسال پیام ناموفق بود');
    }
  }
  msgInput.value = '';
  msgInput.style.height = 'auto';
  pendingFiles = [];
  renderAttachPreview();
  updateComposerSlot();
  refreshConvList();
  sending = false;
  updateComposerSlot();
}
const emojiPanel = document.getElementById('emojiPanel');
const epTabs = document.getElementById('epTabs');
const epBody = document.getElementById('epBody');
const epSearch = document.getElementById('epSearch');
let epActiveTab = 0;
function buildEmojiPanel() {
  epTabs.innerHTML = (typeof EMOJI_SETS !== 'undefined' ? EMOJI_SETS : []).map((s, i) =>
    '<button class="ep-tab' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' + esc(s.icon) + '</button>').join('');
  epTabs.querySelectorAll('.ep-tab').forEach(tab => {
    tab.onclick = () => {
      epActiveTab = +tab.dataset.i;
      epTabs.querySelectorAll('.ep-tab').forEach(t => t.classList.toggle('active', t === tab));
      epSearch.value = '';
      renderEpGrid(epActiveTab);
    };
  });
  epSearch.oninput = () => {
    const q = epSearch.value.trim().toLowerCase();
    if (!q) {
      renderEpGrid(epActiveTab);
      return;
    }
    const kwMap = typeof EMOJI_KEYWORDS !== 'undefined' ? EMOJI_KEYWORDS : {};
    const hits = Object.keys(kwMap).filter(e => kwMap[e].toLowerCase().includes(q));
    epBody.innerHTML = hits.length
      ? '<div class="ep-grid">' + hits.map(e => '<button class="ep-btn">' + esc(e) + '</button>').join('') + '</div>'
      : '<div class="ep-empty">چیزی پیدا نشد</div>';
  };
  renderEpGrid(0);
}
function renderEpGrid(i) {
  const set = (typeof EMOJI_SETS !== 'undefined' ? EMOJI_SETS : [])[i];
  epBody.innerHTML = set
    ? '<div class="ep-grid">' + set.emojis.map(e => '<button class="ep-btn">' + esc(e) + '</button>').join('') + '</div>'
    : '';
}
function openEmojiPanel() {
  emojiPanel.classList.add('show');
  attachMenu.classList.remove('show');
  if (!epBody.innerHTML) buildEmojiPanel();
  msgInput.focus();
}
function closeEmojiPanel() {
  emojiPanel.classList.remove('show');
}
function insertEmoji(e) {
  const s = msgInput.selectionStart != null ? msgInput.selectionStart : msgInput.value.length;
  const en = msgInput.selectionEnd != null ? msgInput.selectionEnd : s;
  msgInput.value = msgInput.value.slice(0, s) + e + msgInput.value.slice(en);
  msgInput.focus();
  msgInput.setSelectionRange(s + e.length, s + e.length);
  msgInput.dispatchEvent(new Event('input'));
}
document.getElementById('btnEmoji').onclick = () => {
  if (emojiPanel.classList.contains('show')) closeEmojiPanel();
  else openEmojiPanel();
};
const MV = {
  items: [],
  index: 0,
  owner: null,
  open: false,
  async openViewer(src, kind, name, items, index, opts) {
    opts = opts || {};
    this.items = items || [{ src, kind, name }];
    this.index = index || 0;
    this.owner = opts.owner || null;
    this.open = true;
    document.getElementById('mediaViewer').classList.add('show');
    this.showCurrent();
  },
  showCurrent() {
    const it = this.items[this.index];
    if (!it) return;
    const stage = document.getElementById('mvStage');
    document.getElementById('mvName').textContent = it.name || '';
    document.getElementById('mvCount').style.display = this.items.length > 1 ? '' : 'none';
    document.getElementById('mvCount').textContent = faNum(this.index + 1) + '/' + faNum(this.items.length);
    document.getElementById('mvPrev').style.display = this.items.length > 1 ? '' : 'none';
    document.getElementById('mvNext').style.display = this.items.length > 1 ? '' : 'none';
    const del = document.getElementById('mvDelete');
    const canDelete = it.ownerId != null;
    del.style.display = canDelete ? '' : 'none';
    if (it.kind === 'video') {
      stage.innerHTML = '<video src="' + esc(it.src) + '" controls autoplay playsinline></video>';
    } else {
      stage.innerHTML = '<img src="' + esc(it.src) + '" alt="' + esc(it.name || '') + '">';
    }
    const openA = document.getElementById('mvOpen');
    const dlA = document.getElementById('mvDownload');
    openA.href = it.src;
    dlA.href = it.src;
    dlA.setAttribute('download', it.name || '');
  },
  close() {
    this.open = false;
    document.getElementById('mediaViewer').classList.remove('show');
    document.getElementById('mvStage').innerHTML = '';
  },
  nav(d) {
    if (this.items.length < 2) return;
    this.index = (this.index + d + this.items.length) % this.items.length;
    this.showCurrent();
  }
};
document.getElementById('mvClose').onclick = () => MV.close();
document.getElementById('mvPrev').onclick = () => MV.nav(-1);
document.getElementById('mvNext').onclick = () => MV.nav(1);
document.getElementById('mvDelete').onclick = async () => {
  const idx = this.index;
  const item = MV.items[idx];
  if (item && item.ownerId != null) {
    await apiPost('/api/message/delete', { id: item.ownerId });
  }
  MV.items.splice(idx, 1);
  if (MV.items.length === 0) MV.close();
  else {
    MV.index = Math.min(MV.index, MV.items.length - 1);
    MV.showCurrent();
  }
};
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (MV.open) MV.close();
    else if (emojiPanel.classList.contains('show')) closeEmojiPanel();
    else if (attachMenu.classList.contains('show')) closeAttachMenu();
    else if (document.getElementById('chatSearch').style.display !== 'none') closeChatSearch();
    document.querySelectorAll('.modal.show, .modal.open').forEach(m => m.classList.remove('show', 'open'));
  }
  if (MV.open) {
    if (e.key === 'ArrowRight') MV.nav(-1);
    if (e.key === 'ArrowLeft') MV.nav(1);
  }
});
document.addEventListener('click', e => {
  const el = e.target.closest('[data-media]');
  if (!el) return;
  const kind = el.dataset.media === 'video' ? 'video' : 'image';
  const items = (CD.initialMessages || [])
    .filter(m => !m.deleted && (m.msg_type === 'image' || m.msg_type === 'video') && m.file_url)
    .map(m => ({ src: m.file_url, kind: m.msg_type === 'video' ? 'video' : 'image', name: m.file_name, id: m.id, ownerId: m.sender_id === window.ME.id ? m.id : null }));
  const src = el.dataset.src;
  let index = items.findIndex(it => it.src === src);
  if (index < 0) index = 0;
  const item = items[index];
  MV.openViewer(src, kind, el.dataset.name || '', items, index);
});
document.getElementById('chatHeadAvatar').onclick = e => {
  e.stopPropagation();
  const head = document.getElementById('chatHeadAvatar');
  if (head.dataset.media === 'image' && CD.chat && CD.chat.chat_type === 'dm') openDmInfo(CD.chat.peer);
};
document.getElementById('chatHeadId').onclick = () => {
  if (CD.chat && CD.chat.chat_type === 'dm') openDmInfo(CD.chat.peer);
};
function openDmInfo(user) {
  if (!user) return;
  const av = document.getElementById('dmAvatar');
  av.innerHTML = avatarInner(user.display_name || 'کاربر', user.avatar, user.status === 'online');
  setAvatarData(av, user.avatar || '', user.display_name || '', 'user', user.id);
  document.getElementById('dmName').textContent = user.display_name || 'کاربر';
  document.getElementById('dmUsername').textContent = user.username ? '@' + user.username : '';
  const st = document.getElementById('dmStatus');
  st.innerHTML = user.status === 'online'
    ? '<i class="bi bi-circle-fill"></i> آنلاین'
    : '<i class="bi bi-circle"></i> آفلاین';
  st.classList.toggle('on', user.status === 'online');
  document.getElementById('dmModal').classList.add('show');
}
document.querySelectorAll('.modal .row .btn.ghost[data-close], .modal .modal-x').forEach(btn => {
  btn.onclick = () => btn.closest('.modal').classList.remove('show');
});
document.getElementById('dmClose').onclick = () => document.getElementById('dmModal').classList.remove('show');
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) m.classList.remove('show');
  });
});
document.querySelectorAll('.modal .box').forEach(box => {
  if (!box.querySelector('.modal-x')) {
    const x = document.createElement('button');
    x.className = 'modal-x';
    x.title = 'بستن';
    x.innerHTML = '<i class="bi bi-x-lg"></i>';
    x.onclick = () => box.closest('.modal').classList.remove('show');
    box.prepend(x);
  }
});
const chatMenuModal = document.getElementById('chatMenuModal');
document.getElementById('btnChatMenu').onclick = () => {
  chatMenuModal.classList.toggle('show');
};
document.getElementById('chatMenuClose').onclick = () => chatMenuModal.classList.remove('show');
document.getElementById('cmSearch').onclick = () => {
  chatMenuModal.classList.remove('show');
  openChatSearch();
};
document.getElementById('cmFirst').onclick = () => {
  chatMenuModal.classList.remove('show');
  jumpToFirst();
};
const chatSearch = document.getElementById('chatSearch');
const chatSearchInput = document.getElementById('chatSearchInput');
const chatSearchCount = document.getElementById('chatSearchCount');
let csMatches = [];
let csIndex = -1;
function openChatSearch() {
  chatSearch.style.display = '';
  chatSearchInput.value = '';
  chatSearchCount.textContent = '';
  csMatches = [];
  csIndex = -1;
  chatSearchInput.focus();
}
function closeChatSearch() {
  chatSearch.style.display = 'none';
  csMatches = [];
  csIndex = -1;
  document.querySelectorAll('#msgsBody .mrow.search-hit').forEach(r => r.classList.remove('search-hit'));
}
chatSearchInput.oninput = () => {
  const q = chatSearchInput.value.trim().toLowerCase();
  document.querySelectorAll('#msgsBody .mrow.search-hit').forEach(r => r.classList.remove('search-hit'));
  csMatches = [];
  csIndex = -1;
  if (q.length < 2) {
    chatSearchCount.textContent = 'بیشتر بنویس';
    return;
  }
  csMatches = (CD.initialMessages || [])
    .filter(m => !m.deleted && m.msg_type === 'text' && m.content && m.content.toLowerCase().includes(q))
    .map(m => m.id);
  if (!csMatches.length) {
    chatSearchCount.textContent = 'پیدا نشد';
    return;
  }
  csIndex = 0;
  goToMatch();
};
function goToMatch() {
  if (!csMatches.length) return;
  csIndex = (csIndex + csMatches.length) % csMatches.length;
  const mid = csMatches[csIndex];
  document.querySelectorAll('#msgsBody .mrow.search-hit').forEach(r => r.classList.remove('search-hit'));
  const row = document.getElementById('m' + mid);
  if (row) {
    row.classList.add('search-hit');
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  chatSearchCount.textContent = faNum(csIndex + 1) + '/' + faNum(csMatches.length);
}
document.getElementById('chatSearchNext').onclick = goToMatch;
document.getElementById('chatSearchPrev').onclick = () => {
  csIndex--;
  goToMatch();
};
document.getElementById('chatSearchClose').onclick = closeChatSearch;
document.getElementById('btnJumpBottom').onclick = () => scrollMsgsToBottom();
document.getElementById('msgs').addEventListener('scroll', updateJumpBtns);
document.getElementById('msgs').addEventListener('click', e => {
  const v = e.target.closest('video.vid');
  if (v) {
    e.stopPropagation();
    if (v.paused) v.play();
    else v.pause();
  }
});
document.addEventListener('DOMContentLoaded', async () => {
  refreshSideAvatar();
  buildEmojiPanel();
  const r = await api('/api/user/profile');
  if (r.status === 200 && r.data) {
    const p = r.data.profile || r.data;
    window.ME = {
      id: p.id,
      username: p.username || '',
      display_name: p.display_name || p.name || '',
      avatar: p.avatar || ''
    };
  } else {
    window.ME = { id: 0, username: '', display_name: '', avatar: '' };
    warnApiOnce();
  }
  refreshSideAvatar();
  loadConvList();
});
