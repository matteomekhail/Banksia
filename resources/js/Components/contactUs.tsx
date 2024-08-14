import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Inertia } from '@inertiajs/inertia'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters long.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    message: z.string().min(10, {
        message: 'Message must be at least 10 characters long.',
    }),
})

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            await Inertia.post('/send-email', values, {
                preserveState: true,
                preserveScroll: true,
            })

            setShowConfirmation(true)
            form.reset()
        } catch (error) {
            console.error('Failed to send email:', error)
            toast({
                title: 'Error',
                description: 'Failed to send message. Please try again later.',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
                    <CardDescription className='text-center'>We'd love to hear from you. Send us a message!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} className="bg-background" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your email" {...field} className="bg-background" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Your message" {...field} className="bg-background" rows={4} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-[#43534A] text-gray-50 hover:bg-[#43534A]/90"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send message'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent className="bg-[#FFF5EA]">
                    <DialogHeader>
                        <DialogTitle>Message Sent Successfully</DialogTitle>
                        <DialogDescription>
                            Thank you for contacting Banksia. We will get back to you soon.
                        </DialogDescription>
                    </DialogHeader>
                    <Button onClick={() => setShowConfirmation(false)} className="bg-[#43534A] text-gray-50 hover:bg-[#43534A]/90">
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}
