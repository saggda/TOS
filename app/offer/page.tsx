import { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Договор оферты | PROMO Team',
  description: 'Публичный договор оферты PROMO Team',
  robots: {
    index: false,
    follow: true,
  },
}

export default function OfferPage() {
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Публичный договор оферты
            </h1>

            <div className="glass-card p-8 md:p-12 prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Общие положения</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  1.1. Настоящий публичный договор оферты (далее — «Оферта») заключается между
                  PROMO Team (далее — «Продавец») и любым физическим лицом (далее — «Покупатель»),
                  который приобрел товары или услуги через сайт promo-team.ru (далее — «Сайт»).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  1.2. Моментом полного и безоговорочного принятия Покупателем условий Оферты
                  является факт оплаты товара или услуги.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  1.3. Продавец вправе вносить изменения в настоящую Оферту без предварительного
                  уведомления Покупателя. Новая редакция Оферты вступает в силу с момента её
                  размещения на Сайте, если иное не предусмотрено новой редакцией Оферты.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Предмет договора</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  2.1. Продавец обязуется передать в собственность Покупателя товары, указанные
                  на Сайте, а Покупатель обязуется принять и оплатить товар.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  2.2. Продавец обязуется предоставить Покупателю услуги по организации
                  мероприятий в соответствии с условиями, указанными на Сайте.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  2.3. Информация о товарах и услугах, представленная на Сайте, является
                  предложением заключить договор и носит информационный характер.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Цена и порядок оплаты</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  3.1. Цена на товары и услуги указывается на Сайте в рублях РФ.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  3.2. Продавец вправе изменить цену на товары и услуги в любое время без
                  предварительного уведомления Покупателя.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  3.3. Оплата товаров осуществляется Покупателем одним из следующих способов:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Банковской картой онлайн</li>
                  <li>Через платежные системы (ЮKassa, CloudPayments и др.)</li>
                  <li>По счету для юридических лиц</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  3.4. Считается, что Покупатель ознакомлен и согласен с порядком и условиями
                  оплаты, указанными на Сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Доставка</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  4.1. Доставка товаров осуществляется по территории РФ способами,
                  указанными на Сайте.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  4.2. Срок доставки зависит от региона проживания Покупателя и составляет
                  от 3 до 14 рабочих дней.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  4.3. Риск случайной гибели или повреждения товара переходит к Покупателю
                  с момента передачи товара ему или третьему лицу, указанному Покупателем.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Возврат и обмен</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  5.1. Покупатель вправе отказаться от товара в любое время до его передачи,
                  а после передачи товара — в течение 7 (семи) дней.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  5.2. Возврат товара надлежащего качества возможен в случае, если сохранены
                  его товарный вид и потребительские свойства, а также документ, подтверждающий
                  факт и условия покупки указанного товара.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  5.3. При отказе Покупателя от товара Продавец возвращает ему денежную
                  сумму, уплаченную Покупателем по договору, за исключением расходов Продавца
                  на доставку от Покупателя возвращенного товара.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Ответственность сторон</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  6.1. За неисполнение или ненадлежащее исполнение своих обязательств по
                  договору стороны несут ответственность в соответствии с законодательством РФ.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  6.2. Продавец не несет ответственности за ущерб, причиненный Покупателю
                  вследствие ненадлежащего использования товаров, приобретенных на Сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Конфиденциальность</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  7.1. Персональные данные Покупателя обрабатываются в соответствии с
                  Политикой конфиденциальности, размещенной на Сайте.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  7.2. Акцептуя Оферту, Покупатель дает согласие на обработку своих
                  персональных данных.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Реквизиты Продавца</h2>
                <div className="bg-milk-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-2">
                    <strong>Название:</strong> PROMO Team
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>ИНН:</strong> [Укажите ИНН]
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>ОГРН:</strong> [Укажите ОГРН]
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Юридический адрес:</strong> [Укажите адрес]
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> info@promo-team.ru
                  </p>
                  <p className="text-gray-700">
                    <strong>Телефон:</strong> +7 (999) 123-45-67
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Прочие условия</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  9.1. Во всем, что не предусмотрено настоящей Офертой, стороны руководствуются
                  действующим законодательством РФ.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  9.2. Все споры и разногласия, возникающие из настоящей Оферты или в связи с ней,
                  стороны будут стремиться разрешить путем переговоров.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  9.3. Настоящая Оферта вступает в силу с момента ее размещения на Сайте и
                  действует до момента отзыва Продавцом.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Дата публикации: {currentDate}
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
