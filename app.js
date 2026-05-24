const SUPABASE_URL = 'https://sqjoheakivglslxiscrl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxam9oZWFraXZnbHNseGlzY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDA3MTEsImV4cCI6MjA5NTE3NjcxMX0.v66Yznfy2U0MbJ-PUJtesYg2rptpJzSTnmW0IMyQCo4';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let items = [];

const form            = document.getElementById('add-form');
const input           = document.getElementById('item-input');
const list            = document.getElementById('item-list');
const emptyMsg        = document.getElementById('empty-msg');
const summary         = document.getElementById('summary');
const clearCheckedBtn = document.getElementById('clear-checked');
const statTotal       = document.getElementById('stat-total');
const statChecked     = document.getElementById('stat-checked');
const statRemaining   = document.getElementById('stat-remaining');

function render() {
  list.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'item' + (item.checked ? ' checked' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.checked;
    checkbox.addEventListener('change', () => toggle(item.id, !item.checked));

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = item.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = '삭제';
    deleteBtn.addEventListener('click', () => remove(item.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  const total   = items.length;
  const checked = items.filter(i => i.checked).length;

  emptyMsg.hidden = total > 0;
  summary.textContent = total > 0 ? `${checked} / ${total} 완료` : '';
  clearCheckedBtn.hidden = checked === 0;

  statTotal.textContent     = total;
  statChecked.textContent   = checked;
  statRemaining.textContent = total - checked;
}

async function loadItems() {
  const { data, error } = await db
    .from('shopping_items')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) { console.error('로드 실패:', error); return; }

  items = data;
  render();
}

async function addItem(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const { data, error } = await db
    .from('shopping_items')
    .insert({ text: trimmed, checked: false })
    .select()
    .single();

  if (error) { console.error('추가 실패:', error); return; }

  items.push(data);
  render();
}

async function toggle(id, checked) {
  const { error } = await db
    .from('shopping_items')
    .update({ checked })
    .eq('id', id);

  if (error) { console.error('체크 실패:', error); return; }

  const item = items.find(i => i.id === id);
  if (item) item.checked = checked;
  render();
}

async function remove(id) {
  const { error } = await db
    .from('shopping_items')
    .delete()
    .eq('id', id);

  if (error) { console.error('삭제 실패:', error); return; }

  items = items.filter(i => i.id !== id);
  render();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await addItem(input.value);
  input.value = '';
  input.focus();
});

clearCheckedBtn.addEventListener('click', async () => {
  const ids = items.filter(i => i.checked).map(i => i.id);
  const { error } = await db
    .from('shopping_items')
    .delete()
    .in('id', ids);

  if (error) { console.error('일괄 삭제 실패:', error); return; }

  items = items.filter(i => !i.checked);
  render();
});

loadItems();
