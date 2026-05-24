const STORAGE_KEY = 'shopping-list';

let items = load();

const form = document.getElementById('add-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');
const emptyMsg = document.getElementById('empty-msg');
const summary = document.getElementById('summary');
const clearCheckedBtn = document.getElementById('clear-checked');
const statTotal = document.getElementById('stat-total');
const statChecked = document.getElementById('stat-checked');
const statRemaining = document.getElementById('stat-remaining');

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
  list.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'item' + (item.checked ? ' checked' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.checked;
    checkbox.addEventListener('change', () => toggle(index));

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = item.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = '삭제';
    deleteBtn.addEventListener('click', () => remove(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  const total = items.length;
  const checked = items.filter(i => i.checked).length;

  emptyMsg.hidden = total > 0;
  summary.textContent = total > 0 ? `${checked} / ${total} 완료` : '';
  clearCheckedBtn.hidden = checked === 0;

  statTotal.textContent = total;
  statChecked.textContent = checked;
  statRemaining.textContent = total - checked;
}

function addItem(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  items.push({ text: trimmed, checked: false });
  save();
  render();
}

function toggle(index) {
  items[index].checked = !items[index].checked;
  save();
  render();
}

function remove(index) {
  items.splice(index, 1);
  save();
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addItem(input.value);
  input.value = '';
  input.focus();
});

clearCheckedBtn.addEventListener('click', () => {
  items = items.filter(i => !i.checked);
  save();
  render();
});

render();