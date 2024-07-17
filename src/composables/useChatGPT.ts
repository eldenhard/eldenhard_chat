import { ref } from 'vue'; 
import axios from 'axios';

// Определяем интерфейс для сообщений, которые отправляются и получаются от API
interface ChatMessage {
  role: string; // роль сообщения (например, 'system', 'user', 'assistant')
  content: string; // содержимое сообщения
}

// Определяем интерфейс для структуры ответа от API
interface ChatResponse {
  choices: { message: ChatMessage }[]; // массив возможных ответов с сообщениями
}

// Экспортируем функцию useChatGPT, которая будет использоваться как composable
export function useChatGPT() {

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const loading = ref(false); // состояние загрузки
  const error = ref<string | null>(null); // состояние ошибки
  const response = ref<string | null>(null); // состояние ответа

  // Promise<string>: Указывает тип возвращаемого значения функции. В данном случае функция возвращает промис, который разрешается в строку (Promise<string>)
  const sendMessage = async (message: string): Promise<string> => {
    // Устанавливаем начальное состояние перед выполнением запроса
    loading.value = true; // указываем, что запрос в процессе выполнения
    error.value = null; // сбрасываем предыдущее состояние ошибки
    response.value = null; // сбрасываем предыдущее состояние ответа

    // Данные для отправки запроса к API
    const data = {
      model: 'gpt-3.5-turbo',  // используемая модель, например, 'gpt-4' или 'gpt-3.5-turbo'
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // системное сообщение для настройки контекста
        { role: 'user', content: message } // сообщение пользователя
      ]
    };

    try {
      // Выполняем запрос к API и ждем ответа
      const res = await axios.post<ChatResponse>('https://api.openai.com/v1/chat/completions', data, { headers });
      // Извлекаем и сохраняем ответ от API
      const reply = res.data.choices[0].message.content;
      response.value = reply;
      return reply;
    } catch (err: any) {
      // В случае ошибки, сохраняем сообщение об ошибке
      error.value = 'Ошибка: ' + err.message;
      return 'Ошибка при получении ответа от ChatGPT';
    } finally {
      // Независимо от результата, отключаем состояние загрузки
      loading.value = false;
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
