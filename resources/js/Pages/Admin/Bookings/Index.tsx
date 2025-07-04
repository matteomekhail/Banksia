import { Head } from '@inertiajs/react';
import Layout from '@/Components/layout';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { toast } from '@/Components/ui/use-toast';
import { useToast } from '@/Components/ui/use-toast';

interface Booking {
    id: number;
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    special_requests?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    confirmed_at?: string;
    created_at: string;
    updated_at: string;
    formatted_date: string;
}

interface PaginatedBookings {
    data: Booking[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    bookings: PaginatedBookings;
}

export default function BookingsIndex({ bookings }: Props) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Start from the first booking's week if there are bookings, otherwise current week
    const getInitialWeek = () => {
        if (bookings.data.length > 0) {
            // Get the first booking's date and start from that week
            const firstBookingDate = new Date(bookings.data[0].date);
            return firstBookingDate;
        }
        return new Date();
    };

    const [currentWeek, setCurrentWeek] = useState(getInitialWeek());
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    // Function to get available time slots based on day of week
    const getTimeSlotsForDay = (date: Date): string[] => {
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

        // Define time slots for different scenarios - starting from 9:00 AM
        const morningSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
        const dinnerSlots = ["18:00", "18:30", "19:00", "19:30", "20:00"];

        // Sunday (0), Monday (1), Tuesday (2), Wednesday (3): only morning/lunch until 3pm
        if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3) {
            return morningSlots;
        }

        // Thursday (4), Friday (5), Saturday (6): morning/lunch + dinner until 8pm
        if (dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6) {
            return [...morningSlots, ...dinnerSlots];
        }

