/* eslint-disable indent */

// const link = {
//   text: "Website",
//   url: "https://example.com/some/resource"
// }
// const project = {
//   title: "",
//   imageUrl: "",
//   description: {
//     short: "",
//     long: "",
//   },
//   links: [
//     {},
//     {},
//     {},
//   ],
//   dates: {
//     start: {},
//     end: {},
//   },
// };

module.exports = {
  projects: {
    "Miscellaneous": [
      "WaveAnalysisScripts",
      "HardyWeinberg",
      "ImageCruncher",
      "ScammerFlooder",
      "UniverseSimulator",
      "GravitySimulator",
      "NonIntersecting3dGraphs",
      "MatrixGame",
      "AirplaneShooter",
      "2048",
      "FactorioServer",
      "GitAliases",
      "VsEditorConfig",
      "VbaModuleManager"
    ],
    "Unity Games": [
      "BarrelRoll",
      "Skelia",
      "HighHandHoldem",
      "GravityCopter",
      "SupplyTechGame",
    ],
    "Game Jams": [
      "DemiSword Bubonic",
      "Send Them Home",
    ],
  },

  contactInfo: [
    {
      title: "Email",
      url: "mailto:dvic@derploid.com",
      iconClass: "far fa-envelope"
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/dan.vicarel",
      iconClass: "fab fa-facebook"
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/daniel-vicarel/",
      iconClass: "fab fa-linkedin"
    },
    {
      title: "Twitter",
      url: "https://twitter.com/Rabadash8820",
      iconClass: "fab fa-twitter"
    },
    {
      title: "StackOverflow",
      url: "https://stackoverflow.com/users/3991688/rabadash8820",
      iconClass: "fab fa-stack-overflow"
    },
    {
      title: "GitHub",
      url: "https://github.com/Rabadash8820",
      iconClass: "fab fa-github"
    },
  ],

  education: [
    {
      title: "Centerville High School",
      location: {
        streetNum: 500,
        streetName: "E. Franklin St.",
        city: "Centerville",
        state: "OH",
        zip: "45459",
        country: "United States"
      },
      imageUrl: "",
      graduationDate: { year: 2011, month: 5 },
      degree: "Honors diploma",
      gpa: 3.6
    },
    {
      title: "University of Akron",
      location: {
        city: "Akron",
        state: "OH",
        zip: "44325",
        country: "United States"
      },
      imageUrl: "",
      graduationDate: { year: 2015, month: 5 },
      degree: [
        "Bachelor of Science in Biology",
        "Minors in Mathematics, Chemistry, and Computer Science",
        "Honors diploma"
      ],
      distinction: "Magna Cum Laude",
      gpa: 3.7
    }
  ],

  jobs: [
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
  ],

  skills: {
    "General": [
      "Very quick to learn new tasks and adapt to new work environments",
      "Experience providing courteous and professional customer service",
      "Excellent technical writing, presentation, and public speaking skills",
      "Intermediate German, able to write and speak"
    ],
    "Technology": [
      "Very skilled with Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)",
      "Operating Systems: Windows (XP / Vista / 7 / 8 / 10) and Linux (Ubuntu, Amazon Linux/RHEL)",
      "Languages: C#, C++, HTML/CSS, JavaScript (including ES6+), Excel VBA, VB.NET, TI-Basic, MS-DOS and Linux scripting, XML, JSON, YAML, Markdown",
      "Databases: MySQL, SQLite, SQL Server, Redis",
      "Frameworks/libraries: .NET Framework and .NET Core, EntityFramework Core, Xamarin, ASP.NET Core, jQuery, Unity3D, NUnit, Moq, Node.js, Alexa Skills Kit",
      "Tools: Visual Studio (Code), Vim, Notepad++, Git, GitHub, GitKraken, SourceTree, Azure DevOps, ESLint, Babel, EditorConfig, NuGet, Docker, Slack, Postman, Windows Subsystem for Linux, bash, sed, SQL Server Management Studio, Remote Desktop",
      "Considerable experience with computer hardware, networking, and the graphics pipeline",
      "Considerable experience with cloud and DevSecOps practices using Amazon Web Services",
    ]
  },

  activities: {
    "Volunteer work & Extracurriculars": [
      {
        description: "Disaster relief in MI, AL, and TN with Presbyterian Disaster Assistance",
        dates: [
          { year: 2007 },
          { year: 2015 }
        ]
      },
      {
        description: "Track and Field, Cross Country",
        dates: [
          { year: 2008 },
          { year: 2010 }
        ]
      },
      {
        description: "Chess Club",
        dates: [
          { year: 2008 },
          { year: 2010 }
        ]
      },
      {
        description: "'Chem Buddies' chemistry demonstrations for local elementary school students",
        dates: [
          { year: 2009 },
          { year: 2010 }
        ]
      },
      {
        description: "Co-Founder, Ultimate Frisbee Club, Centerville HS",
        dates: [
          { year: 2009 },
          { year: 2011 }
        ]
      },
      {
        description: "Peer Tutor (Calculus, Chemistry, Physics)",
        dates: [
          { year: 2009, descriptor: "As needed" },
          { year: 2011 }
        ]
      },
      {
        description: "Co-secretary Presbyterian Youth Council, Westminster Presbyterian Church",
        dates: [
          { year: 2010 },
          { year: 2011 }
        ]
      },
      {
        description: "Competed in Science Olympiad and Science Bowl (astronomy, chemistry, optics)",
        dates: [
          { year: 2010 },
          { year: 2011 }
        ]
      },
      {
        description: "Constructed homes in Oak Ridge, TN and Birmingham AL with Habitat for Humanity",
        dates: [
          { year: 2011 },
          { year: 2012 }
        ]
      },
      {
        description: "Volunteered with Environmental Akron at Akron Marathon",
        dates: [
          { year: 2011 },
          { year: 2012 }
        ]
      },
      {
        description: "Community improvement project in Guarizama, Honduras with Engineers Without Borders",
        dates: [
          { year: 2012, month: 1 }
        ]
      },
      {
        description: "Treasurer, Habitat for Humanity, University of Akron chapter",
        dates: [
          { year: 2012 },
          { year: 2013 }
        ]
      },
      {
        description: "Vice President, Engineers Without Borders, University of Akron chapter",
        dates: [
          { year: 2012 },
          { year: 2013 }
        ]
      },
      {
        description: "Outdoor Adventure Club, University of Akron",
        dates: [
          { year: 2012 },
          { year: 2013 }
        ]
      },
      {
        description: "Taught a computer programming class for 7th and 8th grade students",
        dates: [
          { year: 2014, descriptor: "Summer" }
        ]
      },
      {
        description: "Ran in the annual Kent State University Black Squirrel 5K race",
        dates: [
          { year: 2014 },
          { year: 2015 }
        ]
      },
      {
        description: "Judged/supervised local Science Olympiad Tournament",
        dates: [
          { year: 2012 },
          { descriptor: "present" }
        ]
      },
      {
        description: "Member, Cleveland Game Developers",
        dates: [
          { year: 2017 },
          { descriptor: "present" }
        ]
      },
      {
        description: "Participated in game jams in the Cleveland area",
        dates: [
          { year: 2017 },
          { descriptor: "present" }
        ]
      }
    ],
    "Accolades": [
      {
        description: "Member, National Honors Society and Golden Key Honors Society",
        dates: [
          { year: 2010 },
          { year: 2012 }
        ]
      },
      {
        description: "University of Akron Dean's List",
        dates: [
          { year: 2011, descriptor: "Fall" },
          { year: 2014, descriptor: "Fall" }
        ]
      },
      {
        description: "Earned 1990 on SAT and 33 on ACT",
        dates: [
          { year: 2011 }
        ]
      },
      {
        description: "Recipient, Gibara Study Abroad Scholarship",
        dates: [
          { year: 2011 }
        ]
      },
      {
        description: "University Honors Scholarship, Scholarship of Excellence",
        dates: [
          { year: 2011 }
        ]
      },
      {
        description: "Certified Belayer: University of Akron Rec Center, Urban Krag, Washington Twp Rec Center",
        dates: [
          { year: 2012 },
        ]
      },
      {
        description: "Recipient, annual Choose Ohio First Scholarship in Bioinformatics",
        dates: [
          { year: 2012 },
          { year: 2013 },
          { year: 2014 },
        ]
      },
      {
        description: "Earned 166 (96th percentile) in verbal reasoning, 161 (80th percentile) in quantitative reasoning, and 5.5 (98th percentile) in analytical writing on general GRE",
        dates: [
          { year: 2014, descriptor: "Fall" }
        ]
      },
      {
        description: "Unity Certified Programmer",
        dates: [
          { year: 2019, month: 7 },
          { descriptor: "present" },
        ]
      }
    ],
    "Accomplishments": [
      {
        description: "Built my own gaming computer (happy to describe specs!)",
        dates: [
          { year: 2014, descriptor: "Summer" }
        ]
      },
      {
        description: "Built a video game level of my apartment using Valve's Hammer Editor",
        dates: [
          { year: 2014, month: 10 }
        ]
      },
      {
        description: "Registered domain names for personal use through GoDaddy and AWS Route 53",
        dates: [
          { year: 2015 },
          { year: 2017 },
          { year: 2019 }
        ]
      },
      {
        description: "Founded a game development company, Danware Creations, LLC, creating a company website, cloud infrastructure, and social media presence while developing 2-3 video games with the Unity engine",
        dates: [
          { year: 2017, month: 1 }
        ]
      },
      {
        description: "Founded a game development company, Derploid Entertainment, LLC, with an artist from the Cleveland Game Developers group, creating a company website, cloud infrastructure, and social media presence while developing a simple poker-style card game for mobile with the Unity engine",
        dates: [
          { year: 2017, month: 8 }
        ]
      }
    ],
    "Performances & Presentations": [
      {
        description: "Church choir concert tours in Maine, New York, and Scotland",
        dates: [
          { year: 2007 },
          { year: 2011 }
        ]
      },
      {
        description: "Musical Composition/Performance/Direction for 'Originals Night' concert at Centerville HS",
        dates: [
          { year: 2009 },
          { year: 2011 }
        ]
      },
      {
        description: "Men's Chorus and Concert Choir, University of Akron",
        dates: [
          { year: 2011, descriptor: "Fall" },
          { year: 2013, descriptor: "Fall" }
        ]
      },
      {
        description: "Gave two talks at GDEX 2019: 'Supercharging your Unity Workflow With Visual Studio and Git' and 'Designing New Lifeforms'",
        dates: [
          { year: 2019, descriptor: 10 }
        ]
      }
    ]
  }
};


// -	Forked the GitHub repository for the mobile game "2048" to implement an auto-solver feature in JavaScript	June 2015
// -	Built a tool for auto-importing/-exporting macros from Excel workbooks, to facilitate version control of VBA code with Git	March 2015
// -	Built a simple image-manipulation application with WinForms for another team member in my graduate lab	October 2015
// -	Built a WinForms application to perform Monte Carlo simulations of Hardy-Weinberg population dynamics for a graduate class	November 2015
// -	Built a WinForms application to simulate a "discrete universe" for a graduate class	November 2015
// -	Developing a sci-fi FPS game built around self-assembling entities using Unity	Summer 2015 – present
