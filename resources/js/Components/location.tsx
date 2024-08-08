import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MapPin, Clock } from 'lucide-react';

const locations = [
    { name: 'ORAN PARK', address: '351 Oran Park Drive, Oran Park NSW 2570' }
];

const LocationSection = () => {
    return (
        <section className="w-full flex items-center py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Colonna per la mappa */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-0">
                                <div className="aspect-square w-full">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7673015199857!2d150.73888097672935!3d-33.99851032579081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12f3005e251097%3A0x5e1ec2979db6fa91!2sBanksia%20Cafe%20%26%20Dessert%20Bar!5e0!3m2!1sen!2sau!4v1723023371146!5m2!1sen!2sau"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    {/* Colonna per il testo */}
                    <motion.div
                        className="w-full flex flex-col items-center md:items-start space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="w-full text-center md:text-left">
                            <motion.h2
                                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                OUR LOCATION
                            </motion.h2>
                            <div className="mt-6 space-y-4">
                                {locations.map((loc, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start justify-center md:justify-start space-x-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    >
                                        <MapPin className="text-[#43534A] mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#43534A]">{loc.name}</h3>
                                            <p className="text-gray-600">{loc.address}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <motion.div
                            className="w-full text-center md:text-left space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                <Clock className="text-[#43534A] flex-shrink-0" />
                                <h3 className="text-lg font-semibold text-[#43534A]">Hours</h3>
                            </div>
                            <p className="text-gray-600">Monday - Wednesday: 5:30 AM – 4 PM</p>
                            <p className="text-gray-600">Thursday - Saturday: 5:30 AM – 9 PM</p>
                            <p className="text-gray-600">Sunday: 6:30 AM – 5 PM</p>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-center md:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <Button asChild className="bg-[#43534A] text-gray-50 hover:bg-[#43534A]/90">
                                <a href="https://maps.app.goo.gl/wgNZ2s1Jfa24oX9s6" target="_blank" rel="noopener noreferrer">
                                    Find Us on Google Maps
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
