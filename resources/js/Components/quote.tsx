import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Inertia } from '@inertiajs/inertia';
import SmoothScroll from 'smooth-scroll';

export default function Quote(props: any) {

    useEffect(() => {
        var scroll = new SmoothScroll('a[href*="#"]', {
            speed: 800,
            speedAsDuration: true
        });
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [project, setProject] = useState("");


    function handleSubmit(e: any) {
        e.preventDefault();

        Inertia.post('/send-email', {
            name,
            email,
            company,
            project,
            _token: props.csrf,
        });
    }

    return (
        <section className="w-full py-12 md:py-10 lg:pt-20 flex justify-center" id="quote">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-xl space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className=" text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-300 to-purple-400">Request a Quote</h2>
                        <p className="text-gray-800 dark:text-gray-300">
                            Fill out the form below to get a custom quote for your project.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} action="/send-email" method="post" className="text-gray-800 dark:text-gray-300">
                        <input type="hidden" name="_token" value={props.csrf} />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="bg-white dark:bg-black" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" type="email" className="bg-white dark:bg-black" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" name="company" value={company} onChange={e => setCompany(e.target.value)} placeholder="Enter your company name" className="bg-white dark:bg-black" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="project">Project Description</Label>
                            <Textarea className="min-h-[120px] resize-none bg-white dark:bg-black" id="project" name="project" value={project} onChange={e => setProject(e.target.value)} placeholder="Describe your project" />
                        </div>
                        <div className="flex justify-center">
                            <Button className="border align-center border-black hover:scale-105 transition-all dark:text-gray-300 dark:border-white text-black font-bold py-2 mt-10 px-4 rounded" type="submit">
                                Request Quote
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
