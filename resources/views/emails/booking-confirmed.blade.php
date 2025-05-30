@component('mail::message')
# Booking Confirmed! 🎉

Dear {{ $booking->name }},

Great news! Your booking at **Banksia Oranpark** has been **CONFIRMED** by our team.

## Confirmed Booking Details

**Date:** {{ $booking->formatted_date }}
**Time:** {{ $booking->time }}
**Guests:** {{ $booking->guests }} people

@if($booking->special_requests)
**Special Requests:** {{ $booking->special_requests }}
@endif

## What's Next?

Your table is now secured! Here's what you need to know:

- **Please arrive 15 minutes before your booking time**
- Bring this confirmation email with you (or save the details)
- If you're running late, please call us to let us know

@component('mail::panel')
**Important Reminders**
- For cancellations, please give us at least 24 hours notice
- If you need to make changes, contact us as soon as possible
- We accommodate dietary requirements - just let us know when you arrive
@endcomponent

## Contact Information

@component('mail::panel')
📧 **Email:** info@banksiaoranpark.com.au
📞 **Phone:** [Your phone number]
📍 **Address:** Banksia Oranpark Restaurant
@endcomponent

We're excited to welcome you and provide you with an unforgettable dining experience!

Best regards,
**The Banksia Oranpark Team**

@endcomponent
