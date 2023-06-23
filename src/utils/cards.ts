import { BusinessCard } from "./types";
import { v4 as uuid } from 'uuid'

export const defaultCards: BusinessCard[] = [
    {
        title: "John's Computer Repair",
        subtitle: "Computer Technician",
        description: "John's Computer Repair provides expert computer repair services in Tel Aviv. With years of experience, we specialize in diagnosing and fixing various computer issues, including hardware and software problems. Our team of skilled technicians is dedicated to providing prompt and reliable service to ensure your computer is up and running smoothly. Contact us today for all your computer repair needs.",
        phone: "0532456683",
        email: "john@example.com",
        web: "https://www.johnscomputerrepair.com",
        imageUrl: "https://images.pexels.com/photos/10558599/pexels-photo-10558599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        imageAlt: "Computer Repair Shop",
        country: "Israel",
        city: "Tel Aviv",
        street: "Dizengoff",
        houseNumber: 12,
        zip: 12345,
        _id: uuid()
    },
    {
        title: "David's Plumbing Services",
        subtitle: "Plumber",
        description: "David's Plumbing Services offers top-quality plumbing solutions in Jerusalem. Our team of licensed plumbers is experienced in handling a wide range of plumbing needs, from minor repairs to full system installations. We pride ourselves on delivering exceptional customer service and ensuring customer satisfaction. Whether you have a leaky faucet or need a complete plumbing overhaul, trust Amy's Plumbing Services for reliable and efficient plumbing solutions.",
        phone: "0556543210",
        email: "David@example.com",
        web: "https://www.Davidsplumbingservices.com",
        imageUrl: "https://plus.unsplash.com/premium_photo-1663011056778-2b987e47434a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        imageAlt: "Plumbing Services",
        country: "Israel",
        city: "Jerusalem",
        street: "King George",
        houseNumber: 45,
        zip: 54321,
        _id: uuid()
    },
    {
        title: "Mike's Electrician Services",
        subtitle: "Electrician",
        description: "Mike's Electrician Services is your go-to electrician in Haifa. We provide a wide range of electrical services for both residential and commercial customers. From electrical installations to repairs and maintenance, our skilled electricians deliver reliable and efficient solutions. We prioritize safety and adhere to industry standards to ensure your electrical systems are in optimal condition. Count on Mike's Electrician Services for all your electrical needs in Haifa and surrounding areas.",
        phone: "0521743333",
        email: "mike@example.com",
        web: "https://www.mikeselectricianservices.com",
        imageUrl: "https://plus.unsplash.com/premium_photo-1682086494838-6410429123a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        imageAlt: "Electrician Services",
        country: "Israel",
        city: "Haifa",
        street: "Rothschild Boulevard",
        houseNumber: 17,
        zip: 67890,
        _id: uuid()
    },
    {
        title: "Sarah's Cleaning Company",
        subtitle: "Cleaning Services",
        description: "Sarah's Cleaning Company offers professional cleaning services in Netanya. We specialize in providing comprehensive cleaning solutions for homes and offices. Our dedicated team of cleaners is trained to deliver exceptional results and ensure a clean and healthy environment. Whether you need regular cleaning, deep cleaning, or move-in/move-out cleaning, Sarah's Cleaning Company is committed to exceeding your expectations. Experience the difference with our reliable and efficient cleaning services.",
        phone: "0535251866",
        email: "sarah@example.com",
        web: "https://www.sarahscleaningcompany.com",
        imageUrl: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        imageAlt: "Cleaning Company",
        country: "Israel",
        city: "Netanya",
        street: "Herzl",
        houseNumber: 56,
        zip: 98765,
        _id: uuid()
    }
];
