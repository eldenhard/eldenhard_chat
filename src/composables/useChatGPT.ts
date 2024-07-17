// Импортируем необходимые функции и библиотеки
import { ref } from 'vue'; // ref используется для создания реактивных переменных
import axios from 'axios'; // axios используется для выполнения HTTP-запросов

// Определяем интерфейс для сообщений, отправляемых и получаемых от API
interface ChatMessage {
  role: string; // роль сообщения (например, 'system', 'user', 'assistant')
  content: string; // содержимое сообщения
}

// Определяем интерфейс для ответа от API
interface ChatResponse {
  choices: { message: ChatMessage }[]; // массив возможных ответов с сообщениями
}

// Создаем композиционную функцию, которую можно будет использовать в компонентах
export function useChatGPT() {
  const apiKey = process.env.VITE_OPENAI_API_KEY

  // Заголовки для HTTP-запроса, включая авторизацию
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  // Создаем реактивные переменные для управления состоянием
  const loading = ref(false); // состояние загрузки
  const error = ref<string | null>(null); // состояние ошибки
  const response = ref<string | null>(null); // состояние ответа

  // Функция для отправки сообщения к API
  const sendMessage = async (message: string) => {
    // Устанавливаем начальное состояние перед выполнением запроса
    loading.value = true; // указываем, что запрос в процессе выполнения
    error.value = null; // сбрасываем предыдущее состояние ошибки
    response.value = null; // сбрасываем предыдущее состояние ответа

    // Данные для отправки запроса к API
    const data = {
      model: 'gpt-3.5-turbo',  // используемая модель, например, "gpt-4" или "gpt-3.5-turbo"
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // системное сообщение для настройки контекста
        { role: 'user', content: message } // сообщение пользователя
      ]
    };

    // Выполнение запроса к API
    try {
      const res = await axios.post<ChatResponse>('https://api.openai.com/v1/chat/completions', data, { headers });
      response.value = res.data.choices[0].message.content; // устанавливаем полученный ответ в состояние
    } catch (err: any) {
      error.value = 'Ошибка: ' + err.message; // устанавливаем сообщение об ошибке в случае неудачи
    } finally {
      loading.value = false; // отключаем состояние загрузки после завершения запроса
    }
  };

  // Возвращаем реактивные переменные и функцию для использования в компонентах
  return {
    loading, // состояние загрузки
    error, // состояние ошибки
    response, // состояние ответа
    sendMessage // функция для отправки сообщения
  };
}
