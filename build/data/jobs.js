export default [
    {
        title: "Rakuten OverDrive, Inc.",
        location: {
            streetName: "Overdrive Way",
            city: "Cleveland",
            state: "OH",
            zip: "44125",
            country: "United States"
        },
        position: {
            start: "Developer I"
        },
        pay: {
            start: { amount: 72000, period: "year" },
            end: { amount: 75000, period: "year" },
        },
        dates: {
            start: { year: 2018, month: 10 },
            end: { descriptor: "present" }
        },
        activities: [
            "Worked primarily on back-end systems for our flagship apps Libby and Sora, using the Microsoft Stack (C#, .NET Core, ASP.NET Core, EntityFramework Core, SQL Server), and AWS EC2 for service hosting",
            "In particular, developed a system for decoding and boosting the volume of MP3 files to satisfy user complaints about quiet audiobooks, as well as the system that sends push notifications and emails to users in response to circulation activity (reads activity off Apache Kafka, deduplicates with a Redis cache, provides templating via Mustache syntax, and sends to devices through APNs, Firbase Cloud Messaging, and SendGrid for email)",
            "Also maintained several legacy projects built with Ruby on Rails, including backend and frontend work",
            "Project management was done using JIRA for issue tracking, Confluence for wikis, Git for version control (with GitKraken for a GUI client), GitHub for code hosting, Visual Studio and VS Code for editing",
            "Also organized meetings and coordinated with stakeholders as needed, defining specs/response plans"
        ]
    },
    {
        title: "Supply Technologies, LLC",
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
        pay: {
            start: { amount: 65000, period: "year" },
            end: { amount: 66000, period: "year" },
        },
        dates: {
            start: { year: 2017, month: 6 },
            end: { year: 2018, month: 10 }
        },
        activities: [
            "Built two separate web apps from the ground up: used Balsamiq Cloud for rapid wireframing, designed and deployed the SQL Server database schema, wrote the business layer classes to interact with this database using EntityFramework Core, and built the web app itself using ASP.NET Core MVC, with jQuery and Bootstrap on the front end",
            "Developed 'STARS', an Alexa for Business skill for use in our warehouses.  I designed the interaction model for this skill and built the back-end skill handlers using AWS Lambda for Node.js.  Also helped to promote the skill for both our employees and customers at various trade shows and presentations.",
            "Collaborated on a “STARS” scanning app with intern: an Android app built with Xamarin.Android targeted at Zebra TC56 scanning devices, using a SQLite database for user preferences and a REST API to contact our data warehouse.  Used Balsamiq Cloud for rapid wireframing, managed work items for myself and the intern, and helped present the app to our customers at Volvo",
            "Used VSTS to keep myself organized with work items, and to maintain a CI/CD pipeline for above projects",
            "Kept my development environments isolated and easily reproducible with custom Docker images."
        ]
    },
    {
        title: "AmTrust Financial Services, Inc.",
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
        pay: {
            start: { amount: 59000, period: "year" }
        },
        dates: {
            start: { year: 2016, month: 12 },
            end: { year: 2017, month: 6 }
        },
        activities: [
            "Worked on the Billing team, implementing new fee systems in the proprietary “CPP” web application",
            "Company followed agile development practices using SharePoint for issue tracking and Git for version control ",
            "Worked mostly in VB.NET, including UI work with WebForms and ASP.NET, also used C# (WinForms) to create custom tools to help the business",
            "Frequently wrote T-SQL queries/scripts to investigate policy unbalances and implement schema changes in company SQL Server databases"
        ]
    },
    {
        title: "University of Akron, Department of Biology",
        location: {
            city: "Akron",
            state: "OH",
            zip: "44325",
            country: "United States"
        },
        position: {
            start: "Teaching Assistant"
        },
        pay: {
            start: { amount: 20, period: "hour" }
        },
        dates: {
            start: { year: 2015, month: 8 },
            end: { year: 2016, month: 12 }
        },
        activities: [
            "Led the laboratory for Human Anatomy and Physiology (2-3 classes per semester)",
            "Prepared lecture materials, monitored lab activities, prepared quizzes/exams, hand-graded all assignments, and maintained the class “Springboard” page with helpful links and news/homework updates",
            "Held flexible office hours and promptly responded to Emails from students"
        ]
    },
    {
        title: "University of Akron, Department of Biology",
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
            "Wrote scripts to process retinal voltage recordings using Excel VBA, MS-DOS batch files, and the proprietary Offline Sorter and NeuroExplorer scripting languages",
            "Developed algorithms to determine whether bursts of action potentials on distinct electrodes are associated with the same retinal wave",
            "Began work on a Windows GUI (written in C#.NET using WinForms and later WPF libraries) that would be easier for fellow lab members to use than command-line scripts",
            "Presented results at the 2014 and 2015 Great Lakes Bioinformatics (GLBio) conferences, and the 2015 Association for Research in Vision and Opthamology (ARVO) conference, with plans to submit a manuscript for publication"
        ]
    },
    {
        title: "Davey Tree Expert Company",
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
        pay: {
            start: { amount: 19, period: "hour" }
        },
        dates: {
            start: { year: 2014, month: 6 },
            end: { year: 2015, month: 8 }
        },
        activities: [
            "Used NHibernate (a .NET-based ORM library) to map MS Access tables to a .NET class model",
            "Wrote C# code to update user projects from v5 to v6 of Davey’s flagship application:  i-Tree Eco (v6)",
            "Translated a “Forecast” feature, originally written in Python, into C# to work with above class model ",
            "Used WinForms and ComponentOne API to develop a form interface for Forecast",
            "Managed several MS Access company databases by restructuring schemas and writing SQL queries"
        ]
    },
    {
        title: "Cuyahoga Falls Parks & Recreation Department",
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
        pay: {
            start: { amount: 7.95, period: "hour" }
        },
        dates: {
            start: { year: 2014, month: 5 },
            end: { year: 2014, month: 6 }
        },
        activities: []
    },
    {
        title: "Insomnia Cookies",
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
        pay: {
            start: { amount: 8, period: "hour" }
        },
        dates: {
            start: { year: 2013, month: 8 },
            end: { year: 2014, month: 6 }
        },
        activities: [
            "Prepared all menu items promptly, maintaining quality standards",
            "Took deliveries to homes/businesses, maintaining delivery speed standards while driving safely",
        ]
    },
    {
        title: "Jimmy John's",
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
            "Prepared all menu items promptly, maintaining quality standards",
            "Took deliveries to homes/businesses, maintaining delivery speed standards while driving safely",
        ]
    },
    {
        title: "University of Akron, Department of Student Life",
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
        pay: {
            start: { amount: 7.95, period: "hour" },
        },
        dates: {
            start: { year: 2013, month: 2 },
            end: { year: 2013, month: 8 }
        },
        activities: [
            "Assisted Student Organizations with finances, event/travel planning, use of campus space, etc.",
            "Fashioned ways to make processes easier for Student Organizations and the department, like making forms/files easily accessible online and writing Excel macros for scheduling"
        ]
    },
    {
        title: "Centerville-Washington Township Rec Center",
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
            "Performed set-up/maintenance of seven climbing walls",
            "Belayed for individual and group patrons",
            "Taught classes (ages 4-13); provided instruction in belaying, knots, technique"
        ]
    },
    {
        title: "Centerville Pizza and BBQ",
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
            "Received orders over the phone and in person",
            "Prepared all menu items promptly, maintaining quality standards",
            "Accurately managed cash registers",
            "Maintained clean, well-stocked work environment"
        ]
    },
    {
        title: "Arby's & Lee's Famous Recipe Chicken",
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
            "Provided prompt and friendly customer service at front counter and drive-thru",
            "Accurately managed cash registers",
            "Managed cleanliness and appearance of work area, dining room, bathrooms"
        ]
    },
    {
        title: "Sterling House of Washington Township",
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
            "Performed piano music for residents of retirement home",
            "Selected a wide array of genres to play, and kept residents interested between pieces with info about the music"
        ]
    }
]
