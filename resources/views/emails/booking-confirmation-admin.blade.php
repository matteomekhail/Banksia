@component('mail::message')
# New Booking Received

A new booking has been submitted on the website.

## Customer Details

**Name:** {{ $booking->name }}
**Email:** {{ $booking->email }}

## Booking Details

**Date:** {{ $booking->formatted_date }}
**Time:** {{ $booking->time }}
**Guests:** {{ $booking->guests }} people

@if($booking->special_requests)
**Special Requests:** {{ $booking->special_requests }}
@endif

## Actions Required

@component('mail::button', ['url' => url('/admin/bookings/' . $booking->id)])
View Booking Details
@endcomponent

The booking is currently **pending** and requires your confirmation.

@component('mail::panel')
**Booking ID:** #{{ $booking->id }}
**Submitted:** {{ $booking->created_at->format('d/m/Y H:i') }}
**Status:** {{ ucfirst($booking->status) }}
@endcomponent

Please log into the admin dashboard to confirm or modify this booking.

---
**Banksia Oranpark Admin System**

@endcomponent
