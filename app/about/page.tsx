import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'О нас - PROMO Team',
  description: 'О нашей команде',
}

export default function AboutPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">О нас</h1>

        <div className="space-y-8 text-lg text-white/90 leading-relaxed">
          <p className="drop-shadow-md">
            PROMO Team — это event-команда, создающая незабываемые впечатления
            в мире электронной музыки и ночной культуры.
          </p>

          <p className="drop-shadow-md">
            Мы организуем мероприятия в лучших клубах Москвы, Санкт-Петербурга
            и других городов России. Наша миссия — создавать качественные,
            стильные и атмосферные события, которые запоминаются надолго.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-brand-red mb-2 drop-shadow-lg">50+</div>
              <div className="text-white/80">Мероприятий</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-brand-red mb-2 drop-shadow-lg">10K+</div>
              <div className="text-white/80">Посетителей</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-brand-red mb-2 drop-shadow-lg">2024</div>
              <div className="text-white/80">Основана</div>
            </div>
          </div>

          <p className="drop-shadow-md">
            В нашем магазине представлен фирменный мерч, созданный с любовью к деталям
            и вниманием к качеству. Каждая вещь разработана нашим дизайнерским отделом
            и произведена в ограниченном количестве.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-16 glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Связаться с нами</h2>
          <div className="space-y-2 text-white/80 mb-6">
            <p className="drop-shadow-sm">📧 info@promo-team.ru</p>
            <p className="drop-shadow-sm">📱 +7 (999) 123-45-67</p>
          </div>
          <Button size="lg" href="https://t.me/" target="_blank" rel="noopener noreferrer">
            Написать в Telegram
          </Button>
        </div>
      </div>
    </Container>
  )
}
