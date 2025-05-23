// UI 要素取得
const accountNameInput = document.getElementById('accountName');
const apiKeyInput = document.getElementById('apiKey');
const deploymentNameInput = document.getElementById('deploymentName');
const imageInput = document.getElementById('imageInput');
const clearBtn = document.getElementById('clearImage');
const imagePreview = document.getElementById('imagePreview');
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const resultImage = document.getElementById('resultImage');
const loadingSpinner = document.getElementById('loadingSpinner');
const noImageSwitch = document.getElementById('noImageSwitch');

let selectedFile = null;

// 参照画像プレビュー
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = reader.result;
    imagePreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

// 参照画像削除
clearBtn.addEventListener('click', () => {
  imageInput.value = '';
  imagePreview.src = '';
  imagePreview.classList.add('hidden');
  selectedFile = null;
});

// 画像生成
generateBtn.addEventListener('click', async () => {
  const useNoImage = noImageSwitch.checked;
  const accountName = accountNameInput.value.trim();
  const apiKey = apiKeyInput.value.trim();
  const deploymentName = deploymentNameInput.value.trim();
  const prompt = promptInput.value.trim();
  if (!accountName || !apiKey || !deploymentName || (!selectedFile && !useNoImage) || !prompt) {
    alert('すべての入力項目とプロンプトを指定してください');
    return;
  }

  generateBtn.disabled = true;
  loadingSpinner.classList.remove('hidden');
  resultImage.classList.add('hidden');

  let url;
  let fetchOptions;
  if (useNoImage) {
    // リファレンス画像なしで生成
    url = `https://${accountName}.openai.azure.com/openai/deployments/${deploymentName}/images/generations?api-version=2025-04-01-preview`;
    fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({ prompt })
    };
  } else {
    // 画像編集
    url = `https://${accountName}.openai.azure.com/openai/deployments/${deploymentName}/images/edits?api-version=2025-04-01-preview`;
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    formData.append('prompt', prompt);
    fetchOptions = { method: 'POST', headers: { 'api-key': apiKey }, body: formData };
  }

  try {
    const res = await fetch(url, fetchOptions);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) throw new Error('結果データが存在しません');
    loadingSpinner.classList.add('hidden');
    resultImage.src = `data:image/png;base64,${b64}`;
    resultImage.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    alert('画像生成中にエラーが発生しました: ' + err.message);
  } finally {
    loadingSpinner.classList.add('hidden');
    generateBtn.disabled = false;
  }
});

// localStorageからAzure OpenAIリソース名とデプロイ名を読み込み
window.addEventListener('DOMContentLoaded', () => {
  const savedAccount = localStorage.getItem('accountName');
  if (savedAccount) accountNameInput.value = savedAccount;
  const savedDeployment = localStorage.getItem('deploymentName');
  if (savedDeployment) deploymentNameInput.value = savedDeployment;
});

// 入力変更時にlocalStorageへ保存
accountNameInput.addEventListener('change', () => {
  localStorage.setItem('accountName', accountNameInput.value.trim());
});
deploymentNameInput.addEventListener('change', () => {
  localStorage.setItem('deploymentName', deploymentNameInput.value.trim());
});