        // Fallback (shouldn't happen)
        return morningSlots;
    };

    // Time slots for the restaurant - now dynamic based on all possible slots
    const allTimeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
        "18:00", "18:30", "19:00", "19:30", "20:00"
    ];

    // Get start of current week (Monday)
    const getWeekStart = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(d.setDate(diff));
    };

    // Navigation functions
    const goToPreviousWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeek(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeek(newDate);
    };

    const goToCurrentWeek = () => {
        setCurrentWeek(new Date());
    };

    // Get week data
    const weekData = useMemo(() => {
        const weekStart = getWeekStart(currentWeek);
        const days = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateString = date.toISOString().split('T')[0];

            // Get bookings for this date - be more flexible with date matching
            const dayBookings = bookings.data.filter(booking => {
                // Handle both date string formats
                let bookingDate = booking.date;
                if (booking.date.includes(' ')) {
                    // If date includes time, extract just the date part
                    bookingDate = booking.date.split(' ')[0];
                }
                if (booking.date.includes('T')) {
                    // If date includes T (ISO format), extract just the date part
                    bookingDate = booking.date.split('T')[0];
                }

                return bookingDate === dateString;
            });

            days.push({
                date: date,
                dateString: dateString,
                bookings: dayBookings,
                isToday: date.toDateString() === new Date().toDateString()
            });
        }

        return days;
    }, [currentWeek, bookings.data]);

    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const shortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-400 border-yellow-500 text-yellow-900';
            case 'confirmed':
                return 'bg-green-400 border-green-500 text-green-900';
            case 'cancelled':
                return 'bg-red-400 border-red-500 text-red-900';
            default:
                return 'bg-gray-400 border-gray-500 text-gray-900';
        }
    };

    const handleStatusChange = (bookingId: number, action: 'confirm' | 'cancel') => {
        setIsLoading(true);

        router.patch(`/admin/bookings/${bookingId}/${action}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: `Booking ${action}ed successfully`,
                });
                setSelectedBooking(null);
            },
            onError: (errors) => {
                toast({
                    title: "Error",
                    description: "Failed to update booking status",
                    variant: "destructive",
                });
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handleDelete = (bookingId: number) => {
        if (!confirm('Are you sure you want to delete this booking?')) {
            return;
        }

        setIsLoading(true);

        router.delete(`/admin/bookings/${bookingId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Booking deleted successfully",
                });
                setSelectedBooking(null);
            },
            onError: (errors) => {
                toast({
                    title: "Error",
                    description: "Failed to delete booking",
                    variant: "destructive",
                });
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const formatDateRange = () => {
        const weekStart = getWeekStart(currentWeek);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        const startMonth = weekStart.toLocaleString('en-GB', { month: 'short' });
        const endMonth = weekEnd.toLocaleString('en-GB', { month: 'short' });
        const year = weekStart.getFullYear();

        if (startMonth === endMonth) {
            return `${startMonth} ${weekStart.getDate()}-${weekEnd.getDate()}, ${year}`;
        } else {
            return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}, ${year}`;
        }
    };

    // Get booking for specific day and time
    const getBookingForSlot = (dayIndex: number, timeSlot: string) => {
        const day = weekData[dayIndex];
        return day.bookings.find(booking => booking.time === timeSlot);
    };

    return (
        <Layout>
            <Head title="Admin - Weekly Calendar" />

            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-[1400px] mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]">
                            Weekly Booking Calendar
                        </h1>
                        <p className="text-center text-gray-600">
                            Manage restaurant bookings in weekly view
                        </p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        {/* Stats Bar */}
                        <div className="bg-[#43534A] text-white p-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-xl font-bold">{bookings.total}</div>
                                    <div className="text-xs opacity-80">Total Bookings</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">
                                        {bookings.data.filter(b => b.status === 'pending').length}
                                    </div>
                                    <div className="text-xs opacity-80">Pending</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">
                                        {bookings.data.filter(b => b.status === 'confirmed').length}
                                    </div>
                                    <div className="text-xs opacity-80">Confirmed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">
                                        {bookings.data.filter(b => b.status === 'cancelled').length}
                                    </div>
                                    <div className="text-xs opacity-80">Cancelled</div>
                                </div>
                            </div>
                        </div>

                        {/* Calendar Navigation */}
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={goToPreviousWeek}
                                        className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h2 className="text-xl font-bold text-[#43534A]">
                                        {formatDateRange()}
                                    </h2>
                                    <button
                                        onClick={goToNextWeek}
                                        className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={goToCurrentWeek}
                                    className="px-4 py-2 bg-[#43534A] text-white rounded-md hover:bg-[#43534A]/90 transition-colors"
                                >
                                    This Week
                                </button>
                            </div>
                        </div>

                        {/* Weekly Calendar Grid */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[1200px]">
                                {/* Day Headers */}
                                <div className="grid grid-cols-8 border-b border-gray-200">
                                    {/* Time column header */}
                                    <div className="p-3 bg-gray-50 border-r border-gray-200 text-center font-medium text-gray-700">
                                        Time
                                    </div>
                                    {/* Day headers */}
                                    {weekData.map((day, index) => (
                                        <div
                                            key={index}
                                            className={`p-3 text-center border-r border-gray-200 ${
                                                day.isToday ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <div className="font-medium">{shortDayNames[index]}</div>
                                            <div className={`text-lg ${day.isToday ? 'font-bold' : ''}`}>
                                                {day.date.getDate()}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {day.date.toLocaleString('en-GB', { month: 'short' })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Time slots and bookings */}
                                {allTimeSlots.map((timeSlot) => (
                                    <div key={timeSlot} className="grid grid-cols-8 border-b border-gray-200">
                                        {/* Time label */}
                                        <div className="p-3 bg-gray-50 border-r border-gray-200 text-center font-medium text-gray-700">
                                            {timeSlot}
                                        </div>

                                        {/* Day columns */}
                                        {weekData.map((day, dayIndex) => {
                                            const booking = getBookingForSlot(dayIndex, timeSlot);
                                            const isTimeSlotAvailable = getTimeSlotsForDay(day.date).includes(timeSlot);

                                            return (
                                                <div
                                                    key={dayIndex}
                                                    className={`min-h-[80px] p-2 border-r border-gray-200 ${
                                                        day.isToday ? 'bg-blue-50' : 'bg-white'
                                                    } hover:bg-gray-50 transition-colors`}
                                                >
                                                    {!isTimeSlotAvailable ? (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                                            Not available
                                                        </div>
                                                    ) : booking ? (
                                                        <div
                                                            onClick={() => setSelectedBooking(booking)}
                                                            className={`w-full h-full p-2 rounded-md border-l-4 cursor-pointer shadow-sm hover:shadow-md transition-all ${getStatusColor(booking.status)}`}
                                                        >
                                                            <div className="font-semibold text-sm truncate mb-1">
                                                                {booking.name}
                                                            </div>
                                                            <div className="text-xs opacity-90 truncate mb-1">
                                                                {booking.email}
                                                            </div>
                                                            <div className="text-xs font-medium">
                                                                {booking.guests} guests
                                                            </div>
                                                            <div className="text-xs mt-1 font-medium uppercase tracking-wide">
                                                                {booking.status}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                            Available
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded"></div>
                                    <span className="text-sm text-gray-700">Pending</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-green-400 border border-green-500 rounded"></div>
                                    <span className="text-sm text-gray-700">Confirmed</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-red-400 border border-red-500 rounded"></div>
                                    <span className="text-sm text-gray-700">Cancelled</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Booking Detail Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-[#43534A]">
                                    Booking #{selectedBooking.id}
                                </h3>
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                                    <p className="text-lg">{selectedBooking.name}</p>
                                    <p className="text-sm text-gray-600">{selectedBooking.email}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date</label>
                                        <p>{selectedBooking.formatted_date}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Time</label>
                                        <p>{selectedBooking.time}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Guests</label>
                                    <p>{selectedBooking.guests} people</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                                        {selectedBooking.status}
                                    </span>
                                </div>

                                {selectedBooking.special_requests && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                                        <p className="text-sm bg-gray-50 p-2 rounded">{selectedBooking.special_requests}</p>
                                    </div>
                                )}

                                <div className="flex space-x-2 pt-4">
                                    {selectedBooking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(selectedBooking.id, 'confirm')}
                                                disabled={isLoading}
                                                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-4 rounded-md transition-colors"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(selectedBooking.id, 'cancel')}
                                                disabled={isLoading}
                                                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-4 rounded-md transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => router.get(`/admin/bookings/${selectedBooking.id}`)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedBooking.id)}
                                        disabled={isLoading}
                                        className="bg-red-800 hover:bg-red-900 disabled:bg-red-400 text-white py-2 px-4 rounded-md transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </Layout>
    );
}
