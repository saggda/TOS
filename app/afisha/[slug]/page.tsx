import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getEventBySlug } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { generateEventMetadata } from '@/lib/metadata'
import { TicketButton } from './TicketButton'
import { validateSlug } from '@/lib/validation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const validatedSlug = validateSlug(params.slug)
    const event = await getEventBySlug(validatedSlug)

    if (!event) {
      return {
        title: 'Событие не найдено',
      }
    }

    return generateEventMetadata({
      title: event.title,
      description: event.description,
      slug: event.slug,
      image: event.poster,
    })
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Ошибка',
    }
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  try {
    const validatedSlug = validateSlug(params.slug)
    const event = await getEventBySlug(validatedSlug)

    if (!event) {
      notFound()
    }

    return (
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <a
            href="/afisha"
            className="inline-block mb-6 text-white/70 hover:text-brand-red transition-colors"
          >
            ← Назад к афише
          </a>

          <div className="glass-card p-8 md:p-12">
            {/* Poster */}
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden mb-8 max-w-md mx-auto">
              <Image
                src={event.poster}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white drop-shadow-lg">{event.title}</h1>

            {/* Date & Location */}
            <div className="text-center text-white/80 mb-6">
              <p className="text-lg font-medium drop-shadow-sm">{formatDate(event.date)}</p>
              <p className="drop-shadow-sm">{event.city}, {event.venue}</p>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-white/90 leading-relaxed drop-shadow-md">{event.description}</p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <TicketButton ticketUrl={event.ticketUrl} eventSlug={event.slug} />
            </div>
          </div>
        </div>
      </Container>
    )
  } catch (error) {
    console.error('Event page error:', error)
    notFound()
  }
}