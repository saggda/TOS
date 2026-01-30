import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Политика Cookie | PROMO Team',
  description: 'Информация об использовании файлов cookie на сайте promo-team.ru',
  robots: {
    index: false,
    follow: true,
  },
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Политика использования файлов cookie
            </h1>

            <div className="glass-card p-8 md:p-12 prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Что такое файлы cookie?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем
                  устройстве (компьютере, планшете или мобильном телефоне) при посещении веб-сайта.
                  Они позволяют сайту запоминать ваши действия и предпочтения (например, логин,
                  язык, размер шрифта и другие настройки отображения) в течение определенного
                  периода времени.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Файлы cookie не повреждают ваше устройство и не содержат вирусов.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Какие файлы cookie мы используем?</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.1. Обязательные (Essential) файлы cookie</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Эти файлы необходимы для proper функционирования сайта. Они позволяют вам
                  перемещаться по сайту и использовать его функции. Без этих файлов сайт не
                  может работать корректно.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Аутентификация пользователя</li>
                  <li>Безопасность сайта</li>
                  <li>Корректная работа корзины</li>
                  <li>Запоминание предпочтений языка</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.2. Аналитические файлы cookie</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Эти файлы помогают нам понять, как посетители взаимодействуют с сайтом.
                  Мы используем следующее:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Яндекс.Метрика</strong> — для анализа посещаемости и поведения пользователей</li>
                  <li><strong>Google Analytics 4</strong> — для сбора статистической информации</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Собранная информация является анонимной и не позволяет идентифицировать вас.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.3. Маркетинговые файлы cookie</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Эти файлы используются для показа релевантной рекламы и измерения эффективности
                  маркетинговых кампаний.
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Facebook Pixel</li>
                  <li>ВКонтакте Ретаргетинг</li>
                  <li>Яндекс.Директ</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Сторонние сервисы</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Мы используем сторонние сервисы, которые могут устанавливать свои файлы cookie:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Vercel</strong> — хостинг сайта</li>
                  <li><strong>YouTube/Vimeo</strong> — видеоплееры</li>
                  <li><strong>Telegram</strong> — виджет связи</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Вы можете ознакомиться с политиками конфиденциальности этих сервисов на их
                  веб-сайтах.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Как управлять файлами cookie?</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.1. Через наш сайт</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Вы можете управлять своими предпочтениями в отношении файлов cookie через
                  баннер cookie consent, который появляется при первом посещении сайта.
                  Вы можете:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Принять все файлы cookie</li>
                  <li>Принять только обязательные файлы</li>
                  <li>Настроить предпочтения вручную</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">4.2. Через настройки браузера</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Вы можете удалить или заблокировать файлы cookie через настройки вашего браузера.
                  Учтите, что отключение файлов cookie может повлиять на работу сайта.
                </p>
                <div className="bg-milk-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Chrome:</strong> Настройки → Конфиденциальность и безопасность → Файлы cookie
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Safari:</strong> Настройки → Конфиденциальность → Управление данными веб-сайтов
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Firefox:</strong> Настройки → Конфиденциальность и защита → Файлы cookie и данные сайтов
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Edge:</strong> Настройки → Файлы cookie и разрешения сайтов
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Как часто мы обновляем политику?</h2>
                <p className="text-gray-700 leading-relaxed">
                  Мы можем периодически обновлять настоящую политику. Обязательно ознакомьтесь
                  с датой последнего обновления в нижней части этой страницы. Продолжая
                  использовать сайт после внесения изменений, вы соглашаетесь с обновленной
                  политикой.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Срок хранения файлов cookie</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Тип cookie</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Срок хранения</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-700">Сессионные</td>
                        <td className="px-4 py-2 text-sm text-gray-700">До закрытия браузера</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-700">Постоянные</td>
                        <td className="px-4 py-2 text-sm text-gray-700">От 1 дня до 2 лет</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-700">Аналитические</td>
                        <td className="px-4 py-2 text-sm text-gray-700">До 24 месяцев</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Контакты</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Если у вас есть вопросы относительно нашей политики использования файлов cookie,
                  свяжитесь с нами:
                </p>
                <div className="bg-milk-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> <a href="mailto:info@promo-team.ru" className="text-brand-red hover:underline">info@promo-team.ru</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Телефон:</strong> <a href="tel:+79991234567" className="text-brand-red hover:underline">+7 (999) 123-45-67</a>
                  </p>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Дата последнего обновления: {new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
