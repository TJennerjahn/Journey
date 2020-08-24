import { writable } from 'svelte/store';
import { v4 as uuidv4 } from "uuid";

export const projects = writable();

// export const projects = writable([
//     {
//         id: uuidv4(),
//         title: "School",
//         icon: "fas fa-graduation-cap",
//         color: "indigo",
//         taskCount: 7,
//         tasks: [
//             {
//                 id: uuidv4(),
//                 title: "Fachhochschule Bewerbung",
//                 done: false,
//                 hasDeadline: true,
//                 deadline: new Date(),
//             },
//         ],
//     },
//     {
//         id: uuidv4(),
//         title: "Work",
//         icon: "fas fa-briefcase",
//         color: "orange",
//         taskCount: 5,
//         tasks: [
//             {
//                 id: uuidv4(),
//                 title: "This",
//                 done: false,
//                 hasDeadline: true,
//                 deadline: new Date(),
//             },
//             {
//                 id: uuidv4(),
//                 title: "Is",
//                 done: false,
//                 hasDeadline: false,
//             },
//             {
//                 id: uuidv4(),
//                 title: "A",
//                 done: true,
//                 hasDeadline: false,
//             },
//             {
//                 id: uuidv4(),
//                 title: "Test",
//                 done: false,
//                 hasDeadline: false,
//             },
//         ],
//     },
//     {
//         id: uuidv4(),
//         title: "Sports",
//         icon: "fas fa-trophy",
//         color: "teal",
//         taskCount: 2,
//         tasks: [],
//     },
//     {
//         id: uuidv4(),
//         title: "Home",
//         icon: "fas fa-home",
//         color: "purple",
//         taskCount: 11,
//         tasks: [],
//     },
//     {
//         id: uuidv4(),
//         title: "Svelte",
//         icon: "fas fa-server",
//         color: "pink",
//         taskCount: 98,
//         tasks: [],
//     },
// ]);