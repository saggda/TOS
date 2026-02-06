import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | PROMO Team',
  description: 'Политика обработки персональных данных в соответствии с ФЗ-152',
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen py-20 bg-brand-dark">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-white">
              Политика конфиденциальности
            </h1>

            <div className="glass-card p-8 md:p-12 prose prose-lg max-w-none prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">1. Общие положения</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  1.1. Настоящая Политика конфиденциальности определяет порядок обработки и
                  защиты персональных данных пользователей сайта promo-team.ru (далее — «Сайт»)
                  и соответствует требованиям Федерального закона от 27.07.2006 № 152-ФЗ
                  «О персональных данных» (далее — ФЗ-152).
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  1.2. Оператором персональных данных является PROMO Team (далее — «Оператор»).
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  1.3. Целью настоящей Политики является обеспечение надлежащей защиты
                  информации о пользователях, включая их персональные данные, от
                  несанкционированного доступа и разглашения.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  1.4. Оставляя данные на Сайте, Пользователь соглашается с условиями настоящей
                  Политики конфиденциальности.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">2. Какие данные мы собираем?</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-200">2.1. Персональные данные</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Мы собираем следующие персональные данные:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>Фамилия, имя, отчество</li>
                  <li>Контактный телефон</li>
                  <li>Адрес электронной почты</li>
                  <li>Адрес доставки</li>
                  <li>Платёжные данные (зашифрованные)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-200">2.2. Данные, собираемые автоматически</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  При посещении Сита автоматически собираются следующие данные:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>IP-адрес</li>
                  <li>Информация о браузере и устройстве</li>
                  <li>Дата и время посещения</li>
                  <li>Просмотренные страницы</li>
                  <li>Источники перехода на Сайт</li>
                  <li>Файлы cookie</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-200">2.3. Иные данные</h3>
                <p className="text-gray-300 leading-relaxed">
                  Мы также можем собирать данные, которые вы предоставляете добровольно:
                  сообщения через формы обратной связи, комментарии, отзывы и т.д.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">3. Цели сбора и обработки данных</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Мы обрабатываем персональные данные для следующих целей:
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Исполнение договоров и обязательств (доставка товаров, продажа билетов)</li>
                  <li>Связь с пользователями (уведомления, подтверждения заказов)</li>
                  <li>Улучшение качества работы Сайта</li>
                  <li>Аналитика и статистика</li>
                  <li>Маркетинговые коммуникации (при наличии согласия)</li>
                  <li>Предотвращение мошенничества</li>
                  <li>Соблюдение требований законодательства</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">4. Правовая основа обработки</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Обработка персональных данных осуществляется на основании:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>Статьи 24 Конституции РФ</li>
                  <li>Федерального закона № 152-ФЗ «О персональных данных»</li>
                  <li>Гражданского кодекса РФ</li>
                  <li>Федерального закона № 2300-1 «О защите прав потребителей»</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Обработка персональных данных осуществляется с согласия субъекта
                  персональных данных.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">5. Условия обработки данных</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  5.1. Обработка персональных данных осуществляется с согласия субъекта
                  персональных данных на обработку его персональных данных.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  5.2. Согласие на обработку персональных данных может быть отозвано
                  Пользователем в любой момент путём направления письменного уведомления
                  на адрес электронной почты: info@promo-team.ru
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  5.3. Обработка персональных данных осуществляется законно, справедливо
                  и на основе добросовестности.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  5.4. Обработка персональных данных ограничивается достижением конкретных,
                  заранее определенных и законных целей. Не допускается обработка персональных
                  данных, несовместимая с целями сбора персональных данных.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">6. Защита персональных данных</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Оператор принимает все необходимые организационные и технические меры для
                  защиты персональных данных пользователей от неправомерного или случайного
                  доступа к ним, уничтожения, изменения, блокирования, копирования,
                  распространения, а также от иных неправомерных действий:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>SSL-шифрование данных</li>
                  <li>Ограничение доступа к персональным данным</li>
                  <li>Регулярное обновление систем безопасности</li>
                  <li>Контроль за соблюдением мер безопасности</li>
                  <li>Обучение сотрудников правилам защиты данных</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Однако мы не можем гарантировать абсолютную защиту данных от любых угроз,
                  существующих в сети Интернет.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">7. Передача данных третьим лицам</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Мы не передаем персональные данные третьим лицам, за исключением следующих
                  случаев:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>Пользователь выразил согласие на такие действия</li>
                  <li>Передача необходима для использования Пользователем определенного сервиса
                    либо для исполнения определенного соглашения или договора с Пользователем</li>
                  <li>Передача предусмотрена российским или иным применимым законодательством
                    в рамках установленной процедуры</li>
                  <li>В целях обеспечения возможности защиты прав и законных интересов Оператора
                    или третьих лиц</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-200">Третьи лица, которым могут передаваться данные:</h3>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Службы доставки</li>
                  <li>Платежные системы (банки, платежные шлюзы)</li>
                  <li>Аналитические сервисы (Яндекс, Google)</li>
                  <li>IT-поддержка и хостинг-провайдеры</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">8. Права пользователей</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Пользователь имеет право:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mb-4">
                  <li>Получить информацию, касающуюся обработки его персональных данных</li>
                  <li>Требовать уточнения своих персональных данных</li>
                  <li>Требовать удаления или блокирования своих персональных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия Оператора в уполномоченном органе по защите прав
                    субъектов персональных данных или в суде</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Для реализации прав направьте письменное заявление на электронную почту:
                  info@promo-team.ru
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">9. Изменение Политики</h2>
                <p className="text-gray-300 leading-relaxed">
                  Оператор вправе вносить изменения в настоящую Политику. При внесении
                  изменений в актуальной редакции указывается дата последнего обновления.
                  Новая редакция Политики вступает в силу с момента её размещения на Сайте,
                  если иное не предусмотрено новой редакцией Политики.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">10. Контакты</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  По всем вопросам, связанным с обработкой персональных данных, вы можете
                  связаться с нами:
                </p>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <p className="text-gray-300 mb-2">
                    <strong>Название:</strong> PROMO Team
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Email:</strong> <a href="mailto:info@promo-team.ru" className="text-brand-red hover:underline">info@promo-team.ru</a>
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Телефон:</strong> <a href="tel:+79991234567" className="text-brand-red hover:underline">+7 (999) 123-45-67</a>
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Адрес:</strong> Москва, Россия [Уточните адрес]
                  </p>
                  <p className="text-gray-300 text-sm mt-4">
                    Для жалоб на нарушение прав субъектов персональных данных:
                    Роскомнадзор — <a href="https://rkn.gov.ru" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">rkn.gov.ru</a>
                  </p>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200/10">
                <p className="text-sm text-gray-500">
                  Дата последнего обновления: {new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  В соответствии с ФЗ-152 «О персональных данных» от 27.07.2006 № 152-ФЗ
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
