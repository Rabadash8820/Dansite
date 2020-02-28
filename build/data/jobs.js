export default [
    {
        name: "Summit Racing Equipment",
        image: {
            src: "about/job-logos/summitRacing-logo-400.jpg",
            alt: "",
            width: 400,
            height: 400,
        },
        location: {
            streetNum: 1200,
            streetName: "Southeast Ave",
            city: "Tallmadge",
            state: "OH",
            zip: "44278",
            country: "United States"
        },
        position: {
            start: "Web Developer",
        },
        dates: {
            start: { year: 2020, month: 1 },
            end: { descriptor: "present" }
        },
        activities: [
            { activity: "Worked primarily on back-end systems for our flagship apps Libby and Sora, using the Microsoft Stack (C#, .NET Core, ASP.NET Core, EntityFramework Core, SQL Server), and AWS EC2 for service hosting" },
            { activity: "In particular, developed a system for decoding and boosting the volume of MP3 files to satisfy user complaints about quiet audiobooks, as well as the system that sends push notifications and emails to users in response to circulation activity (reads activity off Apache Kafka, deduplicates with a Redis cache, provides templating via Mustache syntax, and sends to devices through APNs, Firbase Cloud Messaging, and SendGrid for email)" },
            { activity: "Also maintained several legacy projects built with Ruby on Rails, including backend and frontend work" },
            { activity: "Project management was done using JIRA for issue tracking, Confluence for wikis, Git for version control (with GitKraken for a GUI client), GitHub for code hosting, Visual Studio and VS Code for editing" },
            { activity: "Also organized meetings and coordinated with stakeholders as needed, defining specs/response plans" },
        ]
    },
    {
        name: "Rakuten OverDrive, Inc.",
        image: {
            src: "about/job-logos/overdrive-logo-220.jpg",
            alt: "",
            width: 220,
            height: 220,
        },
        location: {
            streetNum: 1,
            streetName: "Overdrive Way",
            city: "Cleveland",
            state: "OH",
            zip: "44125",
            country: "United States"
        },
        position: {
            start: "Developer I"
        },
        dates: {
            start: { year: 2018, month: 10 },
            end: { year: 2019, month: 11 }
        },
        activities: [
            { activity: "Worked primarily on back-end systems for our flagship apps Libby and Sora, using the Microsoft Stack (C#, .NET Core, ASP.NET Core, EntityFramework Core, SQL Server), and AWS EC2 for service hosting" },
            { activity: "In particular, developed a system for decoding and boosting the volume of MP3 files to satisfy user complaints about quiet audiobooks, as well as the system that sends push notifications and emails to users in response to circulation activity (reads activity off Apache Kafka, deduplicates with a Redis cache, provides templating via Mustache syntax, and sends to devices through APNs, Firbase Cloud Messaging, and SendGrid for email)" },
            { activity: "Also maintained several legacy projects built with Ruby on Rails, including backend and frontend work" },
            { activity: "Project management was done using JIRA for issue tracking, Confluence for wikis, Git for version control (with GitKraken for a GUI client), GitHub for code hosting, Visual Studio and VS Code for editing" },
            { activity: "Also organized meetings and coordinated with stakeholders as needed, defining specs/response plans" },
        ]
    },
    {
        name: "Supply Technologies, LLC",
        image: {
            src: "about/job-logos/supplyTech-logo-512x256.png",
            alt: "",
            width: 512,
            height: 256,
            rectangular: true,
        },
        location: {
            streetNum: 6065,
            streetName: "Parkland Blvd",
            city: "Cleveland",
            state: "OH",
            zip: "44124",
            country: "United States"
        },
        position: {
            start: "Software Engineer"
        },
        dates: {
            start: { year: 2017, month: 6 },
            end: { year: 2018, month: 10 }
        },
        activities: [
            { activity: "Built two separate web apps from the ground up: used Balsamiq Cloud for rapid wireframing, designed and deployed the SQL Server database schema, wrote the business layer classes to interact with this database using EntityFramework Core, and built the web app itself using ASP.NET Core MVC, with jQuery and Bootstrap on the front end" },
            { activity: "Developed 'STARS', an Alexa for Business skill for use in our warehouses.  I designed the interaction model for this skill and built the back-end skill handlers using AWS Lambda for Node.js.  Also helped to promote the skill for both our employees and customers at various trade shows and presentations." },
            { activity: "Collaborated on a “STARS” scanning app with intern: an Android app built with Xamarin.Android targeted at Zebra TC56 scanning devices, using a SQLite database for user preferences and a REST API to contact our data warehouse.  Used Balsamiq Cloud for rapid wireframing, managed work items for myself and the intern, and helped present the app to our customers at Volvo" },
            { activity: "Used VSTS to keep myself organized with work items, and to maintain a CI/CD pipeline for above projects" },
            { activity: "Kept my development environments isolated and easily reproducible with custom Docker images." },
        ]
    },
    {
        name: "AmTrust Financial Services, Inc.",
        image: {
            src: "about/job-logos/amtrust-logo-416.jpg",
            alt: "",
            width: 416,
            height: 416,
        },
        location: {
            streetNum: 800,
            streetName: "Superior Ave",
            city: "Cleveland",
            state: "OH",
            zip: "44114",
            country: "United States"
        },
        position: {
            start: "Software Engineer I"
        },
        dates: {
            start: { year: 2016, month: 12 },
            end: { year: 2017, month: 6 }
        },
        activities: [
            { activity: "Worked on the Billing team, implementing new fee systems in the proprietary “CPP” web application" },
            { activity: "Company followed agile development practices using SharePoint for issue tracking and Git for version control " },
            { activity: "Worked mostly in VB.NET, including UI work with WebForms and ASP.NET, also used C# (WinForms) to create custom tools to help the business" },
            { activity: "Frequently wrote T-SQL queries/scripts to investigate policy unbalances and implement schema changes in company SQL Server databases" },
        ]
    },
    {
        name: "University of Akron, Department of Biology",
        image: {
            src: "about/education-seals/ua-seal-500.jpg",
            alt: "",
            width: 500,
            height: 500,
        },
        location: {
            city: "Akron",
            state: "OH",
            zip: "44325",
            country: "United States"
        },
        position: {
            start: "Teaching Assistant"
        },
        dates: {
            start: { year: 2015, month: 8 },
            end: { year: 2016, month: 12 }
        },
        activities: [
            { activity: "Led the laboratory for Human Anatomy and Physiology (2-3 classes per semester)" },
            { activity: "Prepared lecture materials, monitored lab activities, prepared quizzes/exams, hand-graded all assignments, and maintained the class “Springboard” page with helpful links and news/homework updates" },
            { activity: "Held flexible office hours and promptly responded to Emails from students" },
        ]
    },
    {
        name: "University of Akron, Department of Biology",
        image: {
            src: "about/education-seals/ua-seal-500.jpg",
            alt: "",
            width: 500,
            height: 500,
        },
        location: {
            city: "Akron",
            state: "OH",
            zip: "44325",
            country: "United States"
        },
        position: {
            start: "Research Assistant"
        },
        dates: {
            start: { year: 2014, descriptor: "Spring" },
            end: { year: 2016, month: 12 }
        },
        activities: [
            { activity: "Wrote scripts to process retinal voltage recordings using Excel VBA, MS-DOS batch files, and the proprietary Offline Sorter and NeuroExplorer scripting languages" },
            { activity: "Developed algorithms to determine whether bursts of action potentials on distinct electrodes are associated with the same retinal wave" },
            { activity: "Began work on a Windows GUI (written in C#.NET using WinForms and later WPF libraries) that would be easier for fellow lab members to use than command-line scripts" },
            { activity: "Presented results at the 2014 and 2015 Great Lakes Bioinformatics (GLBio) conferences, and the 2015 Association for Research in Vision and Opthamology (ARVO) conference, with plans to submit a manuscript for publication" },
        ]
    },
    {
        name: "Davey Tree Expert Company",
        image: {
            src: "about/job-logos/daveyTree-logo-400x200.jpg",
            alt: "",
            width: 400,
            height: 200,
            rectangular: true,
        },
        location: {
            streetNum: 1500,
            streetName: "N Mantua St",
            city: "Kent",
            state: "OH",
            zip: "44240",
            country: "United States"
        },
        position: {
            start: "Intern Software Developer",
            end: "Software Developer"
        },
        dates: {
            start: { year: 2014, month: 6 },
            end: { year: 2015, month: 8 }
        },
        activities: [
            { activity: "Used NHibernate (a .NET-based ORM library) to map MS Access tables to a .NET class model" },
            { activity: "Wrote C# code to update user projects from v5 to v6 of Davey’s flagship application:  i-Tree Eco (v6)" },
            { activity: "Translated a “Forecast” feature, originally written in Python, into C# to work with above class model " },
            { activity: "Used WinForms and ComponentOne API to develop a form interface for Forecast" },
            { activity: "Managed several MS Access company databases by restructuring schemas and writing SQL queries" },
        ]
    },
    {
        name: "Cuyahoga Falls Parks & Recreation Department",
        image: {
            src: "about/job-logos/cfParksRec-logo-950x425.png",
            alt: "",
            width: 950,
            height: 425,
            rectangular: true,
        },
        location: {
            streetNum: 2310,
            streetName: "Second St.",
            city: "Cuyahoga Falls",
            state: "OH",
            zip: "44221",
            country: "United States"
        },
        position: {
            start: "Mow crew member"
        },
        dates: {
            start: { year: 2014, month: 5 },
            end: { year: 2014, month: 6 }
        },
        activities: []
    },
    {
        name: "Insomnia Cookies",
        image: {
            src: "about/job-logos/insomnia-logo-329.jpg",
            alt: "",
            width: 329,
            height: 329,
        },
        location: {
            streetNum: 367,
            streetName: "South Main St",
            city: "Akron",
            state: "OH",
            zip: "44311",
            country: "United States"
        },
        position: {
            start: "Delivery Driver"
        },
        dates: {
            start: { year: 2013, month: 8 },
            end: { year: 2014, month: 6 }
        },
        activities: [
            { activity: "Prepared all menu items promptly, maintaining quality standards" },
            { activity: "Took deliveries to homes/businesses, maintaining delivery speed standards while driving safely" },
        ]
    },
    {
        name: "Jimmy John's",
        image: {
            src: "about/job-logos/jimmyJohns-logo-800.png",
            alt: "",
            width: 800,
            height: 800,
        },
        location: {
            streetNum: 371,
            streetName: "South Main St",
            city: "Akron",
            state: "OH",
            zip: "44308",
            country: "United States"
        },
        position: {
            start: "Delivery Driver"
        },
        dates: {
            start: { year: 2013, month: 5 },
            end: { year: 2013, month: 8 }
        },
        activities: [
            { activity: "Prepared all menu items promptly, maintaining quality standards" },
            { activity: "Took deliveries to homes/businesses, maintaining delivery speed standards while driving safely" },
        ]
    },
    {
        name: "University of Akron, Department of Student Life",
        image: {
            src: "about/job-logos/uaSource-logo-1200x600.png",
            alt: "",
            width: 1200,
            height: 600,
            rectangular: true,
        },
        location: {
            streetNum: 303,
            streetName: "East Carroll St",
            city: "Akron",
            state: "OH",
            zip: "44325",
            country: "United States"
        },
        position: {
            start: "SOuRCe Liaison"
        },
        dates: {
            start: { year: 2013, month: 2 },
            end: { year: 2013, month: 8 }
        },
        activities: [
            { activity: "Assisted Student Organizations with finances, event/travel planning, use of campus space, etc." },
            { activity: "Fashioned ways to make processes easier for Student Organizations and the department, like making forms/files easily accessible online and writing Excel macros for scheduling" },
        ]
    },
    {
        name: "Centerville-Washington Township Rec Center",
        image: {
            src: "about/job-logos/recCenter-logo-387.png",
            alt: "",
            width: 387,
            height: 387,
        },
        location: {
            streetNum: 895,
            streetName: "Miamisburg Centerville Rd",
            city: "Dayton",
            state: "OH",
            zip: "45459",
            country: "United States"
        },
        position: {
            start: "Climbing wall instructor"
        },
        dates: {
            start: { year: 2012, month: 7 },
            end: { year: 2013, month: 1 }
        },
        activities: [
            { activity: "Performed set-up/maintenance of seven climbing walls" },
            { activity: "Belayed for individual and group patrons" },
            { activity: "Taught classes (ages 4-13); provided instruction in belaying, knots, technique" },
        ]
    },
    {
        name: "Centerville Pizza and BBQ",
        image: {
            src: "about/job-logos/centervillePizza-logo-480x240.png",
            alt: "",
            width: 480,
            height: 240,
            rectangular: true,
        },
        location: {
            streetNum: 9470,
            streetName: "Dayton-Lebanon Pk",
            city: "Centerville",
            state: "OH",
            zip: "45458",
            country: "United States"
        },
        position: {
            start: "Crew member"
        },
        dates: {
            start: { year: 2012, month: 5 },
            end: { year: 2013, month: 1 }
        },
        activities: [
            { activity: "Received orders over the phone and in person" },
            { activity: "Prepared all menu items promptly, maintaining quality standards" },
            { activity: "Accurately managed cash registers" },
            { activity: "Maintained clean, well-stocked work environment" },
        ]
    },
    {
        name: "Arby's & Lee's Famous Recipe Chicken",
        image: {
            src: "about/job-logos/arbysLees-logo-600x300.png",
            alt: "",
            width: 600,
            height: 300,
            rectangular: true,
        },
        location: {
            streetNum: 5940,
            streetName: "Far Hills Ave",
            city: "Dayton",
            state: "OH",
            zip: "45429",
            country: "United States"
        },
        position: {
            start: "Crew member"
        },
        dates: {
            start: { year: 2010, month: 7 },
            end: { year: 2011, month: 2 }
        },
        activities: [
            { activity: "Provided prompt and friendly customer service at front counter and drive-thru" },
            { activity: "Accurately managed cash registers" },
            { activity: "Managed cleanliness and appearance of work area, dining room, bathrooms" },
        ]
    },
    {
        name: "Sterling House of Washington Township",
        location: {
            streetNum: 8130,
            streetName: "Miller Farm Ln",
            city: "Dayton",
            state: "OH",
            zip: "45458",
            country: "United States"
        },
        position: {
            start: "Piano player"
        },
        activities: [
            { activity: "Performed piano music for residents of retirement home" },
            { activity: "Selected a wide array of genres to play, and kept residents interested between pieces with info about the music" },
        ]
    }
]
