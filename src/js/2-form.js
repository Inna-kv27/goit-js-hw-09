const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector("input[name='email']");
const messageInput = form.querySelector("textarea[name='message']");

const updateLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFormData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      formData = JSON.parse(savedData);

      emailInput.value = formData.email || '';
      messageInput.value = formData.message || '';
    }
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
};

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();

  updateLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

loadFormData();
