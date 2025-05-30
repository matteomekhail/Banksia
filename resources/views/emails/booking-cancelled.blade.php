@component('mail::message')
# Booking Cancelled

Dear {{ $booking->name }},

We regret to inform you that your booking at **Banksia Oranpark** has been cancelled.

## Cancelled Booking Details

**Date:** {{ $booking->formatted_date }}
**Time:** {{ $booking->time }}
**Guests:** {{ $booking->guests }} people

@if($booking->special_requests)
**Special Requests:** {{ $booking->special_requests }}
@endif

@if($reason)
## Reason for Cancellation

{{ $reason }}
@endif

## What's Next?

We sincerely apologize for any inconvenience this may cause. If you would like to make a new booking, please visit our booking page or contact us directly.

@component('mail::button', ['url' => url('/book')])
Book Again
@endcomponent

## Need Help?

If you have any questions or concerns about this cancellation, please don't hesitate to contact us.

@component('mail::panel')
**Contact Information**
📧 **Email:** info@banksiaoranpark.com.au
📞 **Phone:** [Your phone number]
📍 **Address:** Banksia Oranpark Restaurant
@endcomponent

We appreciate your understanding and hope to welcome you at Banksia Oranpark in the future.

Best regards,
**The Banksia Oranpark Team**

@endcomponent
