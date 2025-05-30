import { Head } from '@inertiajs/react';
import Layout from '@/Components/layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
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

interface Props {
    booking: Booking;
}

export default function BookingShow({ booking }: Props) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleStatusChange = (action: 'confirm' | 'cancel') => {
        setIsLoading(true);

        router.patch(`/admin/bookings/${booking.id}/${action}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: `Booking ${action}ed successfully`,
                });
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

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this booking?')) {
            return;
        }

        setIsLoading(true);

        router.delete(`/admin/bookings/${booking.id}`, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Booking deleted successfully",
                });
                router.get('/admin/bookings');
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

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Layout>
            <Head title={`Booking #${booking.id} - Admin`} />

            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]">
                                    Booking #{booking.id}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Submitted on {formatDateTime(booking.created_at)}
                                </p>
                            </div>
                            <button
                                onClick={() => router.get('/admin/bookings')}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                ← Back to Bookings
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-xl rounded-lg p-8">
                                <h2 className="text-2xl font-semibold text-[#43534A] mb-6">Booking Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer Name
                                        </label>
                                        <p className="text-lg text-gray-900">{booking.name}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <p className="text-lg text-gray-900">
                                            <a
                                                href={`mailto:${booking.email}`}
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {booking.email}
                                            </a>
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <p className="text-lg text-gray-900">{booking.formatted_date}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Time
                                        </label>
                                        <p className="text-lg text-gray-900">{booking.time}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Guests
                                        </label>
                                        <p className="text-lg text-gray-900">{booking.guests} people</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {booking.special_requests && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Special Requests
                                        </label>
                                        <div className="bg-gray-50 rounded-md p-4">
                                            <p className="text-gray-900">{booking.special_requests}</p>
                                        </div>
                                    </div>
                                )}

                                {booking.confirmed_at && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmed At
                                        </label>
                                        <p className="text-lg text-gray-900">{formatDateTime(booking.confirmed_at)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow-xl rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-[#43534A] mb-6">Actions</h3>

                                <div className="space-y-4">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange('confirm')}
                                                disabled={isLoading}
                                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
                                            >
                                                {isLoading ? 'Processing...' : 'Confirm Booking'}
                                            </button>

                                            <button
                                                onClick={() => handleStatusChange('cancel')}
                                                disabled={isLoading}
                                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
                                            >
                                                {isLoading ? 'Processing...' : 'Cancel Booking'}
                                            </button>
                                        </>
                                    )}

                                    {booking.status === 'confirmed' && (
                                        <button
                                            onClick={() => handleStatusChange('cancel')}
                                            disabled={isLoading}
                                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
                                        >
                                            {isLoading ? 'Processing...' : 'Cancel Booking'}
                                        </button>
                                    )}

                                    <hr className="my-4" />

                                    <button
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                        className="w-full bg-red-800 hover:bg-red-900 disabled:bg-red-400 text-white py-3 px-4 rounded-md transition-colors font-medium"
                                    >
                                        {isLoading ? 'Processing...' : 'Delete Booking'}
                                    </button>
                                </div>

                                {/* Quick Info */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-700 mb-4">Quick Info</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Booking ID:</span>
                                            <span className="font-medium">#{booking.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Created:</span>
                                            <span className="font-medium">{formatDateTime(booking.created_at)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Updated:</span>
                                            <span className="font-medium">{formatDateTime(booking.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
