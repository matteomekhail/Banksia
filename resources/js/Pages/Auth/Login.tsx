import { Head } from '@inertiajs/react';
import Layout from '@/Components/layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from '@/Components/ui/use-toast';
import { useToast } from '@/Components/ui/use-toast';

export default function Login() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/login', formData, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Logged in successfully",
                });
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

    return (
        <Layout>
            <Head title="Admin Login" />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]">
                            Admin Login
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Sign in to access the admin dashboard
                        </p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#43534A]">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#43534A]">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#43534A] focus:ring focus:ring-[#43534A] focus:ring-opacity-50 transition-colors"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-[#43534A] focus:ring-[#43534A] border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-md transition-colors ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#43534A] hover:bg-[#43534A]/90'
                                    } text-white font-medium`}
                                >
                                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Test credentials: admin@test.com / password
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
