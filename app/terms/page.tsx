import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Условия использования | PROMO Team',
  description: 'Условия использования сайта promo-team.ru',
  robots: {
    index: false,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Условия использования
            </h1>

            <div className="glass-card p-8 md:p-12 prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Принятие условий</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  1.1. Доступ к веб-сайту promo-team.ru и его использование регулируются
                  настоящими Условиями использования.
                </p>
                {/* ... rest of the content ... */}
                {/* To avoid deleting the whole file content in my mind, I will use replace_content more targetedly or re-write the wrapper.
                   Wait, I should probably just target the surrounding tags if possible, or the specific lines.
                   The file is small enough (200 lines). I will just remove the imports and proper lines.
                */}

                <p className="text-gray-700 leading-relaxed mb-4">
                  1.2. Используя Сайт, вы подтверждаете, что прочитали, поняли и согласны
                  соблюдать настоящие Условия. Если вы не согласны с этими условиями,
                  пожалуйста, не используйте Сайт.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  1.3. Мы оставляем за собой право изменять настоящие Условия в любое время.
                  Обновленная версия будет размещена на Сайте с указанием даты последнего
                  обновления.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Возрастные ограничения</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  2.1. Сайт предназначен для лиц, достигших 18 лет.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  2.2. Если вам меньше 18 лет, вы можете использовать Сайт только под
                  надзором родителя или опекуна.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  2.3. Используя Сайт, вы подтверждаете, что вам исполнилось 18 лет или
                  что у вас есть согласие родителя/опекуна на использование Сайта.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Лицензия на использование</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  3.1. Мы предоставляем вам ограниченную, неисключительную, неотчуждаемую
                  лицензию на использование Сайта в соответствии с настоящими Условиями.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  3.2. Вам запрещается:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Копировать, модифицировать или распространять материалы Сайта без разрешения</li>
                  <li>Использовать Сайт для любых незаконных целей</li>
                  <li>Пытаться получить несанкционированный доступ к Сайту или его системам</li>
                  <li>Вмешиваться в работу Сайта или использовать вредоносное ПО</li>
                  <li>Собирать данные о других пользователях без их согласия</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  3.3. Все права на материалы Сайта (текст, изображения, логотипы, видео)
                  защищены авторским правом и принадлежат PROMO Team.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Интеллектуальная собственность</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  4.1. Весь контент на Сайте, включая但不限于 текст, изображения,
                  графику, логотипы, видео, аудио и программный код, является объектом
                  интеллектуальной собственности PROMO Team или наших licensors.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  4.2. Название «PROMO Team», логотипы и торговые марки являются
                  зарегистрированными товарными знаками PROMO Team.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  4.3. Любое использование материалов Сайта без письменного разрешения
                  запрещено и является нарушением авторских прав.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Пользовательский контент</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  5.1. Вы можете оставлять комментарии, отзывы и другой контент на Сайте
                  («Пользовательский контент»).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  5.2. Размещая Пользовательский контент, вы гарантируете, что:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Вы являетесь автором контента или имеете право на его публикацию</li>
                  <li>Контент не нарушает права третьих лиц</li>
                  <li>Контент не является незаконным, оскорбительным или вредоносным</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  5.3. Вы предоставляете нам неисключительное право использовать, воспроизводить,
                  модифицировать и публиковать Пользовательский контент на Сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Товары и услуги</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  6.1. Сайт может содержать информацию о товарах и услугах, доступных для
                  покупки.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  6.2. Мы оставляем за собой право в любое время изменять характеристики,
                  цены и наличие товаров без предварительного уведомления.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  6.3. Мы не гарантируем, что цвета изображений на Сайте точно соответствуют
                  реальному цвету товаров.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  6.4. Для возврата товара ознакомьтесь с нашей Политикой возврата и обмена.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Ссылки на сторонние ресурсы</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  7.1. Сайт может содержать ссылки на сторонние веб-сайты, которые не
                  контролируются PROMO Team.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  7.2. Мы не несем ответственности за содержание, политику конфиденциальности
                  или практики сторонних сайтов.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  7.3. Включение ссылки не означает одобрения или рекомендации материалов
                  стороннего сайта.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Ограничение ответственности</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  8.1. Сайт предоставляется «как есть» без каких-либо гарантий, явных или
                  подразумеваемых.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  8.2. Мы не гарантируем, что Сайт будет работать бесперебойно, своевременно,
                  безопасно или без ошибок.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  8.3. Мы не несем ответственности за любой ущерб, возникший в связи с
                  использованием или невозможностью использования Сайта.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  8.4. Максимальная ответственность PROMO Team ограничивается суммой,
                  уплаченной вами за товары/услуги на Сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. indemnification (Освобождение от ответственности)</h2>
                <p className="text-gray-700 leading-relaxed">
                  Вы соглашаетесь освободить и обезопасить PROMO Team, её должностных лиц,
                  директоров, сотрудников и агентов от любых претензий, требований, убытков,
                  ответственности и расходов (включая разумные гонорары адвокатов), возникающих
                  в связи с:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Вашим использованием Сайта</li>
                  <li>Вашим нарушением настоящих Условий</li>
                  <li>Вашим нарушением прав третьих лиц</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Применимое право</h2>
                <p className="text-gray-700 leading-relaxed">
                  Настоящие Условия регулируются и толкуются в соответствии с законодательством
                  Российской Федерации. Все споры разрешаются в соответствии с законодательством РФ.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Контакты</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  По всем вопросам, связанным с настоящими Условиями, свяжитесь с нами:
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
    </>
  )
}
