import { getEvents } from '@/lib/content'
import { EventCard } from '@/components/cards/EventCard'
import { Container } from '@/components/ui/Container'
import { generateListingMetadata } from '@/lib/metadata'

export const metadata = generateListingMetadata({
  title: 'Афиша',
  description: 'Предстоящие события и мероприятия. Event promo team creating unforgettable experiences.',
  path: '/afisha',
})

export default async function AfishaPage() {
  const events = await getEvents()

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">Афиша</h1>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-base sm:text-lg">Событий пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </Container>
  )
}
