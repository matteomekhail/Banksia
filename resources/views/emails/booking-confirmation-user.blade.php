@component('mail::message')
# Booking Received

Dear {{ $booking->name }},

Thank you for your booking at **Banksia Oranpark**! We have received your booking request and will review it shortly.

## Booking Details

**Date:** {{ $booking->formatted_date }}
**Time:** {{ $booking->time }}
**Guests:** {{ $booking->guests }} people

@if($booking->special_requests)
**Special Requests:** {{ $booking->special_requests }}
@endif

## What's Next?

We have received your booking and it is currently **pending confirmation**. Our team will review your booking and send you a final confirmation within 24 hours.

You will receive another email once your booking has been confirmed by our staff.

## Important Information

- Please wait for final confirmation before making other arrangements
- If you need to make any changes, please contact us as soon as possible
- For questions about your booking, please reference your booking details above

@component('mail::panel')
**Contact Information**
📧 Email: info@banksiaoranpark.com.au
📍 Address: Banksia Oranpark Restaurant
@endcomponent

Thank you for choosing Banksia Oranpark. We will get back to you soon!

Best regards,
**The Banksia Oranpark Team**

@endcomponent
