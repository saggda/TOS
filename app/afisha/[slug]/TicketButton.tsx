'use client'

import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'

interface TicketButtonProps {
  ticketUrl: string
  eventSlug: string
}

export function TicketButton({ ticketUrl, eventSlug }: TicketButtonProps) {
  const toast = useToast()

  const handleTicketClick = () => {
    console.log('ticket_click', {
      slug: eventSlug,
      url: ticketUrl,
    })

    toast.success('Переход к покупке билета...', 3000)
  }

  return (
    <a
      href={ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleTicketClick}
      className="inline-block"
    >
      <Button size="lg">Купить билет</Button>
    </a>
  )
}
