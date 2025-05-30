import { Head } from '@inertiajs/react';
import Layout from '@/Components/layout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import React from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import { isEqual } from 'date-fns';
import { toast } from '@/Components/ui/use-toast';
import { useToast } from '@/Components/ui/use-toast';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import axios from 'axios';

// Define the interface for page props
interface PageProps {
    flash: {
        message?: string;
        error?: string;
        success?: string;
    };
    [key: string]: any;
}

// Register locale
registerLocale('en-GB', enGB);
setDefaultLocale('en-GB');

// Move form initial state outside component to prevent recreation
const initialFormState = {
    name: '',
    email: '',
    date: null as Date | null,
    time: '',
    guests: '2',
    specialRequests: ''
};

// Move static arrays outside component
const TIME_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const GUEST_NUMBERS = [1, 2, 3, 4, 5];

export default function Book() {
    const { toast } = useToast();
    const { flash } = usePage<PageProps>().props;

    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [holidays, setHolidays] = useState<Date[]>([]);
    const [isLoadingHolidays, setIsLoadingHolidays] = useState(true);
    const [availabilityStatus, setAvailabilityStatus] = useState<{[key: string]: boolean}>({});
    const [availabilityMessages, setAvailabilityMessages] = useState<{[key: string]: string}>({});
    const [checkingAvailability, setCheckingAvailability] = useState(false);

    // Funzione per caricare i giorni festivi
    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const year = new Date().getFullYear();
                const response = await fetch(
                    `https://date.nager.at/api/v3/PublicHolidays/${year}/AU`
                );
                const data = await response.json();

                // Converte le date string in oggetti Date
                const holidayDates = data.map((holiday: { date: string }) =>
                    new Date(holiday.date)
                );

                setHolidays(holidayDates);
            } catch (error) {
                console.error('Failed to fetch holidays:', error);
                // Fallback a un array vuoto in caso di errore
                setHolidays([]);
            } finally {
                setIsLoadingHolidays(false);
            }
        };

        fetchHolidays();
    }, []);

    // Function to check availability when date or time changes
    const checkAvailability = async (date: string, time: string, guests: string) => {
        if (!date || !time || !guests) return;

        setCheckingAvailability(true);
        const key = `${date}-${time}-${guests}`;

        try {
            const response = await axios.post('/api/booking/check-availability', {
                date,
                time,
                guests: parseInt(guests)
            });

            setAvailabilityStatus(prev => ({
                ...prev,
                [key]: response.data.available
            }));

            // Store additional availability info
            if (!response.data.available) {
                const message = `Only ${response.data.availableSpots} spots available (${response.data.existingGuests} already booked)`;
                setAvailabilityMessages(prev => ({
                    ...prev,
                    [`${key}-message`]: message
                }));
            }
        } catch (error) {
            console.error('Failed to check availability:', error);
            setAvailabilityStatus(prev => ({
                ...prev,
                [key]: false
            }));
        } finally {
            setCheckingAvailability(false);
        }
    };

    // Check availability when date, time, or guests changes
    useEffect(() => {
        if (formData.date && formData.time && formData.guests) {
            const dateString = formData.date.toISOString().split('T')[0];
            checkAvailability(dateString, formData.time, formData.guests);
        }
    }, [formData.date, formData.time, formData.guests]);

    // Memoize the filterAvailableDates function
    const filterAvailableDates = React.useCallback((date: Date) => {
        return !holidays.some(holiday =>
            isEqual(
                new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                new Date(holiday.getFullYear(), holiday.getMonth(), holiday.getDate())
            )
        );
    }, [holidays]);

    // Memoize handlers
    const handleDateChange = React.useCallback((date: Date | null) => {
        setFormData(prev => ({ ...prev, date }));
    }, []);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    // Add useEffect to handle flash messages
    useEffect(() => {
        console.log('Component mounted, flash:', flash); // Debug log

        if (flash?.message) {
            console.log('Showing success toast:', flash.message); // Debug log
            toast({
                title: "Success",
                description: flash.message,
            });
        }

        if (flash?.error) {
            console.log('Showing error toast:', flash.error); // Debug log
            toast({
                title: "Error",
                description: flash.error,
                variant: "destructive",
            });
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.date || !formData.time) {
            toast({
                title: "Error",
                description: "Please select both date and time",
                variant: "destructive",
            });
            return;
        }

        const dateString = formData.date.toISOString().split('T')[0];
        const key = `${dateString}-${formData.time}-${formData.guests}`;

        // Check if we know this slot is unavailable
        if (availabilityStatus[key] === false) {
            const customMessage = availabilityMessages[`${key}-message`];
            toast({
                title: "Error",
                description: customMessage || "This time slot is not available. Please choose another time.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        router.post('/book', {
            ...formData,
            date: dateString,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setFormData(initialFormState);
                setAvailabilityStatus({});
                setAvailabilityMessages({});
            },
            onError: (errors) => {
                Object.keys(errors).forEach(key => {
                    toast({
                        title: "Error",
                        description: errors[key],
                        variant: "destructive",
                    });
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    // Get availability status for current selection
    const getCurrentAvailabilityStatus = () => {
        if (!formData.date || !formData.time || !formData.guests) return null;

        const dateString = formData.date.toISOString().split('T')[0];
        const key = `${dateString}-${formData.time}-${formData.guests}`;

        if (checkingAvailability) {
            return { status: 'checking', message: 'Checking availability...' };
        }

        if (availabilityStatus[key] === true) {
            return { status: 'available', message: 'Time slot available' };
        }

        if (availabilityStatus[key] === false) {
            const customMessage = availabilityMessages[`${key}-message`];
            return {
                status: 'unavailable',
                message: customMessage || 'Time slot not available'
            };
        }

        return null;
    };

    const availabilityInfo = getCurrentAvailabilityStatus();

    // Componente personalizzato per l'header del calendario
    const CustomHeader = ({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    }: any) => (
        <div className="flex items-center justify-between px-2 py-2 bg-[#43534A]">
            <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className="p-1 hover:bg-[#43534A]/80 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <span className="text-white font-semibold">
                {date.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}
            </span>
            <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className="p-1 hover:bg-[#43534A]/80 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );

    // Componente personalizzato per l'input del calendario
    const CustomInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
        <div className="relative">
            <input
                ref={ref}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors pr-10"
                value={value}
                onClick={onClick}
                readOnly
            />
            <button
                type="button"
                onClick={onClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#43534A]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>
        </div>
    ));

    return (
        <Layout>
            <Head title="Book Now" />

            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]">
                        Book Your Table
                    </h1>

                    <div className="bg-white shadow-xl rounded-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#43534A]">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#43534A]">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#43534A]">Date</label>
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        required
                                        locale="en-GB"
                                        renderCustomHeader={CustomHeader}
                                        calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg [&_.react-datepicker__day--outside-month]{visibility:hidden}"
                                        wrapperClassName="w-full"
                                        customInput={<CustomInput />}
                                        popperClassName="z-50"
                                        filterDate={filterAvailableDates}
                                        disabled={isLoadingHolidays}
                                        popperModifiers={[
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [0, 8]
                                                },
                                                fn: ({ x, y }) => ({ x, y })
                                            }
                                        ]}
                                        formatWeekDay={nameOfDay => nameOfDay.substring(0, 3)}
                                        showMonthYearPicker={false}
                                        shouldCloseOnSelect={true}
                                        monthsShown={1}
                                        inline={false}
                                        calendarStartDay={1}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#43534A]">Time</label>
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors"
                                        required
                                    >
                                        <option value="">Select a time</option>
                                        {TIME_SLOTS.map((time) => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>

                                    {/* Availability Status */}
                                    {availabilityInfo && (
                                        <div className={`mt-2 text-sm font-medium ${
                                            availabilityInfo.status === 'available' ? 'text-green-600' :
                                            availabilityInfo.status === 'unavailable' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>
                                            {availabilityInfo.status === 'checking' && (
                                                <div className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    {availabilityInfo.message}
                                                </div>
                                            )}
                                            {availabilityInfo.status === 'available' && (
                                                <div className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    {availabilityInfo.message}
                                                </div>
                                            )}
                                            {availabilityInfo.status === 'unavailable' && (
                                                <div className="flex items-center">
                                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    {availabilityInfo.message}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#43534A]">Number of Guests</label>
                                    <select
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors"
                                        required
                                    >
                                        {GUEST_NUMBERS.map((num) => (
                                            <option key={num} value={num}>
                                                {num} people
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-[#43534A]">Special Requests</label>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors resize-none"
                                        placeholder="Any special requests or dietary requirements..."
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || availabilityInfo?.status === 'unavailable'}
                                    className={`w-full py-3 px-4 rounded-md transition-colors ${
                                        isSubmitting || availabilityInfo?.status === 'unavailable'
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#43534A] hover:bg-[#43534A]/90'
                                    } text-white`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Book Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
